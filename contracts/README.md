# 📜 Smart Contracts — NΞØ Protocol

Esta pasta contém os contratos inteligentes do Protocolo NΞØ.

---

## 📋 Contratos Disponíveis

### **NodeRegistry.sol** — NHIP-001

Registro on-chain de nós reconhecidos pelo protocolo.

**Características:**

- Minimalista e seguro
- Apenas o Nó Guardião pode registrar
- Histórico imutável (desativação, não exclusão)
- Compatível com Base / Polygon / EVM padrão

**Documentação completa:** [`../docs/nhip-001.md`](../docs/nhip-001.md)

---

## 🛠️ Compilação e Deploy

### **Requisitos**

- Solidity ^0.8.20
- Hardhat / Foundry / Remix
- Node.js 18+

### **Compilação (Hardhat)**

```bash
npx hardhat compile
```

### **Deploy**

```bash
# Deploy em Base

npx hardhat run scripts/deploy.js --network base

# Deploy em Polygon

npx hardhat run scripts/deploy.js --network polygon
```

---

## 🔐 Segurança

- ✅ Auditoria recomendada antes do deploy em mainnet
- ✅ Testes unitários obrigatórios
- ✅ Princípio de minimalismo: menos código = menos superfícies de ataque

---

## 📚 Referências

- [NHIP-001 — NodeRegistry](../docs/nhip-001.md)
- [Proof of Intention Architecture](../docs/PROOF_OF_INTENTION_ARCHITECTURE.md)
- [NHIP-000 — NΞØ Hub Intake Protocol](../docs/nhip-000.md)

---

**Status:** Em desenvolvimento | **Autor:** NΞØ Protocol | **Data:** 2025
