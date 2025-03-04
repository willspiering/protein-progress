import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Handle mobile viewport height
function setAppHeight() {
  const vh = window.innerHeight;
  document.documentElement.style.setProperty('--app-height', `${vh}px`);
}

// Update height on resize and orientation change
window.addEventListener('resize', setAppHeight);
window.addEventListener('orientationchange', () => {
  // Small delay to ensure new dimensions are available
  setTimeout(setAppHeight, 100);
});

// Initial height setup
setAppHeight();

// Register service worker with auto-update
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);