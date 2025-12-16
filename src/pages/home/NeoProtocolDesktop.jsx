import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { soundManager } from '../../utils/sounds';

const phrases = [
  "auto custódia.",
  "liberdade.",
  "resistência.",
  "blockchain.",
  "moralidade."
];

export default function NeoProtocolDesktop() {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  useEffect(() => {
    const rotate = setInterval(() => {
      setCurrentPhrase((prev) => {
        const i = phrases.indexOf(prev);
        return phrases[(i + 1) % phrases.length];
      });
    }, 5000);
    return () => clearInterval(rotate);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden relative">
      {/* Ambient Background Gradients - Desktop Enhanced */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Main Content - Desktop Optimized Layout */}
        <main className="container mx-auto px-8 py-12 max-w-7xl">
          
          {/* Hero Section - Desktop Wide */}
          <div className="ios-card mb-8 p-8 spring-in">
            <div className="flex flex-col items-center text-center">
              {/* Logo Circle - Larger for Desktop */}
              <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm flex items-center justify-center ios-shadow-md transition-transform hover:scale-105"
                   style={{
                     boxShadow: '0 0 40px rgba(0, 255, 255, 0.2), inset 0 0 30px rgba(0, 255, 255, 0.05)'
                   }}>
                <img
                  src="https://gateway.lighthouse.storage/ipfs/bafybeicwktbd4bpuey7w5efaqqzgtrul43hlwn4ison5l4vn37b3cklzdi"
                  alt="NΞØ Protocol Symbol"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              
              {/* Title */}
              <h1 className="text-5xl font-bold text-white mb-4">NΞØ Protocol</h1>
              
              {/* Animated Phrase */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xl text-cyan-300 font-medium">{currentPhrase}</span>
              </div>
              
              {/* Description - Wider for Desktop */}
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                Protocolo descentralizado que devolve aos indivíduos o controle sobre identidade digital, presença computacional e governança simbólica.
              </p>
            </div>
          </div>

          {/* Desktop Bento Grid - 3 Column Layout */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            
            {/* Nodes Card - Large */}
            <Link 
              to="/nos" 
              onClick={() => soundManager.playNavigate()}
              className="ios-card col-span-1 p-6 flex flex-col justify-between haptic-light spring-in hover:scale-[1.02] transition-transform cursor-pointer group"
              style={{ animationDelay: '0.1s' }}
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center mb-4 ios-shadow-sm group-hover:shadow-lg transition-shadow">
                  <span className="text-3xl font-mono">⦾</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Nodes</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Explore os circuitos simultâneos da rede</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:text-cyan-300 transition-colors">
                <span>Explorar</span>
                <span>→</span>
              </div>
            </Link>

            {/* Manifesto Card - Large */}
            <Link 
              to="/manifesto" 
              onClick={() => soundManager.playNavigate()}
              className="ios-card col-span-1 p-6 flex flex-col justify-between haptic-light spring-in hover:scale-[1.02] transition-transform cursor-pointer group"
              style={{ animationDelay: '0.2s' }}
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-4 ios-shadow-sm group-hover:shadow-lg transition-shadow">
                  <span className="text-3xl font-mono">⦙</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Manifesto</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Leia o documento público</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                <span>Ler</span>
                <span>→</span>
              </div>
            </Link>

            {/* Status Card - Large */}
            <div className="ios-card col-span-1 p-6 spring-in hover:scale-[1.02] transition-transform" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse ios-shadow-sm"></div>
                <span className="text-lg font-semibold text-white">Status</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Network</span>
                  <span className="text-sm text-green-400 font-medium">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Nodes</span>
                  <span className="text-sm text-cyan-400 font-medium">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Protocol</span>
                  <span className="text-sm text-blue-400 font-medium">Synced</span>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - NFT and Features */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            
            {/* NFT Card - Founder Node - Desktop Enhanced */}
            <a
              href="https://opensea.io/item/polygon/0x5d9c5845eba92e64cc181c7f670ae9993ce7d46c/1"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playNavigate()}
              className="ios-card col-span-1 p-6 flex flex-col justify-between haptic-light spring-in group hover:scale-[1.02] transition-transform cursor-pointer"
              style={{ animationDelay: '0.35s' }}
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 ios-shadow-sm overflow-hidden group-hover:shadow-lg transition-shadow">
                  <span className="text-3xl font-mono">◉</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">NODE_001</h3>
                <p className="text-sm text-gray-400 mb-3">Entry Point</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Founder-level NODE of the NΞØ Protocol
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-purple-400 text-sm font-medium group-hover:text-purple-300 transition-colors">
                <span>Ver NFT</span>
                <span>→</span>
              </div>
            </a>

            {/* Feature 1 */}
            <div className="ios-card col-span-1 p-6 text-center spring-in hover:scale-[1.02] transition-transform" style={{ animationDelay: '0.4s' }}>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-mono">⊚</span>
              </div>
              <p className="text-sm text-gray-300 font-medium">Auto Custódia</p>
            </div>

            {/* Feature 2 */}
            <div className="ios-card col-span-1 p-6 text-center spring-in hover:scale-[1.02] transition-transform" style={{ animationDelay: '0.5s' }}>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-mono">↯</span>
              </div>
              <p className="text-sm text-gray-300 font-medium">Blockchain</p>
            </div>

            {/* Feature 3 */}
            <div className="ios-card col-span-1 p-6 text-center spring-in hover:scale-[1.02] transition-transform" style={{ animationDelay: '0.6s' }}>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-mono">⧉</span>
              </div>
              <p className="text-sm text-gray-300 font-medium">IA Neural</p>
            </div>
          </div>

          {/* Info and Terminal Row */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            
            {/* Info Card - Wide Desktop */}
            <div className="ios-card p-6 spring-in hover:scale-[1.01] transition-transform" style={{ animationDelay: '0.7s' }}>
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-mono">⟲</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-3">Ecossistema Autônomo</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Cada participante atua como um <span className="text-cyan-300 font-medium">nó consciente de execução</span>, formando uma rede neural descentralizada.
                  </p>
                </div>
              </div>
            </div>

            {/* Terminal Card - Wide Desktop */}
            <div className="ios-card p-6 bg-black/60 border border-green-500/20 spring-in hover:scale-[1.01] transition-transform" style={{ animationDelay: '0.8s' }}>
              <div className="font-mono">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-green-500/20">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                  </div>
                  <span className="text-xs text-gray-500">neo-protocol@system</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="text-green-400">
                    <span className="text-green-500">$</span>
                    <span className="ml-2 text-cyan-400">status</span>
                  </div>
                  <div className="text-green-300/80 ml-4">
                    <span className="text-green-500">[</span>
                    <span className="text-green-300">OK</span>
                    <span className="text-green-500">]</span>
                    <span className="ml-2">Sistema operacional</span>
                  </div>
                  <div className="text-cyan-400/80 ml-8 italic">
                    └─ {currentPhrase}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Spacer */}
          <div className="h-8"></div>

        </main>
      </div>
    </div>
  );
}
