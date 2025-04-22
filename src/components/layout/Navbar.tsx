import { Globe, Map } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import { useLanguageContext } from "../../context/LanguageContext";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_pin.png";

const translations = {
  title: {
    en: "Plonkipedia",
    fr: "Plonkipedia",
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
    <header className="bg-purple-100 border-b-2 border-purple-20/25 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Plonkipedia" className="w-8 h-8" />
          <span className="text-3xl text-white italic font-extrablack [text-shadow:_3px_3px_0_#CC302E,_-3px_-3px_0_#CC302E,_3px_-3px_0_#CC302E,_-3px_3px_0_#CC302E]">
            {t.title[language]}
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <nav className="flex space-x-2">
            <Button
              className={`flex items-center space-x-2 ${
                isContentView
                  ? "bg-purple-80 text-purple-10"
                  : "bg-purple-20 text-purple-100/80 hover:bg-purple-20/70"
              }`}
              onClick={() => navigate("/content")}
            >
              <span>{t.content[language]}</span>
            </Button>
            <Button
              className={`flex items-center space-x-2 ${
                isMapView
                  ? "bg-purple-80 text-purple-10"
                  : "bg-purple-20 text-purple-100/80 hover:bg-purple-20/70"
              }`}
              onClick={() => navigate("/map")}
            >
              <Map className="h-4 w-4" />
              <span>{t.map[language]}</span>
            </Button>
          </nav>

          <Button
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center space-x-1 bg-purple-80 text-purple-10 hover:bg-purple-100/70"
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
