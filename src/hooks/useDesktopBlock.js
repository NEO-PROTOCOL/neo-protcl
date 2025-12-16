import { useEffect } from 'react';

/**
 * Hook para bloquear acesso de dispositivos desktop
 * DESABILITADO: Agora temos versões separadas para desktop e mobile
 * Redireciona para desktop-redirect.html se detectar desktop
 * 
 * @deprecated Este hook foi desabilitado pois agora temos suporte a desktop
 * com versões separadas da interface. Mantido para compatibilidade.
 */
export function useDesktopBlock() {
  useEffect(() => {
    // DESABILITADO: Não redireciona mais usuários desktop
    // O sistema agora detecta automaticamente o dispositivo e renderiza
    // a versão apropriada (mobile ou desktop)
    
    // Código antigo comentado:
    // const isDesktop = window.innerWidth > 768 || (!('ontouchstart' in window) && navigator.maxTouchPoints === 0);
    // if (isDesktop) {
    //   window.location.href = '/desktop-redirect.html';
    // }
  }, []);
}

