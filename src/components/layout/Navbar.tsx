import { Globe, Map, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import { useLanguageContext } from "../../context/LanguageContext";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_pin.png";
import { useState } from "react";

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
  menu: {
    en: "Menu",
    fr: "Menu",
  },
  closeMenu: {
    en: "Close menu",
    fr: "Fermer le menu",
  },
};

const Navbar = () => {
  const { language, toggleLanguage } = useLanguageContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = translations;

  const isMapView = location.pathname === "/map";
  const isContentView =
    location.pathname === "/" || location.pathname === "/content";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-purple-100 border-b-2 border-purple-20/25 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop and Mobile Header */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 z-50">
            <img src={logo} alt="Plonkipedia" className="w-8 h-10" />
            <span className="text-2xl md:text-3xl text-white italic font-extrablack [text-shadow:_3px_3px_0_#CC302E,_-3px_-3px_0_#CC302E,_3px_-3px_0_#CC302E,_-3px_3px_0_#CC302E]">
              {t.title[language]}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-2">
              <Button
                className={`flex items-center space-x-2 ${
                  isContentView
                    ? "bg-purple-80 text-purple-10"
                    : "bg-purple-20 text-purple-100/80 hover:bg-purple-20/70"
                }`}
                onClick={() => handleNavigation("/content")}
              >
                <span>{t.content[language]}</span>
              </Button>
              <Button
                className={`flex items-center space-x-2 ${
                  isMapView
                    ? "bg-purple-80 text-purple-10"
                    : "bg-purple-20 text-purple-100/80 hover:bg-purple-20/70"
                }`}
                onClick={() => handleNavigation("/map")}
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

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-white hover:text-purple-20 transition-colors"
            aria-label={t.menu[language]}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`fixed inset-0 bg-purple-100 z-40 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          {/* Close button */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 p-2 text-white hover:text-purple-20 transition-colors"
            aria-label={t.closeMenu[language]}
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex flex-col items-center justify-center h-full space-y-6 pt-16">
            <Button
              className={`w-48 flex items-center justify-center space-x-2 ${
                isContentView
                  ? "bg-purple-80 text-purple-10"
                  : "bg-purple-20 text-purple-100/80 hover:bg-purple-20/70"
              }`}
              onClick={() => handleNavigation("/content")}
            >
              <span>{t.content[language]}</span>
            </Button>
            <Button
              className={`w-48 flex items-center justify-center space-x-2 ${
                isMapView
                  ? "bg-purple-80 text-purple-10"
                  : "bg-purple-20 text-purple-100/80 hover:bg-purple-20/70"
              }`}
              onClick={() => handleNavigation("/map")}
            >
              <Map className="h-4 w-4" />
              <span>{t.map[language]}</span>
            </Button>
            <Button
              size="sm"
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }}
              className="w-48 flex items-center justify-center space-x-1 bg-purple-80 text-purple-10 hover:bg-purple-100/70"
            >
              <Globe className="h-4 w-4" />
              <span>{t.toggleLanguage[language]}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
