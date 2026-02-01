import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import BottomNavigation from '../../components/BottomNavigation'
import Footer from '../../components/Footer'
import MermaidDiagram from '../../components/MermaidDiagram'
import { useDesktopBlock } from '../../hooks/useDesktopBlock'
import TypewriterText from '../../components/TypewriterText'

export default function ManifestoPage() {
  useDesktopBlock()
  const [showTerminal, setShowTerminal] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    // Mostrar terminal após um pequeno delay
    setTimeout(() => setShowTerminal(true), 500)
  }, [])

  // Texto do terminal dividido em partes para typewriter
  const terminalLines = [
    {
      text: 'Uma DAO (Organização Autônoma Descentralizada) é um novo tipo de estrutura coletiva comum entre redes jovens, entusiastas da tecnologia ou não, já perceberam que existem alternativas.',
      color: 'text-gray-300',
    },
    {
      text: '፨ | Outras plataformas. Outros jeitos de colaborar, existir, sentir pertencimento e liberdade.',
      color: 'text-cyan-400',
    },
    {
      text: 'NΞØ não é comandada por uma pessoa ou empresa. É controlada por contratos inteligentes (smart contract): códigos que operam sozinhos, sem chefe, sem intermediários, com base em regras públicas, Blockchain e open source.',
      color: 'text-gray-300',
    },
    {
      text: '፨ Cada nó tem voz. Não existe poder. Não há hierarquia vertical. O que pulsa é uma inteligência viva distribuída entre todos os participantes.',
      color: 'text-cyan-400',
    },
    { text: '◍ Cada decisão emerge da rede como um organismo coletivo.', color: 'text-cyan-400' },
    { text: 'NΞØ SMART FACTORY:', color: 'text-white font-semibold' },
    {
      text: 'Uma Fábrica de Tokens que aprende, se adapta e evolui com quem a habita. Organização sem dono. Ativos inteligentes sem fronteira.',
      color: 'text-gray-300',
    },
    {
      text: 'Isso não é um convite. A NΞØ SMART FACTORY já é o estado operacional. Está presente pelas redes, em ideias, interações e emissões invisíveis.',
      color: 'text-gray-300',
    },
    {
      text: '⛃ Sim, haverá uma DAPP (aplicação descentralizada WEB3) para acesso. Mas quem não entende, seguirá sem entender.',
      color: 'text-cyan-400',
    },
  ]

  const handleLineComplete = () => {
    if (currentLine < terminalLines.length - 1) {
      setTimeout(() => {
        setCurrentLine(prev => prev + 1)
      }, 300) // Pequeno delay entre linhas
    }
  }

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
A[[Token Factory Agent]]
P[Mint Smart Asset]
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
`

  return (
    <div
      className="min-h-screen bg-black text-gray-100 overflow-x-hidden pb-16 safe-area-inset relative font-mono"
      style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom))` }}
    >
      {/* Background Layer: Animated Network Topology */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>

        {/* Animated radial glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: '1s', animationDuration: '4s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/3 rounded-full blur-[80px] animate-pulse"
          style={{ animationDelay: '2s', animationDuration: '5s' }}
        ></div>

        {/* Network pattern - connected nodes */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, #00ffff 1px, transparent 0),
              radial-gradient(circle at 2px 2px, #00ffff 1px, transparent 0)
            `,
            backgroundSize: '60px 60px, 120px 120px',
            backgroundPosition: '0 0, 30px 30px',
          }}
        ></div>

        {/* Connection lines - subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        ></div>

        {/* Vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 50%, black 100%)',
          }}
        ></div>
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
              <h1 className="ios-headline text-white mb-2">NΞØ SMART FACTORY</h1>
              <p className="ios-body text-gray-300 leading-relaxed max-w-md">
                Protocolo NΞØ é o mais recente movimento a emergir do submundo digital com a
                proposta de devolver a identidade digital pessoal, da governança e da identidade
                pessoal.
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
              <p>
                Entre estar dentro e <strong className="text-white">se tornar um nó</strong>, existe
                ruptura:
              </p>
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
          <div
            className="ios-card mb-6 p-6 spring-in overflow-hidden"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white mb-2">Proof of Intention (PoI)</h2>
              <p className="text-sm text-gray-400 mb-4">
                O protocolo prevê o controle de aprovação de entrada Proof of Intention, onde cada
                ação realizada gera impacto reputacional e é registrada na blockchain.
              </p>
            </div>
            <div className="bg-black/50 rounded-xl p-4 border border-cyan-500/20">
              <MermaidDiagram diagram={poiDiagram} />
            </div>
          </div>

          {/* Soberania Digital */}
          <div className="ios-card mb-6 p-6 spring-in" style={{ animationDelay: '0.3s' }}>
            {/* Terminal ASCII com Typewriter */}
            <div className="bg-black/80 border border-cyan-500/30 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <div className="text-cyan-400 mb-2">
                ┌─ NΞØ SMART FACTORY ──────────────────────────┐
              </div>
              <div className="space-y-1 text-green-400">
                <div className="text-gray-400">$ cat manifesto.txt</div>
                {showTerminal && (
                  <div className="mt-2 space-y-2 leading-relaxed">
                    {terminalLines.map((line, index) => {
                      if (index < currentLine) {
                        // Linha já completa - mostrar texto completo
                        return (
                          <div key={index} className={line.color}>
                            {line.text}
                          </div>
                        )
                      } else if (index === currentLine) {
                        // Linha atual - mostrar typewriter
                        return (
                          <div key={index} className={line.color}>
                            <TypewriterText
                              text={line.text}
                              speed={25}
                              className={line.color}
                              showCursor={false}
                              onComplete={handleLineComplete}
                            />
                          </div>
                        )
                      }
                      // Linha ainda não iniciada - não mostrar
                      return null
                    })}
                  </div>
                )}
              </div>
              <div className="text-cyan-400 mt-3 pt-2 border-t border-cyan-500/20">
                └─ neoprotocol.eth • IPFS • ENS • Terminal v1.0 ────────────────┘
              </div>
            </div>
          </div>

          {/* Epílogo */}
          <div className="ios-card mb-6 p-4 spring-in" style={{ animationDelay: '1.3s' }}>
            <h2 className="text-xl font-bold text-white mb-2 text-center">NEØ ∷ Protocol</h2>
            <div className="space-y-1 text-center text-gray-300 font-mono">
              <p className="text-sm">state = f(execution)</p>
              <p className="text-sm"></p>
              <p className="text-sm">if state == ∅:</p>
              <p className="text-sm font-semibold text-white ml-4">not exists</p>
            </div>
          </div>

          {/* Footer */}
          <div
            className="ios-card mb-6 p-6 spring-in text-center"
            style={{ animationDelay: '1.4s' }}
          >
            <p className="text-cyan-400 font-mono text-sm">
              NΞØ SMART FACTORY // A Mente é a Fábrica
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
  )
}
