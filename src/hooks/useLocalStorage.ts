import { useState, useEffect, useCallback, useRef } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Use ref to avoid unnecessary re-renders
  const initialValueRef = useRef(initialValue);
  
  // Memoize the parsing function
  const getStoredValue = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValueRef.current;
    } catch (error) {
      console.error(error);
      return initialValueRef.current;
    }
  }, [key]);

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Debounce storage updates
  const timeoutRef = useRef<number>();
  
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Debounce localStorage updates
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [storedValue, setValue] as const;
}