import { AlertTriangle, Info } from "lucide-react";
import HintCard from "../components/hint/HintCard";
import HintFilters from "../components/filters/HintFilters";
import useHints from "../hooks/useHints";
import { useLanguageContext } from "../context/LanguageContext";
import Pagination from "../components/ui/Pagination";
import PageSizeSelector from "../components/ui/PageSizeSelector";
import { memo, useMemo, useCallback } from "react";
import type { Hint } from "../types/database";

const translations = {
  title: {
    en: "GeoGuessr Hints",
    fr: "Astuces GeoGuessr",
  },
  subtitle: {
    en: "Find helpful hints for identifying locations in GeoGuessr",
    fr: "Trouvez des astuces utiles pour identifier les lieux dans GeoGuessr",
  },
  loading: {
    en: "Loading hints...",
    fr: "Chargement des astuces...",
  },
  error: {
    en: "Error loading hints",
    fr: "Erreur lors du chargement des astuces",
  },
  noResults: {
    en: "No hints found matching your filters",
    fr: "Aucune astuce trouvée correspondant à vos filtres",
  },
  tryOtherFilters: {
    en: "Try changing your search or filters",
    fr: "Essayez de modifier votre recherche ou vos filtres",
  },
  results: {
    en: "Showing {start}-{end} of {total} results",
    fr: "Affichage de {start}-{end} sur {total} résultats",
  },
};

// Interface pour les props du composant HintGrid
interface HintGridProps {
  hints: Hint[];
}

// Composant memoïsé pour afficher une grille d'astuces
const HintGrid = memo(({ hints }: HintGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {hints.map((hint: Hint) => (
      <HintCard key={hint.id} hint={hint} />
    ))}
  </div>
));

HintGrid.displayName = "HintGrid";

const ContentView = () => {
  const { language } = useLanguageContext();
  const { hints, isLoading, error, updateFilters, pagination } = useHints();
  const {
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    changePage,
    changePageSize,
  } = pagination;

  // Memoïser les traductions pour éviter les re-rendus inutiles
  const t = useMemo(() => translations, []);

  const handleFilterChange = useCallback(
    (filters: { searchTerm?: string; countryId?: number; tags?: string[] }) => {
      updateFilters(filters);
    },
    [updateFilters]
  );

  // Calculer les informations sur les résultats actuels
  const startItem = totalCount === 0 ? 0 : currentPage * pageSize + 1;
  const endItem = Math.min(startItem + pageSize - 1, totalCount);

  // Formater le texte des résultats
  const resultsText = useMemo(() => {
    return t.results[language]
      .replace("{start}", startItem.toString())
      .replace("{end}", endItem.toString())
      .replace("{total}", totalCount.toString());
  }, [t, language, startItem, endItem, totalCount]);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrablack text-purple-100 mb-2 italic">
            {t.title[language]}
          </h1>
          <p className="text-purple-100/70">{t.subtitle[language]}</p>
        </div>

        <HintFilters onFilterChange={handleFilterChange} className="mb-8" />

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-purple-100/60">
              {t.loading[language]}
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="flex flex-col items-center text-red-50">
              <AlertTriangle className="h-12 w-12 mb-4" />
              <p>{t.error[language]}</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
          </div>
        ) : hints.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-purple-10 rounded-xl">
            <p className="text-xl font-medium text-purple-100/60 mb-2">
              {t.noResults[language]}
            </p>
            <p className="text-purple-100/40">{t.tryOtherFilters[language]}</p>
          </div>
        ) : (
          <>
            {/* Résultats et contrôles de pagination */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-purple-100/60 flex items-center">
                <Info className="h-4 w-4 mr-1" />
                {resultsText}
              </div>
              <PageSizeSelector
                pageSize={pageSize}
                onPageSizeChange={changePageSize}
              />
            </div>

            {/* Grille d'astuces memoïsée */}
            <HintGrid hints={hints} />

            {/* Pagination en bas */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={changePage}
              className="mt-8"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ContentView;
