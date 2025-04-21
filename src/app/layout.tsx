import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import Background from "../components/layout/Background";

function App() {
  return (
    <LanguageProvider>
      <Background>
        <div id="root"></div>
      </Background>
    </LanguageProvider>
  );
}

export default App;
