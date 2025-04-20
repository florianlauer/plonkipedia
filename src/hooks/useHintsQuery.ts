import { useQuery } from "@tanstack/react-query";
import { fetchHints } from "../services/supabaseService";

type Filters = {
  countryId?: number;
  tags?: string[];
  searchTerm?: string;
  page?: number;
  pageSize?: number;
  continent?: string[];
};

export type { Filters as HintFilters };

export const useHintsQuery = (filters: Filters) => {
  const {
    page = 0,
    pageSize = 12,
    countryId,
    tags,
    searchTerm,
    continent,
  } = filters;

  return useQuery({
    queryKey: [
      "hints",
      { page, pageSize, countryId, tags, searchTerm, continent },
    ],
    queryFn: () =>
      fetchHints({ page, pageSize, countryId, tags, searchTerm, continent }),
    placeholderData: (previousData) => previousData, // Keep previous data while fetching new data
  });
};
