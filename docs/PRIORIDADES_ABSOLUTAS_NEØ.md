# 🎯 PRIORIDADES ABSOLUTAS — Protocolo NΞØ

**Status:** ⚠️ **ORDEM NÃO NEGOCIÁVEL**  
**Data:** 2025-01-27  
**Autor:** MELLØ

---

## ⚠️ DECLARAÇÃO DE ORDEM

A auditoria deixa uma única ordem lógica possível.

**Ordem correta (não negociável):**

```
1. Identity Graph (off-chain)  ← PRIORIDADE ZERO
2. Reputação mínima (on-chain)
3. Loop reputacional
4. Só então: admissão / defesa / nodes
```

**Qualquer coisa fora dessa ordem vira ficção técnica.**

---

## 📋 DETALHAMENTO DAS PRIORIDADES

### **PRIORIDADE ZERO: Identity Graph (off-chain)**

**Status:** 🔴 **EM IMPLEMENTAÇÃO**

**O que deve ser implementado:**

- ✅ Estrutura de dados de grafo (nodes, edges, relationships)
- ✅ Funções para criar relacionamentos entre nós
- ✅ Funções para consultar relacionamentos
- ✅ Persistência off-chain (localStorage + IPFS futuro)
- ✅ Integração com MCP Context Guard

**Localização:** `src/context/mcp/identityGraph.js`

**Bloqueia:** Tudo que vem depois

---

### **PRIORIDADE 1: Reputação mínima (on-chain)**

**Status:** ⏸️ **BLOQUEADO** até Prioridade Zero estar completa

**O que deve ser implementado:**

- Estender `NodeRegistry.sol` com campo `reputation`
- Função `updateReputation()`
- Função `getReputation()`
- Eventos de atualização de reputação

**Bloqueia:** Prioridades 2 e 3

---

### **PRIORIDADE 2: Loop reputacional**

**Status:** ⏸️ **BLOQUEADO** até Prioridades 0 e 1 estarem completas

**O que deve ser implementado:**

- Mecanismo para registrar ações executadas
- Cálculo de impacto baseado em ações
- Atualização automática de reputação
- Feedback loop: Execução → Impacto → Reputação → Execução

**Bloqueia:** Prioridade 3

---

### **PRIORIDADE 3: Admissão / Defesa / Nodes**

**Status:** ⏸️ **BLOQUEADO** até Prioridades 0, 1 e 2 estarem completas

**O que deve ser implementado:**

- Sistema de admissão de novos nós
- Sistema de defesa contra nós maliciosos
- Expansão de funcionalidades de nodes

---

## 🚫 PROIBIÇÕES

**É PROIBIDO implementar:**

- ❌ Qualquer funcionalidade de admissão/defesa antes do Identity Graph
- ❌ Qualquer funcionalidade de reputação on-chain antes do Identity Graph
- ❌ Qualquer loop reputacional antes do Identity Graph e reputação mínima
- ❌ Qualquer expansão de nodes antes das prioridades anteriores

**Razão:** Sem Identity Graph, não há base para relacionamentos. Sem relacionamentos, não há como calcular reputação. Sem reputação, não há como fechar loops. Sem loops, não há como validar admissões.

---

## ✅ CRITÉRIOS DE CONCLUSÃO

### **Prioridade Zero está completa quando:**

- [ ] `IdentityGraph` class implementada
- [ ] Funções `addNode()`, `addEdge()`, `getRelationships()` funcionando
- [ ] Persistência em localStorage funcionando
- [ ] Integração com MCP Context Guard testada
- [ ] Testes básicos passando

### **Prioridade 1 está completa quando:**

- [ ] `NodeRegistry.sol` estendido com `reputation`
- [ ] Funções de atualização implementadas
- [ ] Eventos emitidos corretamente
- [ ] Testes on-chain passando

### **Prioridade 2 está completa quando:**

- [ ] Mecanismo de registro de ações funcionando
- [ ] Cálculo de impacto implementado
- [ ] Atualização automática de reputação funcionando
- [ ] Loop fechado e testado

### **Prioridade 3 está completa quando:**

- [ ] Sistema de admissão implementado
- [ ] Sistema de defesa implementado
- [ ] Expansão de nodes funcionando

---

## 📝 NOTAS

**Por que essa ordem?**

1. **Identity Graph é a base:** Sem estrutura de relacionamentos, não há como rastrear interações
2. **Reputação precisa de grafo:** Para calcular reputação, precisa saber quem interage com quem
3. **Loop precisa de ambos:** Precisa de grafo para rastrear e reputação para validar
4. **Admissão precisa de tudo:** Só pode admitir/defender quando tem sistema completo funcionando

**Qualquer desvio dessa ordem resulta em:**
- Implementações incompletas
- Dependências quebradas
- Ficção técnica (código que não funciona na prática)

---

**NΞØ Protocol // A Mente é a Nova Blockchain**

---

## 📚 Referências

- [Identity Graph Audit](./IDENTITY_GRAPH_AUDIT.md)
- [NHIP-001 — NodeRegistry.sol](./nhip-001.md)
- [Proof of Intention Architecture](./PROOF_OF_INTENTION_ARCHITECTURE.md)
