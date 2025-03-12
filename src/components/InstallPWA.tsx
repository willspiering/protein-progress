import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";

/**
 * Custom interface for the beforeinstallprompt event.
 * This event is fired when the browser determines the app can be installed.
 * It's not part of standard TypeScript definitions, so we define it here.
 */
interface BeforeInstallPromptEvent extends Event {
  /** Method to show the install prompt to the user */
  prompt: () => Promise<void>;
  /** Promise that resolves with the user's choice (accepted or dismissed) */
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * InstallPWA Component
 *
 * Displays an "Install App" button when the app can be installed as a PWA.
 * This component:
 * 1. Listens for the beforeinstallprompt event
 * 2. Saves the event for later use
 * 3. Shows an install button when the app is installable
 * 4. Triggers the native install prompt when the button is clicked
 */
export function InstallPWA() {
  // Store the install prompt event for later use
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  // Track whether the app can be installed
  const [isInstallable, setIsInstallable] = useState(false);

  // Set up event listener for the beforeinstallprompt event
  useEffect(() => {
    /**
     * Handler for the beforeinstallprompt event.
     * This event fires when the app meets the criteria for installation.
     */
    const handler = (e: Event) => {
      // Prevent the default browser install prompt
      e.preventDefault();
      // Save the event for later use
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the install button
      setIsInstallable(true);
    };

    // Add the event listener
    window.addEventListener("beforeinstallprompt", handler);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  /**
   * Handles the click on the install button.
   * Shows the native install prompt and processes the result.
   */
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user's choice
    const { outcome } = await deferredPrompt.userChoice;

    // If the user accepted, hide the install button
    if (outcome === "accepted") {
      setIsInstallable(false);
    }
    // Clear the saved prompt
    setDeferredPrompt(null);
  };

  // Don't render anything if the app isn't installable
  if (!isInstallable) return null;

  // Render the install button
  return (
    <button
      onClick={handleInstallClick}
      className="fixed bottom-20 right-4 bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors flex items-center gap-2"
      aria-label="Install application"
    >
      <Download size={18} />
      Install App
    </button>
  );
}
