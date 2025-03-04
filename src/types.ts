export interface FoodEntry {
  id: string;
  name: string;
  protein: number;
  timestamp: number;
}

export interface AppState {
  dailyGoal: number;
  entries: FoodEntry[];
}