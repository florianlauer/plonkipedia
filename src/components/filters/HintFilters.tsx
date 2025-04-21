import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import Button from "../ui/Button";
import { useLanguageContext } from "../../context/LanguageContext";
import { useCountriesQuery } from "../../hooks/useCountriesQuery";
import { useTagsQuery } from "../../hooks/useTagsQuery";

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
  continent: {
    en: "Continent",
    fr: "Continent",
  },
  allCountries: {
    en: "All Countries",
    fr: "Tous les pays",
  },
  allContinents: {
    en: "All Continents",
    fr: "Tous les continents",
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

const continents = {
  "North America": {
    en: "North America",
    fr: "Amérique du Nord",
  },
  "South America": {
    en: "South America",
    fr: "Amérique du Sud",
  },
  Europe: {
    en: "Europe",
    fr: "Europe",
  },
  Asia: {
    en: "Asia",
    fr: "Asie",
  },
  Africa: {
    en: "Africa",
    fr: "Afrique",
  },
  Oceania: {
    en: "Oceania",
    fr: "Océanie",
  },
  Antarctica: {
    en: "Antarctica",
    fr: "Antarctique",
  },
};

type HintFiltersProps = {
  onFilterChange: (filters: {
    searchTerm?: string;
    countryId?: number;
    tags?: string[];
    continent?: string[];
  }) => void;
  className?: string;
};

const HintFilters = ({ onFilterChange, className = "" }: HintFiltersProps) => {
  const { language } = useLanguageContext();
  const { data: countries = [] } = useCountriesQuery();
  const { data: allTags = [] } = useTagsQuery();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCountryId, setSelectedCountryId] = useState<
    number | undefined
  >(undefined);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const t = translations;

  // Apply filters when they change
  useEffect(() => {
    const debouncedFilterChange = setTimeout(() => {
      onFilterChange({
        searchTerm: searchTerm || undefined,
        countryId: selectedCountryId,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        continent:
          selectedContinents.length > 0 ? selectedContinents : undefined,
      });
    }, 300);

    return () => clearTimeout(debouncedFilterChange);
  }, [
    searchTerm,
    selectedCountryId,
    selectedTags,
    selectedContinents,
    onFilterChange,
  ]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCountryId(undefined);
    setSelectedTags([]);
    setSelectedContinents([]);
    setShowFilters(false);
  };

  const handleContinentToggle = (continent: string) => {
    setSelectedContinents((prev) =>
      prev.includes(continent)
        ? prev.filter((c) => c !== continent)
        : [...prev, continent]
    );
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  return (
    <div className={`bg-purple-10 rounded-lg shadow-md p-4 ${className}`}>
      <div className="flex flex-col space-y-4">
        {/* Search input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-purple-100/40" />
          </div>
          <input
            type="text"
            placeholder={t.search[language]}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-purple-20 rounded-lg focus:ring-2 focus:ring-purple-50 focus:border-purple-50"
          />
        </div>

        {/* Filter toggle */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-purple-80 text-purple-10 hover:bg-purple-100/70"
          >
            <Filter className="h-4 w-4" />
            <span>{t.filters[language]}</span>
          </Button>

          {(selectedCountryId ||
            selectedTags.length > 0 ||
            selectedContinents.length > 0) && (
            <Button
              className="bg-purple-80 text-purple-10 hover:bg-purple-100/70"
              size="sm"
              onClick={handleResetFilters}
            >
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
                className="inline-flex items-center bg-purple-50/10 text-purple-80 px-2 py-1 rounded-md text-sm"
              >
                <span>{tag}</span>
                <button
                  onClick={() => handleTagToggle(tag)}
                  className="ml-1 text-purple-50/60 hover:text-purple-50"
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
          <div className="space-y-4 pt-4 border-t border-purple-20/50">
            {/* Continent filter */}
            <div>
              <label className="block text-lg font-extrabold italic text-red-logo mb-1">
                {t.continent[language]}
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(continents).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handleContinentToggle(key)}
                    className={`px-3 py-1.5 rounded-full text-sm italic font-extrabold transition-colors ${
                      selectedContinents.includes(key)
                        ? "bg-purple-50 text-white"
                        : "bg-purple-20 text-purple-100/80 hover:bg-purple-20/70"
                    }`}
                  >
                    {/* uppercase continent name */}
                    {value[language].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Country filter */}
            <div>
              <label className="block text-lg font-extrabold italic text-red-logo mb-1">
                {t.country[language]}
              </label>
              <select
                value={selectedCountryId || ""}
                onChange={(e) =>
                  setSelectedCountryId(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="w-full border border-purple-20 rounded-lg p-2 focus:ring-2 focus:ring-purple-50 focus:border-purple-50"
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
              <label className="block text-lg font-extrabold italic text-red-logo mb-1">
                {t.tags[language]}
              </label>
              <div className="max-h-48 overflow-y-auto p-2 border border-purple-20 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-2 py-1 rounded-md text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? "bg-purple-50 text-white"
                          : "bg-purple-20 hover:bg-purple-20/70"
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
