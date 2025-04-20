/**
 * Utilitaires pour accéder aux variables d'environnement
 * Cette abstraction permet de gérer l'accès unifié aux variables d'environnement
 * que ce soit via process.env ou import.meta.env
 */

// Accès aux variables d'environnement (fonctionne avec Vite ou Node)
export const getEnv = (key: string, defaultValue: string = ""): string => {
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key] as string;
  }

  // Vérification pour l'environnement Vite
  if (typeof import.meta !== "undefined") {
    if (import.meta.env && import.meta.env[key]) {
      return import.meta.env[key];
    }
  }

  return defaultValue;
};

// Valeurs pour l'utilisation des mocks
export const useMocks = getEnv("VITE_USE_MOCKS", "true") === "true";
export const useDelayedResponses =
  getEnv("VITE_USE_DELAYED_RESPONSES", "false") === "true";
export const mockResponseDelay = parseInt(
  getEnv("VITE_MOCK_RESPONSE_DELAY", "300"),
  10
);

/**
 * Simule un délai de réponse pour les mocks
 * @param ms Temps d'attente en millisecondes
 */
export const delay = (ms: number = mockResponseDelay): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
