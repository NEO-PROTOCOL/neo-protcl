import React from 'react'

// ============================================
// X402Provider - TEMPORARIAMENTE DESABILITADO
// ============================================
// Este provider foi desabilitado pois o projeto não usa mais Thirdweb.
// Mantemos o arquivo para evitar quebrar imports existentes.

// Exportações vazias para compatibilidade
export const thirdwebClient = null
export const thirdwebX402Facilitator = null
export const x402Config = {
  client: null,
  facilitator: null,
  network: null,
  isConfigured: false,
  hasClient: false,
}

// Hook vazio para compatibilidade
export const useThirdwebClient = () => null

// Provider vazio que apenas renderiza os children
export default function X402Provider({ children }) {
  return <>{children}</>
}
