import { memo } from "react";
import { useTranslationQuery } from "../../hooks/useTranslationQuery";
import type { Hint } from "../../types/database";
import { Card } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../lib/utils";
import { useLanguageContext } from "../../context/LanguageContext";

export interface HintCardProps {
  hint: Hint;
  showLongText?: boolean;
  className?: string;
}

const HintCard = memo(
  ({ hint, showLongText = false, className }: HintCardProps) => {
    const { language } = useLanguageContext();
    const { data: translation, isLoading } = useTranslationQuery(
      hint.id,
      language
    );

    if (isLoading) {
      return (
        <Card className={cn("overflow-hidden", className)}>
          <div className="flex flex-col md:flex-row-reverse">
            <div className="h-48 md:h-full md:w-1/3">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="p-4 md:w-2/3">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </Card>
      );
    }

    if (!translation) {
      return null;
    }

    const displayText = showLongText
      ? translation.long_text
      : translation.short_text;

    return (
      <Card
        className={cn(
          "overflow-hidden group hover:ring-2 hover:ring-purple-20 transition-all h-full",
          className
        )}
      >
        <div className="flex flex-col md:flex-row-reverse h-full">
          {/* Image Section */}
          <div className="h-48 md:h-auto md:w-1/3 relative">
            <img
              src={hint.image_url}
              alt={translation.short_text}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-2 md:left-auto md:right-2 flex items-center text-white">
              {hint.country?.code && (
                <img
                  src={`https://flagcdn.com/${hint.country.code.toLowerCase()}.svg`}
                  alt={`${hint.country.name} flag`}
                  className="w-4 h-3 object-cover mr-2"
                />
              )}
              <span className="font-medium">{hint.country?.name}</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 md:w-2/3 p-4 flex flex-col justify-between">
            <div>
              <p className="text-black mb-4 line-clamp-4">{displayText}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {hint.tags?.map((tag: string, index: number) => (
                <Badge
                  key={index}
                  className="bg-purple-10 text-purple-100 hover:bg-purple-20"
                >
                  {tag}
                </Badge>
              ))}
              {hint.locations?.map((location: string, index: number) => (
                <Badge
                  key={`loc-${index}`}
                  variant="outline"
                  className="border-purple-20 text-purple-100"
                >
                  {location}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  }
);

HintCard.displayName = "HintCard";

export default HintCard;
