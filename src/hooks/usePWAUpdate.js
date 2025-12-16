import { useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

/**
 * Hook para gerenciar atualizações do PWA
 * Detecta quando há uma nova versão disponível e permite atualização
 */
export function usePWAUpdate() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('[PWA] Service Worker registrado:', r);
    },
    onRegisterError(error) {
      console.error('[PWA] Erro ao registrar Service Worker:', error);
    },
    onNeedRefresh() {
      console.log('[PWA] Nova versão disponível');
    },
    onOfflineReady() {
      console.log('[PWA] App pronto para uso offline');
    },
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const update = async () => {
    setIsUpdating(true);
    try {
      await updateServiceWorker(true);
      // Recarregar a página após atualização
      window.location.reload();
    } catch (error) {
      console.error('[PWA] Erro ao atualizar:', error);
      setIsUpdating(false);
    }
  };

  const dismiss = () => {
    setNeedRefresh(false);
  };

  return {
    needRefresh,
    isUpdating,
    update,
    dismiss,
  };
}
