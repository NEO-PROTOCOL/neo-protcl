// Identity Graph - Protocolo NΞØ
// PRIORIDADE ZERO: Estrutura de grafo off-chain para relacionamentos entre nós
// Base para reputação, loops e admissão/defesa

/**
 * @typedef {Object} NodeData
 * @property {string} id - Identificador único do nó
 * @property {string} address - Endereço on-chain (se registrado)
 * @property {string} domain - Domínio declarado
 * @property {number} acknowledgedAt - Timestamp de reconhecimento
 * @property {Object} metadata - Metadados adicionais
 */

/**
 * @typedef {Object} EdgeData
 * @property {string} id - Identificador único da edge
 * @property {string} from - ID do nó origem
 * @property {string} to - ID do nó destino
 * @property {string} type - Tipo de relacionamento (interaction, collaboration, influence, etc.)
 * @property {number} weight - Peso do relacionamento (0-1)
 * @property {number} timestamp - Timestamp da criação
 * @property {Object} metadata - Metadados adicionais (actionHash, impact, etc.)
 */

/**
 * IdentityGraph - Estrutura de grafo para relacionamentos entre nós
 *
 * Funcionalidades:
 * - Adicionar nós ao grafo
 * - Criar relacionamentos (edges) entre nós
 * - Consultar relacionamentos
 * - Calcular métricas básicas
 * - Persistência em localStorage
 */
export class IdentityGraph {
  constructor() {
    /** @type {Map<string, NodeData>} */
    this.nodes = new Map()

    /** @type {Map<string, EdgeData>} */
    this.edges = new Map()

    /** @type {Map<string, Set<string>>} - Adjacency list: nodeId -> Set of connected nodeIds */
    this.adjacencyList = new Map()

    /** @type {string} - Chave para persistência */
    this.storageKey = 'neo_identity_graph'
  }

  /**
   * Adiciona um nó ao grafo
   * @param {string} nodeId - Identificador único do nó
   * @param {NodeData} nodeData - Dados do nó
   * @returns {NodeData} Nó adicionado
   */
  addNode(nodeId, nodeData) {
    if (this.nodes.has(nodeId)) {
      // Atualiza nó existente
      const existing = this.nodes.get(nodeId)
      this.nodes.set(nodeId, { ...existing, ...nodeData })
      return this.nodes.get(nodeId)
    }

    const node = {
      id: nodeId,
      acknowledgedAt: Date.now(),
      ...nodeData,
    }

    this.nodes.set(nodeId, node)
    this.adjacencyList.set(nodeId, new Set())

    this.persist()
    return node
  }

  /**
   * Remove um nó do grafo (e todas suas edges)
   * @param {string} nodeId - ID do nó a remover
   * @returns {boolean} true se removido, false se não existia
   */
  removeNode(nodeId) {
    if (!this.nodes.has(nodeId)) {
      return false
    }

    // Remove todas as edges conectadas
    const connectedNodes = this.adjacencyList.get(nodeId) || new Set()

    // Remove edges de saída
    for (const targetId of connectedNodes) {
      this.removeEdge(nodeId, targetId)
    }

    // Remove edges de entrada
    for (const [edgeId, edge] of this.edges.entries()) {
      if (edge.to === nodeId) {
        this.edges.delete(edgeId)
        const sourceAdj = this.adjacencyList.get(edge.from)
        if (sourceAdj) {
          sourceAdj.delete(nodeId)
        }
      }
    }

    this.nodes.delete(nodeId)
    this.adjacencyList.delete(nodeId)

    this.persist()
    return true
  }

  /**
   * Cria um relacionamento (edge) entre dois nós
   * @param {string} fromId - ID do nó origem
   * @param {string} toId - ID do nó destino
   * @param {string} type - Tipo de relacionamento
   * @param {Object} metadata - Metadados adicionais
   * @param {number} weight - Peso do relacionamento (0-1, padrão: 0.5)
   * @returns {EdgeData} Edge criada
   */
  addEdge(fromId, toId, type = 'interaction', metadata = {}, weight = 0.5) {
    // Valida que ambos os nós existem
    if (!this.nodes.has(fromId)) {
      throw new Error(`Node ${fromId} does not exist`)
    }
    if (!this.nodes.has(toId)) {
      throw new Error(`Node ${toId} does not exist`)
    }

    // Não permite self-loops
    if (fromId === toId) {
      throw new Error('Self-loops are not allowed')
    }

    // Valida peso
    const normalizedWeight = Math.max(0, Math.min(1, weight))

    const edgeId = `${fromId}->${toId}:${type}:${Date.now()}`

    const edge = {
      id: edgeId,
      from: fromId,
      to: toId,
      type,
      weight: normalizedWeight,
      timestamp: Date.now(),
      metadata,
    }

    this.edges.set(edgeId, edge)

    // Atualiza adjacency list
    const fromAdj = this.adjacencyList.get(fromId)
    if (fromAdj) {
      fromAdj.add(toId)
    }

    this.persist()
    return edge
  }

  /**
   * Remove uma edge específica
   * @param {string} fromId - ID do nó origem
   * @param {string} toId - ID do nó destino
   * @param {string} type - Tipo de relacionamento (opcional, remove todos se não especificado)
   * @returns {boolean} true se removida, false se não existia
   */
  removeEdge(fromId, toId, type = null) {
    let removed = false

    for (const [edgeId, edge] of this.edges.entries()) {
      if (edge.from === fromId && edge.to === toId) {
        if (!type || edge.type === type) {
          this.edges.delete(edgeId)
          removed = true
        }
      }
    }

    // Atualiza adjacency list se não há mais edges
    const remainingEdges = Array.from(this.edges.values()).some(
      e => e.from === fromId && e.to === toId
    )

    if (!remainingEdges) {
      const fromAdj = this.adjacencyList.get(fromId)
      if (fromAdj) {
        fromAdj.delete(toId)
      }
    }

    if (removed) {
      this.persist()
    }

    return removed
  }

  /**
   * Obtém um nó por ID
   * @param {string} nodeId - ID do nó
   * @returns {NodeData|null} Dados do nó ou null se não existe
   */
  getNode(nodeId) {
    return this.nodes.get(nodeId) || null
  }

  /**
   * Obtém todos os nós
   * @returns {NodeData[]} Array de nós
   */
  getAllNodes() {
    return Array.from(this.nodes.values())
  }

  /**
   * Obtém relacionamentos de um nó (outgoing)
   * @param {string} nodeId - ID do nó
   * @returns {EdgeData[]} Array de edges de saída
   */
  getOutgoingEdges(nodeId) {
    return Array.from(this.edges.values()).filter(edge => edge.from === nodeId)
  }

  /**
   * Obtém relacionamentos para um nó (incoming)
   * @param {string} nodeId - ID do nó
   * @returns {EdgeData[]} Array de edges de entrada
   */
  getIncomingEdges(nodeId) {
    return Array.from(this.edges.values()).filter(edge => edge.to === nodeId)
  }

  /**
   * Obtém todos os relacionamentos de um nó (bidirecional)
   * @param {string} nodeId - ID do nó
   * @returns {EdgeData[]} Array de todas as edges conectadas
   */
  getEdges(nodeId) {
    return [...this.getOutgoingEdges(nodeId), ...this.getIncomingEdges(nodeId)]
  }

  /**
   * Obtém nós conectados a um nó
   * @param {string} nodeId - ID do nó
   * @returns {string[]} Array de IDs de nós conectados
   */
  getConnectedNodes(nodeId) {
    const connected = new Set()

    // Outgoing
    for (const edge of this.getOutgoingEdges(nodeId)) {
      connected.add(edge.to)
    }

    // Incoming
    for (const edge of this.getIncomingEdges(nodeId)) {
      connected.add(edge.from)
    }

    return Array.from(connected)
  }

  /**
   * Obtém relacionamentos entre dois nós específicos
   * @param {string} fromId - ID do nó origem
   * @param {string} toId - ID do nó destino
   * @returns {EdgeData[]} Array de edges entre os nós
   */
  getRelationships(fromId, toId) {
    return Array.from(this.edges.values()).filter(edge => edge.from === fromId && edge.to === toId)
  }

  /**
   * Calcula grau de um nó (número de conexões)
   * @param {string} nodeId - ID do nó
   * @returns {number} Grau do nó
   */
  getDegree(nodeId) {
    return this.getConnectedNodes(nodeId).length
  }

  /**
   * Calcula peso total de relacionamentos de um nó
   * @param {string} nodeId - ID do nó
   * @returns {number} Soma dos pesos das edges
   */
  getTotalWeight(nodeId) {
    const edges = this.getEdges(nodeId)
    return edges.reduce((sum, edge) => sum + edge.weight, 0)
  }

  /**
   * Verifica se dois nós estão conectados
   * @param {string} fromId - ID do nó origem
   * @param {string} toId - ID do nó destino
   * @returns {boolean} true se conectados
   */
  areConnected(fromId, toId) {
    return this.getRelationships(fromId, toId).length > 0
  }

  /**
   * Obtém estatísticas do grafo
   * @returns {Object} Estatísticas
   */
  getStats() {
    return {
      nodeCount: this.nodes.size,
      edgeCount: this.edges.size,
      averageDegree:
        this.nodes.size > 0
          ? Array.from(this.nodes.keys()).reduce((sum, id) => sum + this.getDegree(id), 0) /
            this.nodes.size
          : 0,
      averageWeight:
        this.edges.size > 0
          ? Array.from(this.edges.values()).reduce((sum, e) => sum + e.weight, 0) / this.edges.size
          : 0,
    }
  }

  /**
   * Persiste o grafo no localStorage
   */
  persist() {
    try {
      // Limitar tamanho para prevenir memory issues
      const MAX_NODES = 10000
      const MAX_EDGES = 50000

      const nodesArray = Array.from(this.nodes.entries()).slice(0, MAX_NODES)
      const edgesArray = Array.from(this.edges.entries()).slice(0, MAX_EDGES)

      const serialized = {
        nodes: nodesArray,
        edges: edgesArray,
        adjacencyList: Array.from(this.adjacencyList.entries())
          .slice(0, MAX_NODES)
          .map(([id, set]) => [
            id,
            Array.from(set).slice(0, 100), // Limitar conexões por nó
          ]),
        version: '1.0.0',
        persistedAt: Date.now(),
      }

      const jsonString = JSON.stringify(serialized)

      // Validar tamanho do JSON (localStorage tem limite de ~5-10MB)
      const MAX_STORAGE_SIZE = 5 * 1024 * 1024 // 5MB
      if (jsonString.length > MAX_STORAGE_SIZE) {
        if (import.meta.env.DEV) {
          console.warn('[IdentityGraph] Dados muito grandes para persistir, truncando...')
        }
        // Truncar nodes e edges se necessário
        const truncated = {
          ...serialized,
          nodes: nodesArray.slice(0, Math.floor(MAX_NODES * 0.8)),
          edges: edgesArray.slice(0, Math.floor(MAX_EDGES * 0.8)),
        }
        localStorage.setItem(this.storageKey, JSON.stringify(truncated))
      } else {
        localStorage.setItem(this.storageKey, jsonString)
      }
    } catch (error) {
      // QuotaExceededError ou outros erros de storage
      if (error.name === 'QuotaExceededError') {
        if (import.meta.env.DEV) {
          console.warn('[IdentityGraph] localStorage cheio, limpando dados antigos...')
        }
        // Tentar limpar e persistir novamente com menos dados
        try {
          const truncated = {
            nodes: Array.from(this.nodes.entries()).slice(0, 1000),
            edges: Array.from(this.edges.entries()).slice(0, 5000),
            adjacencyList: [],
            version: '1.0.0',
            persistedAt: Date.now(),
          }
          localStorage.setItem(this.storageKey, JSON.stringify(truncated))
        } catch (e) {
          if (import.meta.env.DEV) {
            console.error('[IdentityGraph] Erro ao persistir dados truncados:', e)
          }
        }
      } else if (import.meta.env.DEV) {
        console.error('[IdentityGraph] Persistence error:', error)
      }
    }
  }

  /**
   * Carrega o grafo do localStorage
   * @returns {boolean} true se carregado com sucesso
   */
  load() {
    try {
      const saved = localStorage.getItem(this.storageKey)
      if (!saved) {
        return false
      }

      // Validar tamanho antes de parsear
      const MAX_LOAD_SIZE = 10 * 1024 * 1024 // 10MB
      if (saved.length > MAX_LOAD_SIZE) {
        if (import.meta.env.DEV) {
          console.warn('[IdentityGraph] Dados salvos muito grandes, ignorando...')
        }
        return false
      }

      const data = JSON.parse(saved)

      // Validar estrutura dos dados
      if (!data || typeof data !== 'object') {
        return false
      }

      // Limitar tamanho ao carregar para prevenir memory issues
      const MAX_NODES = 10000
      const MAX_EDGES = 50000

      // Restaura nodes com validação
      const nodesArray = Array.isArray(data.nodes) ? data.nodes.slice(0, MAX_NODES) : []
      this.nodes = new Map(nodesArray.filter(([id]) => typeof id === 'string' && id.length <= 200))

      // Restaura edges com validação
      const edgesArray = Array.isArray(data.edges) ? data.edges.slice(0, MAX_EDGES) : []
      this.edges = new Map(edgesArray.filter(([id]) => typeof id === 'string' && id.length <= 500))

      // Restaura adjacency list com validação
      const adjListArray = Array.isArray(data.adjacencyList)
        ? data.adjacencyList.slice(0, MAX_NODES)
        : []
      this.adjacencyList = new Map(
        adjListArray
          .filter(([id, arr]) => typeof id === 'string' && Array.isArray(arr))
          .map(([id, arr]) => [id, new Set(arr.slice(0, 100))]) // Limitar conexões por nó
      )

      return true
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('[IdentityGraph] Load error:', error)
      }
      // Em caso de erro, limpar dados corrompidos
      try {
        localStorage.removeItem(this.storageKey)
      } catch (e) {
        // Ignorar erros ao limpar
      }
      return false
    }
  }

  /**
   * Limpa todo o grafo
   */
  clear() {
    this.nodes.clear()
    this.edges.clear()
    this.adjacencyList.clear()
    localStorage.removeItem(this.storageKey)
  }

  /**
   * Exporta o grafo como JSON
   * @returns {Object} Dados do grafo serializados
   */
  export() {
    return {
      nodes: Array.from(this.nodes.values()),
      edges: Array.from(this.edges.values()),
      stats: this.getStats(),
      exportedAt: Date.now(),
    }
  }

  /**
   * Importa dados de um JSON
   * @param {Object} data - Dados para importar
   */
  import(data) {
    this.clear()

    // Importa nodes
    if (data.nodes && Array.isArray(data.nodes)) {
      for (const node of data.nodes) {
        this.nodes.set(node.id, node)
        this.adjacencyList.set(node.id, new Set())
      }
    }

    // Importa edges
    if (data.edges && Array.isArray(data.edges)) {
      for (const edge of data.edges) {
        this.edges.set(edge.id, edge)

        // Atualiza adjacency list
        const fromAdj = this.adjacencyList.get(edge.from)
        if (fromAdj) {
          fromAdj.add(edge.to)
        }
      }
    }

    this.persist()
  }
}

// Instância singleton do Identity Graph
let identityGraphInstance = null

/**
 * Obtém a instância singleton do Identity Graph
 * @returns {IdentityGraph} Instância do grafo
 */
export function getIdentityGraph() {
  if (!identityGraphInstance) {
    identityGraphInstance = new IdentityGraph()
    // Tenta carregar estado persistido
    identityGraphInstance.load()
  }
  return identityGraphInstance
}

/**
 * Exportação direta da instância para uso simplificado (Singleton)
 */
export const identityGraph = getIdentityGraph()

/**
 * Reseta a instância singleton (útil para testes)
 */
export function resetIdentityGraph() {
  if (identityGraphInstance) {
    identityGraphInstance.clear()
  }
  identityGraphInstance = null
}
