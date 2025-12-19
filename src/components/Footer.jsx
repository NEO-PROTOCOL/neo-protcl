import { useDeviceDetection } from '../hooks/useDeviceDetection';

export default function Footer() {
  const { isMobile } = useDeviceDetection();

  return (
    <footer 
      className="relative z-10 border-t border-gray-900 py-6 mt-8 w-full"
      style={isMobile ? { marginBottom: '80px' } : {}}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-xs text-gray-500">© NEØ Protocol</p>
          
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <a
              href="https://www.neoprotocol.space"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Site
            </a>
            <span className="text-gray-600">·</span>
            <a
              href="https://app.ens.domains/neoprotocol.eth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              ENS
            </a>
            <span className="text-gray-600">·</span>
            <a
              href="https://etherscan.io/address/0x53c407bdea9b336b2b15995d0765876e702f16af"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Etherscan
            </a>
          </div>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-600 mb-2">Official project references:</p>
            <a
              href="https://www.neoprotocol.space"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-cyan-400 transition-colors block mb-1"
            >
              https://www.neoprotocol.space
            </a>
            <p className="text-xs text-gray-600 mt-2">ENS domain:</p>
            <span className="text-xs text-gray-400 font-mono">neoprotocol.eth</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
