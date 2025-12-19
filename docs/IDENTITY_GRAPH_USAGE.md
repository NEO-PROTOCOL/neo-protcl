# 📖 Identity Graph — Guia de Uso

**Status:** ✅ **IMPLEMENTADO (PRIORIDADE ZERO)**  
**Localização:** `src/context/mcp/identityGraph.js`

---

## 🎯 Visão Geral

O **Identity Graph** é a estrutura de dados off-chain que mantém relacionamentos entre nós do Protocolo NΞØ. É a base para:

- Reputação (prioridade 1)
- Loop reputacional (prioridade 2)
- Admissão/defesa (prioridade 3)

---

## 🚀 Uso Básico

### **Importar**

```javascript
import { getIdentityGraph } from '../context/mcp/identityGraph';

const graph = getIdentityGraph();
```

### **Adicionar Nó**

```javascript
const node = graph.addNode('node_123', {
  address: '0x1234...',
  domain: 'developer',
  metadata: { role: 'validator' }
});
```

### **Criar Relacionamento**

```javascript
// Cria edge entre dois nós
const edge = graph.addEdge(
  'node_123',        // from
  'node_456',        // to
  'collaboration',   // type
  {                  // metadata
    actionHash: '0xabc...',
    impact: 10
  },
  0.8                // weight (0-1)
);
```

### **Consultar Relacionamentos**

```javascript
// Obter todos os relacionamentos de um nó
const edges = graph.getEdges('node_123');

// Obter nós conectados
const connected = graph.getConnectedNodes('node_123');

// Verificar se dois nós estão conectados
const connected = graph.areConnected('node_123', 'node_456');
```

---

## 🔗 Integração com MCP

O Identity Graph está integrado automaticamente com o MCP Context Guard:

### **Ao reconhecer um nó:**

```javascript
import { acknowledgeNodeOffChain } from '../context/mcp/index';

// Isso automaticamente adiciona ao Identity Graph
acknowledgeNodeOffChain('node_123', {
  address: '0x1234...',
  domain: 'developer'
});
```

### **Ao registrar interação:**

```javascript
import { registerInteraction } from '../context/mcp/index';

// Isso automaticamente cria edge no Identity Graph
registerInteraction({
  from: 'node_123',
  to: 'node_456',
  type: 'collaboration',
  actionHash: '0xabc...',
  impact: 10,
  weight: 0.8
});
```

---

## 📊 Métricas e Estatísticas

### **Grau de um Nó**

```javascript
const degree = graph.getDegree('node_123');
// Retorna número de conexões
```

### **Peso Total**

```javascript
const totalWeight = graph.getTotalWeight('node_123');
// Retorna soma dos pesos das edges
```

### **Estatísticas do Grafo**

```javascript
const stats = graph.getStats();
// {
//   nodeCount: 10,
//   edgeCount: 25,
//   averageDegree: 2.5,
//   averageWeight: 0.6
// }
```

---

## 💾 Persistência

O Identity Graph persiste automaticamente em `localStorage`:

- **Chave:** `neo_identity_graph`
- **Formato:** JSON serializado
- **Auto-save:** A cada modificação

### **Carregar Manualmente**

```javascript
const graph = getIdentityGraph();
graph.load(); // Carrega do localStorage
```

### **Exportar/Importar**

```javascript
// Exportar
const data = graph.export();

// Importar
graph.import(data);
```

---

## 🎨 Tipos de Relacionamentos

Tipos sugeridos (podem ser customizados):

- `interaction` - Interação básica
- `collaboration` - Colaboração
- `influence` - Influência
- `validation` - Validação
- `execution` - Execução conjunta
- `impact` - Impacto gerado

---

## ⚠️ Regras e Validações

1. **Self-loops não permitidos:** Um nó não pode ter relacionamento consigo mesmo
2. **Peso normalizado:** Pesos são automaticamente normalizados para 0-1
3. **Nós devem existir:** Não é possível criar edge para nós inexistentes
4. **Persistência automática:** Todas as modificações são salvas automaticamente

---

## 🔄 Próximos Passos

Com o Identity Graph implementado (PRIORIDADE ZERO), agora é possível:

1. ✅ **PRIORIDADE 1:** Implementar reputação mínima on-chain
2. ✅ **PRIORIDADE 2:** Implementar loop reputacional
3. ✅ **PRIORIDADE 3:** Implementar admissão/defesa

---

## 📚 Referências

- [Prioridades Absolutas](./PRIORIDADES_ABSOLUTAS_NEØ.md)
- [Identity Graph Audit](./IDENTITY_GRAPH_AUDIT.md)
- [NHIP-001 — NodeRegistry.sol](./nhip-001.md)

---

**NΞØ Protocol // A Mente é a Nova Blockchain**
