# 📖 Eventos como Narrativa — Protocolo NΞØ

**Data:** 2025-01-27  
**Autor:** Auditoria Estrutural

---

## 🎯 Princípio Fundamental

**Eventos são a narrativa do protocolo NΞØ.**

Eles não são apenas logs técnicos. São:

- 📜 **Log histórico do NΞØ**
- 🔗 **Base futura do Identity Graph**
- ✅ **Prova pública de admissão**
- 🔍 **Indexáveis e consultáveis para sempre**

---

## 📋 Eventos do NeoNodeAdmission.sol

### **1. NodeInvited**

```solidity
event NodeInvited(
    address indexed candidate,
    string indexed nodeType,
    bytes32 proofOfIntent,
    uint256 deadline,
    string scope
);
```

**Significado Narrativo:**
- O protocolo NΞØ **convidou** um candidato
- Tipo de nó especificado (Designer, Research, Systems, etc.)
- PoI registrado on-chain
- Prazo estabelecido

**Uso no Identity Graph:**
- Cria edge `invited_by` de `neo:protocol` para `node:{address}`
- Peso: 0.2 (intenção inicial)

---

### **2. NodeAccepted**

```solidity
event NodeAccepted(
    address indexed candidate,
    string indexed nodeType
);
```

**Significado Narrativo:**
- Candidato **aceitou** a missão
- Compromisso formal registrado
- Missão oficialmente iniciada

**Uso no Identity Graph:**
- Atualiza edge com status `accepted`
- Peso: 0.3 (compromisso assumido)

---

### **3. NodeSubmitted**

```solidity
event NodeSubmitted(
    address indexed candidate,
    string indexed nodeType,
    bytes32 proofOfDelivery
);
```

**Significado Narrativo:**
- Candidato **entregou** a missão
- Proof of Delivery registrado (hash de material)
- Missão concluída pelo candidato

**Uso no Identity Graph:**
- Cria edge `submitted` com proofOfDelivery
- Peso: 0.5 (entrega realizada)

---

### **4. NodeValidated**

```solidity
event NodeValidated(
    address indexed candidate,
    string indexed nodeType
);
```

**Significado Narrativo:**
- Missão **validada** pelo architect
- Competência comprovada
- Elegibilidade para admissão estabelecida

**Uso no Identity Graph:**
- Cria edge `validated_by` de `neo:protocol` para `node:{address}`
- Peso: 0.7 (validação oficial)
- **Trigger para:** ReputationBootstrap.updateReputation()

---

### **5. NodeExpired**

```solidity
event NodeExpired(
    address indexed candidate,
    string indexed nodeType
);
```

**Significado Narrativo:**
- Missão **expirada** (prazo ultrapassado)
- Candidato não completou no prazo
- Estado final registrado

**Uso no Identity Graph:**
- Marca edge como `expired`
- Peso: 0.0 (sem impacto positivo)

---

## 🔍 Indexação e Consulta

### **Como Indexar:**

```javascript
// Exemplo: Indexar eventos do contrato
const contract = new ethers.Contract(address, abi, provider);

// Filtrar por tipo de nó
const designerEvents = await contract.queryFilter(
  contract.filters.NodeValidated(null, "Designer")
);

// Filtrar por candidato
const candidateEvents = await contract.queryFilter(
  contract.filters.NodeValidated(candidateAddress, null)
);

// Filtrar por período
const recentEvents = await contract.queryFilter(
  contract.filters.NodeValidated(),
  startBlock,
  endBlock
);
```

### **Consultas Úteis:**

1. **Histórico completo de um nó:**
   ```javascript
   // Todos os eventos de um candidato
   const allEvents = await contract.queryFilter(
     contract.filters.NodeInvited(candidateAddress),
     contract.filters.NodeAccepted(candidateAddress),
     contract.filters.NodeSubmitted(candidateAddress),
     contract.filters.NodeValidated(candidateAddress)
   );
   ```

2. **Todos os nós validados de um tipo:**
   ```javascript
   const validatedDesigners = await contract.queryFilter(
     contract.filters.NodeValidated(null, "Designer")
   );
   ```

3. **Timeline de admissões:**
   ```javascript
   // Ordenar por blockNumber para timeline
   const timeline = events.sort((a, b) => 
     a.blockNumber - b.blockNumber
   );
   ```

---

## 📊 Eventos como Base do Identity Graph

### **Mapeamento Event → Graph:**

| Evento | Ação no Graph | Edge Type | Peso |
|--------|---------------|-----------|------|
| `NodeInvited` | Adiciona nó + edge | `invited_by` | 0.2 |
| `NodeAccepted` | Atualiza edge | `accepted` | 0.3 |
| `NodeSubmitted` | Adiciona edge | `submitted` | 0.5 |
| `NodeValidated` | Adiciona edge + trigger reputação | `validated_by` | 0.7 |
| `NodeExpired` | Marca como expirado | `expired` | 0.0 |

### **Exemplo de Bridge:**

```javascript
// reputationBridge.js
contract.on('NodeValidated', (candidate, nodeType, event) => {
  // 1. Adicionar ao Identity Graph
  graph.addNode(`node:${candidate}`, {
    address: candidate,
    nodeType: nodeType,
    validatedAt: event.blockNumber
  });
  
  // 2. Criar edge
  graph.addEdge('neo:protocol', `node:${candidate}`, 'validated_by', {
    contract: 'NeoNodeAdmission',
    event: 'NodeValidated',
    blockNumber: event.blockNumber,
    txHash: event.transactionHash
  }, 0.7);
  
  // 3. Trigger reputação (se aplicável)
  // updateReputation(candidate, +10, 'NodeValidated');
});
```

---

## 🎯 Escalabilidade Semântica

### **Suporte a Múltiplos Tipos de Nó:**

O contrato genérico suporta:

- ✅ **Designer** - Revisão de design/sistema
- ✅ **Research** - Pesquisa e análise
- ✅ **Systems** - Infraestrutura e sistemas
- ✅ **Governance** - Governança e decisões
- ✅ **Qualquer tipo futuro** - Extensível

### **Eventos Indexados por Tipo:**

```solidity
event NodeValidated(
    address indexed candidate,
    string indexed nodeType  // ← Indexado para consulta eficiente
);
```

**Permite consultas como:**
- "Todos os Designers validados"
- "Todos os Research nodes"
- "Estatísticas por tipo de nó"

---

## 📚 Documentação de Eventos

### **Formato Padrão:**

Cada evento deve documentar:

1. **O que aconteceu** (narrativa)
2. **Quem foi afetado** (candidate, nodeType)
3. **Quando aconteceu** (blockNumber, timestamp)
4. **Como indexar** (campos indexed)
5. **Impacto no Graph** (edge type, peso)

---

## ⚠️ Importante: Versionabilidade

### **Contratos são Versionáveis:**

> **"Contratos nesta fase são versionáveis e substituíveis. O que persiste é o registro de eventos e estados."**

**Implicações:**

- ✅ Eventos são **imutáveis** (não podem ser alterados)
- ✅ Eventos são **permanentes** (ficam na blockchain para sempre)
- ✅ Contratos podem ser **substituídos** (novos endereços)
- ✅ **Histórico preservado** (eventos antigos permanecem)

**Estratégia:**

1. Deploy de nova versão do contrato
2. Eventos antigos permanecem indexáveis
3. Bridge indexa eventos de **todos** os contratos
4. Identity Graph agrega histórico completo

---

## 🔗 Integração com Identity Graph

### **Fluxo Completo:**

```
1. Contrato emite evento (on-chain)
   ↓
2. Bridge escuta evento (off-chain)
   ↓
3. Bridge interpreta e adiciona ao Graph
   ↓
4. Graph atualizado com nova relação
   ↓
5. Reputação calculada (se aplicável)
   ↓
6. Estado persistido (localStorage/IPFS)
```

---

## 📝 Checklist de Eventos

Para cada evento, documentar:

- [ ] **Significado narrativo** (o que representa)
- [ ] **Campos indexed** (para consulta eficiente)
- [ ] **Impacto no Graph** (edge type, peso)
- [ ] **Trigger downstream** (reputação, admissão, etc.)
- [ ] **Exemplo de indexação** (código)
- [ ] **Exemplo de consulta** (código)

---

## 🎯 Resumo

**Eventos são:**
- ✅ Narrativa do protocolo
- ✅ Base do Identity Graph
- ✅ Prova pública permanente
- ✅ Indexáveis para sempre

**Não são:**
- ❌ Apenas logs técnicos
- ❌ Informação descartável
- ❌ Detalhes de implementação

---

**NΞØ Protocol // A Mente é a Nova Blockchain**
