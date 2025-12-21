import { Link } from 'react-router-dom';
import { soundManager } from '../utils/sounds';
import ConnectButton from './WalletConnect/ConnectButton';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 ios-navbar ios-shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link 
          to="/" 
          onClick={() => soundManager.playClick()}
          className="flex items-center haptic-light"
        >
          <img
            src="https://cloudflare-ipfs.com/ipfs/bafkreifm3hzdhem47tfzzqxm4274t3rqkzrgsa2zi2bc72nzjecxaixsxm"
            alt="NΞØ Protocol"
            className="h-7 md:h-9 w-auto"
            style={{
              filter: 'drop-shadow(0 0 12px rgba(0, 255, 255, 0.3))'
            }}
            loading="eager"
          />
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <Link 
              to="/nos" 
              onClick={() => soundManager.playNavigate()}
              className="ios-button-secondary ios-compact-xs text-xs haptic-light"
            >
              Nodes
            </Link>
            <Link 
              to="/manifesto" 
              onClick={() => soundManager.playNavigate()}
              className="ios-button-secondary ios-compact-xs text-xs haptic-light"
            >
              Manifesto
            </Link>
            <Link 
              to="/docs" 
              onClick={() => soundManager.playNavigate()}
              className="ios-button-secondary ios-compact-xs text-xs haptic-light"
            >
              Docs
            </Link>
            <Link 
              to="/project" 
              onClick={() => soundManager.playNavigate()}
              className="ios-button-secondary ios-compact-xs text-xs haptic-light"
            >
              Project
            </Link>
            <Link 
              to="/register" 
              onClick={() => soundManager.playNavigate()}
              className="ios-button-secondary ios-compact-xs text-xs haptic-light"
            >
              Cadastro
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-[10px] font-medium text-green-400 uppercase tracking-wide">Synced</span>
            </div>
            <div className="flex items-center">
              <ConnectButton compact={true} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

