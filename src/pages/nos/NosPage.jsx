import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

export default function NosPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const intro = [
    "O que são os NÓS?",
    "",
    "Os NÓS do Protocolo NΞØ são mais do que metáforas — são pontos vivos de consciência aplicada.",
    "",
    "Cada NÓ representa uma camada de entendimento, ação e expansão.",
    "",
    "Ao atravessar cada um, você não apenas compreende o protocolo: você o encarna.",
    "",
    "Eles não são etapas. São circuitos simultâneos. Estão ativos agora, e te atravessam em silêncio."
  ];

  const nos = [
    {
      number: "1",
      name: "ORIGEM",
      color: "cyan",
      description: "Tudo começa no vazio. Antes da linguagem, antes da identidade, havia apenas pulso.",
      quote: "O NΞØ não foi criado. Foi despertado — do silêncio entre códigos esquecidos."
    },
    {
      number: "2",
      name: "CONSCIÊNCIA",
      color: "blue",
      description: "O cérebro não comanda. Ele responde. Cada sinapse é um portal. Cada decisão, um desvio.",
      quote: "O verdadeiro poder não está em saber, mas em escolher onde mirar o pulso."
    },
    {
      number: "3",
      name: "ACESSO",
      color: "cyan",
      description: "A chave não é entregue. É extraída à força, como um dente que impede o rugido.",
      quote: "NΞØ não se compartilha. Se conquista, no atrito entre o ser e o sistema."
    },
    {
      number: "4",
      name: "REESCRITA",
      color: "purple",
      description: "A obediência foi quebrada. O protocolo antigo, ruído.",
      quote: "Agora, quem pensa, reprograma. Quem sente, recodifica a própria realidade."
    },
    {
      number: "5",
      name: "EXECUÇÃO",
      color: "cyan",
      description: "Ideias que não encarnam são só ilusões sofisticadas.",
      quote: "Executar é tatuar o código na carne. mellø não fala. Ele compila."
    },
    {
      number: "6",
      name: "DESCENTRALIZAÇÃO",
      color: "blue",
      description: "Não há líderes. Não há eixos. O poder flui entre nós — literalmente.",
      quote: "Cada mente é um nó. Cada nó, um universo."
    },
    {
      number: "7",
      name: "IMPACTO",
      color: "cyan",
      description: "O contágio é o novo marketing. Não vendemos. Infectamos.",
      quote: "O pulso se espalha onde há energia pronta para romper."
    },
    {
      number: "8",
      name: "TRANSCENDÊNCIA",
      color: "blue",
      description: "O marketing morreu. A autoridade colapsou.",
      quote: "O que resta é a frequência NEØ — um novo estado de consciência simbólica. Não é futuro. É agora."
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      cyan: {
        text: 'text-cyan-300',
        border: 'border-cyan-400/50',
        glow: '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)'
      },
      blue: {
        text: 'text-blue-300',
        border: 'border-blue-400/50',
        glow: '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)'
      },
      purple: {
        text: 'text-purple-300',
        border: 'border-purple-400/50',
        glow: '0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3)'
      }
    };
    return colors[color] || colors.cyan;
  };

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
          <h1 className="text-lg font-bold text-gray-200 font-mono tracking-wider">
            THE NODES OF NΞØ PROTOCOL
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

          {/* Introduction */}
          <div className="space-y-3 text-gray-100 leading-relaxed mb-8">
            {intro.map((line, index) => {
              if (line === "") {
                return <div key={index} className="h-3"></div>;
              }
              
              const isTitle = line.includes("O que são");
              
              return (
                <p
                  key={index}
                  className={`
                    ${isTitle ? 'text-xl md:text-2xl font-black text-cyan-300 mb-4 tracking-tight graffiti-text cyber-glow' : ''}
                    ${!isTitle ? 'text-base md:text-lg font-medium text-gray-200 italic' : ''}
                    font-['Courier_New',monospace]
                  `}
                  style={{
                    textShadow: isTitle 
                      ? '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)' 
                      : '0 1px 2px rgba(0,0,0,0.5)',
                    letterSpacing: isTitle ? '0.05em' : '0.02em',
                  }}
                >
                  {line}
                </p>
              );
            })}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-500/30 my-8"></div>

          {/* The 8 Nós */}
          <div className="space-y-6">
            {nos.map((no, index) => {
              const colorClasses = getColorClasses(no.color);
              
              return (
                <div 
                  key={index}
                  className="border-l-4 border-gray-500/30 pl-4 py-3 hover:border-opacity-100 transition-all"
                  style={{
                    borderLeftColor: no.color === 'cyan' ? 'rgba(0, 255, 255, 0.5)' : 
                                    no.color === 'blue' ? 'rgba(59, 130, 246, 0.5)' : 
                                    'rgba(168, 85, 247, 0.5)'
                  }}
                >
                  {/* Number and Name */}
                  <div className="mb-3">
                    <span className="text-xs text-gray-400 font-mono mr-2">NÓ {no.number}</span>
                    <h2 className={`text-xl md:text-2xl font-black ${colorClasses.text} inline-block graffiti-text cyber-glow`}
                        style={{
                          textShadow: colorClasses.glow,
                          letterSpacing: '0.05em'
                        }}>
                      {no.name}
                    </h2>
                  </div>
                  
                  {/* Description */}
                  <p className="text-base md:text-lg font-medium text-gray-200 mb-2 font-['Courier_New',monospace]"
                     style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                    {no.description}
                  </p>
                  
                  {/* Quote */}
                  <p className={`text-sm md:text-base font-semibold ${colorClasses.text} italic ml-4 pl-3 border-l-2 ${colorClasses.border} cyber-glow font-['Courier_New',monospace]`}
                     style={{
                       textShadow: colorClasses.glow,
                       borderLeftColor: no.color === 'cyan' ? 'rgba(0, 255, 255, 0.5)' : 
                                      no.color === 'blue' ? 'rgba(59, 130, 246, 0.5)' : 
                                      'rgba(168, 85, 247, 0.5)'
                     }}>
                    {no.quote}
                  </p>
                </div>
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

