import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Force Page to Start at the Top on Reload
if (typeof window !== 'undefined') {
  // Prevent the browser from restoring the previous scroll position
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Force scroll to top before the page unloads/reloads
  window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
  });

  // As a fallback, ensure it starts at the top when the DOM loads
  window.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
