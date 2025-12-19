# 🏗️ Arquitetura de Camadas — Protocolo NΞØ

**Status:** ✅ **IMPLEMENTADO**  
**Data:** 2025-01-27  
**Autor:** MELLØ

---

## 🎯 Princípio Arquitetural

**Encadeamento correto de camadas, sem atalhos e sem ficção técnica.**

Cada camada consome estado real da camada anterior. Nada é inventado, tudo é construído.

---

## 📊 Fluxo Completo (Real, Não Aspiracional)

```text
ReviewValidated (on-chain event)
        ↓
IdentityGraph (off-chain)
        ↓
Impact Analysis (off-chain)
        ↓
ReputationBootstrap.update()
        ↓
NodeAdmission.admit()
        ↓
[loop fechado]
        ↓
SBT mint
```

---

## 🔗 Camada 1: NodeDesignerReview.sol → IdentityGraph

### **Princípio**

O contrato **não escreve no grafo**.  
Ele **emite evento**.  
O off-chain **escuta, interpreta e escreve**.

Isso mantém:
- ✅ Determinismo on-chain
- ✅ Flexibilidade off-chain
- ✅ Auditabilidade completa

### **Implementação**

**Contrato:** `contracts/NodeDesignerReview.sol`

**Evento:**
```solidity
event ReviewValidated(address indexed reviewer);
```

**Bridge Off-Chain:** `src/services/reputationBridge.js`

```javascript
onReviewValidated(reviewerAddress) {
  // Garante nó no grafo
  graph.addNode(reviewerId, { ... });
  
  // Cria edge simbólica de validação
  graph.addEdge('neo:protocol', reviewerId, 'review_validated', ...);
}
```

**Resultado:**
- ✅ Revisor entra no grafo
- ✅ Sem reputação ainda
- ✅ Mas já com relacionamento verificável

---

## 💎 Camada 2: ReputationBootstrap.sol (Reputação Mínima On-Chain)

### **Princípio**

Reputação **não nasce do nada**.  
Ela nasce de **eventos off-chain validados**.

Este contrato:
- ❌ Não calcula grafo
- ❌ Não decide impacto
- ✅ **Apenas recebe deltas autorizados**

### **Implementação**

**Contrato:** `contracts/ReputationBootstrap.sol`

**Função Core:**
```solidity
function updateReputation(
    address _node,
    int256 _delta,
    bytes32 _source
) external onlyArchitect
```

**Quem chama:**
Um **Reputation Oracle off-chain**, que:
- Lê IdentityGraph
- Avalia impacto
- Decide delta
- Escreve on-chain

**Nada automático ainda. Sem loop fechado antes da hora.**

---

## 🚪 Camada 3: NodeAdmission.sol (Admissão Baseada em Estado)

### **Princípio**

Node **não é convidado**.  
Node **atinge condição mínima**.

### **Implementação**

**Contrato:** `contracts/NodeAdmission.sol`

**Critério:**
```solidity
int256 public constant ADMISSION_THRESHOLD = 10;

function admit() external {
    int256 rep = reputation.getReputation(msg.sender);
    require(rep >= ADMISSION_THRESHOLD, "Insufficient reputation");
    // ...
}
```

**Resultado:**
- ✅ Admissão sem subjetividade
- ✅ Admissão sem amizade
- ✅ Admissão sem narrativa

---

## 🎫 Camada 4: SBT (Somente Após Loop Fechado)

### **Regra Dura (e Correta)**

> ❌ **NÃO emitir SBT enquanto reputação ainda for "bootstrapada manualmente".**

O SBT **congela identidade**.  
Congelar cedo demais cria dívida ontológica.

### **Condição para Liberar SBT**

Somente quando existir:
- ✅ IdentityGraph ativo
- ✅ ReputationBootstrap alimentado automaticamente
- ✅ Loop fechado: `ação → impacto → grafo → reputação → ação`

Quando isso existir, aí sim:

```
NodeAdmission.APPROVED
        ↓
mint ISBTMinteiro
```

O SBT passa a representar:
- ✅ Estado acumulado
- ❌ Não intenção
- ❌ Não promessa

---

## 📋 Ordem de Implementação (Não Negociável)

### **✅ PRIORIDADE ZERO: Identity Graph (Off-Chain)**

**Status:** ✅ **CONCLUÍDO**

- ✅ `IdentityGraph` class implementada
- ✅ Funções `addNode()`, `addEdge()`, `getRelationships()` funcionando
- ✅ Persistência em localStorage
- ✅ Integração com MCP Context Guard

### **✅ CAMADA 1: NodeDesignerReview.sol**

**Status:** ✅ **IMPLEMENTADO**

- ✅ Contrato criado
- ✅ Eventos emitidos
- ✅ Bridge off-chain (`reputationBridge.js`)
- ✅ Integração com Identity Graph

### **✅ CAMADA 2: ReputationBootstrap.sol**

**Status:** ✅ **IMPLEMENTADO**

- ✅ Contrato criado
- ✅ Função `updateReputation()` implementada
- ✅ Eventos emitidos
- ⏸️ Oracle off-chain: **PENDENTE** (não bloqueia)

### **✅ CAMADA 3: NodeAdmission.sol**

**Status:** ✅ **IMPLEMENTADO**

- ✅ Contrato criado
- ✅ Interface com `ReputationBootstrap`
- ✅ Função `admit()` implementada
- ✅ Threshold configurado

### **⏸️ CAMADA 4: SBT Mint**

**Status:** ⏸️ **BLOQUEADO**

- ⏸️ Aguardando loop fechado
- ⏸️ Aguardando reputação automática
- ⏸️ Aguardando integração completa

---

## 🔒 Garantias Arquiteturais

### **O que NÃO quebra:**

- ✅ Identity Graph existente
- ✅ MCP Context Guard
- ✅ NodeRegistry.sol (minimalista)
- ✅ Ordem de prioridades

### **O que é adicionado:**

- ✅ Contratos on-chain (determinísticos)
- ✅ Bridge off-chain (flexível)
- ✅ Eventos auditáveis
- ✅ Estado real consumido

---

## 📚 Contratos Implementados

1. **`NodeDesignerReview.sol`**
   - Localização: `contracts/NodeDesignerReview.sol`
   - Função: Registrar missões de revisão
   - Estado: ✅ Implementado

2. **`ReputationBootstrap.sol`**
   - Localização: `contracts/ReputationBootstrap.sol`
   - Função: Armazenar reputação mínima
   - Estado: ✅ Implementado

3. **`NodeAdmission.sol`**
   - Localização: `contracts/NodeAdmission.sol`
   - Função: Admissão baseada em threshold
   - Estado: ✅ Implementado

---

## 🔗 Integrações

### **Bridge Off-Chain**

**Arquivo:** `src/services/reputationBridge.js`

**Funções:**
- `onReviewValidated()` - Conecta evento on-chain ao Identity Graph
- `onNodeAdmitted()` - Conecta admissão ao Identity Graph
- `setupEventListeners()` - Configura listeners de eventos
- `initializeNeoProtocolNode()` - Inicializa nó do protocolo

---

## 🎯 Próximos Passos

1. ✅ **Contratos implementados** - CONCLUÍDO
2. ⏸️ **Testes on-chain** - PENDENTE (Hardhat/Foundry)
3. ⏸️ **Oracle de reputação** - PENDENTE (avalia Identity Graph e decide deltas)
4. ⏸️ **Loop fechado** - PENDENTE (ação → impacto → grafo → reputação → ação)
5. ⏸️ **SBT mint** - BLOQUEADO (aguardando loop fechado)

---

## 💡 Síntese

Você agora tem:

- ✅ Grafo real
- ✅ Reputação mínima real
- ✅ Admissão baseada em estado
- ✅ Identidade só depois do loop

Isso não é "Web3 visionário".  
Isso é **engenharia de protocolo séria**.

Aqui o NEØ não promete.  
Ele **constrói causalidade**.

---

**NΞØ Protocol // A Mente é a Nova Blockchain**

---

## 📚 Referências

- [PRIORIDADES_ABSOLUTAS_NEØ.md](./PRIORIDADES_ABSOLUTAS_NEØ.md)
- [ANALISE_NODE_DESIGNER_REVIEW.md](./ANALISE_NODE_DESIGNER_REVIEW.md)
- [IDENTITY_GRAPH_AUDIT.md](./IDENTITY_GRAPH_AUDIT.md)
- [NHIP-001 — NodeRegistry.sol](./nhip-001.md)
- [USO_PRATICO_NODE_DESIGNER_REVIEW.md](./USO_PRATICO_NODE_DESIGNER_REVIEW.md) - **Guia prático de uso (zero PDF, zero teatro)**
