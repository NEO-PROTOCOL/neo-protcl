# 🛠️ Scripts Hardhat — Uso Prático

**Status:** ✅ **IMPLEMENTADO**  
**Data:** 2025-01-27

---

## 📋 Scripts Disponíveis

### **1. `inviteReviewer.js`**

**Executado por você (architect)** para criar convite on-chain.

**Uso:**
```bash
npx hardhat run scripts/inviteReviewer.js --network base
```

**Variáveis de ambiente (.env):**
```bash
NODE_DESIGNER_REVIEW_ADDRESS=0x...
REVIEWER_ADDRESS=0x...
REVIEW_SCOPE="Identity & Visual Coherence"
DEADLINE_DAYS=7
PROOF_OF_INTENT="NEØ::NodeDesigner::AndreMainart::Review::PoI"
PRIVATE_KEY=0x...
BASE_RPC_URL=https://mainnet.base.org
```

**Nota:** Deploy direto em **Base Mainnet** (produção), com planejamento e decisões fundamentadas.

---

### **2. `acceptReview.js`**

**Executado pelo revisor** com a wallet dele.

**Uso:**
```bash
npx hardhat run scripts/acceptReview.js --network base
```

**Variáveis de ambiente (.env):**
```bash
NODE_DESIGNER_REVIEW_ADDRESS=0x...
PRIVATE_KEY=0x... # Private key do revisor
BASE_RPC_URL=https://mainnet.base.org
```

**Nota:** Deploy direto em **Base Mainnet** (produção).

**O que faz:**
- Verifica se está em status `INVITED`
- Executa `acceptReview()`
- Confirma transação
- Exibe mensagem de sucesso

---

## 🔧 Setup Inicial

### **1. Instalar dependências Hardhat**

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

### **2. Configurar `.env`**

```bash
# Network RPC (Base Mainnet)
BASE_RPC_URL=https://mainnet.base.org

# Private Keys (NUNCA commitar no git)
PRIVATE_KEY=0x...

# Contrato deployado
NODE_DESIGNER_REVIEW_ADDRESS=0x...

# Configuração de convite (opcional, pode passar via CLI)
REVIEWER_ADDRESS=0x...
REVIEW_SCOPE="Identity & Visual Coherence"
DEADLINE_DAYS=7
PROOF_OF_INTENT="NEØ::NodeDesigner::AndreMainart::Review::PoI"
```

**Nota:** O projeto faz deploy direto em **Base Mainnet** (produção), com planejamento e decisões fundamentadas. Não usamos testnet.

### **3. Deploy do Contrato (se necessário)**

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network base
```

---

## 📝 Exemplo de Uso Completo

### **Passo 1: Você convida (architect)**

```bash
# Configurar .env com endereço do revisor
export REVIEWER_ADDRESS=0xAndreAddress
export DEADLINE_DAYS=7

# Executar
npx hardhat run scripts/inviteReviewer.js --network base
```

**Output:**
```
🎯 NEØ Protocol — Inviting Reviewer
=====================================
Contract: 0x...
Reviewer: 0xAndreAddress
Scope: Identity & Visual Coherence
Deadline: 2025-02-03T12:00:00.000Z
PoI Hash: 0x...

Sending transaction...
Transaction hash: 0x...
Waiting for confirmation...

✅ Review invited successfully!
```

---

### **Passo 2: Revisor aceita**

```bash
# Revisor configura .env com sua private key
export PRIVATE_KEY=0x... # Private key do revisor

# Executar
npx hardhat run scripts/acceptReview.js --network base
```

**Output:**
```
🎯 NEØ Protocol — Accept Review
=================================
Contract: 0x...
Signer: 0xAndreAddress

Current status: INVITED

Sending transaction...
Transaction hash: 0x...
Waiting for confirmation...

🟢 Review accepted. Analysis officially started.
```

---

## 🎯 Fluxo Completo

```text
Você → inviteReviewer (tx)
    ↓
Ele → acceptReview (tx)
    ↓
Contrato = ACCEPTED
    ↓
Você libera dossiê
    ↓
Silêncio operacional
```

**Sem PDF. Sem WhatsApp longo. Sem promessa. Sem teatro.**

**Só estado, transação e consequência.**

---

## 🔒 Segurança

- ✅ **NUNCA** commitar `.env` no git
- ✅ **NUNCA** expor `PRIVATE_KEY` publicamente
- ✅ Usar variáveis de ambiente ou `.env` (já no `.gitignore`)
- ✅ Verificar endereço do contrato antes de executar

---

## 📚 Referências

- [NodeDesignerReview.sol](../contracts/NodeDesignerReview.sol)
- [USO_PRATICO_NODE_DESIGNER_REVIEW.md](./USO_PRATICO_NODE_DESIGNER_REVIEW.md)
- [Hardhat Documentation](https://hardhat.org/docs)

---

**NΞØ Protocol // A Mente é a Nova Blockchain**
