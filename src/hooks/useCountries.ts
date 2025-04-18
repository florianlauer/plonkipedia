import { useState, useEffect } from "react";
import type { Country } from "../types/database";
import { fetchCountries } from "../services/supabaseService";

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCountries = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchCountries();
        setCountries(data);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError("Failed to fetch countries");
      } finally {
        setIsLoading(false);
      }
    };

    getCountries();
  }, []);

  return { countries, isLoading, error };
};

export default useCountries;
