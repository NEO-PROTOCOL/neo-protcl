import { usePWAUpdate } from '../hooks/usePWAUpdate';

/**
 * Componente para exibir prompt de atualização do PWA
 * Aparece quando há uma nova versão disponível
 */
export default function PWAUpdatePrompt() {
  const { needRefresh, isUpdating, update, dismiss } = usePWAUpdate();

  if (!needRefresh) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
      <div className="ios-card p-4 bg-black/95 border border-cyan-500/30 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
              <span className="text-xl">⟲</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white mb-1">
              Nova versão disponível!
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              Uma nova versão deste webapp foi lançada. Atualize para obter as últimas melhorias.
            </p>
            <div className="flex gap-2">
              <button
                onClick={update}
                disabled={isUpdating}
                className="flex-1 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Atualizando...' : 'Atualizar'}
              </button>
              <button
                onClick={dismiss}
                disabled={isUpdating}
                className="px-4 py-2 bg-gray-800/50 hover:bg-gray-800/70 text-gray-400 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                Depois
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
