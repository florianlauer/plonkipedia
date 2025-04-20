import { useState } from "react";
import { useLanguageContext } from "../context/LanguageContext";
import { useCountriesQuery } from "../hooks/useCountriesQuery";
import type { Country } from "../types/database";

const translations = {
  title: {
    en: "World Map",
    fr: "Carte du Monde",
  },
  subtitle: {
    en: "Explore locations by country",
    fr: "Explorez les lieux par pays",
  },
  search: {
    en: "Search a country...",
    fr: "Rechercher un pays...",
  },
  loading: {
    en: "Loading map...",
    fr: "Chargement de la carte...",
  },
  error: {
    en: "Error loading map data",
    fr: "Erreur lors du chargement des données de la carte",
  },
};

const MAP_PLACEHOLDER =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/World_map_with_nations.svg/1920px-World_map_with_nations.svg.png";

const MapView = () => {
  const { language } = useLanguageContext();
  const {
    data: countries = [],
    isLoading,
    error: isError,
    error,
  } = useCountriesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const t = translations;

  const filteredCountries = searchTerm
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : countries;

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-100 mb-2">
          {t.title[language]}
        </h1>
        <p className="text-purple-100/70">{t.subtitle[language]}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-80 bg-white rounded-lg shadow-md p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder={t.search[language]}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-purple-10 rounded-lg focus:ring-2 focus:ring-purple-50 focus:border-purple-50"
            />
          </div>

          <div className="h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-pulse text-purple-100/60">
                  {t.loading[language]}
                </div>
              </div>
            ) : isError ? (
              <div className="text-center text-red-50 p-4">
                <p>{t.error[language]}</p>
                <p className="text-sm mt-2">{error?.message}</p>
              </div>
            ) : (
              <ul className="space-y-1">
                {filteredCountries.map((country) => (
                  <li key={country.id}>
                    <button
                      onClick={() => setSelectedCountry(country)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCountry?.id === country.id
                          ? "bg-purple-50 text-white"
                          : "hover:bg-purple-10/30"
                      }`}
                    >
                      {country.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Map area */}
        <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-pulse text-purple-100/60">
                {t.loading[language]}
              </div>
            </div>
          ) : (
            <div className="relative h-96">
              {/* For a real implementation, you would use a mapping library like Leaflet or MapBox */}
              {/* For now, we'll use a placeholder image */}
              <img
                src={MAP_PLACEHOLDER}
                alt="World Map"
                className="w-full h-full object-cover"
              />

              {/* If a country is selected, we would focus on it */}
              {selectedCountry && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                  <div className="text-center p-6 bg-purple-100/90 rounded-lg">
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedCountry.name}
                    </h2>
                    <p>Code: {selectedCountry.code}</p>
                    <p>
                      Coordinates: {selectedCountry.lat}, {selectedCountry.lng}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;
