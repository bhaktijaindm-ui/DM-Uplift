import { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen bg-[#040814]" />}>
        <Routes>
          {/* Main 3D Digital Marketing Portfolio Page */}
          <Route path="/" element={<PortfolioPage />} />

          {/* Dedicated Personal Single Page for each of the 20 Projects */}
          <Route path="/project/:projectId" element={<ProjectDetailPage />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
