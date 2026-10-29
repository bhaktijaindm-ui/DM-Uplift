import { Outlet } from 'react-router-dom';
import HalftoneWordmarkFooter from '../ui/HalftoneWordmarkFooter';

const AstrologyLayout = () => {
  return (
    <div className="astrology-layout-wrapper">
      {/* Main content area */}
      <main className="relative z-10 w-full min-h-[100vh] bg-[#050508] text-white">
        <Outlet />
      </main>

      {/* Halftone Wordmark Footer */}
      <HalftoneWordmarkFooter
        wordmark="cosmicreach"
        label="CosmicReach"
        meta="©2026 · Digital Marketing for Astrologers"
        preset="night"
        palette={{
          background: "#050508",
          ink: "#f1e6ff",
          warm: "#d4af37",
        }}
      />
    </div>
  );
};

export default AstrologyLayout;
