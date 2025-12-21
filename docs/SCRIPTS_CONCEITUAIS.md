# 🛠️ Scripts Hardhat — Camada Conceitual vs Operacional

**Data:** 2025-01-27  
**Baseado em:** Auditoria Estrutural

---

## 🎯 Princípio Fundamental

> **".env é detalhe operacional, não parte do protocolo."**

Scripts devem documentar:
- ✅ **Parâmetros** (o que é necessário)
- ✅ **Exemplos** (como usar)
- ❌ **NÃO assumir .env como camada conceitual**

---

## 📋 Estrutura de Scripts

### **1. Scripts Genéricos (Core)**

**Localização:** `scripts/`

- `acceptMission.js` - Aceitar qualquer missão (genérico)
- `submitMission.js` - Submeter missão (genérico)
- `validateMission.js` - Validar missão (architect)

**Características:**
- ✅ Genéricos (não específicos de tipo de nó)
- ✅ Documentam parâmetros necessários
- ✅ Exemplos de uso
- ✅ Instruções para uso manual

### **2. Scripts Presets (Específicos)**

**Localização:** `scripts/presets/`

- `inviteNodeDesigner.js` - Preset para Designer
- `inviteNodeResearch.js` - Preset para Research (futuro)
- `inviteNodeSystems.js` - Preset para Systems (futuro)
- `inviteNodeGovernance.js` - Preset para Governance (futuro)

**Características:**
- ✅ Exemplos específicos
- ✅ Valores padrão para tipo de nó
- ✅ Facilita uso comum
- ✅ Não é obrigatório usar

---

## 🔧 Uso de Scripts

### **Opção 1: Scripts como Exemplos (Recomendado)**

**Filosofia:** Scripts são **exemplos**, não a única forma de usar.

**Uso:**
```bash
# Ver o script para entender parâmetros
cat scripts/presets/inviteNodeDesigner.js

# Usar como referência, executar manualmente via UI ou outra ferramenta
```

### **Opção 2: Execução Direta**

**Filosofia:** Scripts podem ser executados, mas não são obrigatórios.

**Uso:**
```bash
# Configurar variáveis inline (não apenas .env)
CANDIDATE_ADDRESS=0x... MISSION_SCOPE="..." \
npx hardhat run scripts/presets/inviteNodeDesigner.js --network base
```

### **Opção 3: Uso Manual (Mais Elegante)**

**Filosofia:** Usar wallet padrão (MetaMask) + Hardhat impersonation ou UI.

**Uso:**
1. Conectar wallet no app
2. Usar UI para chamar `inviteNode()`
3. Assinar transação com wallet
4. Sem necessidade de scripts

---

## 📝 Documentação de Parâmetros

### **Formato Padrão:**

Cada script deve documentar:

1. **Parâmetros Necessários:**
   - O que é obrigatório
   - O que é opcional
   - Valores padrão

2. **Exemplos:**
   - Exemplo mínimo
   - Exemplo completo
   - Exemplo com variáveis inline

3. **Alternativas:**
   - Como fazer manualmente
   - Como fazer via UI
   - Como fazer via outra ferramenta

### **Exemplo:**

```javascript
/**
 * Preset: Invite Node Designer
 * 
 * PARÂMETROS:
 * - CANDIDATE_ADDRESS (obrigatório): Endereço do candidato
 * - MISSION_SCOPE (opcional): Escopo da missão (padrão: "Identity & Visual Coherence")
 * - DEADLINE_DAYS (opcional): Prazo em dias (padrão: 7)
 * - PROOF_OF_INTENT (opcional): PoI hash (gerado automaticamente se não fornecido)
 * 
 * EXEMPLOS:
 * 
 * 1. Mínimo:
 *    CANDIDATE_ADDRESS=0x... npx hardhat run scripts/presets/inviteNodeDesigner.js --network base
 * 
 * 2. Completo:
 *    CANDIDATE_ADDRESS=0x... MISSION_SCOPE="..." DEADLINE_DAYS=14 \
 *    npx hardhat run scripts/presets/inviteNodeDesigner.js --network base
 * 
 * 3. Manual (via UI):
 *    - Conectar wallet no app
 *    - Navegar para página de admissão
 *    - Preencher formulário
 *    - Assinar transação
 * 
 * NOTA: .env é detalhe operacional. Parâmetros podem ser passados de qualquer forma.
 */
```

---

## ⚠️ Sobre PRIVATE_KEY

### **Problema Identificado:**

Uso de `PRIVATE_KEY` em scripts funciona, mas não é elegante.

### **Alternativas:**

#### **1. Hardhat Impersonation (Desenvolvimento)**

```javascript
// Impersonar endereço específico
await hre.network.provider.request({
  method: "hardhat_impersonateAccount",
  params: [address]
});

const signer = await ethers.getSigner(address);
```

#### **2. Wallet Padrão (Produção)**

```javascript
// Usar wallet conectada (MetaMask, etc.)
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
```

#### **3. Scripts Apenas para Leitura**

```javascript
// Scripts que apenas leem estado (não escrevem)
// Não precisam de signer
const contract = await ethers.getContractAt("NeoNodeAdmission", address, provider);
const status = await contract.getStatus(candidateAddress);
```

---

## 📚 Documentação vs Implementação

### **O Que Documentar:**

- ✅ **Parâmetros necessários** (conceitual)
- ✅ **Exemplos de uso** (prático)
- ✅ **Alternativas** (flexibilidade)
- ✅ **Significado** (narrativa)

### **O Que NÃO Assumir:**

- ❌ `.env` como única forma de configurar
- ❌ Scripts como única forma de executar
- ❌ PRIVATE_KEY como obrigatório
- ❌ Hardhat como única ferramenta

---

## 🎯 Estrutura Recomendada

### **Scripts:**

```
scripts/
├── acceptMission.js          ← Genérico
├── submitMission.js          ← Genérico
├── validateMission.js        ← Genérico (architect)
└── presets/
    ├── inviteNodeDesigner.js ← Preset específico
    ├── inviteNodeResearch.js ← Preset futuro
    └── README.md             ← Documentação de parâmetros
```

### **Documentação:**

```
docs/
├── SCRIPTS_CONCEITUAIS.md    ← Este documento
├── SCRIPTS_HARDHAT_USO.md    ← Uso prático (atualizado)
└── PARAMETROS_SCRIPTS.md     ← Referência de parâmetros
```

---

## ✅ Checklist

- [ ] Scripts documentam parâmetros (não apenas .env)
- [ ] Exemplos de uso incluídos
- [ ] Alternativas documentadas (manual, UI, etc.)
- [ ] PRIVATE_KEY não é obrigatório
- [ ] Scripts são exemplos, não obrigatórios

---

## 🎯 Resumo

**Scripts são:**
- ✅ Exemplos de uso
- ✅ Referência de parâmetros
- ✅ Ferramentas opcionais

**Scripts NÃO são:**
- ❌ Única forma de usar
- ❌ Parte do protocolo
- ❌ Dependentes de .env

**.env é:**
- ✅ Detalhe operacional
- ✅ Uma forma de configurar
- ❌ Não é camada conceitual

---

**NΞØ Protocol // A Mente é a Nova Blockchain**
