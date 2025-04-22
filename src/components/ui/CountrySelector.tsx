import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import Button from "./Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea } from "./scroll-area";
import { useLanguageContext } from "@/context/LanguageContext";
import type { Country } from "@/types/database";
import { cn } from "@/lib/utils";

const translations = {
  search: {
    en: "Search countries...",
    fr: "Rechercher des pays...",
  },
  noResults: {
    en: "No country found.",
    fr: "Aucun pays trouvé.",
  },
  selectedCountries: {
    en: "Selected countries",
    fr: "Pays sélectionnés",
  },
  selectCountries: {
    en: "Select countries...",
    fr: "Sélectionner des pays...",
  },
};

interface CountrySelectorProps {
  countries: Country[];
  selectedCountries: Country[];
  onSelectionChange: (countries: Country[]) => void;
  className?: string;
}

export function CountrySelector({
  countries,
  selectedCountries,
  onSelectionChange,
  className,
}: CountrySelectorProps) {
  const { language } = useLanguageContext();
  const [open, setOpen] = React.useState(false);

  const toggleCountry = (country: Country) => {
    const isSelected = selectedCountries.some((c) => c.id === country.id);
    if (isSelected) {
      onSelectionChange(selectedCountries.filter((c) => c.id !== country.id));
    } else {
      onSelectionChange([...selectedCountries, country]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-left font-normal bg-white border-purple-20",
            !selectedCountries.length && "text-purple-100/60",
            className
          )}
        >
          {selectedCountries.length > 0
            ? `${selectedCountries.length} ${translations.selectedCountries[language]}`
            : translations.selectCountries[language]}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-white border border-purple-20">
        <Command className="bg-white">
          <CommandInput
            placeholder={translations.search[language]}
            className="h-9 border-none bg-white"
          />
          <CommandEmpty className="py-2 text-center text-sm text-purple-100/60">
            {translations.noResults[language]}
          </CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-64">
              {countries.map((country) => (
                <CommandItem
                  key={country.id}
                  onSelect={() => toggleCountry(country)}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-purple-20/10 aria-selected:bg-purple-20/20"
                >
                  <img
                    src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                    alt={`${country.name} flag`}
                    className="w-4 h-3 object-cover"
                  />
                  <span className="text-purple-100">{country.name}</span>
                  {selectedCountries.some((c) => c.id === country.id) && (
                    <Check className="ml-auto h-4 w-4 text-purple-50" />
                  )}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
