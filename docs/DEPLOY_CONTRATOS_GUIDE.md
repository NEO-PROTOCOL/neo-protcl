# 🚀 Guia: Deploy de Contratos e Configuração Gasless

**Data:** 2025-01-27

---

## 📋 Passo a Passo Completo

### **1. Fazer Deploy dos Contratos**

#### **Opção A: Usando Hardhat (Recomendado)**

```bash
# 1. Compilar contratos
npx hardhat compile

# 2. Deploy em Base (mainnet)
npx hardhat run scripts/deploy.js --network base
```

**Nota:** O projeto faz deploy direto em mainnet (Base), com planejamento e decisões bem fundamentadas. Não usamos testnet.

#### **Opção B: Usando Remix ou Outra Ferramenta**

1. Abra o contrato no Remix
2. Compile
3. Deploy na rede escolhida
4. Copie o endereço do contrato

---

### **2. Copiar Endereços dos Contratos**

Após o deploy, você verá algo assim:

```
Deploying NodeDesignerReview...
NodeDesignerReview deployed to: 0x1234567890123456789012345678901234567890

Deploying ReputationBootstrap...
ReputationBootstrap deployed to: 0xabcdefabcdefabcdefabcdefabcdefabcdefabcd

Deploying NodeAdmission...
NodeAdmission deployed to: 0x9876543210987654321098765432109876543210

Deploying NodeRegistry...
NodeRegistry deployed to: 0x1111111111111111111111111111111111111111
```

**⚠️ IMPORTANTE:** Esses são endereços em **Base Mainnet** (produção). Copie e guarde com segurança!

---

### **3. Configurar no Thirdweb Dashboard**

1. Acesse: [thirdweb.com/dashboard](https://thirdweb.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **Gasless** ou **Account Abstraction**
4. Habilite **"Restrict to specific contract addresses"**
5. **Cole os endereços reais** (um por linha):

```
0x1234567890123456789012345678901234567890
0xabcdefabcdefabcdefabcdefabcdefabcdefabcd
0x9876543210987654321098765432109876543210
0x1111111111111111111111111111111111111111
```

**⚠️ IMPORTANTE:**
- ✅ Use os endereços **reais** que você copiou do deploy
- ❌ **NÃO** use placeholders como `0x[ENDEREÇO_NODE_DESIGNER_REVIEW]`
- ✅ Um endereço por linha
- ✅ Formato: `0x` + 40 caracteres hexadecimais

---

## 🎯 O Que Fazer AGORA (Antes do Deploy)

### **Opção 1: Deixar Desabilitado (Recomendado)**

- ✅ Deixe **"Restrict to specific contract addresses"** **DESABILITADO**
- ✅ Faça o deploy dos contratos
- ✅ Depois habilite e adicione os endereços reais

### **Opção 2: Habilitar Agora (Se Quiser)**

- ✅ Habilite a restrição
- ✅ Deixe o campo **vazio** por enquanto
- ✅ Após deploy, adicione os endereços reais

---

## 📝 Checklist

- [ ] Contratos compilados? (`npx hardhat compile`)
- [ ] Contratos deployados? (Base Mainnet)
- [ ] Endereços dos contratos copiados?
- [ ] Restrição habilitada no Dashboard?
- [ ] **Endereços REAIS adicionados** (não placeholders)?
- [ ] Transação gasless testada?

---

## ⚠️ Erros Comuns

### **❌ Erro: "Invalid contract address"**

**Causa:** Você adicionou um placeholder ou endereço inválido.

**Solução:**

- Remova placeholders como `0x[ENDEREÇO_...]`
- Use apenas endereços reais no formato `0x` + 40 caracteres hex

### **❌ Erro: "Transaction not sponsored"**

**Causa:** O endereço do contrato não está na lista de permitidos.

**Solução:**
- Verifique se o endereço está correto no Dashboard
- Verifique se está na rede correta (Base Mainnet - chainId: 8453)
- Adicione o endereço se estiver faltando

---

## 💡 Dica

**Salve os endereços em um arquivo seguro:**

Crie um arquivo `.env.local` (não commitar no git):

```bash
# Contratos Deployados (Base Mainnet - PRODUÇÃO)
# Deploy direto em mainnet com planejamento e decisões fundamentadas
NODE_DESIGNER_REVIEW_ADDRESS=0x1234567890123456789012345678901234567890
REPUTATION_BOOTSTRAP_ADDRESS=0xabcdefabcdefabcdefabcdefabcdefabcdefabcd
NODE_ADMISSION_ADDRESS=0x9876543210987654321098765432109876543210
NODE_REGISTRY_ADDRESS=0x1111111111111111111111111111111111111111
```

Isso facilita copiar e colar no Dashboard.

---

## 🎯 Resumo

1. **Agora:** Deixe desabilitado ou habilitado com campo vazio
2. **Depois do deploy:** Habilite e adicione os endereços **REAIS**
3. **Formato:** `0x` + 40 caracteres hex, um por linha
4. **NÃO use:** Placeholders como `0x[ENDEREÇO_...]`

---

**NΞØ Protocol // A Mente é a Nova Blockchain**
