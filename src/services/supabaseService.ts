import supabase from "../lib/supabase";
import type { Country, Hint, HintTranslation } from "../types/database";
import { getMockTranslation } from "../mocks/translations";
import { delay } from "../utils/env";

// Variable pour contrôler l'utilisation des mocks
// Forcer l'utilisation des mocks pour le moment
const SHOULD_USE_MOCKS = false; // Forcer à true au lieu de useMocks

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

    // Construire la requête de base avec jointure sur hint_translations si nécessaire
    let query = supabase
      .from("hints")
      .select("*, country:countries(*)", { count: "exact" });

    // Si on a un terme de recherche, on fait la jointure avec hint_translations
    if (options.searchTerm) {
      console.log(`[${requestId}] Searching for term:`, options.searchTerm);

      // Convertir le terme de recherche en format tsquery
      // On remplace les espaces par & pour une recherche AND
      // et on ajoute :* à chaque mot pour la recherche partielle
      const searchQuery = options.searchTerm
        .trim()
        .split(/\s+/)
        .map((term) => `${term}:*`)
        .join(" & ");

      const hintIds = await supabase
        .from("hint_translations")
        .select("hint_id")
        .textSearch("tsvector_fulltext", searchQuery, {
          type: "plain",
          config: "french",
        })
        .then(({ data }) => data?.map((row) => row.hint_id) || []);

      query = supabase
        .from("hints")
        .select("*, country:countries(*)", { count: "exact" })
        .in("id", hintIds);
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
