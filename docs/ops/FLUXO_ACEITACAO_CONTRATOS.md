# 🔄 Fluxo de Aceitação de Contratos - NΞØ Protocol

**Data:** 2025-01-27

---

## 📋 Visão Geral

Este documento explica como funciona o fluxo completo de aceitação de contratos no frontend, desde a primeira assinatura até o início da missão.

---

## 🎯 Contratos com Fluxo de Aceitação

### **1. NodeDesignerReview.sol**

Fluxo de revisão de design antes da admissão.

### **2. NeoNodeAdmission.sol**

Fluxo de admissão de nós (genérico).

---

## 🔄 Fluxo Completo: NodeDesignerReview

### **Passo 1: Invite (Architect)**

**Quem faz:** Architect (MELLØ ou guardião)

**Como:**

```solidity
function inviteReviewer(
    address _reviewer,
    string calldata _scope,
    uint256 _deadline,
    bytes32 _proofOfIntent
) external onlyArchitect
```

**Resultado:**

- Status do reviewer muda para `INVITED` (1)
- Evento `ReviewInvited` é emitido
- Missão criada no contrato

**No Frontend:**

- Não há UI para isso (é feito off-chain ou via script)
- O reviewer recebe notificação/convite

---

### **Passo 2: Primeira Conexão (Reviewer)**

**O que acontece:**

1. **Usuário acessa `/review`**
   - Componente `AcceptReviewThirdweb` carrega
   - Verifica se wallet está conectada

2. **Se não conectado:**
   - Mostra botão "Conecte sua wallet"
   - Usuário clica no `ConnectButton` (Thirdweb)
   - Primeira assinatura acontece aqui

3. **Primeira Assinatura (Embedded Wallet):**

   ```
   Usuário → ConnectButton → Thirdweb Modal
   ↓
   Escolhe método (email, Google, Apple, passkey)
   ↓
   Thirdweb cria wallet self-custodial (MPC)
   ↓
   Wallet conectada automaticamente
   ↓
   Componente detecta wallet → checkStatus()
   ```

4. **Se já conectado:**
   - Componente chama `checkStatus()` automaticamente
   - Verifica status no contrato

---

### **Passo 3: Verificar Status**

**Código:**

```javascript
const statusResult = await readContract({
  contract,
  method: 'function getStatus(address) view returns (uint8)',
  params: [account.address],
})
```

**Possíveis Status:**

- `NONE` (0) - Não foi convidado
- `INVITED` (1) - Foi convidado, pode aceitar
- `ACCEPTED` (2) - Aceitou, análise em andamento
- `SUBMITTED` (3) - Submeteu revisão
- `VALIDATED` (4) - Revisão validada
- `EXPIRED` (5) - Prazo expirado

**No Frontend:**

- Mostra status atual
- Mostra detalhes da missão (scope, deadline)
- Mostra botão "Aceitar Revisão" se status = `INVITED`

---

### **Passo 4: Aceitar Revisão (Primeira Transação)**

**Quando o usuário clica em "Aceitar Revisão":**

1. **Validação:**

   ```javascript
   // Verifica se status é INVITED
   if (Number(currentStatus) !== STATUS.INVITED) {
     throw new Error('Não é possível aceitar')
   }
   ```

2. **Preparar Transação:**

   ```javascript
   const transaction = prepareContractCall({
     contract,
     method: 'function acceptReview()',
     params: [],
   })
   ```

3. **Enviar Transação:**

   ```javascript
   const result = await sendTransaction({
     transaction,
     account,
   })
   ```

4. **O que acontece:**
   - **Gasless (se configurado):** Thirdweb paga o gas
   - **Com gas:** Usuário assina e paga gas
   - Transação é enviada para Base Mainnet
   - Aguarda confirmação

5. **Após Confirmação:**
   - Status muda para `ACCEPTED` (2)
   - Evento `ReviewAccepted` é emitido
   - `acceptedAt` é definido com `block.timestamp`
   - Frontend atualiza status automaticamente

---

### **Passo 5: Início da Missão**

**O que acontece após aceitar:**

1. **Status muda para `ACCEPTED`:**
   - Frontend mostra: "✅ Revisão aceita. Análise iniciada oficialmente."
   - Missão está oficialmente em andamento

2. **Trabalho Off-Chain:**
   - Reviewer faz análise de design
   - Cria documentação (Notion, GitHub, IPFS)
   - Gera `proofOfDelivery` (hash do material)

3. **Submeter Revisão (Próximo passo):**

   ```solidity
   function submitReview(bytes32 _proofOfDelivery) external
   ```

   - Status muda para `SUBMITTED` (3)

4. **Validação (Architect):**

   ```solidity
   function validateReview(address _reviewer) external onlyArchitect
   ```

   - Status muda para `VALIDATED` (4)
   - Evento `ReviewValidated` é emitido
   - ReputationBridge atualiza Identity Graph

---

## 🔐 Primeira Assinatura - Detalhes

### **Embedded Wallet (Thirdweb)**

**Fluxo:**

1. **Usuário clica em "Conectar Wallet"**
   - Modal do Thirdweb abre
   - Opções: Email, Google, Apple, Passkey

2. **Escolhe método (ex: Email)**
   - Digita email
   - Recebe código de verificação
   - Digita código

3. **Wallet Criada:**
   - Thirdweb cria wallet self-custodial via MPC
   - Chave privada é dividida (não fica com Thirdweb sozinho)
   - Wallet é criada na rede Base

4. **Primeira Assinatura:**
   - Ao aceitar revisão, primeira transação
   - Wallet assina transação
   - Se gasless: Thirdweb paga
   - Se não: Usuário precisa ter ETH na Base

5. **Próximas Transações:**
   - Wallet já está criada
   - Apenas assina (sem criar wallet novamente)

---

## 💡 Exemplo Prático

### **Cenário: Reviewer aceita missão**

```
1. Reviewer acessa /review
   ↓
2. Não tem wallet → Clica "Conectar"
   ↓
3. Escolhe "Email" → Digita email → Código
   ↓
4. Wallet criada: 0xABC...123
   ↓
5. Componente detecta wallet → checkStatus()
   ↓
6. Status = INVITED → Mostra botão "Aceitar Revisão"
   ↓
7. Reviewer clica "Aceitar Revisão"
   ↓
8. Primeira assinatura: Transação acceptReview()
   ↓
9. Gasless paga gas (ou usuário paga)
   ↓
10. Transação confirmada → Status = ACCEPTED
   ↓
11. Frontend atualiza: "✅ Revisão aceita. Análise iniciada."
   ↓
12. Missão oficialmente em andamento
```

---

## 🔧 Configuração Necessária

### **1. Variáveis de Ambiente**

```bash
# Endereço do contrato deployado
VITE_NODE_DESIGNER_REVIEW_ADDRESS=0x426542498Ab03246DaDe955dF25845e446a13C2B

# Thirdweb (para gasless)
VITE_THIRDWEB_CLIENT_ID=seu_client_id
VITE_THIRDWEB_SECRET_KEY=seu_secret_key (opcional)
```

### **2. Thirdweb Dashboard**

1. Acesse: https://thirdweb.com/dashboard
2. Vá em **Settings** → **Gasless**
3. Habilite **"Restrict to specific contract addresses"**
4. Adicione endereço: `0x426542498Ab03246DaDe955dF25845e446a13C2B`

---

## 📝 Componente Atualizado

O componente `AcceptReviewThirdweb.jsx` usa:

- ✅ `useActiveAccount()` - Conta conectada
- ✅ `useActiveWallet()` - Wallet ativa
- ✅ `readContract()` - Ler status (view)
- ✅ `prepareContractCall()` - Preparar transação
- ✅ `sendTransaction()` - Enviar transação (gasless)

**Vantagens:**

- Suporta gasless (Thirdweb paga)
- Embedded wallets (email, social login)
- Type-safe (TypeScript)
- Melhor UX

---

## 🎯 Resumo

1. **Primeira vez:**
   - Usuário conecta wallet (cria embedded wallet)
   - Primeira assinatura ao aceitar revisão

2. **Aceitar:**
   - Chama `acceptReview()` no contrato
   - Status muda para `ACCEPTED`
   - Missão inicia oficialmente

3. **Próximos passos:**
   - Trabalho off-chain
   - Submeter revisão
   - Validação pelo architect

---

**NΞØ Protocol // A Mente é a Nova Blockchain**
