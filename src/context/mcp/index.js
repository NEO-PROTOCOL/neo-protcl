// MCP Router - Model Context Protocol
// Leitura de nodes, estado global das interações, lógica de persistência

import { getIdentityGraph } from './identityGraph';

let mcpNodes = [];
let mcpState = {
  connected: false,
  activeNodes: [],
  interactions: []
};

// Instância do Identity Graph (PRIORIDADE ZERO)
const identityGraph = getIdentityGraph();

// Inicializar MCP
export function initMCP() {
  mcpState.connected = true;
  console.log('[MCP] Initialized');
  return mcpState;
}

// Reconhecer nó off-chain (observação contextual)
// ⚠️ IMPORTANTE: Esta função NÃO é o registerNode() on-chain do NHIP-001
// Esta função apenas observa/acknowledges nós no contexto MCP off-chain
// O registro on-chain acontece via NodeRegistry.sol (NHIP-001) após PoI reconhecido
export function acknowledgeNodeOffChain(nodeId, nodeData) {
  const node = {
    id: nodeId,
    ...nodeData,
    acknowledgedAt: Date.now()
  };
  mcpNodes.push(node);
  mcpState.activeNodes.push(nodeId);
  
  // PRIORIDADE ZERO: Adiciona nó ao Identity Graph
  identityGraph.addNode(nodeId, {
    address: nodeData.address || null,
    domain: nodeData.domain || null,
    metadata: nodeData
  });
  
  return node;
}

// Alias para compatibilidade (deprecated - usar acknowledgeNodeOffChain)
export function registerNode(nodeId, nodeData) {
  console.warn('[MCP] registerNode() is deprecated. Use acknowledgeNodeOffChain() instead.');
  return acknowledgeNodeOffChain(nodeId, nodeData);
}

// Ler nodes
export function readNodes() {
  return mcpNodes;
}

// Obter estado
export function getMCPState() {
  return mcpState;
}

// Registrar interação
export function registerInteraction(interaction) {
  const interactionData = {
    ...interaction,
    timestamp: Date.now()
  };
  mcpState.interactions.push(interactionData);
  
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
          ...interaction.metadata
        },
        interaction.weight || 0.5
      );
    } catch (error) {
      console.warn('[MCP] Failed to create graph edge:', error);
    }
  }
  
  return mcpState.interactions;
}

// Persistir estado (localStorage)
export function persistMCPState() {
  try {
    localStorage.setItem('mcp_state', JSON.stringify(mcpState));
    localStorage.setItem('mcp_nodes', JSON.stringify(mcpNodes));
  } catch (error) {
    console.error('[MCP] Persistence error:', error);
  }
}

// Carregar estado persistido
export function loadMCPState() {
  try {
    const savedState = localStorage.getItem('mcp_state');
    const savedNodes = localStorage.getItem('mcp_nodes');
    if (savedState) mcpState = JSON.parse(savedState);
    if (savedNodes) mcpNodes = JSON.parse(savedNodes);
    
    // PRIORIDADE ZERO: Carrega Identity Graph
    identityGraph.load();
    
    return { state: mcpState, nodes: mcpNodes };
  } catch (error) {
    console.error('[MCP] Load error:', error);
    return { state: mcpState, nodes: mcpNodes };
  }
}

// PRIORIDADE ZERO: Exporta funções do Identity Graph
export { getIdentityGraph } from './identityGraph';

