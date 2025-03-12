import React, { useCallback, useMemo, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTheme } from "./hooks/useTheme";
import { SetupScreen } from "./components/SetupScreen";
import { ProgressBar } from "./components/ProgressBar";
import { AddEntryForm } from "./components/AddEntryForm";
import { EntryList } from "./components/EntryList";
import { InstallPWA } from "./components/InstallPWA";
import { SplashScreen } from "./components/SplashScreen";
import type { AppState, FoodEntry } from "./types";
import { Beef, Moon, Sun } from "lucide-react";

/**
 * Initial state for the application.
 * Sets default values for when the app is first used.
 */
const initialState: AppState = {
  dailyGoal: 0,
  entries: [],
};

/**
 * Main App Component
 *
 * This is the root component of the application that:
 * - Manages application state using localStorage
 * - Handles theme switching (light/dark mode)
 * - Provides optimistic UI updates for a responsive feel
 * - Renders different screens based on app state
 */
function App() {
  // Load and persist app state in localStorage
  const [state, setState] = useLocalStorage<AppState>(
    "protein-tracker-state",
    initialState
  );

  // Manage theme (light/dark mode)
  const [theme, setTheme] = useTheme();

  // Temporary state for optimistic UI updates
  const [optimisticEntries, setOptimisticEntries] = useState<FoodEntry[]>([]);

  // State to control showing the splash screen
  const [showSplash, setShowSplash] = useState(true);

  /**
   * Calculate the total protein from all entries.
   * Uses optimistic entries if available, otherwise uses the stored entries.
   */
  const totalProtein = useMemo(() => {
    const entries =
      optimisticEntries.length > 0 ? optimisticEntries : state.entries;
    return entries.reduce((sum, entry) => sum + entry.protein, 0);
  }, [state.entries, optimisticEntries]);

  /**
   * Calculate the progress percentage toward the daily goal.
   */
  const progress = useMemo(
    () => (totalProtein / state.dailyGoal) * 100,
    [totalProtein, state.dailyGoal]
  );

  /**
   * Calculate the remaining protein needed to reach the goal.
   * Returns 0 if the goal has been exceeded.
   */
  const remaining = useMemo(
    () => Math.max(state.dailyGoal - totalProtein, 0),
    [state.dailyGoal, totalProtein]
  );

  /**
   * Handles adding a new food entry.
   * Uses optimistic updates to make the UI feel responsive.
   */
  const handleAddEntry = useCallback(
    (name: string, protein: number) => {
      // Create a new entry object
      const newEntry: FoodEntry = {
        id: Date.now().toString(),
        name,
        protein,
        timestamp: Date.now(),
      };

      // Update UI immediately with optimistic entry (before saving)
      setOptimisticEntries([newEntry, ...state.entries]);

      // Save the entry to state after a short delay
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          entries: [newEntry, ...prev.entries],
        }));
        // Clear optimistic entries after saving
        setOptimisticEntries([]);
      }, 300);
    },
    [setState, state.entries]
  );

  /**
   * Handles deleting a food entry.
   * Uses optimistic updates to make the UI feel responsive.
   */
  const handleDeleteEntry = useCallback(
    (id: string) => {
      // Update UI immediately by filtering out the deleted entry
      setOptimisticEntries(state.entries.filter((entry) => entry.id !== id));

      // Save the updated entries list after a short delay
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          entries: prev.entries.filter((entry) => entry.id !== id),
        }));
        // Clear optimistic entries after saving
        setOptimisticEntries([]);
      }, 300);
    },
    [setState, state.entries]
  );

  /**
   * Toggles between light and dark theme.
   */
  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  // Show splash screen on initial load
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // Show setup screen if daily goal is not set
  if (state.dailyGoal === 0) {
    return (
      <SetupScreen
        onComplete={(goal) => setState({ ...state, dailyGoal: goal })}
      />
    );
  }

  // Main application UI
  return (
    <div className="transition-colors app-container bg-gray-50 dark:bg-gray-900">
      {/* App Header */}
      <header className="transition-colors bg-white border-b border-gray-200 shadow-sm header dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-xl px-4 py-3 mx-auto">
          {/* Title and Controls */}
          <div className="flex items-center justify-between mb-2">
            {/* App Title with Icon */}
            <div className="flex items-center gap-2">
              <Beef className="text-red-600 dark:text-red-400" size={24} />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Protein Progress
              </h1>
            </div>

            {/* Theme Toggle and Reset Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label={`Switch to ${
                  theme === "light" ? "dark" : "light"
                } mode`}
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button
                onClick={() => setState(initialState)}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Progress Display */}
          <div className="space-y-2">
            {/* Progress Bar Component */}
            <ProgressBar
              progress={progress}
              current={totalProtein}
              total={state.dailyGoal}
            />

            {/* Remaining or Over Goal Display */}
            <div className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {totalProtein > state.dailyGoal
                  ? "Over Goal By"
                  : "Remaining Today"}
              </div>
              <div
                className={`text-xl font-bold ${
                  totalProtein > state.dailyGoal
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {totalProtein > state.dailyGoal
                  ? `+${(totalProtein - state.dailyGoal).toFixed(1)}g`
                  : `${remaining}g`}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Entry Form Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm entry-form-container dark:bg-gray-800 dark:border-gray-700">
        <AddEntryForm onAdd={handleAddEntry} />
      </div>

      {/* Main Content - Entry List */}
      <main className="main-content">
        <div className="w-full max-w-xl mx-auto">
          <EntryList
            entries={
              optimisticEntries.length > 0 ? optimisticEntries : state.entries
            }
            onDelete={handleDeleteEntry}
          />
        </div>
      </main>

      {/* PWA Installation Prompt */}
      <InstallPWA />
    </div>
  );
}

export default App;
