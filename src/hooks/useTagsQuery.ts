import { useQuery } from "@tanstack/react-query";
import { fetchTags } from "../services/supabaseService";

export const useTagsQuery = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 30, // Les données restent fraîches pendant 30 minutes
  });
};
