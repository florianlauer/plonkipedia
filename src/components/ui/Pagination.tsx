import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) => {
  // Si nous n'avons qu'une seule page, ne pas afficher la pagination
  if (totalPages <= 1) {
    return null;
  }

  // Fonction pour générer les numéros de page à afficher
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Nombre maximum de pages à afficher

    if (totalPages <= maxPagesToShow) {
      // Si le nombre total de pages est inférieur ou égal au nombre maximum à afficher,
      // afficher toutes les pages
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Sinon, afficher les pages autour de la page courante
      let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages - 1);

      // Ajuster la page de départ si nécessaire
      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(0, endPage - maxPagesToShow + 1);
      }

      // Ajouter les pages à afficher
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Ajouter des ellipses au début si nécessaire
      if (startPage > 0) {
        pageNumbers.unshift(-1); // -1 représente les ellipses
        pageNumbers.unshift(0); // Toujours afficher la première page
      }

      // Ajouter des ellipses à la fin si nécessaire
      if (endPage < totalPages - 1) {
        pageNumbers.push(-2); // -2 représente aussi les ellipses (pour les différencier)
        pageNumbers.push(totalPages - 1); // Toujours afficher la dernière page
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      className={`flex items-center justify-center space-x-2 mt-4 ${className}`}
    >
      {/* Bouton précédent */}
      <button
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        className={`p-2 rounded-md ${
          currentPage === 0
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-purple-10/30"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Numéros de page */}
      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === -1 || pageNumber === -2) {
          // Afficher les ellipses
          return (
            <span key={`ellipsis-${index}`} className="px-3 py-2">
              ...
            </span>
          );
        }

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-3 py-1 rounded-md  ${
              currentPage === pageNumber
                ? "bg-purple-50 text-white"
                : "hover:bg-purple-10/30 hover:text-purple-10"
            }`}
            aria-current={currentPage === pageNumber ? "page" : undefined}
          >
            {pageNumber + 1}
          </button>
        );
      })}

      {/* Bouton suivant */}
      <button
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage === totalPages - 1}
        className={`p-2 rounded-md ${
          currentPage === totalPages - 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-purple-10/30"
        }`}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
