import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

// First visit: follow the system setting. After that: remember the user's choice.
function getSystemTheme() {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const [theme, setTheme] = useLocalStorage(
    "hiretrack-theme",
    getSystemTheme(),
  );

  // Add or remove the "dark" class on <html>; Tailwind's dark: classes depend on it
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  return { theme, toggleTheme };
}
