# 🔄 Versionabilidade de Contratos — NΞØ Protocol

**Data:** 2025-01-27  
**Status:** Declaração Estrutural

---

## 🎯 Princípio Fundamental

> **"Contratos nesta fase são versionáveis e substituíveis. O que persiste é o registro de eventos e estados."**

---

## 📋 O Que Isso Significa

### **✅ O Que Persiste (Imutável):**

1. **Eventos On-Chain**
   - Emitidos na blockchain
   - Permanentes e imutáveis
   - Indexáveis para sempre
   - Base da narrativa do protocolo

2. **Estados Registrados**
   - Missões validadas
   - Admissões realizadas
   - Reputação atribuída
   - Histórico completo

3. **Provas Públicas**
   - Proof of Intent (PoI)
   - Proof of Delivery
   - Timestamps on-chain
   - Relações estabelecidas

### **🔄 O Que Pode Ser Substituído:**

1. **Contratos Inteligentes**
   - Podem ser deployados em novas versões
   - Novos endereços de contrato
   - Melhorias e otimizações
   - Correções de bugs

2. **Implementação**
   - Lógica interna pode mudar
   - Funções podem ser adicionadas
   - Gas optimization
   - Novos recursos

---

## 🏗️ Estratégia de Versionamento

### **Versão 1.0 (Atual):**

- `NeoNodeAdmission.sol` - Contrato genérico de admissão
- `ReputationBootstrap.sol` - Armazenamento mínimo de reputação
- `NodeAdmission.sol` - Admissão baseada em reputação
- `NodeRegistry.sol` - Registro de nós

### **Versão 2.0 (Futuro):**

- Novos contratos deployados
- Endereços diferentes
- Eventos compatíveis (mesma assinatura)
- Bridge indexa eventos de **ambas** as versões

### **Migração:**

```
Versão 1.0 (0xABC...)
  ↓ (eventos permanecem)
Versão 2.0 (0xXYZ...)
  ↓
Bridge indexa eventos de AMBAS versões
  ↓
Identity Graph agrega histórico completo
```

---

## 🔍 Compatibilidade de Eventos

### **Importante:**

Para manter compatibilidade, novos contratos devem:

- ✅ **Manter assinaturas de eventos** (mesmos nomes e parâmetros)
- ✅ **Manter campos indexed** (para consulta eficiente)
- ✅ **Adicionar novos eventos** (não remover antigos)

### **Exemplo:**

```solidity
// Versão 1.0
event NodeValidated(address indexed candidate, string indexed nodeType);

// Versão 2.0 (compatível)
event NodeValidated(address indexed candidate, string indexed nodeType);
event NodeValidatedV2(address indexed candidate, string indexed nodeType, uint256 reputationDelta); // Novo
```

---

## 📊 Impacto no Identity Graph

### **Agregação de Múltiplas Versões:**

O Identity Graph deve:

1. **Indexar eventos de todos os contratos** (v1, v2, v3...)
2. **Agregar histórico completo** (não apenas versão atual)
3. **Manter referência ao contrato** (qual versão emitiu o evento)
4. **Calcular reputação agregada** (soma de todas as versões)

### **Exemplo:**

```javascript
// Bridge indexa eventos de múltiplos contratos
const contracts = [
  '0xABC...', // Versão 1.0
  '0xXYZ...', // Versão 2.0
  '0x123...'  // Versão 3.0
];

contracts.forEach(contractAddress => {
  const contract = new ethers.Contract(contractAddress, abi, provider);
  contract.on('NodeValidated', (candidate, nodeType, event) => {
    graph.addEdge('neo:protocol', `node:${candidate}`, 'validated_by', {
      contract: contractAddress,
      version: getVersion(contractAddress),
      event: 'NodeValidated',
      ...
    });
  });
});
```

---

## 🎯 Liberdade de Desenvolvimento

### **O Que Isso Permite:**

- ✅ **Iteração rápida** - Pode fazer novos deploys
- ✅ **Correções** - Bugs podem ser corrigidos
- ✅ **Melhorias** - Otimizações podem ser implementadas
- ✅ **Novos recursos** - Funcionalidades podem ser adicionadas

### **O Que É Preservado:**

- ✅ **Histórico completo** - Eventos antigos permanecem
- ✅ **Provas públicas** - Validações não são perdidas
- ✅ **Relações estabelecidas** - Edges do Graph permanecem
- ✅ **Reputação acumulada** - Não é perdida

---

## 📝 Declaração Formal

### **Versionabilidade Explícita:**

Todos os contratos do NΞØ Protocol nesta fase:

1. **São versionáveis** - Podem ser substituídos por novas versões
2. **São substituíveis** - Novos deploys são permitidos
3. **Mantêm compatibilidade** - Eventos compatíveis entre versões
4. **Preservam histórico** - Eventos antigos são indexados

### **O Que Persiste:**

- ✅ Eventos on-chain (imutáveis)
- ✅ Estados registrados (histórico)
- ✅ Provas públicas (PoI, PoD)
- ✅ Relações no Identity Graph

### **O Que Pode Mudar:**

- 🔄 Endereços de contratos
- 🔄 Implementação interna
- 🔄 Otimizações
- 🔄 Novos recursos

---

## 🔗 Integração com Bridge

### **Bridge Multi-Versão:**

O `reputationBridge.js` deve:

1. **Conectar a múltiplos contratos** (todas as versões)
2. **Indexar eventos de todos** (agregação)
3. **Manter referência de versão** (qual contrato emitiu)
4. **Atualizar Graph agregado** (histórico completo)

---

## 📚 Documentação de Versões

### **Registro de Versões:**

Manter documentação de:

- Versão do contrato
- Endereço deployado
- Data de deploy
- Mudanças em relação à versão anterior
- Compatibilidade de eventos

### **Exemplo:**

```markdown
## Versão 1.0
- **Endereço:** 0xABC...
- **Deploy:** 2025-01-27
- **Eventos:** NodeInvited, NodeAccepted, NodeSubmitted, NodeValidated, NodeExpired

## Versão 2.0
- **Endereço:** 0xXYZ...
- **Deploy:** 2025-02-15
- **Mudanças:** Adicionado suporte a múltiplos tipos de nó
- **Eventos:** Compatível com v1.0 + novos eventos
```

---

## ✅ Checklist

- [ ] Contrato declara versionabilidade
- [ ] Eventos são compatíveis entre versões
- [ ] Bridge suporta múltiplas versões
- [ ] Graph agrega histórico completo
- [ ] Documentação de versões mantida

---

**NΞØ Protocol // A Mente é a Nova Blockchain**
