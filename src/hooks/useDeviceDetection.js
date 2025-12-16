import { useState, useEffect } from 'react';

/**
 * Hook para detectar se o dispositivo é mobile ou desktop
 * Retorna true para mobile, false para desktop
 * Também retorna a largura da janela para uso em media queries
 */
export function useDeviceDetection() {
  const [isMobile, setIsMobile] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 768);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      
      // Considera mobile se:
      // - Largura <= 768px OU
      // - Tem suporte a touch (ontouchstart ou maxTouchPoints > 0)
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileDevice = width <= 768 || hasTouch;
      
      setIsMobile(isMobileDevice);
    };

    // Verificar imediatamente
    checkDevice();

    // Adicionar listener para mudanças de tamanho
    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  return { isMobile, isDesktop: !isMobile, windowWidth };
}
