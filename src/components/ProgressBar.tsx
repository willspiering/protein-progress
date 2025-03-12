import React, { memo } from "react";
import { motion } from "framer-motion";

/**
 * Props for the ProgressBar component.
 */
interface ProgressBarProps {
  /** Percentage of progress (0-100+) */
  progress: number;
  /** Current amount of protein consumed (in grams) */
  current: number;
  /** Target protein goal (in grams) */
  total: number;
}

/**
 * ProgressBar Component
 *
 * Displays a visual representation of the user's progress toward their protein goal.
 * The bar changes color when the goal is exceeded.
 *
 * Uses React.memo to prevent unnecessary re-renders when props haven't changed.
 * Uses Framer Motion for smooth animations when the progress changes.
 */
export const ProgressBar = memo(function ProgressBar({
  progress,
  current,
  total,
}: ProgressBarProps) {
  // Check if the user has exceeded their goal
  const isOverGoal = current > total;

  // Cap the displayed progress at 100% for the bar width
  const displayProgress = Math.min(progress, 100);

  // Calculate how much the user is over their goal (as a percentage)
  const overProgress = isOverGoal ? ((current - total) / total) * 100 : 0;

  return (
    <div className="w-full">
      {/* Progress bar container */}
      <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden transition-colors">
        {/* Animated progress bar fill */}
        <motion.div
          className={`h-full ${
            isOverGoal
              ? "bg-green-600 dark:bg-green-500"
              : "bg-red-600 dark:bg-red-500"
          }`}
          initial={false}
          animate={{ width: `${displayProgress}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
      </div>

      {/* Progress information display */}
      <div className="flex justify-between mt-1 text-sm">
        {/* Left side: Progress percentage and current amount */}
        <span
          className={`font-medium ${
            isOverGoal
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {Math.round(progress)}% ({current}g)
          {/* Show additional information when over goal */}
          {isOverGoal && (
            <span className="ml-1 text-green-600 dark:text-green-400">
              (+{Math.round(overProgress)}% over goal)
            </span>
          )}
        </span>
        {/* Right side: Goal amount */}
        <span className="text-gray-500 dark:text-gray-400">{total}g goal</span>
      </div>
    </div>
  );
});
