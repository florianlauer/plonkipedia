import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../services/supabaseService";

export const useCountriesQuery = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 60, // Les données restent fraîches pendant 1 heure
  });
};
