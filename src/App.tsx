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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      gcTime: 1000 * 60 * 30, // Cache is kept for 30 minutes
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-purple-10/30">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Navigate to="/content" replace />} />
                <Route path="/content" element={<ContentView />} />
                <Route path="/map" element={<MapView />} />
                <Route path="*" element={<Navigate to="/content" replace />} />
              </Routes>
            </main>
            <footer className="bg-white py-4 border-t border-purple-10">
              <div className="container mx-auto text-center text-sm text-purple-100/70">
                Plonkipedia - GeoGuessr Learning Tool
              </div>
            </footer>
          </div>
        </Router>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
