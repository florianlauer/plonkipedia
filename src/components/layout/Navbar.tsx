import { Globe, Map } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import { useLanguageContext } from "../../context/LanguageContext";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_pin.png";

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
    <header className="bg-white border-b border-purple-10 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Plonkipedia" className="w-7 h-7" />
          <span className="text-2xl text-red-logo italic font-extrablack">
            {t.title[language]}
          </span>
        </Link>

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
