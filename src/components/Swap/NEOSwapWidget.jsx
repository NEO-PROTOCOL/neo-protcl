/**
 * NEOSwapWidget - NEØ Protocol
 *
 * Placeholder: swap $NEO/ETH indisponível (projeto não usa mais Thirdweb).
 * Componente mantido para não quebrar imports; pode ser reativado com outra stack.
 */

import React from 'react'

export default function NEOSwapWidget() {
  return (
    <div className="p-6 border border-cyan-500/30 bg-gray-900/50 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-xl font-bold text-white">Swap $NEO/ETH</h3>
      </div>
      <div className="p-4 border border-amber-500/30 bg-amber-500/10 rounded-lg">
        <p className="text-amber-200 text-sm">
          Swap temporariamente indisponível (integração wallet desabilitada).
        </p>
      </div>
    </div>
  )
}
