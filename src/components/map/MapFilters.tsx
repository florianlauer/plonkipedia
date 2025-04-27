import { useLanguageContext } from "../../context/LanguageContext";
import type { HintFilters } from "../../hooks/useHintsQuery";
import { CountrySelector } from "../ui/CountrySelector";
import { useCountriesQuery } from "../../hooks/useCountriesQuery";
import { ScrollArea } from "../ui/scroll-area";

const translations = {
  title: {
    en: "Map Filters",
    fr: "Filtres de la carte",
  },
  countries: {
    en: "Countries",
    fr: "Pays",
  },
  loading: {
    en: "Loading filters...",
    fr: "Chargement des filtres...",
  },
  error: {
    en: "Error loading filters",
    fr: "Erreur lors du chargement des filtres",
  },
};

interface MapFiltersProps {
  onFilterChange: (filters: Partial<HintFilters>) => void;
}

const MapFilters = ({ onFilterChange }: MapFiltersProps) => {
  const { language } = useLanguageContext();
  const { data: countries = [], isLoading, error } = useCountriesQuery();
  const t = translations;

  if (isLoading) {
    return (
      <div className="p-4 text-center text-purple-100/60">
        {t.loading[language]}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-50">
        <p>{t.error[language]}</p>
        <p className="text-sm mt-2">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        <div className="space-y-6 p-4">
          <div>
            <h2 className="text-xl font-bold text-purple-100 mb-4">
              {t.title[language]}
            </h2>
          </div>

          <div>
            <h3 className="text-sm font-medium text-purple-100/70 mb-2">
              {t.countries[language]}
            </h3>
            <CountrySelector
              countries={countries}
              selectedCountries={[]}
              onSelectionChange={(selectedCountries) => {
                onFilterChange({
                  countryIds: selectedCountries.map((country) => country.id),
                });
              }}
            />
          </div>

          {/* Ajoutez d'autres filtres ici au besoin */}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MapFilters;
