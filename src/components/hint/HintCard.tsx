import { ExternalLink, MapPin, Tag } from "lucide-react";
import { Hint } from "../../types/database";
import { useLanguageContext } from "../../context/LanguageContext";
import { useTranslations } from "../../hooks/useTranslations";
import { memo, useMemo } from "react";

const translations = {
  noTranslation: {
    en: "No translation available",
    fr: "Pas de traduction disponible",
  },
  tags: {
    en: "Tags",
    fr: "Tags",
  },
  locations: {
    en: "Locations",
    fr: "Lieux",
  },
  viewOnMap: {
    en: "View on map",
    fr: "Voir sur la carte",
  },
};

type HintCardProps = {
  hint: Hint;
  className?: string;
};

// Utilisation de React.memo avec comparaison personnalisée pour éviter les rendus inutiles
const HintCard = memo(
  ({ hint, className = "" }: HintCardProps) => {
    const { language } = useLanguageContext();
    const { translation, isLoading } = useTranslations(hint.id, language);

    // Memoïser les traductions pour éviter les re-rendus inutiles
    const t = useMemo(() => translations, []);

    // Générer le texte de l'alt de l'image une seule fois
    const imageAlt = useMemo(
      () => `Hint for ${hint.country?.name || "a country"}`,
      [hint.country?.name]
    );

    return (
      <div className={`card ${className}`}>
        <div className="relative">
          <img
            src={hint.image_url}
            alt={imageAlt}
            className="w-full h-48 object-cover"
          />
          {hint.country && (
            <div className="absolute bottom-2 left-2 bg-geoguessr-black/70 text-white px-2 py-1 rounded-lg">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{hint.country.name}</span>
              </div>
            </div>
          )}
          {hint.image_link && (
            <a
              href={hint.image_link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 bg-geoguessr-blue/70 text-white p-1.5 rounded-lg hover:bg-geoguessr-blue/90 transition-colors"
              title={t.viewOnMap[language]}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-2"></div>
          ) : translation?.short_text ? (
            <p className="text-lg mb-2">{translation.short_text}</p>
          ) : (
            <p className="text-sm text-geoguessr-black/50 italic mb-2">
              {t.noTranslation[language]}
            </p>
          )}

          {!isLoading && translation?.long_text && (
            <p className="text-sm text-geoguessr-black/80 mb-4">
              {translation.long_text}
            </p>
          )}

          {hint.tags && hint.tags.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-geoguessr-black/60 mb-1">
                {t.tags[language]}:
              </p>
              <div className="flex flex-wrap gap-1">
                {hint.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-geoguessr-grey text-geoguessr-black/70 px-2 py-0.5 rounded-full text-xs"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {hint.locations && hint.locations.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-geoguessr-black/60 mb-1">
                {t.locations[language]}:
              </p>
              <div className="flex flex-wrap gap-1">
                {hint.locations.map((location, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-geoguessr-purple/20 text-geoguessr-black/70 px-2 py-0.5 rounded-full text-xs"
                  >
                    <MapPin className="h-3 w-3 mr-1" />
                    {location}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
  // Fonction de comparaison pour optimiser les rendus
  (prevProps, nextProps) => {
    // Re-rendre uniquement si l'ID du hint ou le pays a changé
    return (
      prevProps.hint.id === nextProps.hint.id &&
      prevProps.hint.country_id === nextProps.hint.country_id &&
      prevProps.className === nextProps.className
    );
  }
);

// Afficher un nom pour le composant dans les outils de développement
HintCard.displayName = "HintCard";

export default HintCard;
