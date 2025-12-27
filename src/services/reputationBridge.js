/**
 * Reputation Bridge - NEØ Protocol
 *
 * Bridge between on-chain events and off-chain Identity Graph
 *
 * Principle:
 * - Contract does NOT write to graph
 * - Contract EMITS events
 * - Off-chain LISTENS, INTERPRETS, and WRITES
 *
 * This maintains:
 * - On-chain determinism
 * - Off-chain flexibility
 * - Complete auditability
 */

import { getIdentityGraph } from '../context/mcp/identityGraph'
import { ethers } from 'ethers'

const NEO_PROTOCOL_NODE_ID = 'neo:protocol'

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
 * Sanitiza dados de evento
 * @param {Object} eventData - Dados do evento
 * @returns {Object} Dados sanitizados
 */
function sanitizeEventData(eventData) {
  if (!eventData || typeof eventData !== 'object') return {}
  
  const sanitized = {}
  const allowedKeys = ['blockNumber', 'transactionHash', 'timestamp', 'status']
  
  for (const key of allowedKeys) {
    if (key in eventData) {
      const value = eventData[key]
      if (key === 'blockNumber' || key === 'timestamp') {
        if (typeof value === 'number' && value > 0) {
          sanitized[key] = value
        }
      } else if (key === 'transactionHash') {
        if (typeof value === 'string' && /^0x[a-fA-F0-9]{64}$/.test(value)) {
          sanitized[key] = value
        }
      } else if (typeof value === 'string' && value.length <= 100) {
        sanitized[key] = value
      }
    }
  }
  
  return sanitized
}

/**
 * Handle ReviewValidated event from NodeDesignerReview contract
 *
 * @param {string} reviewerAddress - Address of the reviewer
 * @param {Object} eventData - Event data from contract
 */
export function onReviewValidated(reviewerAddress, eventData = {}) {
  // Validar entrada
  if (!isValidEthereumAddress(reviewerAddress)) {
    if (import.meta.env.DEV) {
      console.warn('[ReputationBridge] Endereço inválido ignorado:', reviewerAddress)
    }
    return { nodeId: null, edgeCreated: false }
  }

  const graph = getIdentityGraph()
  const reviewerId = `node:${reviewerAddress.toLowerCase()}`
  const sanitizedEventData = sanitizeEventData(eventData)

  try {
    // Ensure node exists in graph
    graph.addNode(reviewerId, {
      address: reviewerAddress.toLowerCase(),
      domain: 'design',
      metadata: {
        source: 'NodeDesignerReview',
        status: 'validated',
        validatedAt: Date.now(),
        ...sanitizedEventData,
      },
    })

    // Create symbolic validation edge
    graph.addEdge(
      NEO_PROTOCOL_NODE_ID,
      reviewerId,
      'review_validated',
      {
        contract: 'NodeDesignerReview',
        event: 'ReviewValidated',
        timestamp: Date.now(),
      },
      0.4 // Weight: validated review has moderate impact
    )

    if (import.meta.env.DEV) {
      console.log(`[ReputationBridge] Review validated for ${reviewerId}`)
    }

    return {
      nodeId: reviewerId,
      edgeCreated: true,
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[ReputationBridge] Erro ao processar ReviewValidated:', error)
    }
    return {
      nodeId: reviewerId,
      edgeCreated: false,
      error: import.meta.env.PROD ? 'Erro ao processar evento' : error.message,
    }
  }
}

/**
 * Handle NodeAdmitted event from NodeAdmission contract
 *
 * @param {string} nodeAddress - Address of the admitted node
 * @param {Object} eventData - Event data from contract
 */
export function onNodeAdmitted(nodeAddress, eventData = {}) {
  // Validar entrada
  if (!isValidEthereumAddress(nodeAddress)) {
    if (import.meta.env.DEV) {
      console.warn('[ReputationBridge] Endereço inválido ignorado:', nodeAddress)
    }
    return { nodeId: null, edgeCreated: false }
  }

  const graph = getIdentityGraph()
  const nodeId = `node:${nodeAddress.toLowerCase()}`
  const sanitizedEventData = sanitizeEventData(eventData)

  try {
    // Ensure node exists
    if (!graph.getNode(nodeId)) {
      graph.addNode(nodeId, {
        address: nodeAddress.toLowerCase(),
        domain: 'admitted',
        metadata: {
          source: 'NodeAdmission',
          admittedAt: Date.now(),
          ...sanitizedEventData,
        },
      })
    } else {
      // Update existing node
      const node = graph.getNode(nodeId)
      graph.addNode(nodeId, {
        ...node,
        metadata: {
          ...node.metadata,
          admitted: true,
          admittedAt: Date.now(),
          ...sanitizedEventData,
        },
      })
    }

    // Create admission edge
    graph.addEdge(
      NEO_PROTOCOL_NODE_ID,
      nodeId,
      'admitted',
      {
        contract: 'NodeAdmission',
        event: 'NodeAdmitted',
        timestamp: Date.now(),
      },
      0.8 // Weight: admission has high impact
    )

    if (import.meta.env.DEV) {
      console.log(`[ReputationBridge] Node admitted: ${nodeId}`)
    }

    return {
      nodeId,
      edgeCreated: true,
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[ReputationBridge] Erro ao processar NodeAdmitted:', error)
    }
    return {
      nodeId,
      edgeCreated: false,
      error: import.meta.env.PROD ? 'Erro ao processar evento' : error.message,
    }
  }
}

/**
 * Setup event listeners for NEØ Protocol contracts
 *
 * @param {ethers.Contract} reviewContract - NodeDesignerReview contract instance
 * @param {ethers.Contract} admissionContract - NodeAdmission contract instance
 */
// Armazenar listeners para cleanup
let activeListeners = []

export function setupEventListeners(reviewContract, admissionContract) {
  // Limpar listeners anteriores
  cleanupEventListeners()

  if (!reviewContract || !admissionContract) {
    if (import.meta.env.DEV) {
      console.warn('[ReputationBridge] Contracts not provided, skipping listener setup')
    }
    return
  }

  try {
    // Listen to ReviewValidated events
    const reviewHandler = (reviewer, event) => {
      try {
        onReviewValidated(reviewer, {
          blockNumber: event?.blockNumber,
          transactionHash: event?.transactionHash,
        })
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('[ReputationBridge] Erro no handler ReviewValidated:', error)
        }
      }
    }

    // Listen to NodeAdmitted events
    const admissionHandler = (node, event) => {
      try {
        onNodeAdmitted(node, {
          blockNumber: event?.blockNumber,
          transactionHash: event?.transactionHash,
        })
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('[ReputationBridge] Erro no handler NodeAdmitted:', error)
        }
      }
    }

    reviewContract.on('ReviewValidated', reviewHandler)
    admissionContract.on('NodeAdmitted', admissionHandler)

    // Armazenar referências para cleanup
    activeListeners.push({
      contract: reviewContract,
      event: 'ReviewValidated',
      handler: reviewHandler,
    })
    activeListeners.push({
      contract: admissionContract,
      event: 'NodeAdmitted',
      handler: admissionHandler,
    })

    if (import.meta.env.DEV) {
      console.log('[ReputationBridge] Event listeners setup complete')
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[ReputationBridge] Erro ao configurar listeners:', error)
    }
  }
}

/**
 * Remove todos os event listeners ativos
 */
export function cleanupEventListeners() {
  for (const listener of activeListeners) {
    try {
      listener.contract.off(listener.event, listener.handler)
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('[ReputationBridge] Erro ao remover listener:', error)
      }
    }
  }
  activeListeners = []
}

/**
 * Initialize NEØ Protocol node in Identity Graph
 * This should be called once during app initialization
 */
export function initializeNeoProtocolNode() {
  try {
    const graph = getIdentityGraph()

    graph.addNode(NEO_PROTOCOL_NODE_ID, {
      address: null, // Protocol doesn't have a single address
      domain: 'protocol',
      metadata: {
        source: 'system',
        type: 'protocol',
        initializedAt: Date.now(),
      },
    })

    if (import.meta.env.DEV) {
      console.log('[ReputationBridge] NEØ Protocol node initialized')
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[ReputationBridge] Erro ao inicializar nó do protocolo:', error)
    }
    throw error
  }
}
