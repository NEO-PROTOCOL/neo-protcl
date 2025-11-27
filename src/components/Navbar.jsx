import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-800/95 backdrop-blur-sm border-b border-gray-600/50 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-xl font-black tracking-tighter cyber-glow graffiti-text"
          style={{
            textShadow: '0 0 10px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.4)',
            color: '#00ffff',
            fontFamily: "'Courier New', monospace",
            letterSpacing: '0.05em'
          }}
        >
          NΞØ
        </Link>
        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="hidden md:flex items-center gap-3">
            <Link 
              to="/nos" 
              className="text-cyan-400/80 hover:text-cyan-300 transition-colors cyber-glow"
              style={{ textShadow: '0 0 5px rgba(0, 255, 255, 0.3)' }}
            >
              &gt; NÓS
            </Link>
            <Link 
              to="/manifesto" 
              className="text-blue-400/80 hover:text-blue-300 transition-colors cyber-glow"
              style={{ textShadow: '0 0 5px rgba(59, 130, 246, 0.3)' }}
            >
              &gt; MANIFESTO
            </Link>
          </div>
          <div className="text-green-400/60 font-mono text-xs flex items-center gap-1.5">
            <span className="text-green-500" style={{ fontSize: '16px', lineHeight: '1', fontFamily: 'monospace' }}>
              {'\u23DA'}
            </span>
            <span>STATUS: SYNCED</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

