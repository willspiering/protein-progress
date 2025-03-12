import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

// ===== MOBILE VIEWPORT HEIGHT HANDLING =====
/**
 * Sets the app height based on the window's inner height.
 * This helps ensure consistent viewport height on mobile devices
 * where browser UI elements can affect the viewport size.
 */
function setAppHeight() {
  const vh = window.innerHeight;
  document.documentElement.style.setProperty("--app-height", `${vh}px`);
}

// Update height when window is resized or device orientation changes
window.addEventListener("resize", setAppHeight);
window.addEventListener("orientationchange", () => {
  // Small delay to ensure new dimensions are available after orientation change
  setTimeout(setAppHeight, 100);
});

// Run initial height setup when the app loads
setAppHeight();

// ===== PROGRESSIVE WEB APP (PWA) SETUP =====
/**
 * Register the Service Worker for PWA functionality.
 * This enables features like offline access and app installation.
 *
 * The updateSW function is returned by registerSW and can be called
 * to update the service worker when new content is available.
 */
const updateSW = registerSW({
  // Called when new content is available and the app needs to be refreshed
  onNeedRefresh() {
    const shouldUpdate = confirm("New content available. Reload to update?");
    if (shouldUpdate) {
      try {
        updateSW(true);
      } catch (error) {
        console.error("Failed to update service worker:", error);
        window.location.reload();
      }
    }
  },

  // Called when the app is ready to work offline
  onOfflineReady() {
    console.log("App ready to work offline");

    // Create a temporary toast notification to inform the user
    const offlineToast = document.createElement("div");
    offlineToast.className =
      "fixed z-50 px-5 py-3 text-white transition-opacity duration-300 transform -translate-x-1/2 bg-red-600 rounded-lg shadow-lg bottom-5 left-1/2";
    offlineToast.textContent = "App ready for offline use";
    document.body.appendChild(offlineToast);

    // Remove the toast notification after 3 seconds with a fade-out effect
    setTimeout(() => {
      offlineToast.style.opacity = "0";
      setTimeout(() => offlineToast.remove(), 500);
    }, 3000);
  },

  // Called if there's an error registering the service worker
  onRegisterError(error: Error) {
    console.error("Service worker registration error:", error);
  },
});

// ===== REACT APP INITIALIZATION =====
/**
 * Mount the React application to the DOM.
 *
 * 1. Find the element with id="root" in the HTML
 * 2. Create a React root at that element
 * 3. Render the App component inside StrictMode
 *
 * StrictMode helps identify potential problems in the app
 * by running certain checks and warnings during development.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
