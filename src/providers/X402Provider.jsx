import React from 'react'

// ============================================
// X402Provider - TEMPORARILY DISABLED
// ============================================
// x402 provider; wallet client desabilitado (projeto não usa Thirdweb).
// We keep the file to avoid breaking existing imports.

// Empty exports for compatibility
export const thirdwebClient = null
export const thirdwebX402Facilitator = null
export const x402Config = {
  client: null,
  facilitator: null,
  network: null,
  isConfigured: false,
  hasClient: false,
}

// Empty hook for compatibility
export const useThirdwebClient = () => null

// Empty provider that just renders children
export default function X402Provider({ children }) {
  return <>{children}</>
}
