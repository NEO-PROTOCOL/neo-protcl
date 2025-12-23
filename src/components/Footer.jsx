import { useDeviceDetection } from '../hooks/useDeviceDetection';

export default function Footer() {
  const { isMobile } = useDeviceDetection();

  return (
    <footer 
      className="relative z-10 border-t border-gray-900 py-6 mt-8 w-full"
      style={isMobile ? { marginBottom: '80px' } : {}}
    >
      <center className="container mx-auto px-4">
        <p className="text-xs text-gray-400">↳ Desenvolvido por © NΞØ PROTOCOL</p>
        <p className="text-xs text-gray-400">Site: https://www.neoprotocol.space</p>
      </center>
    </footer>
  );
}
