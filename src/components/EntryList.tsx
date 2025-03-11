import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";
import type { FoodEntry } from "../types";

interface EntryListProps {
  entries: FoodEntry[];
  onDelete: (id: string) => void;
}

export function EntryList({ entries, onDelete }: EntryListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {entries.length === 0 ? (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              No entries yet. Add your first protein source above!
            </div>
          ) : (
            entries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] dark:shadow-none p-4 mx-4 mb-3 transition-colors hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {entry.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(entry.timestamp, {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-red-600 dark:text-red-400">
                      {entry.protein}g
                    </span>
                    <button
                      onClick={() => onDelete(entry.id)}
                      className="text-gray-400 transition-colors hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
