import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import Button from "../ui/Button";
import { useLanguageContext } from "../../context/LanguageContext";
import useCountries from "../../hooks/useCountries";
import useTags from "../../hooks/useTags";

const translations = {
  search: {
    en: "Search hints...",
    fr: "Rechercher des astuces...",
  },
  filters: {
    en: "Filters",
    fr: "Filtres",
  },
  apply: {
    en: "Apply",
    fr: "Appliquer",
  },
  reset: {
    en: "Reset",
    fr: "Réinitialiser",
  },
  country: {
    en: "Country",
    fr: "Pays",
  },
  allCountries: {
    en: "All Countries",
    fr: "Tous les pays",
  },
  tags: {
    en: "Tags",
    fr: "Tags",
  },
  selectedTags: {
    en: "Selected Tags",
    fr: "Tags sélectionnés",
  },
  clearTag: {
    en: "Clear tag",
    fr: "Supprimer le tag",
  },
};

type HintFiltersProps = {
  onFilterChange: (filters: {
    searchTerm?: string;
    countryId?: number;
    tags?: string[];
  }) => void;
  className?: string;
};

const HintFilters = ({ onFilterChange, className = "" }: HintFiltersProps) => {
  const { language } = useLanguageContext();
  const { countries } = useCountries();
  const { tags: allTags } = useTags();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCountryId, setSelectedCountryId] = useState<
    number | undefined
  >(undefined);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const t = translations;

  // Apply filters when they change
  useEffect(() => {
    const debouncedFilterChange = setTimeout(() => {
      onFilterChange({
        searchTerm: searchTerm || undefined,
        countryId: selectedCountryId,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
      });
    }, 300);

    return () => clearTimeout(debouncedFilterChange);
  }, [searchTerm, selectedCountryId, selectedTags, onFilterChange]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCountryId(undefined);
    setSelectedTags([]);
    setShowFilters(false);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div className="flex flex-col space-y-4">
        {/* Search input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-geoguessr-black/40" />
          </div>
          <input
            type="text"
            placeholder={t.search[language]}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-geoguessr-grey rounded-lg focus:ring-2 focus:ring-geoguessr-blue focus:border-geoguessr-blue"
          />
        </div>

        {/* Filter toggle */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>{t.filters[language]}</span>
          </Button>

          {(selectedCountryId || selectedTags.length > 0) && (
            <Button variant="ghost" size="sm" onClick={handleResetFilters}>
              {t.reset[language]}
            </Button>
          )}
        </div>

        {/* Selected tags display */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center bg-geoguessr-blue/10 text-geoguessr-blue px-2 py-1 rounded-md text-sm"
              >
                <span>{tag}</span>
                <button
                  onClick={() => handleTagToggle(tag)}
                  className="ml-1 text-geoguessr-blue/60 hover:text-geoguessr-blue"
                  title={t.clearTag[language]}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Expanded filters */}
        {showFilters && (
          <div className="space-y-4 pt-4 border-t border-geoguessr-grey/50">
            {/* Country filter */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.country[language]}
              </label>
              <select
                value={selectedCountryId || ""}
                onChange={(e) =>
                  setSelectedCountryId(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="w-full border border-geoguessr-grey rounded-lg p-2 focus:ring-2 focus:ring-geoguessr-blue focus:border-geoguessr-blue"
              >
                <option value="">{t.allCountries[language]}</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tag filters */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.tags[language]}
              </label>
              <div className="max-h-48 overflow-y-auto p-2 border border-geoguessr-grey rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-2 py-1 rounded-md text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? "bg-geoguessr-blue text-white"
                          : "bg-geoguessr-grey hover:bg-geoguessr-grey/70"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HintFilters;
