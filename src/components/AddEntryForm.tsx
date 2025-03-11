import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

interface AddEntryFormProps {
  onAdd: (name: string, protein: number) => void;
}

export function AddEntryForm({ onAdd }: AddEntryFormProps) {
  const [name, setName] = useState("");
  const [protein, setProtein] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && protein) {
      onAdd(name, parseFloat(protein));
      setName("");
      setProtein("");
      // Focus the name input after a short delay to ensure the state has updated
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 10);
    }
  };

  const handleProteinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setProtein(value);
  };

  return (
    <div className="bg-white dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="flex max-w-xl gap-2 p-3 mx-auto">
        <input
          ref={nameInputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 h-12 px-3 text-gray-900 transition-colors bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
            className="w-full h-12 px-3 text-gray-900 transition-colors bg-white border border-gray-300 rounded-lg pr-7 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="0"
            required
          />
          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
            g
          </span>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="h-12 px-6 font-medium text-white transition-colors bg-red-600 rounded-lg dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600"
        >
          Add
        </motion.button>
      </form>
    </div>
  );
}
