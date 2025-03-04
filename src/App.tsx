import React, { useCallback, useMemo, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { SetupScreen } from './components/SetupScreen';
import { ProgressBar } from './components/ProgressBar';
import { AddEntryForm } from './components/AddEntryForm';
import { EntryList } from './components/EntryList';
import { InstallPWA } from './components/InstallPWA';
import type { AppState, FoodEntry } from './types';
import { Beef, Moon, Sun } from 'lucide-react';

const initialState: AppState = {
  dailyGoal: 0,
  entries: []
};

function App() {
  const [state, setState] = useLocalStorage<AppState>('protein-tracker-state', initialState);
  const [theme, setTheme] = useTheme();
  const [optimisticEntries, setOptimisticEntries] = useState<FoodEntry[]>([]);

  const totalProtein = useMemo(() => {
    const entries = optimisticEntries.length > 0 ? optimisticEntries : state.entries;
    return entries.reduce((sum, entry) => sum + entry.protein, 0);
  }, [state.entries, optimisticEntries]);

  const progress = useMemo(() => 
    (totalProtein / state.dailyGoal) * 100,
    [totalProtein, state.dailyGoal]
  );

  const remaining = useMemo(() => 
    Math.max(state.dailyGoal - totalProtein, 0),
    [state.dailyGoal, totalProtein]
  );

  const handleAddEntry = useCallback((name: string, protein: number) => {
    const newEntry: FoodEntry = {
      id: Date.now().toString(),
      name,
      protein,
      timestamp: Date.now()
    };

    setOptimisticEntries([newEntry, ...state.entries]);

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        entries: [newEntry, ...prev.entries]
      }));
      setOptimisticEntries([]);
    }, 300);
  }, [setState, state.entries]);

  const handleDeleteEntry = useCallback((id: string) => {
    setOptimisticEntries(
      state.entries.filter(entry => entry.id !== id)
    );

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        entries: prev.entries.filter(entry => entry.id !== id)
      }));
      setOptimisticEntries([]);
    }, 300);
  }, [setState, state.entries]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  if (state.dailyGoal === 0) {
    return <SetupScreen onComplete={(goal) => setState({ ...state, dailyGoal: goal })} />;
  }

  return (
    <div className="app-container bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="header bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Beef className="text-red-600 dark:text-red-400" size={24} />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Protein Progress</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button
                onClick={() => setState(initialState)}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Reset
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <ProgressBar 
              progress={progress} 
              current={totalProtein} 
              total={state.dailyGoal} 
            />
            <div className="text-center">
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                {totalProtein > state.dailyGoal ? 'Over Goal By' : 'Remaining Today'}
              </div>
              <div className={`text-xl font-bold ${
                totalProtein > state.dailyGoal 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                {totalProtein > state.dailyGoal 
                  ? `+${(totalProtein - state.dailyGoal).toFixed(1)}g` 
                  : `${remaining}g`}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form now positioned below header but above the scrollable list */}
      <div className="entry-form-container bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <AddEntryForm onAdd={handleAddEntry} />
      </div>

      <main className="main-content">
        <div className="max-w-xl mx-auto w-full">
          <EntryList 
            entries={optimisticEntries.length > 0 ? optimisticEntries : state.entries} 
            onDelete={handleDeleteEntry} 
          />
        </div>
      </main>

      <InstallPWA />
    </div>
  );
}

export default App;