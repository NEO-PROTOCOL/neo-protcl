# 🔧 Setup Hardhat — NEØ Protocol

**Status:** ✅ **PRONTO PARA USO**  
**Data:** 2025-01-27

---

## 📦 Instalação

### **1. Instalar dependências Hardhat**

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv
```

**Nota:** O projeto já usa `ethers@^5.7.2`, que é compatível com Hardhat.

---

## ⚙️ Configuração

### **1. Arquivo `.env`**

Adicione ao `.env` (já está no `.gitignore`):

```bash
# Network RPC URLs
POLYGON_RPC_URL=https://polygon-rpc.com
BASE_RPC_URL=https://mainnet.base.org
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# Private Keys (NUNCA commitar no git)
PRIVATE_KEY=0x... # Sua private key (architect ou revisor)

# Contrato deployado
NODE_DESIGNER_REVIEW_ADDRESS=0x... # Após deploy

# Configuração de convite (opcional)
REVIEWER_ADDRESS=0x... # Endereço do revisor
REVIEW_SCOPE="Identity & Visual Coherence"
DEADLINE_DAYS=7
PROOF_OF_INTENT="NEØ::NodeDesigner::AndreMainart::Review::PoI"
```

---

## 🚀 Uso

### **Script 1: Invitar Revisor**

**Executado por você (architect):**

```bash
npx hardhat run scripts/inviteReviewer.js --network base
```

**Ou com variáveis inline:**

```bash
REVIEWER_ADDRESS=0x... DEADLINE_DAYS=7 \
npx hardhat run scripts/inviteReviewer.js --network base
```

**Nota:** O projeto faz deploy direto em **Base Mainnet** (não testnet), com planejamento e decisões fundamentadas.

---

### **Script 2: Aceitar Revisão**

**Executado pelo revisor:**

```bash
npx hardhat run scripts/acceptReview.js --network base
```

**Nota:** Deploy direto em **Base Mainnet** (produção).

**O script verifica automaticamente:**
- ✅ Se está conectado
- ✅ Se está em status `INVITED`
- ✅ Executa `acceptReview()`
- ✅ Confirma transação

---

## 📋 Scripts Disponíveis

### **`scripts/inviteReviewer.js`**

Cria convite on-chain para revisor.

**Variáveis de ambiente:**
- `NODE_DESIGNER_REVIEW_ADDRESS` - Endereço do contrato
- `REVIEWER_ADDRESS` - Endereço do revisor
- `REVIEW_SCOPE` - Escopo da revisão
- `DEADLINE_DAYS` - Prazo em dias
- `PROOF_OF_INTENT` - PoI string
- `PRIVATE_KEY` - Private key do architect

---

### **`scripts/acceptReview.js`**

Aceita revisão on-chain.

**Variáveis de ambiente:**
- `NODE_DESIGNER_REVIEW_ADDRESS` - Endereço do contrato
- `PRIVATE_KEY` - Private key do revisor

---

## 🔒 Segurança

- ✅ `.env` já está no `.gitignore`
- ✅ **NUNCA** commitar `PRIVATE_KEY`
- ✅ **NUNCA** expor private keys publicamente
- ✅ Usar variáveis de ambiente ou `.env`

---

## 📚 Referências

- [SCRIPTS_HARDHAT_USO.md](./SCRIPTS_HARDHAT_USO.md) - Guia de uso detalhado
- [USO_PRATICO_NODE_DESIGNER_REVIEW.md](./USO_PRATICO_NODE_DESIGNER_REVIEW.md) - Fluxo prático
- [NodeDesignerReview.sol](../contracts/NodeDesignerReview.sol) - Contrato
- [Hardhat Documentation](https://hardhat.org/docs)

---

**NΞØ Protocol // A Mente é a Nova Blockchain**
