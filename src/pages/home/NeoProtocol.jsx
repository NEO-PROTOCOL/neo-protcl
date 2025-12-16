import { useDeviceDetection } from '../../hooks/useDeviceDetection';
import NeoProtocolDesktop from './NeoProtocolDesktop';
import NeoProtocolMobile from './NeoProtocolMobile';

/**
 * Componente principal da home que detecta automaticamente
 * o dispositivo e renderiza a versão apropriada (mobile ou desktop)
 */
export default function NeoProtocol() {
  const { isMobile } = useDeviceDetection();

  // Renderizar versão apropriada baseada no dispositivo
  return isMobile ? <NeoProtocolMobile /> : <NeoProtocolDesktop />;
}
