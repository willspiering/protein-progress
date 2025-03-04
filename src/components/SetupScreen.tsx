import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Beef, Heart, Hammer } from 'lucide-react';

interface SetupScreenProps {
  onComplete: (goal: number) => void;
}

export function SetupScreen({ onComplete }: SetupScreenProps) {
  const [goal, setGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numGoal = parseInt(goal, 10);
    if (numGoal > 0) {
      onComplete(numGoal);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-b from-red-50 to-white dark:from-red-950 dark:to-gray-900 flex flex-col items-center justify-center p-6 transition-colors"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="mb-8 text-red-600 dark:text-red-400"
      >
        <Beef size={64} />
      </motion.div>
      
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Protein Progress
      </h1>
      
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-md">
        Track your daily protein intake and reach your fitness goals. Set your daily target and start tracking!
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-6">
          <label htmlFor="protein-goal" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Daily Protein Goal (grams)
          </label>
          <input
            type="number"
            id="protein-goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            placeholder="Enter your daily goal"
            min="1"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-red-600 dark:bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
        >
          Get Started
        </motion.button>
      </form>

      <div className="mt-auto pt-8">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
          Made with <Heart size={16} className="text-red-500 animate-pulse" /> and hard <Hammer size={16} className="text-gray-400" /> by Will Spiering
        </div>
      </div>
    </motion.div>
  );
}