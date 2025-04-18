import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/layout/Navbar";
import ContentView from "./pages/ContentView";
import MapView from "./pages/MapView";

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-geoguessr-grey/20">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Navigate to="/content" replace />} />
              <Route path="/content" element={<ContentView />} />
              <Route path="/map" element={<MapView />} />
              <Route path="*" element={<Navigate to="/content" replace />} />
            </Routes>
          </main>
          <footer className="bg-white py-4 border-t border-geoguessr-grey">
            <div className="container mx-auto text-center text-sm text-geoguessr-black/60">
              Plonkipedia - GeoGuessr Learning Tool
            </div>
          </footer>
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
