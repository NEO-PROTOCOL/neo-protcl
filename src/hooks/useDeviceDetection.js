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
      
      // Verificar se é realmente um dispositivo móvel pelo User Agent
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Considera mobile se:
      // 1. Largura <= 768px E
      // 2. É um dispositivo móvel real (não apenas touch - laptops touchscreen não contam)
      // Isso evita que desktops/laptops com touch sejam considerados mobile
      const isMobileDevice = width <= 768 && isMobileUserAgent;
      
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
