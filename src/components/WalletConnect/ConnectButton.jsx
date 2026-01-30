import React from 'react'

/**
 * ConnectButton - TEMPORARIAMENTE DESABILITADO
 * 
 * Este componente foi desabilitado pois o projeto não usa mais Thirdweb.
 * Renderiza um botão placeholder até que uma nova solução de wallet seja implementada.
 */
export default function ConnectButton({ compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center">
        <div
          className="px-3 py-1.5 border border-gray-600/50 bg-gray-800/50 backdrop-blur-sm font-mono text-xs text-gray-400 rounded-lg cursor-not-allowed"
          title="Wallet temporariamente desabilitada"
        >
          Wallet
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center my-6 w-full">
      <div
        className="w-full px-6 py-3 border-2 border-gray-600/50 bg-gray-800/50 backdrop-blur-sm font-mono text-sm text-gray-400 text-center rounded-lg cursor-not-allowed"
        title="Wallet temporariamente desabilitada"
      >
        &gt; WALLET TEMPORARIAMENTE DESABILITADA
      </div>
    </div>
  )
}
