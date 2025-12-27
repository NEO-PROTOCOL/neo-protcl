// MCP Router - Model Context Protocol
// Leitura de nodes, estado global das interações, lógica de persistência

import { getIdentityGraph } from './identityGraph'

let mcpNodes = []
let mcpState = {
  connected: false,
  activeNodes: [],
  interactions: [],
}

// Instância do Identity Graph (PRIORIDADE ZERO)
const identityGraph = getIdentityGraph()

// Inicializar MCP
export function initMCP() {
  mcpState.connected = true
  console.log('[MCP] Initialized')
  return mcpState
}

// Reconhecer nó off-chain (observação contextual)
// ⚠️ IMPORTANTE: Esta função NÃO é o registerNode() on-chain do NHIP-001
// Esta função apenas observa/acknowledges nós no contexto MCP off-chain
// O registro on-chain acontece via NodeRegistry.sol (NHIP-001) após PoI reconhecido
export function acknowledgeNodeOffChain(nodeId, nodeData) {
  const node = {
    id: nodeId,
    ...nodeData,
    acknowledgedAt: Date.now(),
  }
  mcpNodes.push(node)
  mcpState.activeNodes.push(nodeId)

  // PRIORIDADE ZERO: Adiciona nó ao Identity Graph
  identityGraph.addNode(nodeId, {
    address: nodeData.address || null,
    domain: nodeData.domain || null,
    metadata: nodeData,
  })

  return node
}

// Alias para compatibilidade (deprecated - usar acknowledgeNodeOffChain)
export function registerNode(nodeId, nodeData) {
  console.warn('[MCP] registerNode() is deprecated. Use acknowledgeNodeOffChain() instead.')
  return acknowledgeNodeOffChain(nodeId, nodeData)
}

// Ler nodes
export function readNodes() {
  return mcpNodes
}

// Obter estado
export function getMCPState() {
  return mcpState
}

// Registrar interação
export function registerInteraction(interaction) {
  const interactionData = {
    ...interaction,
    timestamp: Date.now(),
  }
  mcpState.interactions.push(interactionData)

  // PRIORIDADE ZERO: Cria relacionamento no Identity Graph se houver from/to
  if (interaction.from && interaction.to && interaction.from !== interaction.to) {
    try {
      identityGraph.addEdge(
        interaction.from,
        interaction.to,
        interaction.type || 'interaction',
        {
          actionHash: interaction.actionHash,
          impact: interaction.impact,
          ...interaction.metadata,
        },
        interaction.weight || 0.5
      )
    } catch (error) {
      console.warn('[MCP] Failed to create graph edge:', error)
    }
  }

  return mcpState.interactions
}

// Persistir estado (localStorage)
export function persistMCPState() {
  try {
    const stateJson = JSON.stringify(mcpState)
    const nodesJson = JSON.stringify(mcpNodes)

    // Validar tamanho antes de salvar (limite ~5MB)
    const MAX_SIZE = 4 * 1024 * 1024 // 4MB (deixar margem)
    if (stateJson.length + nodesJson.length > MAX_SIZE) {
      if (import.meta.env.DEV) {
        console.warn('[MCP] Dados muito grandes para persistir, truncando...')
      }
      // Truncar arrays se necessário
      const truncatedState = {
        ...mcpState,
        interactions: mcpState.interactions.slice(-100), // Manter apenas últimas 100
        activeNodes: mcpState.activeNodes.slice(-50), // Manter apenas últimos 50
      }
      const truncatedNodes = mcpNodes.slice(-100) // Manter apenas últimos 100 nós
      localStorage.setItem('mcp_state', JSON.stringify(truncatedState))
      localStorage.setItem('mcp_nodes', JSON.stringify(truncatedNodes))
      return
    }

    localStorage.setItem('mcp_state', stateJson)
    localStorage.setItem('mcp_nodes', nodesJson)
  } catch (error) {
    // Tratar QuotaExceededError especificamente
    if (error.name === 'QuotaExceededError') {
      if (import.meta.env.DEV) {
        console.warn('[MCP] localStorage cheio, limpando dados antigos...')
      }
      try {
        // Limpar dados antigos e tentar salvar versão truncada
        const truncatedState = {
          connected: mcpState.connected,
          activeNodes: mcpState.activeNodes.slice(-20),
          interactions: mcpState.interactions.slice(-50),
        }
        const truncatedNodes = mcpNodes.slice(-50)
        localStorage.setItem('mcp_state', JSON.stringify(truncatedState))
        localStorage.setItem('mcp_nodes', JSON.stringify(truncatedNodes))
      } catch (e) {
        if (import.meta.env.DEV) {
          console.error('[MCP] Erro ao persistir dados truncados:', e)
        }
      }
    } else if (import.meta.env.DEV) {
      console.error('[MCP] Persistence error:', error)
    }
  }
}

// Carregar estado persistido
export function loadMCPState() {
  try {
    const savedState = localStorage.getItem('mcp_state')
    const savedNodes = localStorage.getItem('mcp_nodes')
    if (savedState) mcpState = JSON.parse(savedState)
    if (savedNodes) mcpNodes = JSON.parse(savedNodes)

    // PRIORIDADE ZERO: Carrega Identity Graph
    identityGraph.load()

    return { state: mcpState, nodes: mcpNodes }
  } catch (error) {
    console.error('[MCP] Load error:', error)
    return { state: mcpState, nodes: mcpNodes }
  }
}

// PRIORIDADE ZERO: Exporta funções e instância do Identity Graph
export { getIdentityGraph, identityGraph } from './identityGraph'
