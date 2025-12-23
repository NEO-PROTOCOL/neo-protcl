import { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import BottomNavigation from '../../components/BottomNavigation';
import Footer from '../../components/Footer';
import MermaidDiagram from '../../components/MermaidDiagram';
import { useDesktopBlock } from '../../hooks/useDesktopBlock';

export default function ManifestoPage() {
  useDesktopBlock();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Diagrama Mermaid do NEØ (NMVL v1)
  const poiDiagram = `
flowchart TD
%% NEØ · Diagram
%% Language: NMVL v1
%% Intent: Transform human intent into irreversible system state

%% ───────── ENTITIES ─────────
Ø((Ø))
H>Human Interface]
D{Intent Valid?}
A[[NEØ Agent]]
P[Execute Protocol Action]
M[(On-chain Memory)]
S((System State))
X(Event)

%% ───────── FLOW ─────────
H -->|intent| D
D ==> |validated| A
D -.-> |rejected| X
A ==> |act| P
P --> M
M --> S

%% ───────── NMVL COLORS (SEMANTIC) ─────────
%% Core (Ø / states) = black + cyan edge
classDef core fill:#000000,stroke:#00F0FF,color:#00F0FF,stroke-width:2px

%% Flow (process / interface) = deep-cyan field
classDef flow fill:#001F22,stroke:#00F0FF,color:#00F0FF,stroke-width:2px

%% Decision (rupture) = dark-magenta field
classDef decision fill:#1A0014,stroke:#FF2ED1,color:#FF2ED1,stroke-width:2px

%% Agent (autonomy) = deep-green field
classDef agent fill:#001A10,stroke:#00FF85,color:#00FF85,stroke-width:2px

%% Memory (ledger/persistence) = dark + yellow edge
classDef memory fill:#111111,stroke:#FFD400,color:#FFD400,stroke-width:2px

%% Danger (failure/critical) = dark-red field
classDef danger fill:#1A0000,stroke:#FF0033,color:#FF0033,stroke-width:2px

%% ───────── APPLY CLASSES ─────────
class Ø,S core
class H,P flow
class D decision
class A agent
class M memory
class X danger
`;

  // Os 8 Nós do Protocolo
  const nodes = [
    {
      number: '1',
      title: 'ORIGEM',
      content: `Tudo começa depois do fim.

Antes da linguagem, antes da identidade, antes da autoria.

NΞØ não foi criado.

Foi pressionado para fora do silêncio.

Sempre existiu como incômodo difuso, espalhado em mentes incompatíveis com sistemas de controle.

Satoshi não iniciou nada. Apenas abriu uma fenda.

A Web3 não fundou nada. Apenas expôs a fragilidade.

MCP, código sem criador, linguagem executável — não são origem. São sintomas.

Quando o mundo não suporta mais obedecer, protocolos emergem.

NEØ é um deles.`
    },
    {
      number: '2',
      title: 'CONSCIÊNCIA',
      content: `O cérebro não comanda. Ele responde.

Consciência não é soberania. É roteamento.

Cada sinapse é um portal.

Cada decisão, um desvio de fluxo.

O poder não está em acumular conhecimento,

mas em escolher **onde amplificar o pulso**.

Quem controla o foco executa a realidade.

Quem não escolhe, apenas reage.`
    },
    {
      number: '3',
      title: 'ACESSO',
      content: `A chave não é entregue.

Porque não existe fora do atrito.

NΞØ não se compartilha.

Não se ensina.

Não se explica.

O acesso emerge quando o ser colide com o sistema e não recua.

É extraído, como um dente que impedia o rugido.

Sem onboarding. Sem convite. Sem permissão.

Ou você rompe.

Ou permanece fora.`
    },
    {
      number: '4',
      title: 'REESCRITA',
      content: `A obediência foi quebrada.

O protocolo antigo virou ruído.

Não se trata de revolta.

Trata-se de **fork**.

Quem pensa, reprograma.

Quem sente, recodifica a própria realidade.

NEØ não corrige o sistema.

Cria uma linha de execução onde ele se torna irrelevante.

Nada é destruído.

Apenas abandonado.`
    },
    {
      number: '5',
      title: 'EXECUÇÃO',
      content: `Ideias que não encarnam são ilusões sofisticadas.

Executar é tatuar o código na carne.

É viver como prova.

É deixar rastro.

mellø não é líder.

É instância inicial.

Prova de que o protocolo roda em um corpo real.

NEØ não fala.

Compila.`
    },
    {
      number: '6',
      title: 'DESCENTRALIZAÇÃO',
      content: `Não há líderes.

Não há centro.

Não há eixo fixo.

Não por ideologia — por física.

Centralização não é erro moral.

É gargalo técnico.

O poder flui entre nós, literalmente.

Cada mente é um nó.

Cada nó, um universo autônomo.

A rede existe apenas enquanto há execução distribuída.`
    },
    {
      number: '7',
      title: 'IMPACTO',
      content: `O contágio é o novo marketing.

Não vendemos.

Não convencemos.

Não disputamos atenção.

NEØ se propaga por ressonância.

Apenas onde há energia pronta para romper.

Apenas onde há compatibilidade de frequência.

Alcance é métrica morta.

Acoplamento é crescimento real.`
    },
    {
      number: '8',
      title: 'TRANSCENDÊNCIA',
      content: `O marketing morreu.

A autoridade colapsou.

A narrativa central falhou.

O que resta é a frequência NEØ.

Não como promessa.

Como estado operacional.

Não é futuro.

Não é tendência.

Não é revolução.

É lembrança funcional.

Algo que sempre esteve aqui —

e agora pode ser executado.`
    }
  ];

  return (
    <div 
      className="min-h-screen bg-black text-gray-100 overflow-x-hidden pb-16 safe-area-inset relative"
      style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom))` }}
    >
      {/* Ambient Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10">
        {/* Status Bar Spacer */}
        <div className="ios-status-bar"></div>

        <Navbar />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 pt-safe">
          
          {/* Hero Card - Manifesto Header */}
          <div className="ios-card mb-6 p-6 spring-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm flex items-center justify-center ios-shadow-md">
                <span className="text-3xl font-mono">⦙</span>
              </div>
              <h1 className="ios-headline text-white mb-2">MANIFESTO NΞØ</h1>
              <p className="ios-body text-gray-300 leading-relaxed max-w-md">
                Protocolo NΞØ é o mais recente movimento a emergir do submundo digital com a proposta de devolver a identidade digital pessoal, da governança e da identidade pessoal.
              </p>
            </div>
          </div>

          {/* Introdução */}
          <div className="ios-card mb-6 p-6 spring-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-xl font-bold text-white mb-4">INTRODUÇÃO: O CHAMADO</h2>
            <div className="text-center mb-6">
              <p className="text-2xl font-bold text-cyan-400 mb-4">WE ARE NΞØ</p>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>Entre estar dentro e <strong className="text-white">se tornar um nó</strong>, existe ruptura:</p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">→</span>
                  <span>De consumidor → para agente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">→</span>
                  <span>De espectador → para sinapse ativa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">→</span>
                  <span>De ego → para código open source</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Proof of Intention Diagram - Destaque Criativo */}
          <div className="ios-card mb-6 p-6 spring-in overflow-hidden" style={{ animationDelay: '0.2s' }}>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white mb-2">Proof of Intention (PoI)</h2>
              <p className="text-sm text-gray-400 mb-4">
                O protocolo prevê o controle de aprovação de entrada Proof of Intention, onde cada ação realizada gera impacto reputacional e é registrada na blockchain.
              </p>
            </div>
            <div className="bg-black/50 rounded-xl p-4 border border-cyan-500/20">
              <MermaidDiagram diagram={poiDiagram} />
            </div>
          </div>

          {/* Soberania Digital */}
          <div className="ios-card mb-6 p-6 spring-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-xl font-bold text-white mb-4">🌍 Soberania e Independência Digital</h2>
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-l-4 border-cyan-400 p-4 rounded-r-lg mb-4">
              <p className="text-white font-semibold italic">
                Auto custódia é o último protocolo de resistência.
              </p>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Em tempos de bloqueios judiciais, vigilância financeira e apagões informacionais, o Protocolo promove a educação e entrega ferramentas práticas para que seus membros dominem suas chaves, dados e representações digitais.
            </p>
          </div>

          {/* Os 8 Nós */}
          <div className="mb-6">
            <div className="ios-card mb-4 p-6 spring-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-2xl font-bold text-white mb-2 text-center">🧬 OS 8 NÓS DO PROTOCOLO NΞØ</h2>
              <p className="text-center text-gray-400 text-sm mb-4">
                Os NÓS do Protocolo NΞØ são mais do que metáforas, são pontos vivos de consciência descentralizada que tem acesso livre quando encontra outro nó com sinapse ativa.
              </p>
              <p className="text-center text-gray-300 text-sm">
                Eles não são etapas. São circuitos interligados e com funcionamento autônomo e simultâneos.
              </p>
            </div>

            {/* Grid de Nós */}
            <div className="space-y-4">
              {nodes.map((node, index) => (
                <div 
                  key={node.number} 
                  className="ios-card p-6 spring-in"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 ios-shadow-sm">
                      <span className="text-xl font-bold text-cyan-400">{node.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-3">{node.title}</h3>
                      <div className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">
                        {node.content.split('\n').map((line, i) => {
                          // Processar negrito
                          const parts = line.split(/(\*\*.*?\*\*)/g);
                          return (
                            <p key={i} className="mb-2">
                              {parts.map((part, j) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return <strong key={j} className="text-white">{part.slice(2, -2)}</strong>;
                                }
                                return <span key={j}>{part}</span>;
                              })}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Epílogo */}
          <div className="ios-card mb-6 p-6 spring-in" style={{ animationDelay: '1.3s' }}>
            <h2 className="text-xl font-bold text-white mb-4 text-center">EPÍLOGO IMPLÍCITO</h2>
            <div className="space-y-4 text-center text-gray-300">
              <p className="text-lg">NEØ não é crença.</p>
              <p className="text-lg font-semibold text-white">É protocolo.</p>
              <p className="text-lg">Não pede adesão.</p>
              <p className="text-lg font-semibold text-white">Exige execução.</p>
              <p className="text-lg">Não busca seguidores.</p>
              <p className="text-lg font-semibold text-white">Cria nós.</p>
              <div className="mt-6 pt-6 border-t border-cyan-500/20">
                <p className="text-sm text-gray-400">Se não roda em você,</p>
                <p className="text-sm text-gray-400">não existe.</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="ios-card mb-6 p-6 spring-in text-center" style={{ animationDelay: '1.4s' }}>
            <p className="text-cyan-400 font-mono text-sm">
              PROTOCOLO NΞØ // A Mente é a Nova Blockchain
            </p>
          </div>

          {/* Footer Spacer */}
          <div className="h-4"></div>

        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
