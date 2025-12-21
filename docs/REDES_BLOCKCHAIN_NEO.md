# 🌐 Redes Blockchain - NΞØ Protocol

**Data:** 2025-01-27

---

## 📋 Rede Principal: Base (Não Ethereum Mainnet)

O projeto NΞØ Protocol usa **Base** como rede principal, **NÃO Ethereum Mainnet**.

---

## 🔗 Redes Configuradas

### **1. Base Sepolia (Testnet)**

- **Chain ID:** `84532`
- **Moeda nativa:** ETH (testnet, gratuito)
- **RPC URL:** `https://sepolia.base.org`
- **Uso:** Testes e desenvolvimento
- **Explorer:** [basescan.org](https://sepolia.basescan.org)

**Quando usar:**
- ✅ Desenvolvimento
- ✅ Testes de contratos
- ✅ Testes de gasless
- ✅ Validação antes de produção

### **2. Base (Mainnet)**

- **Chain ID:** `8453`
- **Moeda nativa:** ETH (real)
- **RPC URL:** `https://mainnet.base.org`
- **Uso:** Produção
- **Explorer:** [basescan.org](https://basescan.org)

**Quando usar:**
- ✅ Produção
- ✅ Contratos finais
- ✅ Usuários reais

---

## 💰 Sobre "Token" e Moeda Nativa

### **❌ NÃO há Token Sendo Criado**

Os contratos do NΞØ Protocol **NÃO são tokens**:
- ❌ Não é ERC-20 (token fungível)
- ❌ Não é ERC-721 (NFT)
- ✅ São **smart contracts do protocolo**

### **✅ Moeda Nativa: ETH**

- **Rede Base:** Usa ETH como moeda nativa
- **Rede Ethereum:** Também usa ETH como moeda nativa
- **Diferença:** Base é uma L2 (Layer 2) da Ethereum, mais barata e rápida

### **Gasless Transactions:**

O Thirdweb patrocina o **ETH** necessário para gas:
- ✅ Usuário não paga
- ✅ Thirdweb paga o ETH do gas
- ✅ Funciona na rede onde os contratos estão deployados

---

## 🎯 Estratégia de Deploy

### **Deploy Direto em Mainnet**

**Rede:** Base (mainnet)

```bash
# Deploy em Base (mainnet)
npx hardhat run scripts/deploy.js --network base
```

**Filosofia do Projeto:**
- ✅ Deploy direto em produção
- ✅ Planejamento e decisões fundamentadas
- ✅ Desenvolvimento com liberdade e responsabilidade
- ✅ Sem necessidade de testnet (plataforma em desenvolvimento, sem usuários ainda)

**Vantagens:**
- ✅ Rede de produção desde o início
- ✅ Transações reais
- ✅ Preparado para quando houver usuários

---

## 🔧 Configuração no Thirdweb Dashboard

### **Para Gasless:**

Quando configurar "Restrict to specific contract addresses", os endereços devem ser da **mesma rede** onde você fez deploy:

- **Base Sepolia:** Endereços de Base Sepolia
- **Base Mainnet:** Endereços de Base Mainnet

**Importante:** O Thirdweb precisa saber em qual rede os contratos estão para patrocinar o gas corretamente.

---

## 📊 Comparação: Base vs Ethereum Mainnet

| Característica | Base | Ethereum Mainnet |
|----------------|------|------------------|
| **Chain ID** | 8453 | 1 |
| **Moeda Nativa** | ETH | ETH |
| **Custo de Gas** | Muito menor | Alto |
| **Velocidade** | Rápida | Mais lenta |
| **L2/L1** | L2 (Optimistic Rollup) | L1 |
| **Compatibilidade** | EVM (100%) | EVM (nativo) |

---

## 🎯 Por Que Base?

### **Vantagens:**

1. **💰 Custo Baixo**
   - Gas muito mais barato que Ethereum mainnet
   - Ideal para gasless transactions

2. **⚡ Velocidade**
   - Transações mais rápidas
   - Confirmações em segundos

3. **🔗 Compatibilidade**
   - 100% compatível com EVM
   - Mesmos endereços, mesmos contratos

4. **🌐 Suporte Thirdweb**
   - Base é suportada nativamente
   - Gasless funciona perfeitamente

---

## ⚠️ Importante

### **NÃO confunda:**

- ❌ **Ethereum Mainnet** (chainId: 1) - NÃO estamos usando
- ✅ **Base** (chainId: 8453) - Rede principal do projeto
- ✅ **Base Sepolia** (chainId: 84532) - Testnet para testes

### **Sobre Token:**

- ❌ **Não há token sendo criado**
- ✅ **São smart contracts do protocolo**
- ✅ **Usam ETH como moeda nativa** (na rede Base)

---

## 📝 Resumo

1. **Rede Principal:** Base (não Ethereum mainnet)
2. **Testnet:** Base Sepolia (para testes)
3. **Moeda:** ETH (na rede Base)
4. **Token:** Não há token, são smart contracts
5. **Gasless:** Thirdweb patrocina ETH do gas

---

**NΞØ Protocol // A Mente é a Nova Blockchain**
