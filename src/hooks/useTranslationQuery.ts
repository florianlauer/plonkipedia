import { useQuery } from "@tanstack/react-query";
import type { Language } from "../types/database";
import { fetchTranslation } from "../services/supabaseService";

export const useTranslationQuery = (
  hintId?: number,
  language: Language = "en"
) => {
  return useQuery({
    queryKey: ["translation", hintId, language],
    queryFn: () => {
      if (!hintId) return null;
      return fetchTranslation(hintId, language);
    },
    enabled: !!hintId,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};
