import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface AddEntryFormProps {
  onAdd: (name: string, protein: number) => void;
}

export function AddEntryForm({ onAdd }: AddEntryFormProps) {
  const [name, setName] = useState('');
  const [protein, setProtein] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && protein) {
      onAdd(name, parseFloat(protein));
      setName('');
      setProtein('');
      // Focus the name input after a short delay to ensure the state has updated
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 10);
    }
  };

  const handleProteinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setProtein(value);
  };

  return (
    <div className="bg-white dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-3 flex gap-2">
        <input
          ref={nameInputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-3 h-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
          placeholder="Food name"
          autoCapitalize="words"
          autoComplete="off"
          required
        />
        <div className="relative w-24">
          <input
            type="text"
            inputMode="decimal"
            pattern="[0-9]*\.?[0-9]*"
            value={protein}
            onChange={handleProteinInput}
            className="w-full px-3 pr-7 h-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            placeholder="0"
            required
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none">
            g
          </span>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="h-12 px-6 bg-red-600 dark:bg-red-500 text-white font-medium rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
        >
          Add
        </motion.button>
      </form>
    </div>
  );
}