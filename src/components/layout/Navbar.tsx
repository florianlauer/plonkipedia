import { Globe, Map } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import { useLanguageContext } from "../../context/LanguageContext";

const translations = {
  title: {
    en: "Plonkipedia",
    fr: "Plonkipédia",
  },
  map: {
    en: "Map View",
    fr: "Vue Carte",
  },
  content: {
    en: "Content View",
    fr: "Vue Contenu",
  },
  toggleLanguage: {
    en: "FR",
    fr: "EN",
  },
};

const Navbar = () => {
  const { language, toggleLanguage } = useLanguageContext();
  const navigate = useNavigate();
  const location = useLocation();

  const t = translations;

  const isMapView = location.pathname === "/map";
  const isContentView =
    location.pathname === "/" || location.pathname === "/content";

  return (
    <header className="bg-white border-b border-geoguessr-grey sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-geoguessr-black">
            {t.title[language]}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <nav className="flex space-x-2">
            <Button
              variant={isContentView ? "primary" : "outline"}
              onClick={() => navigate("/content")}
              className="flex items-center space-x-2"
            >
              <span>{t.content[language]}</span>
            </Button>
            <Button
              variant={isMapView ? "primary" : "outline"}
              onClick={() => navigate("/map")}
              className="flex items-center space-x-2"
            >
              <Map className="h-4 w-4" />
              <span>{t.map[language]}</span>
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center space-x-1"
          >
            <Globe className="h-4 w-4" />
            <span>{t.toggleLanguage[language]}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
