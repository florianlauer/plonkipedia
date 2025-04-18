import { useState, useEffect } from "react";
import type { Tag } from "../types/database";
import { fetchTags } from "../services/supabaseService";

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTags = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const tagsList = await fetchTags();
        setTags(tagsList);
      } catch (err) {
        console.error("Error fetching tags:", err);
        setError("Failed to fetch tags");
      } finally {
        setIsLoading(false);
      }
    };

    getTags();
  }, []);

  return { tags, isLoading, error };
};

export default useTags;
