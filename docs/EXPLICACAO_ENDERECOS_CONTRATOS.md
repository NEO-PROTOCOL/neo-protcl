# 📍 Explicação: Endereços dos Contratos para Gasless

**Data:** 2025-01-27

---

## ❓ O Que São Esses Endereços?

**NÃO são contratos de token!**

São os **contratos do protocolo NΞØ** que já existem no seu projeto.

---

## 📋 Contratos do NΞØ Protocol

### **1. NodeDesignerReview.sol**

- **Arquivo:** `contracts/NodeDesignerReview.sol`
- **Função:** Gerencia revisões de design/sistema antes da admissão
- **Endereço após deploy:** `0x[ENDEREÇO_REAL_AQUI]`

### **2. ReputationBootstrap.sol**

- **Arquivo:** `contracts/ReputationBootstrap.sol`
- **Função:** Armazena reputação mínima on-chain
- **Endereço após deploy:** `0x[ENDEREÇO_REAL_AQUI]`

### **3. NodeAdmission.sol**

- **Arquivo:** `contracts/NodeAdmission.sol`
- **Função:** Admissão de nós baseada em reputação
- **Endereço após deploy:** `0x[ENDEREÇO_REAL_AQUI]`

### **4. NodeRegistry.sol**

- **Arquivo:** `contracts/NodeRegistry.sol`
- **Função:** Registro principal de nós do protocolo
- **Endereço após deploy:** `0x[ENDEREÇO_REAL_AQUI]`

---

## 🔍 O Que Significa `[ENDEREÇO_DO_CONTRATO]`?

### **É um PLACEHOLDER (exemplo)**

**NÃO use literalmente!** É apenas um exemplo para mostrar o formato.

### **Formato Correto:**

```
0x1234567890123456789012345678901234567890
```

- ✅ Começa com `0x`
- ✅ Seguido de 40 caracteres hexadecimais (0-9, a-f)
- ✅ Total: 42 caracteres

### **Exemplo Incorreto (NÃO faça):**

```
❌ [ENDEREÇO_DO_CONTRATO]
❌ 0x[ENDEREÇO_DO_CONTRATO]
❌ ENDEREÇO_DO_CONTRATO
```

---

## 🚀 Como Obter os Endereços Reais

### **Passo 1: Fazer Deploy dos Contratos**

```bash
# Compilar
npx hardhat compile

# Deploy em Base Sepolia (testnet)
npx hardhat run scripts/deploy.js --network baseSepolia
```

### **Passo 2: Copiar os Endereços**

Após o deploy, você verá algo assim:

```
Deploying NodeDesignerReview...
NodeDesignerReview deployed to: 0xABC123DEF456GHI789JKL012MNO345PQR678STU

Deploying ReputationBootstrap...
ReputationBootstrap deployed to: 0xXYZ789ABC123DEF456GHI789JKL012MNO345PQR

Deploying NodeAdmission...
NodeAdmission deployed to: 0x123ABC456DEF789GHI012JKL345MNO678PQR901STU

Deploying NodeRegistry...
NodeRegistry deployed to: 0xDEF456GHI789JKL012MNO345PQR678STU901VWX
```

**Esses são os endereços REAIS que você deve usar!**

### **Passo 3: Adicionar no Thirdweb Dashboard**

No campo "Restrict to specific contract addresses", adicione:

```
0xABC123DEF456GHI789JKL012MNO345PQR678STU
0xXYZ789ABC123DEF456GHI789JKL012MNO345PQR
0x123ABC456DEF789GHI012JKL345MNO678PQR901STU
0xDEF456GHI789JKL012MNO345PQR678STU901VWX
```

**Um endereço por linha, sem placeholders!**

---

## 🎯 Resumo Visual

### **Antes do Deploy:**

```
Contratos no código:
├── NodeDesignerReview.sol ✅ (existe)
├── ReputationBootstrap.sol ✅ (existe)
├── NodeAdmission.sol ✅ (existe)
└── NodeRegistry.sol ✅ (existe)

Endereços: ❌ (ainda não existem)
```

### **Após Deploy:**

```
Contratos deployados:
├── NodeDesignerReview.sol → 0xABC123... ✅
├── ReputationBootstrap.sol → 0xXYZ789... ✅
├── NodeAdmission.sol → 0x123ABC... ✅
└── NodeRegistry.sol → 0xDEF456... ✅

Endereços: ✅ (agora existem e podem ser usados)
```

---

## ⚠️ Importante

### **NÃO são:**
- ❌ Contratos de token (ERC-20, ERC-721)
- ❌ Contratos de terceiros
- ❌ Placeholders como `[ENDEREÇO_DO_CONTRATO]`

### **SÃO:**
- ✅ Contratos do protocolo NΞØ
- ✅ Contratos que você mesmo vai fazer deploy
- ✅ Endereços reais após o deploy (formato `0x` + 40 hex)

---

## 📝 Checklist

- [ ] Entendi que NÃO são contratos de token
- [ ] Entendi que são os 4 contratos do protocolo NΞØ
- [ ] Entendi que `[ENDEREÇO_DO_CONTRATO]` é apenas exemplo
- [ ] Vou fazer deploy dos contratos primeiro
- [ ] Vou copiar os endereços reais após deploy
- [ ] Vou adicionar os endereços reais no Dashboard (não placeholders)

---

## 💡 Dica

**Salve os endereços em `.env.local` após deploy:**

```bash
# Contratos Deployados (Base Mainnet - PRODUÇÃO)
# O projeto faz deploy direto em mainnet com planejamento e decisões fundamentadas
NODE_DESIGNER_REVIEW_ADDRESS=0xABC123DEF456GHI789JKL012MNO345PQR678STU
REPUTATION_BOOTSTRAP_ADDRESS=0xXYZ789ABC123DEF456GHI789JKL012MNO345PQR
NODE_ADMISSION_ADDRESS=0x123ABC456DEF789GHI012JKL345MNO678PQR901STU
NODE_REGISTRY_ADDRESS=0xDEF456GHI789JKL012MNO345PQR678STU901VWX
```

Isso facilita copiar e colar no Dashboard.

---

## 🌐 Rede Blockchain: Base (Não Ethereum Mainnet)

### **Importante:**

O projeto NΞØ Protocol usa **Base** como rede principal, **NÃO Ethereum Mainnet**.

### **Redes Disponíveis:**

#### **1. Base Sepolia (Testnet)**
- **Chain ID:** 84532
- **Moeda nativa:** ETH (testnet)
- **Uso:** Testes e desenvolvimento
- **Custo:** Gratuito (ETH de teste)

#### **2. Base (Mainnet)**
- **Chain ID:** 8453
- **Moeda nativa:** ETH (real)
- **Uso:** Produção
- **Custo:** ETH real (mas gasless patrocina)

### **Por Que Base?**

- ✅ Mais barato que Ethereum mainnet
- ✅ Mais rápido
- ✅ Suportado pelo Thirdweb
- ✅ Compatível com EVM (mesmo formato de endereços)

### **Sobre "Token":**

**NÃO há token sendo criado!**

- ❌ Não é um contrato de token (ERC-20, ERC-721)
- ✅ São **smart contracts do protocolo** (NodeDesignerReview, ReputationBootstrap, etc.)
- ✅ Os contratos usam **ETH como moeda nativa** (na rede Base)
- ✅ O gasless patrocina o **ETH** necessário para transações

### **Fluxo:**

```
1. Contratos deployados em Base (ou Base Sepolia)
   ↓
2. Usuário interage com contratos
   ↓
3. Transação precisa de ETH para gas
   ↓
4. Thirdweb patrocina o gas (gasless)
   ↓
5. Transação executada sem custo para usuário
```

**A moeda é sempre ETH, mas na rede Base (não Ethereum mainnet).**

---

**NΞØ Protocol // A Mente é a Nova Blockchain**
