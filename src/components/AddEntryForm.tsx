import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Props for the AddEntryForm component.
 */
interface AddEntryFormProps {
  /** Callback function to add a new food entry */
  onAdd: (name: string, protein: number) => void;
}

/**
 * AddEntryForm Component
 *
 * Provides a form for users to add new food entries with protein content.
 * Includes validation and optimized input handling for a smooth user experience.
 */
export function AddEntryForm({ onAdd }: AddEntryFormProps) {
  // State for form input values
  const [name, setName] = useState("");
  const [protein, setProtein] = useState("");

  // Reference to the name input for focusing after form submission
  const nameInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles form submission.
   * Validates inputs, calls the onAdd callback, and resets the form.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && protein) {
      // Call the onAdd callback with the form values
      onAdd(name, parseFloat(protein));

      // Reset form fields
      setName("");
      setProtein("");

      // Focus the name input after a short delay to ensure the state has updated
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 10);
    }
  };

  /**
   * Handles protein input changes.
   * Filters out non-numeric characters to ensure only valid numbers are entered.
   */
  const handleProteinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-numeric characters (except decimal point)
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setProtein(value);
  };

  return (
    <div className="bg-white dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="flex max-w-xl gap-2 p-3 mx-auto">
        {/* Food name input */}
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

        {/* Protein amount input with gram indicator */}
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
          {/* "g" unit indicator */}
          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
            g
          </span>
        </div>

        {/* Submit button with animation */}
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
