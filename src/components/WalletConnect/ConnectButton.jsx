import React from 'react'

/**
 * ConnectButton - TEMPORARILY DISABLED
 * 
 * This component was disabled as the project no longer uses Thirdweb.
 * Renders a placeholder button until a new wallet solution is implemented.
 */
export default function ConnectButton({ compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center">
        <div
          className="px-3 py-1.5 border border-gray-600/50 bg-gray-800/50 backdrop-blur-sm font-mono text-xs text-gray-400 rounded-lg cursor-not-allowed"
          title="Wallet temporarily disabled"
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
        title="Wallet temporarily disabled"
      >
        &gt; WALLET TEMPORARILY DISABLED
      </div>
    </div>
  )
}

