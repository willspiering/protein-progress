import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

// Handle mobile viewport height
function setAppHeight() {
  const vh = window.innerHeight;
  document.documentElement.style.setProperty("--app-height", `${vh}px`);
}

// Update height on resize and orientation change
window.addEventListener("resize", setAppHeight);
window.addEventListener("orientationchange", () => {
  // Small delay to ensure new dimensions are available
  setTimeout(setAppHeight, 100);
});

// Initial height setup
setAppHeight();

// Register service worker with auto-update
const updateSW = registerSW({
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
  onOfflineReady() {
    console.log("App ready to work offline");
    // Create toast notification with Tailwind classes
    const offlineToast = document.createElement("div");
    offlineToast.className =
      "fixed z-50 px-5 py-3 text-white transition-opacity duration-300 transform -translate-x-1/2 bg-red-600 rounded-lg shadow-lg bottom-5 left-1/2";
    offlineToast.textContent = "App ready for offline use";
    document.body.appendChild(offlineToast);

    setTimeout(() => {
      offlineToast.style.opacity = "0";
      setTimeout(() => offlineToast.remove(), 500);
    }, 3000);
  },
  onRegisterError(error: Error) {
    console.error("Service worker registration error:", error);
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
