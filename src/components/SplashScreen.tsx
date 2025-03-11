import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  minimumDisplayTime?: number;
  onComplete?: () => void;
}

export function SplashScreen({
  minimumDisplayTime = 2000,
  onComplete,
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, minimumDisplayTime);

    return () => clearTimeout(timer);
  }, [minimumDisplayTime, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-red-50 to-white dark:from-red-950 dark:to-gray-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center justify-center text-center text-gray-900 dark:text-white">
            <div className="p-6 mb-5 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              <img
                src="/splash-logo.svg"
                alt="Protein Progress"
                className="w-32 h-32 animate-pulse"
              />
            </div>
            <h1 className="mb-5 text-3xl font-bold">Protein Progress</h1>
            <div className="w-48 h-1 overflow-hidden rounded-full bg-red-200 dark:bg-red-800">
              <div className="w-1/3 h-full bg-red-600 dark:bg-red-500 rounded-full animate-loading"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
