# 🔀 Separação de Repositórios - NΞØ Protocol

**Data:** 2025-01-27  
**Motivo:** Separar plataforma web dos contratos Solidity para evitar conflitos no CI/CD

---

## 📋 Estrutura Proposta

### **1. Repositório: `neo-protocol-webapp`** (ou manter `neo-protcl`)

**Conteúdo:**

- ✅ Frontend React/Vite
- ✅ Componentes UI
- ✅ Serviços (Gemini, Lighthouse, Thirdweb)
- ✅ Terminal/LiveAgent
- ✅ Documentação da plataforma
- ❌ **SEM** contratos Solidity
- ❌ **SEM** Hardhat
- ❌ **SEM** scripts de deploy de contratos

**CI/CD:**

- Lint & Format (JS/TS/React)
- Build (Vite)
- Deploy (Vercel/IPFS)
- Security audit (npm)

---

### **2. Repositório: `neo-protocol-contracts`** (NOVO)

**Conteúdo:**

- ✅ Smart Contracts (`.sol`)
- ✅ Hardhat config
- ✅ Scripts de deploy
- ✅ Scripts de verificação
- ✅ Testes de contratos
- ✅ Documentação de contratos (NHIPs)
- ❌ **SEM** frontend
- ❌ **SEM** React/Vite

**CI/CD:**

- Compile contracts (Hardhat)
- Run tests (Hardhat)
- Lint Solidity (solhint/slither)
- Security audit (MythX/Slither)
- Deploy automation (opcional)

---

## 🎯 Vantagens da Separação

### **1. CI/CD Independente**

**Antes:**

```
❌ CI falha porque Hardhat não compila
❌ CI falha porque falta PRIVATE_KEY
❌ CI falha porque Node.js v22 não suporta Hardhat
```

**Depois:**

```
✅ Webapp CI: Só valida frontend (sempre passa)
✅ Contracts CI: Só valida contratos (isolado)
```

### **2. Dependências Limpas**

**Webapp:**

- React, Vite, Thirdweb, etc.
- Sem Hardhat
- Sem `@nomiclabs/hardhat-ethers`

**Contracts:**

- Hardhat, ethers, solc
- Sem React
- Sem Vite

### **3. Deploy Independente**

- **Webapp:** Deploy automático no Vercel/IPFS
- **Contracts:** Deploy manual ou via script (mais seguro)

### **4. Versionamento Separado**

- **Webapp:** `3.0.0` (frontend)
- **Contracts:** `1.0.0` (contratos)

### **5. Colaboração**

- Frontend devs não precisam instalar Hardhat
- Solidity devs não precisam instalar React
- Issues mais organizadas

---

## 📦 Estrutura de Arquivos

### **Repositório Webapp (`neo-protocol-webapp`)**

```
neo-protocol-webapp/
├── src/                    ✅ Frontend
├── public/                 ✅ Assets
├── docs/                   ✅ Docs da plataforma
├── scripts/                ✅ Scripts frontend (exceto deploy contracts)
├── package.json            ✅ Sem Hardhat
├── vite.config.js          ✅
├── .github/workflows/      ✅ CI só para frontend
└── README.md              ✅
```

**Remover:**

- ❌ `contracts/`
- ❌ `hardhat.config.js`
- ❌ `scripts/deploy.js`
- ❌ `scripts/verify-deploy-ready.js`
- ❌ `test/` (se for só de contratos)

---

### **Repositório Contracts (`neo-protocol-contracts`)**

```
neo-protocol-contracts/
├── contracts/              ✅ Todos os .sol
│   ├── NodeRegistry.sol
│   ├── NodeDesignerReview.sol
│   ├── NeoNodeAdmission.sol
│   ├── ReputationBootstrap.sol
│   ├── NodeAdmission.sol
│   └── symbolic/
├── scripts/                ✅ Scripts de deploy
│   ├── deploy.js
│   └── verify-deploy-ready.js
├── test/                   ✅ Testes de contratos
├── hardhat.config.js        ✅
├── package.json            ✅ Só dependências Hardhat
├── docs/                   ✅ NHIPs e docs de contratos
├── .github/workflows/      ✅ CI só para contratos
└── README.md              ✅
```

**Adicionar:**

- ✅ `.gitignore` específico para Hardhat
- ✅ `README.md` com instruções de deploy
- ✅ Workflow CI para compilar contratos

---

## 🔧 Plano de Migração

### **Passo 1: Criar Repositório de Contratos**

```bash
# Criar novo repo no GitHub
# Nome: neo-protocol-contracts
```

### **Passo 2: Mover Arquivos**

```bash
# No repo atual (neo-protcl)
git subtree push --prefix=contracts origin contracts-main
# OU
# Criar novo repo e copiar arquivos manualmente
```

### **Passo 3: Atualizar Webapp**

```bash
# Remover do webapp:
rm -rf contracts/
rm hardhat.config.js
rm scripts/deploy.js
rm scripts/verify-deploy-ready.js

# Atualizar package.json (remover Hardhat)
npm uninstall @nomiclabs/hardhat-ethers hardhat

# Atualizar .github/workflows/ci.yml (remover compile-contracts)
```

### **Passo 4: Configurar CI Separado**

**Webapp CI:**

```yaml
# .github/workflows/ci.yml (webapp)
jobs:
  lint:
    # Lint JS/TS/React
  build:
    # Build Vite
  # SEM compile-contracts
```

**Contracts CI:**

```yaml
# .github/workflows/ci.yml (contracts)
jobs:
  compile:
    # Compile Solidity
  test:
    # Run Hardhat tests
  security:
    # Slither/MythX
```

---

## 🔗 Integração Entre Repos

### **Opção 1: Git Submodule**

```bash
# No webapp
git submodule add https://github.com/NEO-PROTOCOL/neo-protocol-contracts.git contracts
```

### **Opção 2: NPM Package (Recomendado)**

```bash
# Publicar contratos como npm package
# No webapp
npm install @neo-protocol/contracts
```

### **Opção 3: Endereços em .env**

```bash
# Webapp só precisa dos endereços deployados
# Não precisa do código fonte dos contratos
VITE_NODE_REGISTRY_ADDRESS=0x...
VITE_NODE_DESIGNER_REVIEW_ADDRESS=0x...
```

---

## 📝 Checklist de Migração

### **Repositório Webapp**

- [ ] Remover `contracts/`
- [ ] Remover `hardhat.config.js`
- [ ] Remover scripts de deploy de contratos
- [ ] Remover Hardhat do `package.json`
- [ ] Atualizar `.github/workflows/ci.yml`
- [ ] Adicionar endereços dos contratos no `.env.example`
- [ ] Atualizar README.md
- [ ] Commit e push

### **Repositório Contracts**

- [ ] Criar novo repositório no GitHub
- [ ] Copiar `contracts/`
- [ ] Copiar `hardhat.config.js`
- [ ] Copiar scripts de deploy
- [ ] Criar `package.json` mínimo (só Hardhat)
- [ ] Criar `.github/workflows/ci.yml`
- [ ] Criar README.md
- [ ] Commit inicial

---

## 🎯 Resultado Final

### **Antes (Problema):**

```
❌ CI falha porque Hardhat não compila
❌ Erros de contratos aparecem no webapp
❌ Dependências conflitantes
```

### **Depois (Solução):**

```
✅ Webapp CI: Só valida frontend (limpo)
✅ Contracts CI: Só valida contratos (isolado)
✅ Deploy independente
✅ Versionamento separado
```

---

## 📚 Referências

- [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
- [NPM Packages](https://docs.npmjs.com/packages-and-modules)
- [Hardhat Documentation](https://hardhat.org/docs)

---

**NΞØ Protocol // A Mente é a Nova Blockchain**
