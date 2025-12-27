// Web3 Context - Estado global para conexão Web3
export const web3State = {
  connected: false,
  address: null,
  chainId: null,
}

/**
 * Valida endereço Ethereum
 * @param {string} address - Endereço a validar
 * @returns {boolean} true se válido
 */
function isValidEthereumAddress(address) {
  if (typeof address !== 'string') return false
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

/**
 * Valida chain ID
 * @param {number} chainId - Chain ID a validar
 * @returns {boolean} true se válido
 */
function isValidChainId(chainId) {
  return typeof chainId === 'number' && chainId > 0 && Number.isInteger(chainId)
}

/**
 * Define estado Web3 com validação
 * @param {Object} state - Novo estado
 * @returns {Object} Estado atualizado
 */
export function setWeb3State(state) {
  if (!state || typeof state !== 'object') {
    return web3State
  }

  const validatedState = { ...web3State }

  // Validar connected
  if ('connected' in state) {
    validatedState.connected = Boolean(state.connected)
  }

  // Validar address
  if ('address' in state) {
    if (state.address === null || state.address === undefined) {
      validatedState.address = null
    } else if (isValidEthereumAddress(state.address)) {
      validatedState.address = state.address.toLowerCase()
    } else {
      // Log apenas em desenvolvimento
      if (import.meta.env.DEV) {
        console.warn('[Web3] Endereço inválido ignorado:', state.address)
      }
      return web3State
    }
  }

  // Validar chainId
  if ('chainId' in state) {
    if (state.chainId === null || state.chainId === undefined) {
      validatedState.chainId = null
    } else if (isValidChainId(state.chainId)) {
      validatedState.chainId = state.chainId
    } else {
      if (import.meta.env.DEV) {
        console.warn('[Web3] Chain ID inválido ignorado:', state.chainId)
      }
      return web3State
    }
  }

  Object.assign(web3State, validatedState)
  return web3State
}

export function getWeb3State() {
  return { ...web3State } // Retornar cópia para prevenir mutação externa
}
