import { useEffect } from 'react';
import { soundManager } from '../../utils/sounds';

/**
 * Página de Branding/Landing para a raiz do ENS
 * Apresenta a marca NΞØ Protocol e redireciona para boot.html
 */
export default function BrandingLanding() {
  useEffect(() => {
    soundManager.playClick();
    
    // Redirecionar para boot.html após 3 segundos
    const timer = setTimeout(() => {
      window.location.href = './boot.html';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleGoToBoot = () => {
    soundManager.playClick();
    window.location.href = './boot.html';
  };

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono flex items-center justify-center relative overflow-hidden">
      {/* Scanline effect */}
      <div className="scanline absolute inset-0 pointer-events-none"></div>
      
      {/* Glitch effect */}
      <style>{`
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        .glitch-text {
          animation: glitch 0.3s infinite;
        }
        .scanline {
          background: linear-gradient(
            transparent 50%,
            rgba(0, 255, 255, 0.03) 50%
          );
          background-size: 100% 4px;
          animation: scanline 8s linear infinite;
        }
        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
      `}</style>

      <div className="text-center z-10 px-4">
        {/* Logo/Texto Principal */}
        <div className="mb-8">
          <h1 
            className="text-6xl md:text-8xl font-black tracking-tighter glitch-text mb-4"
            style={{
              textShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4)',
              color: '#00ffff',
              fontFamily: "'Courier New', monospace",
              letterSpacing: '0.1em'
            }}
          >
            NΞØ
          </h1>
          <p 
            className="text-xl md:text-2xl font-bold tracking-wider"
            style={{
              textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
              color: '#00ffff'
            }}
          >
            PROTOCOL
          </p>
        </div>

        {/* Subtítulo */}
        <div className="mb-12 space-y-2">
          <p className="text-sm md:text-base text-cyan-300/80">
            Rede Neural Descentralizada
          </p>
          <p className="text-xs md:text-sm text-cyan-400/60">
            Reprogramando a matriz
          </p>
        </div>

        {/* Botão de Acesso */}
        <div className="space-y-4">
          <button
            onClick={handleGoToBoot}
            className="px-8 py-4 border-2 border-cyan-400 bg-black/50 backdrop-blur-sm rounded font-mono text-sm md:text-base hover:bg-cyan-400/10 hover:border-cyan-300 transition-all cursor-pointer"
            style={{
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)',
              textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
            }}
          >
            &gt; INICIAR BOOT SEQUENCE
          </button>
          
          <p className="text-xs text-cyan-400/40 mt-4">
            Redirecionando automaticamente em 3 segundos...
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-cyan-500/20 text-xs text-cyan-400/40">
          <p>neoprotocol.eth • IPFS • ENS</p>
        </div>
      </div>
    </div>
  );
}

