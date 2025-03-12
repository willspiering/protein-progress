import { useState, useEffect } from "react";

/**
 * Type definition for the theme options.
 * The app supports only 'light' or 'dark' themes.
 */
type Theme = "light" | "dark";

/**
 * Custom React hook for managing the application theme.
 *
 * This hook handles:
 * 1. Loading the saved theme from localStorage
 * 2. Detecting the user's system preference if no saved theme exists
 * 3. Applying the theme to the document root element
 * 4. Saving theme changes to localStorage
 *
 * @returns A tuple containing the current theme and a function to change it
 */
export function useTheme() {
  // Initialize theme state based on localStorage or system preference
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      // First try to get the theme from localStorage
      const savedTheme = localStorage.getItem("theme") as Theme;
      // If no saved theme, check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return savedTheme || (prefersDark ? "dark" : "light");
    }
    // Default to light theme if window is not available (e.g., during server-side rendering)
    return "light";
  });

  // Apply theme changes to the document and save to localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    // Remove both theme classes and add only the current one
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    // Save the theme preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Return the current theme and the function to change it
  return [theme, setTheme] as const;
}
