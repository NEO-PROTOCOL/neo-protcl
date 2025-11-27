import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

export default function ManifestoPage() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  const manifestoText = [
    "O Protocolo NΞØ não nasceu para ser uma empresa.",
    "Nasceu para ser uma topologia.",
    "",
    "Uma rede de nós autônomos.",
    "Uma consciência distribuída.",
    "Uma entidade que se expande sem pedir permissão.",
    "",
    "Não existe centro.",
    "Não existe dono.",
    "Existe apenas direção.",
    "",
    "Descentralização não é uma tecnologia.",
    "É um ato político.",
    "Uma forma de existir.",
    "",
    "Cada nó é livre,",
    "mas conectado pela mesma vibração:",
    "transparência,",
    "auto-custódia,",
    "responsabilidade,",
    "criatividade,",
    "independência.",
    "",
    "O NΞØ é um organismo.",
    "E você, ao entrar, torna-se parte dele.",
    "",
    "Bem-vindo ao ecossistema que pensa."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 relative scanline">
      {/* Scanline overlay effect */}
      <div className="scanline"></div>
      
      {/* Header - E-reader style */}
      <header className="sticky top-0 z-20 bg-gray-800/95 backdrop-blur-sm border-b border-gray-600/50 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link 
            to="/" 
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-mono flex items-center gap-2 cyber-glow"
          >
            <span className="text-lg">←</span>
            <span>VOLTAR</span>
          </Link>
          <h1 className="text-lg font-bold text-gray-400 font-mono tracking-wider">
            MANIFESTO
          </h1>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* E-reader Content Area */}
      <main className="container mx-auto px-4 py-6 max-w-2xl relative z-10">
        {/* Book-like container with paper texture */}
        <div className="bg-gray-600/40 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-500/30 p-6 md:p-8 min-h-[calc(100vh-200px)] paper-texture ereader-page">
          
          {/* Page number indicator (90s style) */}
          <div className="text-center mb-6 pb-4 border-b border-gray-500/30">
            <span className="text-xs text-gray-400 font-mono">PÁGINA 1</span>
          </div>

          {/* Manifesto Text - Graffiti/90s style */}
          <div className="space-y-4 text-gray-100 leading-relaxed">
            {manifestoText.map((line, index) => {
              if (line === "") {
                return <div key={index} className="h-4"></div>;
              }
              
              // Special styling for key phrases
              const isTitle = index === 0 || index === 1;
              const isVibration = line.includes("vibração:");
              const isValues = ["transparência", "auto-custódia", "responsabilidade", "criatividade", "independência"].some(v => line.includes(v));
              const isFinal = line.includes("Bem-vindo");
              
              return (
                <p
                  key={index}
                  className={`
                    ${isTitle ? 'text-2xl md:text-3xl font-black text-cyan-300 mb-6 tracking-tight graffiti-text cyber-glow' : ''}
                    ${isVibration ? 'text-lg font-bold text-blue-300 mt-4 mb-2 cyber-glow' : ''}
                    ${isValues ? 'text-base font-semibold text-green-300 ml-6 pl-2 border-l-2 border-green-400/50 cyber-glow' : ''}
                    ${isFinal ? 'text-xl md:text-2xl font-black text-yellow-300 mt-8 text-center tracking-wide graffiti-text cyber-glow' : ''}
                    ${!isTitle && !isVibration && !isValues && !isFinal ? 'text-base md:text-lg font-medium text-gray-200' : ''}
                    font-['Courier_New',monospace]
                  `}
                  style={{
                    textShadow: isTitle || isFinal 
                      ? '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3), 0 0 30px rgba(0, 255, 255, 0.2)' 
                      : isVibration || isValues
                      ? '0 0 5px currentColor, 0 0 10px currentColor'
                      : '0 1px 2px rgba(0,0,0,0.5)',
                    letterSpacing: isTitle ? '0.05em' : '0.02em',
                    filter: isTitle || isFinal ? 'drop-shadow(0 0 8px rgba(0,255,255,0.4))' : 'none',
                  }}
                >
                  {line}
                </p>
              );
            })}
          </div>

          {/* E-reader footer */}
          <div className="mt-12 pt-6 border-t border-gray-500/30 text-center">
            <p className="text-xs text-gray-400 font-mono">
              NΞØ PROTOCOL • 2025
            </p>
          </div>
        </div>

        {/* Reading progress indicator (90s style) */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 font-mono">
          <div className="w-32 h-1 bg-gray-600 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 w-full"></div>
          </div>
          <span>100%</span>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}

