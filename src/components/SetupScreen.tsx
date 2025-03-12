import React, { useState } from "react";
import { motion } from "framer-motion";
import { Beef, Heart, Hammer } from "lucide-react";

/**
 * Props for the SetupScreen component.
 */
interface SetupScreenProps {
  /** Function to call when setup is complete, passing the protein goal */
  onComplete: (goal: number) => void;
}

/**
 * SetupScreen Component
 *
 * Displays the initial setup screen where users set their daily protein goal.
 * This is shown only on first use or after resetting the app.
 * Uses animations to create an engaging onboarding experience.
 */
export function SetupScreen({ onComplete }: SetupScreenProps) {
  // State to store the user's input for their protein goal
  const [goal, setGoal] = useState("");

  /**
   * Handles form submission.
   * Validates the goal and calls the onComplete callback with the numeric value.
   */
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
      className="flex flex-col items-center justify-center min-h-screen p-6 transition-colors bg-gradient-to-b from-red-50 to-white dark:from-red-950 dark:to-gray-900"
    >
      {/* Animated app icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="mb-8 text-red-600 dark:text-red-400"
      >
        <Beef size={64} />
      </motion.div>

      {/* App title */}
      <h1 className="mb-4 text-4xl font-bold text-center text-gray-900 dark:text-white">
        Protein Progress
      </h1>

      {/* App description */}
      <p className="max-w-md mb-8 text-center text-gray-600 dark:text-gray-300">
        Track your daily protein intake and reach your fitness goals. Set your
        daily target and start tracking!
      </p>

      {/* Setup form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-6">
          <label
            htmlFor="protein-goal"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Daily Protein Goal (grams)
          </label>
          <input
            type="number"
            id="protein-goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full px-4 py-3 text-gray-900 transition-colors bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter your daily goal"
            min="1"
            required
          />
        </div>

        {/* Submit button with hover and tap animations */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 font-medium text-white transition-colors bg-red-600 rounded-lg dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600"
        >
          Get Started
        </motion.button>
      </form>

      {/* Footer with credits */}
      <div className="pt-8 mt-auto">
        <div className="flex items-center justify-center gap-1 text-sm text-center text-gray-500 dark:text-gray-400">
          Made with <Heart size={16} className="text-red-500 animate-pulse" />{" "}
          and hard <Hammer size={16} className="text-gray-400" /> by Will
          Spiering
        </div>
      </div>
    </motion.div>
  );
}
