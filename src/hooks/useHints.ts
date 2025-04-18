import { useState, useEffect, useCallback, useRef } from "react";
import type { Hint } from "../types/database";
import { fetchHints } from "../services/supabaseService";

type HintFilters = {
  countryId?: number;
  tags?: string[];
  searchTerm?: string;
  page?: number;
  pageSize?: number;
};

// Cache global pour éviter les requêtes répétées
const hintsCache = new Map<string, { hints: Hint[]; count: number }>();
const pendingRequests = new Map<string, boolean>();

// Générer une clé de cache basée sur les filtres
const getCacheKey = (filters: HintFilters): string => {
  return JSON.stringify({
    countryId: filters.countryId,
    tags: filters.tags,
    searchTerm: filters.searchTerm,
    page: filters.page,
    pageSize: filters.pageSize,
  });
};

export const useHints = (initialFilters?: HintFilters) => {
  const [hints, setHints] = useState<Hint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<HintFilters>(initialFilters || {});
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12); // Nombre d'éléments par page

  // Référence pour suivre si un fetch initial a été fait
  const initialFetchDone = useRef<boolean>(false);

  const getHints = useCallback(
    async (currentFilters: HintFilters = filters) => {
      // S'assurer que la pagination est définie
      const paginatedFilters = {
        ...currentFilters,
        page:
          currentFilters.page !== undefined ? currentFilters.page : currentPage,
        pageSize:
          currentFilters.pageSize !== undefined
            ? currentFilters.pageSize
            : pageSize,
      };

      // Générer une clé de cache
      const cacheKey = getCacheKey(paginatedFilters);

      // Vérifier si une requête est déjà en cours pour ces filtres
      if (pendingRequests.get(cacheKey)) {
        return;
      }

      // Vérifier si les données sont déjà en cache
      if (hintsCache.has(cacheKey)) {
        const cachedData = hintsCache.get(cacheKey);
        if (cachedData) {
          setHints(cachedData.hints);
          setTotalCount(cachedData.count);
          setIsLoading(false);
          return;
        }
      }

      try {
        // Marquer cette requête comme en cours
        pendingRequests.set(cacheKey, true);
        setIsLoading(true);
        setError(null);

        console.log(`Fetching hints with filters:`, paginatedFilters);
        const { hints: data, count } = await fetchHints(paginatedFilters);

        // Mettre en cache les résultats
        hintsCache.set(cacheKey, { hints: data, count });

        setHints(data);
        setTotalCount(count);
      } catch (err) {
        console.error("Error fetching hints:", err);
        setError("Failed to fetch hints");
      } finally {
        setIsLoading(false);
        pendingRequests.set(cacheKey, false);
      }
    },
    [filters, currentPage, pageSize]
  );

  // Initial fetch - exécuté une seule fois
  useEffect(() => {
    if (!initialFetchDone.current) {
      getHints();
      initialFetchDone.current = true;
    }
  }, [getHints]);

  // Update filters and fetch new data
  const updateFilters = useCallback(
    (newFilters: Partial<HintFilters>) => {
      // Si nous changeons de filtres, revenons à la première page
      if (
        newFilters.countryId !== undefined ||
        newFilters.tags !== undefined ||
        newFilters.searchTerm !== undefined
      ) {
        setCurrentPage(0);
      }

      const updatedFilters = {
        ...filters,
        ...newFilters,
        page: 0, // Réinitialiser à la première page lors du changement de filtres
      };

      setFilters(updatedFilters);
      getHints(updatedFilters);
    },
    [filters, getHints]
  );

  // Fonction pour changer de page
  const changePage = useCallback(
    (page: number) => {
      if (page === currentPage) return; // Éviter les changements inutiles

      setCurrentPage(page);
      const updatedFilters = { ...filters, page };
      getHints(updatedFilters);
    },
    [filters, getHints, currentPage]
  );

  // Fonction pour changer la taille de page
  const changePageSize = useCallback(
    (size: number) => {
      if (size === pageSize) return; // Éviter les changements inutiles

      setPageSize(size);
      setCurrentPage(0); // Réinitialiser à la première page lors du changement de taille
      const updatedFilters = { ...filters, page: 0, pageSize: size };
      getHints(updatedFilters);
    },
    [filters, getHints, pageSize]
  );

  // Fonction pour forcer un rafraîchissement (vider le cache pour ces filtres)
  const refetch = useCallback(() => {
    const cacheKey = getCacheKey({
      ...filters,
      page: currentPage,
      pageSize: pageSize,
    });
    hintsCache.delete(cacheKey);
    getHints();
  }, [filters, currentPage, pageSize, getHints]);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    hints,
    isLoading,
    error,
    filters,
    updateFilters,
    refetch,
    pagination: {
      currentPage,
      pageSize,
      totalCount,
      totalPages,
      changePage,
      changePageSize,
    },
  };
};

export default useHints;
