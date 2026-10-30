import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Force Page to Start at the Top on Reload & strip lingering hash
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  // Strip any lingering hash on first load to prevent browser auto-scrolling to an anchor
  if (window.location.hash && window.location.hash !== '#/' && !window.location.hash.startsWith('#/project/')) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  // Ensure scroll is at absolute top
  window.scrollTo(0, 0);

  window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
  });

  window.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
  });

  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
