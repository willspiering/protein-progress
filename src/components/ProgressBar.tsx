import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  current: number;
  total: number;
}

export const ProgressBar = memo(function ProgressBar({ progress, current, total }: ProgressBarProps) {
  const isOverGoal = current > total;
  const displayProgress = Math.min(progress, 100);
  const overProgress = isOverGoal ? ((current - total) / total) * 100 : 0;

  return (
    <div className="w-full">
      <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden transition-colors">
        <motion.div
          className={`h-full ${isOverGoal ? 'bg-green-600 dark:bg-green-500' : 'bg-red-600 dark:bg-red-500'}`}
          initial={false}
          animate={{ width: `${displayProgress}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
      </div>
      <div className="flex justify-between mt-1 text-sm">
        <span className={`font-medium ${isOverGoal ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {Math.round(progress)}% ({current}g)
          {isOverGoal && (
            <span className="ml-1 text-green-600 dark:text-green-400">
              (+{Math.round(overProgress)}% over goal)
            </span>
          )}
        </span>
        <span className="text-gray-500 dark:text-gray-400">{total}g goal</span>
      </div>
    </div>
  );
});