import { AlertTriangle, Info } from "lucide-react";
import HintCard from "../components/hint/HintCard";
import HintFiltersComponent from "../components/filters/HintFilters";
import { useHintsQuery } from "../hooks/useHintsQuery";
import type { HintFilters } from "../hooks/useHintsQuery";
import { useLanguageContext } from "../context/LanguageContext";
import Pagination from "../components/ui/Pagination";
import PageSizeSelector from "../components/ui/PageSizeSelector";
import { memo, useMemo, useCallback, useState } from "react";
import type { Hint } from "../types/database";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";

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
  viewMode: {
    short: {
      en: "Short View",
      fr: "Vue Courte",
    },
    long: {
      en: "Long View",
      fr: "Vue Détaillée",
    },
  },
};

// Interface pour les props du composant HintGrid
interface HintGridProps {
  hints: Hint[];
}

// Composant memoïsé pour afficher une grille d'astuces
const HintGrid = memo(
  ({ hints, showLongText }: HintGridProps & { showLongText: boolean }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {hints.map((hint: Hint) => (
        <HintCard key={hint.id} hint={hint} showLongText={showLongText} />
      ))}
    </div>
  )
);

HintGrid.displayName = "HintGrid";

const ContentView = () => {
  const { language } = useLanguageContext();
  const [filters, setFilters] = useState<HintFilters>({
    page: 0,
    pageSize: 12,
  });
  const [showLongText, setShowLongText] = useState(false);

  const { data, isLoading, error, isError } = useHintsQuery(filters);

  const hints = data?.hints ?? [];
  const totalCount = data?.count ?? 0;
  const totalPages = Math.ceil(totalCount / (filters.pageSize ?? 12));

  // Memoïser les traductions pour éviter les re-rendus inutiles
  const t = useMemo(() => translations, []);

  const handleFilterChange = useCallback((newFilters: Partial<HintFilters>) => {
    setFilters((prev: HintFilters) => ({
      ...prev,
      ...newFilters,
      page: 0, // Reset to first page when filters change
    }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev: HintFilters) => ({ ...prev, page }));
  }, []);

  const handlePageSizeChange = useCallback((pageSize: number) => {
    setFilters((prev: HintFilters) => ({ ...prev, pageSize, page: 0 }));
  }, []);

  // Calculer les informations sur les résultats actuels
  const startItem =
    totalCount === 0 ? 0 : (filters.page ?? 0) * (filters.pageSize ?? 12) + 1;
  const endItem = Math.min(
    startItem + (filters.pageSize ?? 12) - 1,
    totalCount
  );

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
          <h1 className="text-5xl font-extrablack text-white mb-2 italic [text-shadow:_3px_3px_0_#CC302E,_-3px_-3px_0_#CC302E,_3px_-3px_0_#CC302E,_-3px_3px_0_#CC302E]">
            {t.title[language]}
          </h1>
          <p className="text-purple-10">{t.subtitle[language]}</p>
        </div>

        <HintFiltersComponent
          onFilterChange={handleFilterChange}
          className="mb-8"
        />

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-purple-10">
              {t.loading[language]}
            </div>
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <div className="flex flex-col items-center text-red-50">
              <AlertTriangle className="h-12 w-12 mb-4" />
              <p>{t.error[language]}</p>
              <p className="text-sm mt-2">{error?.message}</p>
            </div>
          </div>
        ) : hints.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-purple-10 rounded-xl">
            <p className="text-xl font-medium text-purple-10 mb-2">
              {t.noResults[language]}
            </p>
            <p className="text-purple-10">{t.tryOtherFilters[language]}</p>
          </div>
        ) : (
          <>
            {/* Résultats et contrôles */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
              <div className="flex items-center space-x-2 text-sm text-purple-10">
                <Info className="h-4 w-4" />
                <span>{resultsText}</span>
              </div>

              <div className="flex items-center justify-end space-x-8">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="view-mode"
                    checked={showLongText}
                    onCheckedChange={setShowLongText}
                    className="data-[state=checked]:bg-purple-50"
                  />
                  <Label htmlFor="view-mode" className="text-purple-10">
                    {showLongText
                      ? t.viewMode.long[language]
                      : t.viewMode.short[language]}
                  </Label>
                </div>

                <PageSizeSelector
                  pageSize={filters.pageSize ?? 12}
                  onPageSizeChange={handlePageSizeChange}
                />
              </div>
            </div>

            {/* Grille d'astuces memoïsée */}
            <HintGrid hints={hints} showLongText={showLongText} />

            {/* Pagination en bas */}
            <Pagination
              currentPage={filters.page ?? 0}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-8 text-purple-10"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ContentView;
