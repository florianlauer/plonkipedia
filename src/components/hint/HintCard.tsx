import { memo } from "react";
import { useTranslationQuery } from "../../hooks/useTranslationQuery";
import type { Hint } from "../../types/database";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../lib/utils";
import { Globe2 } from "lucide-react";
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
          <CardHeader className="p-0">
            <Skeleton className="w-full h-48" />
          </CardHeader>
          <CardContent className="p-4">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
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
          "overflow-hidden group hover:ring-2 hover:ring-purple-20 transition-all",
          className
        )}
      >
        <CardHeader className="p-0 relative">
          <img
            src={hint.image_url}
            alt={translation.short_text}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-2 flex items-center text-white">
            <Globe2 className="w-4 h-4 mr-1" />
            <span className="font-medium">{hint.country?.name}</span>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-purple-10 mb-4">{displayText}</p>
          <div className="flex flex-wrap gap-2">
            {hint.tags?.map((tag: string, index: number) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-purple-20/10 text-purple-10 border-purple-20"
              >
                {tag}
              </Badge>
            ))}
            {hint.locations?.map((location: string, index: number) => (
              <Badge
                key={`loc-${index}`}
                variant="outline"
                className="bg-purple-20/10 text-purple-10 border-purple-20"
              >
                {location}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
);

HintCard.displayName = "HintCard";

export default HintCard;
