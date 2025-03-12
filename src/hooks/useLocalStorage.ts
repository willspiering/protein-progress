import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Custom React hook for persisting data in localStorage.
 *
 * This hook provides a way to store and retrieve data from the browser's localStorage,
 * which allows the app to remember user data between sessions.
 *
 * @param key - The localStorage key to store the data under
 * @param initialValue - Default value to use if no data exists in localStorage
 * @returns A stateful value and a function to update it (similar to useState)
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Use ref to avoid unnecessary re-renders when accessing the initial value
  const initialValueRef = useRef(initialValue);

  /**
   * Function to retrieve the stored value from localStorage.
   * If the value doesn't exist or there's an error, return the initial value.
   */
  const getStoredValue = useCallback(() => {
    try {
      // Try to get the item from localStorage
      const item = window.localStorage.getItem(key);
      // If the item exists, parse it from JSON; otherwise use the initial value
      return item ? JSON.parse(item) : initialValueRef.current;
    } catch (error) {
      // If there's an error (e.g., invalid JSON), log it and return the initial value
      console.error(error);
      return initialValueRef.current;
    }
  }, [key]);

  // Create state with the value from localStorage or the initial value
  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Reference to store the timeout ID for debouncing
  const timeoutRef = useRef<number>();

  /**
   * Function to update both the React state and localStorage.
   * Updates to localStorage are debounced to improve performance.
   */
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Handle both direct values and function updates (like setState)
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Update React state immediately
        setStoredValue(valueToStore);

        // Debounce localStorage updates to reduce writes
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }, 1000); // Wait 1 second before saving to localStorage
      } catch (error) {
        console.error(error);
      }
    },
    [key, storedValue]
  );

  // Clean up the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Return the current value and the update function
  return [storedValue, setValue] as const;
}
