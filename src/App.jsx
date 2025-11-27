import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NeoProtocol from './pages/home/NeoProtocol';
import MCPConsole from './pages/mcp-console';
import ManifestoPage from './pages/manifesto/ManifestoPage';
import NosPage from './pages/nos/NosPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NeoProtocol />} />
        <Route path="/neo-protocol" element={<NeoProtocol />} />
        <Route path="/manifesto" element={<ManifestoPage />} />
        <Route path="/nos" element={<NosPage />} />
        <Route path="/mcp" element={<MCPConsole />} />
      </Routes>
    </Router>
  );
}

export default App;

