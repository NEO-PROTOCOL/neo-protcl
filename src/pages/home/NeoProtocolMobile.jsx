import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import BottomNavigation from '../../components/BottomNavigation';
import Footer from '../../components/Footer';
import { soundManager } from '../../utils/sounds';

const phrases = [
  "auto custódia.",
  "liberdade.",
  "resistência.",
  "blockchain.",
  "moralidade."
];

export default function NeoProtocolMobile() {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const touchStartY = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const rotate = setInterval(() => {
      setCurrentPhrase((prev) => {
        const i = phrases.indexOf(prev);
        return phrases[(i + 1) % phrases.length];
      });
    }, 5000);
    return () => clearInterval(rotate);
  }, []);

  // Pull to Refresh
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (window.scrollY === 0 && touchStartY.current > 0) {
        const distance = e.touches[0].clientY - touchStartY.current;
        if (distance > 0) {
          setPullDistance(Math.min(distance, 80));
        }
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance > 50) {
        setIsRefreshing(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      setPullDistance(0);
      touchStartY.current = 0;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black text-gray-100 overflow-x-hidden pb-16 safe-area-inset relative"
      style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom))` }}
    >
      {/* Pull to Refresh Indicator */}
      {pullDistance > 0 && (
        <div 
          className="fixed top-0 left-0 right-0 flex justify-center items-center z-50 transition-transform"
          style={{ transform: `translateY(${Math.min(pullDistance, 80)}px)` }}
        >
          <div className={`pull-indicator ${pullDistance > 50 ? 'active' : ''}`}></div>
        </div>
      )}

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

        {/* Main Content - Bento Grid Layout */}
        <main className="container mx-auto px-4 py-6 pt-safe">
          
          {/* Hero Card - Large Featured */}
          <div className="ios-card mb-4 p-6 spring-in">
            <div className="flex flex-col items-center text-center">
              {/* Logo Circle */}
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm flex items-center justify-center ios-shadow-md"
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
              <h1 className="ios-headline text-white mb-2">NΞØ Protocol</h1>
              
              {/* Animated Phrase */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="ios-body text-cyan-300 font-medium">{currentPhrase}</span>
              </div>
              
              {/* Description */}
              <p className="ios-body text-gray-300 leading-relaxed max-w-md">
                Protocolo descentralizado que devolve aos indivíduos o controle sobre identidade digital, presença computacional e governança simbólica.
              </p>
            </div>
          </div>

          {/* Bento Grid - 2 Column Layout */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            
            {/* Nodes Card - Tall */}
            <Link 
              to="/nos" 
              onClick={() => soundManager.playNavigate()}
              className="ios-card col-span-1 row-span-2 p-5 flex flex-col justify-between haptic-light spring-in"
              style={{ animationDelay: '0.1s' }}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center mb-3 ios-shadow-sm">
                  <span className="text-2xl font-mono">⦾</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Nodes</h3>
                <p className="ios-caption text-gray-400">Explore os circuitos simultâneos da rede</p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-cyan-400 ios-caption font-medium">
                <span>Explorar</span>
                <span>→</span>
              </div>
            </Link>

            {/* Manifesto Card - Square */}
            <Link 
              to="/manifesto" 
              onClick={() => soundManager.playNavigate()}
              className="ios-card col-span-1 p-5 flex flex-col justify-between haptic-light spring-in"
              style={{ animationDelay: '0.2s' }}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-3 ios-shadow-sm">
                  <span className="text-2xl font-mono">⦙</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Manifesto</h3>
                <p className="ios-caption text-gray-400">Leia o documento público</p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-blue-400 ios-caption font-medium">
                <span>Ler</span>
                <span>→</span>
              </div>
            </Link>

            {/* Status Card - Square */}
            <div className="ios-card col-span-1 p-5 spring-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse ios-shadow-sm"></div>
                <span className="text-sm font-semibold text-white">Status</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="ios-caption text-gray-400">Network</span>
                  <span className="ios-caption text-green-400 font-medium">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="ios-caption text-gray-400">Nodes</span>
                  <span className="ios-caption text-cyan-400 font-medium">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="ios-caption text-gray-400">Protocol</span>
                  <span className="ios-caption text-blue-400 font-medium">Synced</span>
                </div>
              </div>
            </div>

            {/* NFT Card - Founder Node */}
            <a
              href="https://opensea.io/item/polygon/0x5d9c5845eba92e64cc181c7f670ae9993ce7d46c/1"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playNavigate()}
              className="ios-card col-span-1 p-5 flex flex-col justify-between haptic-light spring-in group"
              style={{ animationDelay: '0.35s' }}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-3 ios-shadow-sm overflow-hidden">
                  <img
                    src="/images/NFT/vfsfv.webp"
                    alt="NODE_001 NFT"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">NODE_001</h3>
                <p className="ios-caption text-gray-400 mb-2">Entry Point</p>
                <p className="ios-caption text-gray-500 text-[10px] leading-tight">
                  Founder-level NODE of the NΞØ Protocol
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-purple-400 ios-caption font-medium group-hover:text-purple-300 transition-colors">
                <span>Ver NFT</span>
                <span>→</span>
              </div>
            </a>
          </div>

          {/* Features Grid - 3 Column */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            
            {/* Feature 1 */}
            <div className="ios-card p-4 text-center spring-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-mono">⊚</span>
              </div>
              <p className="ios-caption text-gray-300 font-medium">Auto Custódia</p>
            </div>

            {/* Feature 2 */}
            <div className="ios-card p-4 text-center spring-in" style={{ animationDelay: '0.5s' }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-mono">↯</span>
              </div>
              <p className="ios-caption text-gray-300 font-medium">Blockchain</p>
            </div>

            {/* Feature 3 */}
            <div className="ios-card p-4 text-center spring-in" style={{ animationDelay: '0.6s' }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-mono">⧉</span>
              </div>
              <p className="ios-caption text-gray-300 font-medium">IA Neural</p>
            </div>
          </div>

          {/* Info Card - Wide */}
          <div className="ios-card p-5 mb-4 spring-in" style={{ animationDelay: '0.7s' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-mono">⟲</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white mb-2">Ecossistema Autônomo</h3>
                <p className="ios-caption text-gray-400 leading-relaxed">
                  Cada participante atua como um <span className="text-cyan-300 font-medium">nó consciente de execução</span>, formando uma rede neural descentralizada.
                </p>
              </div>
            </div>
          </div>

          {/* Terminal Card - Wide */}
          <div className="ios-card p-5 bg-black/60 border border-green-500/20 spring-in" style={{ animationDelay: '0.8s' }}>
            <div className="font-mono">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-green-500/20">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
                </div>
                <span className="text-[10px] text-gray-500">neo-protocol@system</span>
              </div>
              <div className="space-y-1 text-[11px]">
                <div className="text-green-400">
                  <span className="text-green-500">$</span>
                  <span className="ml-2 text-cyan-400">status</span>
                </div>
                <div className="text-green-300/80 ml-3">
                  <span className="text-green-500">[</span>
                  <span className="text-green-300">OK</span>
                  <span className="text-green-500">]</span>
                  <span className="ml-2">Sistema operacional</span>
                </div>
                <div className="text-cyan-400/80 ml-6 italic">
                  └─ {currentPhrase}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Spacer */}
          <div className="h-4"></div>

        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
