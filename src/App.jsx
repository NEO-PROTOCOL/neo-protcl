import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import NeoProtocol from './pages/home/NeoProtocol';
import ManifestoPage from './pages/manifesto/ManifestoPage';
import NosPage from './pages/nos/NosPage';
import IntelligenceBoot from './pages/boot/IntelligenceBoot';
import IntentSystemPage from './pages/intent/IntentSystemPage';
import DocumentationPage from './pages/docs/DocumentationPage';
import ProjectPage from './pages/project/ProjectPage';
import ReviewPage from './pages/review/ReviewPage';
import RegisterNodePage from './pages/register/RegisterNodePage';
import { soundManager } from './utils/sounds';
import PWAUpdatePrompt from './components/PWAUpdatePrompt';

// Componente para detectar mudanças de rota
function RouteChangeListener() {
  const location = useLocation();
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    // Ignorar o primeiro carregamento (antes de qualquer interação)
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }
    // Tocar som quando a rota mudar (apenas após primeira interação)
    soundManager.playPageLoad();
  }, [location.pathname, isInitialMount]);

  return null;
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <RouteChangeListener />
      <Routes>
        <Route path="/" element={<NeoProtocol />} />
        <Route path="/neo-protocol" element={<NeoProtocol />} />
        <Route path="/manifesto" element={<ManifestoPage />} />
        <Route path="/nos" element={<NosPage />} />
        <Route path="/boot" element={<IntelligenceBoot />} />
        <Route path="/intent" element={<IntentSystemPage />} />
        <Route path="/docs" element={<DocumentationPage />} />
        <Route path="/documentacao" element={<DocumentationPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/register" element={<RegisterNodePage />} />
        <Route path="/cadastro" element={<RegisterNodePage />} />
      </Routes>
      {/* PWA Update Prompt - aparece quando há nova versão */}
      <PWAUpdatePrompt />
    </Router>
  );
}

export default App;

