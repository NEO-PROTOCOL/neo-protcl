# ✅ Checklist de Deploy - NΞØ Protocol

**Data:** 2025-01-27

---

## 📋 Pré-requisitos

### **1. Variáveis de Ambiente (.env)**

Configure seu arquivo `.env` com:

```bash
# RPC URL da rede (Base Mainnet)
BASE_RPC_URL=https://lb.drpc.live/base/AghtJoX7E0OEi4rDpHWdZ_1EW5rX4YgR8JJThhdoDp16

# Private Key da wallet que fará o deploy
# ⚠️ NUNCA commite isso no git!
PRIVATE_KEY=dbf034c35844f96ce58b161b10770200f2c1f374bbe06c42cae4c8a0ca17601b

# Endereço do Guardian para NodeRegistry
# Se não especificado, será o deployer
NODE_REGISTRY_GUARDIAN=0x...
```

### **2. Wallet com Saldo**

- ✅ Wallet configurada com `PRIVATE_KEY`
- ✅ Saldo suficiente de ETH para gas fees
- ✅ Verificar saldo antes do deploy

### **3. Compilação**

```bash
npx hardhat compile
```

Verificar se compilou sem erros.

---

## 🚀 Deploy

### **Comando de Deploy**

```bash
# Deploy em Base Mainnet
npx hardhat run scripts/deploy.js --network base

# Deploy em Polygon
npx hardhat run scripts/deploy.js --network polygon
```

### **O que o Script Faz**

1. ✅ Verifica variáveis de ambiente
2. ✅ Verifica saldo da wallet
3. ✅ Deploy do `NodeRegistry` (com Guardian)
4. ✅ Deploy do `ReputationBootstrap`
5. ✅ Deploy do `NodeAdmission` (com ReputationBootstrap)
6. ✅ Deploy do `NodeDesignerReview`
7. ✅ Deploy do `NeoNodeAdmission`
8. ✅ Exibe resumo com todos os endereços

---

## 📝 Parâmetros do Deploy

### **NodeRegistry**

- **Constructor:** `address _guardian`
- **Guardian:** Endereço que controlará o registro de nós
- **Padrão:** Se `NODE_REGISTRY_GUARDIAN` não estiver no .env, usa o deployer

### **NodeAdmission**

- **Constructor:** `address _reputationContract`
- **ReputationContract:** Endereço do `ReputationBootstrap` deployado

### **Outros Contratos**

- Não precisam de parâmetros no constructor

---

## 📊 Após o Deploy

### **1. Salvar Endereços**

Copie os endereços exibidos e salve em `.env.local`:

```bash
NODE_REGISTRY_ADDRESS=0x...
REPUTATION_BOOTSTRAP_ADDRESS=0x...
NODE_ADMISSION_ADDRESS=0x...
NODE_DESIGNER_REVIEW_ADDRESS=0x...
NEO_NODE_ADMISSION_ADDRESS=0x...
```

### **2. Verificar no Explorer**

- Base: https://basescan.org/address/[ENDEREÇO]
- Polygon: https://polygonscan.com/address/[ENDEREÇO]

### **3. Configurar Thirdweb (Gasless)**

1. Acesse: https://thirdweb.com/dashboard
2. Settings → Gasless
3. Habilite "Restrict to specific contract addresses"
4. Adicione os endereços (um por linha)

---

## ⚠️ Verificações Importantes

### **Antes do Deploy**

- [ ] `.env` configurado corretamente
- [ ] `PRIVATE_KEY` válida
- [ ] `BASE_RPC_URL` ou `POLYGON_RPC_URL` configurado
- [ ] Wallet tem saldo suficiente
- [ ] Contratos compilados sem erros
- [ ] `NODE_REGISTRY_GUARDIAN` definido (ou usar deployer)

### **Durante o Deploy**

- [ ] Verificar rede correta (Base/Polygon)
- [ ] Confirmar endereço do deployer
- [ ] Confirmar endereço do Guardian (NodeRegistry)

### **Após o Deploy**

- [ ] Copiar todos os endereços
- [ ] Verificar no explorer
- [ ] Salvar endereços em local seguro
- [ ] Configurar Thirdweb (se usar gasless)
- [ ] Testar funções básicas dos contratos

---

## 🔐 Segurança

### **⚠️ NUNCA:**

- ❌ Commitar `PRIVATE_KEY` no git
- ❌ Commitar endereços de produção em código público
- ❌ Usar mesma wallet para deploy e operações diárias
- ❌ Deploy sem verificar rede (pode ser mainnet!)

### **✅ SEMPRE:**

- ✅ Usar `.env.local` para dados sensíveis
- ✅ Verificar rede antes de deploy
- ✅ Confirmar endereços após deploy
- ✅ Guardar endereços em local seguro
- ✅ Usar wallet dedicada para deploy

---

## 🐛 Troubleshooting

### **Erro: "PRIVATE_KEY não configurada"**

**Solução:** Adicione `PRIVATE_KEY=0x...` no `.env`

### **Erro: "Wallet sem saldo"**

**Solução:** Adicione ETH na wallet do deployer

### **Erro: "Network not found"**

**Solução:** Verifique se a rede está configurada no `hardhat.config.js`

### **Erro: "Contract deployment failed"**

**Solução:** 
- Verifique saldo suficiente
- Verifique RPC URL válida
- Verifique se contratos compilaram corretamente

---

## 📚 Referências

- [Hardhat Setup](../ops/HARDHAT_SETUP.md)
- [Deploy Guide](../ops/DEPLOY_CONTRATOS_GUIDE.md)
- [NHIP-001 - NodeRegistry](../../docs/nhip-001.md)

---

**NΞØ Protocol // A Mente é a Nova Blockchain**

