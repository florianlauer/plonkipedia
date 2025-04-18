import { useState } from "react";
import { useLanguageContext } from "../context/LanguageContext";
import useCountries from "../hooks/useCountries";
import { Country } from "../types/database";

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
  const { countries, isLoading, error } = useCountries();
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
        <h1 className="text-3xl font-bold text-geoguessr-black mb-2">
          {t.title[language]}
        </h1>
        <p className="text-geoguessr-black/70">{t.subtitle[language]}</p>
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
              className="w-full px-4 py-2 border border-geoguessr-grey rounded-lg focus:ring-2 focus:ring-geoguessr-blue focus:border-geoguessr-blue"
            />
          </div>

          <div className="h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-pulse text-geoguessr-black/60">
                  {t.loading[language]}
                </div>
              </div>
            ) : error ? (
              <div className="text-center text-geoguessr-red p-4">
                {t.error[language]}
              </div>
            ) : (
              <ul className="space-y-1">
                {filteredCountries.map((country) => (
                  <li key={country.id}>
                    <button
                      onClick={() => setSelectedCountry(country)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCountry?.id === country.id
                          ? "bg-geoguessr-blue text-white"
                          : "hover:bg-geoguessr-grey/20"
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
              <div className="animate-pulse text-geoguessr-black/60">
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
                  <div className="text-center p-6 bg-geoguessr-black/80 rounded-lg">
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
