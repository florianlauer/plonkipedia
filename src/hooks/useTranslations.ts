import { useState, useEffect, useCallback, useRef } from "react";
import type { HintTranslation, Language } from "../types/database";
import { fetchTranslation } from "../services/supabaseService";

// Cache global pour partager les traductions entre les instances du hook
const globalTranslationCache = new Map<string, HintTranslation | null>();
const pendingRequests = new Map<string, boolean>();

export const useTranslations = (hintId?: number, language: Language = "en") => {
  const [translation, setTranslation] = useState<HintTranslation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Conserver la dernière combinaison d'ID/langue fetchée
  const lastFetchRef = useRef<{ hintId?: number; language: Language }>({
    hintId: undefined,
    language: "en",
  });

  // Clé de cache pour cette combinaison
  const getCacheKey = useCallback(() => {
    return hintId ? `${hintId}-${language}` : "";
  }, [hintId, language]);

  const getTranslation = useCallback(async () => {
    // Si pas d'ID, on retourne null
    if (!hintId) {
      setTranslation(null);
      setIsLoading(false);
      return;
    }

    const cacheKey = getCacheKey();

    // Si on a déjà une traduction en cache (même null), l'utiliser
    if (globalTranslationCache.has(cacheKey)) {
      const cachedTranslation = globalTranslationCache.get(cacheKey);
      setTranslation(cachedTranslation || null);
      setIsLoading(false);

      // Enregistrer qu'on a fetchée cette combinaison
      lastFetchRef.current = { hintId, language };
      return;
    }

    // Si une requête est déjà en cours pour cette combinaison, ne pas en lancer une autre
    if (pendingRequests.get(cacheKey)) {
      return;
    }

    try {
      // Marquer comme en cours
      pendingRequests.set(cacheKey, true);
      setIsLoading(true);
      setError(null);

      console.log(`Fetching translation for hint ${hintId} in ${language}`);
      const data = await fetchTranslation(hintId, language);

      // Mettre en cache (même si null)
      globalTranslationCache.set(cacheKey, data);
      setTranslation(data);

      // Enregistrer qu'on a fetchée cette combinaison
      lastFetchRef.current = { hintId, language };
    } catch (err) {
      console.error("Error in useTranslations hook:", err);
      setError("Failed to fetch translation");

      // Mettre null en cache en cas d'erreur
      globalTranslationCache.set(cacheKey, null);
    } finally {
      setIsLoading(false);
      pendingRequests.set(cacheKey, false);
    }
  }, [hintId, language, getCacheKey]);

  useEffect(() => {
    // Vérifier si la combinaison ID/langue a changé depuis la dernière fois
    const hasFetchedBefore =
      lastFetchRef.current.hintId === hintId &&
      lastFetchRef.current.language === language;

    // Si on n'a pas déjà récupéré cette traduction, la récupérer
    if (!hasFetchedBefore) {
      getTranslation();
    } else {
      // Sinon, utiliser le cache directement
      const cacheKey = getCacheKey();
      if (globalTranslationCache.has(cacheKey)) {
        const cachedValue = globalTranslationCache.get(cacheKey);
        // Ajouter la vérification null pour éviter le type undefined
        setTranslation(cachedValue !== undefined ? cachedValue : null);
      }
    }
  }, [hintId, language, getTranslation, getCacheKey]);

  // Fonction pour forcer le rafraîchissement (vider le cache)
  const refetch = useCallback(() => {
    if (hintId) {
      const cacheKey = getCacheKey();
      globalTranslationCache.delete(cacheKey);
      lastFetchRef.current = { hintId: undefined, language: "en" };
      getTranslation();
    }
  }, [getCacheKey, getTranslation, hintId]);

  return {
    translation,
    isLoading,
    error,
    refetch,
  };
};

// Helper hook to manage current language
export const useLanguage = (initialLanguage: Language = "en") => {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "fr" : "en"));
  }, []);

  return { language, setLanguage, toggleLanguage };
};

export default useTranslations;
