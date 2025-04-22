import { useQuery } from "@tanstack/react-query";
import { fetchHints } from "../services/supabaseService";

export type HintFilters = {
  countryId?: number;
  countryIds?: number[];
  tags?: string[];
  searchTerm?: string;
  page?: number;
  pageSize?: number;
  continent?: string[];
};

export const useHintsQuery = (filters: HintFilters) => {
  const {
    page = 0,
    pageSize = 12,
    countryId,
    countryIds,
    tags,
    searchTerm,
    continent,
  } = filters;

  return useQuery({
    queryKey: [
      "hints",
      { page, pageSize, countryId, countryIds, tags, searchTerm, continent },
    ],
    queryFn: () =>
      fetchHints({
        page,
        pageSize,
        countryId,
        countryIds,
        tags,
        searchTerm,
        continent,
      }),
    placeholderData: (previousData) => previousData, // Keep previous data while fetching new data
  });
};
