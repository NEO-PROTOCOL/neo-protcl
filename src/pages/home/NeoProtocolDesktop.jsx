import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
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

        {/* Main Content - Desktop Spacious Layout */}
        <main className="container mx-auto px-12 py-16 max-w-6xl">
          
          {/* Hero Section - Large and Spacious */}
          <section className="mb-20 text-center">
            <div className="flex flex-col items-center">
              {/* Logo Circle - Larger for Desktop */}
              <div className="w-40 h-40 mb-8 rounded-full overflow-hidden border-2 border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-105"
                   style={{
                     boxShadow: '0 0 40px rgba(0, 255, 255, 0.2), inset 0 0 30px rgba(0, 255, 255, 0.05)'
                   }}>
                <img
                  src="https://cloudflare-ipfs.com/ipfs/bafybeicwktbd4bpuey7w5efaqqzgtrul43hlwn4ison5l4vn37b3cklzdi"
                  alt="NΞØ Protocol Symbol"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              
              {/* Title */}
              <h1 className="text-6xl font-bold text-white mb-6">NΞØ Protocol</h1>
              
              {/* Animated Phrase */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-2xl text-cyan-300 font-medium">{currentPhrase}</span>
              </div>
              
              {/* Description - Wider for Desktop */}
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mb-12">
                Protocolo descentralizado que devolve aos indivíduos o controle sobre identidade digital, presença computacional e governança simbólica.
              </p>
            </div>
          </section>

          {/* Navigation Links - Horizontal Spacious */}
          <section className="mb-20">
            <div className="flex items-center justify-center gap-12">
              
              {/* Nodes Link */}
              <Link 
                to="/nos" 
                onClick={() => soundManager.playNavigate()}
                className="group flex flex-col items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-400/40 transition-colors">
                  <span className="text-4xl font-mono">⦾</span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">Nodes</h3>
                  <p className="text-sm text-gray-400">Explore os circuitos simultâneos da rede</p>
                </div>
              </Link>

              {/* Manifesto Link */}
              <Link 
                to="/manifesto" 
                onClick={() => soundManager.playNavigate()}
                className="group flex flex-col items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-500/20 group-hover:border-blue-400/40 transition-colors">
                  <span className="text-4xl font-mono">⦙</span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">Manifesto</h3>
                  <p className="text-sm text-gray-400">Leia o documento público</p>
                </div>
              </Link>

              {/* NFT Link */}
              <a
                href="https://opensea.io/item/polygon/0x5d9c5845eba92e64cc181c7f670ae9993ce7d46c/1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playNavigate()}
                className="group flex flex-col items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-400/40 transition-colors overflow-hidden">
                  <img
                    src="/images/NFT/vfsfv.webp"
                    alt="NODE_001 NFT"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">NODE_001</h3>
                  <p className="text-sm text-gray-400">Founder-level NODE</p>
                </div>
              </a>
            </div>
          </section>

          {/* Pilares Fundamentais Section */}
          <section className="mb-20">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Pilares Fundamentais</h2>
              <div className="grid grid-cols-3 gap-12">
                
                {/* Auto Custódia */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/20 mb-6">
                    <span className="text-4xl font-mono">⊚</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Auto Custódia</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Suas chaves, sua responsabilidade. Liberdade individual por direito, sem terceirização de confiança.
                  </p>
                </div>

                {/* Blockchain */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center border border-green-500/20 mb-6">
                    <span className="text-4xl font-mono">↯</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Blockchain</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Tecnologia base que garante transparência, imutabilidade e operação sem intermediários.
                  </p>
                </div>

                {/* IA Neural */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center border border-orange-500/20 mb-6">
                    <span className="text-4xl font-mono">⧉</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">IA Neural</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Consciência distribuída. Cada nó como parte de uma rede neural descentralizada.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Info Section - Wide and Spacious */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 flex items-center justify-center flex-shrink-0 border border-indigo-500/20">
                  <span className="text-4xl font-mono">⟲</span>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-semibold text-white mb-4">Ecossistema Autônomo</h3>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    Cada participante atua como um <span className="text-cyan-300 font-medium">nó consciente de execução</span>, formando uma rede neural descentralizada.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Status Section - Centered */}
          <section className="mb-20">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-2xl font-semibold text-white">Status do Sistema</span>
              </div>
              <div className="flex items-center justify-center gap-12 text-center">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Network</p>
                  <p className="text-lg text-green-400 font-medium">Online</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Nodes</p>
                  <p className="text-lg text-cyan-400 font-medium">Active</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Protocol</p>
                  <p className="text-lg text-blue-400 font-medium">Synced</p>
                </div>
              </div>
            </div>
          </section>

          {/* Terminal Section - Centered and Spacious */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto bg-black/40 border border-green-500/20 rounded-lg p-8">
              <div className="font-mono">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-green-500/20">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                  </div>
                  <span className="text-sm text-gray-500">neo-protocol@system</span>
                </div>
                <div className="space-y-3 text-base">
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
          </section>

        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
