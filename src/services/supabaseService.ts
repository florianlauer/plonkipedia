import supabase from "../lib/supabase";
import type { Country, Hint, HintTranslation } from "../types/database";
import { getMockTranslation } from "../mocks/translations";
import { delay } from "../utils/env";

// Variable pour contrôler l'utilisation des mocks
// Forcer l'utilisation des mocks pour le moment
const SHOULD_USE_MOCKS = false; // Forcer à true au lieu de useMocks

// Mapping des continents français vers anglais
const CONTINENT_TRANSLATIONS: Record<string, string> = {
  europe: "Europe",
  asie: "Asia",
  afrique: "Africa",
  "amérique du nord": "North America",
  "amerique du nord": "North America",
  "amérique du sud": "South America",
  "amerique du sud": "South America",
  "north america": "North America",
  "south america": "South America",
  océanie: "Oceania",
  oceanie: "Oceania",
  antarctique: "Antarctica",
};

// Fonction utilitaire pour normaliser le texte (enlever les accents, mettre en minuscule)
const normalizeText = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

// Fonction pour trouver les continents dans le texte
const findContinents = (
  searchText: string
): { continents: string[]; remainingText: string } => {
  const normalizedText = normalizeText(searchText);
  const continents: string[] = [];
  let remainingText = searchText;

  // Chercher d'abord les continents composés
  const composedContinents = [
    "amérique du nord",
    "amerique du nord",
    "north america",
    "amérique du sud",
    "amerique du sud",
    "south america",
  ];

  for (const continent of composedContinents) {
    if (normalizedText.includes(normalizeText(continent))) {
      continents.push(CONTINENT_TRANSLATIONS[normalizeText(continent)]);
      remainingText = remainingText.replace(new RegExp(continent, "gi"), "");
    }
  }

  // Chercher ensuite les continents simples
  const singleWordContinents = [
    "europe",
    "asia",
    "africa",
    "oceania",
    "antarctica",
  ];
  for (const continent of singleWordContinents) {
    if (normalizedText.includes(continent)) {
      continents.push(CONTINENT_TRANSLATIONS[continent]);
      remainingText = remainingText.replace(new RegExp(continent, "gi"), "");
    }
  }

  return {
    continents,
    remainingText: remainingText.trim(),
  };
};

// Récupérer tous les pays
export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const { data, error } = await supabase
      .from("countries")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching countries:", error);
      throw error;
    }

    return data || [];
  } catch (err) {
    console.error("Error in fetchCountries:", err);
    throw err;
  }
};

// Récupérer les astuces avec filtres et pagination
export const fetchHints = async (options: {
  countryId?: number;
  tags?: string[];
  searchTerm?: string;
  page?: number;
  pageSize?: number;
  continent?: string[];
}): Promise<{ hints: Hint[]; count: number }> => {
  const requestId = Math.random().toString(36).substring(2, 8);

  try {
    console.log(
      `[${requestId}] Fetching hints with options:`,
      JSON.stringify(options)
    );

    const page = options.page || 0;
    const pageSize = options.pageSize || 10;
    const startIdx = page * pageSize;

    // Construire la requête de base avec une jointure sur countries
    let query = supabase
      .from("hints")
      .select("*, country:countries!inner(*)", { count: "exact" });

    // Appliquer le filtre de continent si présent
    if (options.continent && options.continent.length > 0) {
      console.log(`[${requestId}] Filtering by continents:`, options.continent);
      query = query.in("countries.continent", options.continent);
    }

    if (options.searchTerm) {
      console.log(`[${requestId}] Searching for term:`, options.searchTerm);

      // Trouver les continents et le texte restant
      const { continents, remainingText } = findContinents(options.searchTerm);
      console.log(`[${requestId}] Found continents:`, continents);
      console.log(`[${requestId}] Remaining text:`, remainingText);

      let hintIds: number[] = [];

      // Si nous avons des continents, faire une première recherche
      if (continents.length > 0) {
        const continentQuery = continents
          .map((term) => `${term}:*`)
          .join(" & ");
        console.log(`[${requestId}] Continent search query:`, continentQuery);

        const continentResults = await supabase
          .from("hint_translations")
          .select("hint_id")
          .textSearch("tsvector_fulltext", continentQuery, {
            type: "plain",
            config: "english",
          });

        if (continentResults.data) {
          hintIds = continentResults.data.map((row) => row.hint_id);
        }
      }

      // Si nous avons du texte restant, faire une seconde recherche
      if (remainingText) {
        const otherTerms = remainingText
          .split(/\s+/)
          .filter((term) => term.length > 0);
        if (otherTerms.length > 0) {
          const otherQuery = otherTerms.map((term) => `${term}:*`).join(" & ");
          console.log(`[${requestId}] Text search query:`, otherQuery);

          const textResults = await supabase
            .from("hint_translations")
            .select("hint_id")
            .textSearch("tsvector_fulltext", otherQuery, {
              type: "plain",
              config: "french",
            });

          if (textResults.data) {
            if (hintIds.length > 0) {
              // Intersection des résultats
              const textIds = textResults.data.map((row) => row.hint_id);
              hintIds = hintIds.filter((id) => textIds.includes(id));
            } else {
              hintIds = textResults.data.map((row) => row.hint_id);
            }
          }
        }
      }

      if (hintIds.length > 0) {
        query = query.in("id", hintIds);
      } else {
        return { hints: [], count: 0 };
      }
    }

    // Appliquer les autres filtres
    if (options.countryId) {
      console.log(`[${requestId}] Filtering by country_id:`, options.countryId);
      query = query.eq("country_id", options.countryId);
    }

    if (options.tags && options.tags.length > 0) {
      console.log(`[${requestId}] Filtering by tags:`, options.tags);
      query = query.overlaps("tags", options.tags);
    }

    // Appliquer la pagination
    console.log(
      `[${requestId}] Using pagination: items ${startIdx} to ${
        startIdx + pageSize - 1
      }`
    );
    query = query.range(startIdx, startIdx + pageSize - 1);

    // Exécuter la requête
    const { data, error, count } = await query;

    if (error) {
      console.error(`[${requestId}] Error fetching hints:`, error);
      throw error;
    }

    console.log(
      `[${requestId}] Fetch successful: ${
        data?.length || 0
      } hints, total count: ${count || 0}`
    );

    await delay(100);

    return {
      hints: data || [],
      count: count || 0,
    };
  } catch (err) {
    console.error(`[${requestId}] Error in fetchHints:`, err);
    throw err;
  }
};

// Récupérer les tags uniques
export const fetchTags = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase.from("hints").select("tags");

    if (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }

    // Extraire et aplatir les tags
    const allTags = data
      .filter((item) => item.tags && item.tags.length > 0)
      .flatMap((item) => item.tags);

    // Supprimer les doublons
    return [...new Set(allTags)].sort();
  } catch (err) {
    console.error("Error in fetchTags:", err);
    throw err;
  }
};

// Récupérer une traduction
export const fetchTranslation = async (
  hintId: number,
  language: string
): Promise<HintTranslation | null> => {
  // Génerer un identifiant de requête unique pour suivre les appels en boucle
  const requestId = Math.random().toString(36).substring(2, 8);

  try {
    console.log(
      `[${requestId}] Fetching translation for hint ${hintId} in ${language}`
    );

    // Retourner directement les mocks si la condition est forcée à true
    if (SHOULD_USE_MOCKS) {
      console.log(`[${requestId}] Using mock translation - FORCED`);

      // Ajouter un délai fixe pour éviter les appels en boucle trop rapides
      await delay(300);

      const mockTranslation = getMockTranslation(hintId, language);

      if (mockTranslation) {
        console.log(`[${requestId}] Mock translation found for hint ${hintId}`);
        return mockTranslation;
      } else {
        console.log(
          `[${requestId}] No mock translation found for hint ${hintId}`
        );
      }

      return null;
    }

    // Si on arrive ici, c'est qu'on n'utilise pas les mocks
    const { data, error } = await supabase
      .from("hint_translations")
      .select("*")
      .eq("hint_id", hintId)
      .eq("lang", language)
      .maybeSingle();

    // Si pas d'erreur et données présentes
    if (!error && data) {
      console.log(
        `[${requestId}] Found translation in database for hint ${hintId}`
      );
      return data;
    }

    // Si erreur mais pas PGRST116, c'est une vraie erreur
    if (error && error.code !== "PGRST116") {
      console.error(`[${requestId}] Error fetching translation:`, error);
      throw error;
    }

    // Pas de traduction trouvée
    console.log(
      `[${requestId}] No translation available for hint ${hintId} in ${language}`
    );
    return null;
  } catch (err) {
    console.error(`[${requestId}] Error in fetchTranslation:`, err);
    // Ne pas propager l'erreur, retourner null
    return null;
  }
};
