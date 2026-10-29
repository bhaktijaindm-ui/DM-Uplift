import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main 3D Digital Marketing Portfolio Page */}
        <Route path="/" element={<PortfolioPage />} />

        {/* Dedicated Personal Single Page for each of the 20 Projects */}
        <Route path="/project/:projectId" element={<ProjectDetailPage />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
