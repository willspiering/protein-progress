/**
 * Represents a single food entry with protein content.
 *
 * This is the core data structure for each item the user adds to track their protein intake.
 */
export interface FoodEntry {
  /** Unique identifier for the entry (uses timestamp) */
  id: string;

  /** Name of the food item */
  name: string;

  /** Amount of protein in grams */
  protein: number;

  /** When the entry was created (milliseconds since epoch) */
  timestamp: number;
}

/**
 * Represents the overall application state.
 *
 * This state is persisted in localStorage to maintain data between sessions.
 */
export interface AppState {
  /** User's daily protein goal in grams */
  dailyGoal: number;

  /** List of all food entries added by the user */
  entries: FoodEntry[];
}
