import React from "react";
import { useLanguageContext } from "../../context/LanguageContext";

const translations = {
  itemsPerPage: {
    en: "Items per page:",
    fr: "Éléments par page :",
  },
};

type PageSizeSelectorProps = {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  options?: number[];
  className?: string;
};

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  pageSize,
  onPageSizeChange,
  options = [8, 12, 24, 48],
  className = "",
}) => {
  const { language } = useLanguageContext();
  const t = translations;

  return (
    <div className={`flex items-center text-sm ${className}`}>
      <span className="mr-2 text-geoguessr-black/60">
        {t.itemsPerPage[language]}
      </span>
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="py-1 px-2 border rounded-md bg-white border-geoguessr-grey focus:outline-none focus:ring-1 focus:ring-geoguessr-blue"
      >
        {options.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageSizeSelector;
