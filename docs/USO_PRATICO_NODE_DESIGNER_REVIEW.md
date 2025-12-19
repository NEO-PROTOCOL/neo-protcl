# 🎯 Uso Prático — NodeDesignerReview.sol

**Versão:** 100% Smart Contract, Zero PDF, Zero Teatro  
**Data:** 2025-01-27  
**Autor:** MELLØ

---

## 💡 Princípio Fundamental

> **No NEØ, quem assina é o estado do contrato, não a pessoa.**

**PDF é pra advogado inseguro.**  
**Tx é pra arquiteto de ecossistema.**

---

## 🔑 O que "Assinar" Significa no NEØ

No sistema NEØ, **assinatura não é texto**.  
É **mudança de estado on-chain**.

### **Mapeamento:**

- ✅ **Convite** = `inviteReviewer()`
- ✅ **Aceite** = `acceptReview()`
- ✅ **Início da análise** = estado `ACCEPTED`

**Não existe outro gesto mais forte que isso.**

---

## 📋 Fluxo Exato (O que Você Faz)

### **2.1 Você cria o convite (PoI on-chain)**

```solidity
inviteReviewer(
  andreAddress,                                    // Endereço do revisor
  "Identity & Visual Coherence",                  // Escopo da revisão
  deadlineTimestamp,                               // Prazo (Unix timestamp)
  keccak256("NEØ::NodeDesigner::AndreMainart::PoI") // PoI hash
)
```

**Isso registra:**
- ✅ Intenção
- ✅ Escopo
- ✅ Prazo
- ✅ Autoria
- ✅ Contexto NEØ

**Esse é o contrato de trabalho.**

---

### **2.2 O que você manda pra ele (mensagem curta)**

```
Já te convidei on-chain pra revisão do NEØ.

Quando puder, é só dar o accept no contrato que a análise começa oficialmente.

Depois disso eu libero o material.
```

**Fim.**  
Sem explicação. Sem PDF. Sem "termo".

---

## ✅ O que Ele Faz para "Assinar"

Ele executa **uma única função**:

```solidity
acceptReview()
```

**Ou via:**
- ✅ Etherscan (interface direta)
- ✅ Thirdweb (se integrado)
- ✅ Script local
- ✅ Interface mínima (quando quiser)

**No momento que essa tx entra:**
- ✅ O contrato muda para `ACCEPTED`
- ✅ O PoI vira compromisso
- ✅ O relógio começa a contar

**Isso é assinatura de verdade.**

---

## ⚙️ O que Acontece Automaticamente Depois

Você pode tratar assim no teu fluxo:

```text
Status = ACCEPTED
    ↓
Liberar dossiê
    ↓
Silêncio
    ↓
Aguardar SUBMITTED
```

**Sem follow-up emocional.**  
**Sem cobrança verbal.**  
**O contrato já está cobrando.**

---

## 💪 Por que Isso é Muito Mais Forte que Qualquer PDF

Porque agora:

- ✅ **A assinatura é imutável** (on-chain)
- ✅ **O prazo é verificável** (timestamp público)
- ✅ **O aceite é público** (evento indexado)
- ✅ **O histórico é rastreável** (blockchain)
- ✅ **A reputação futura pode consumir isso** (integração com Identity Graph)

**E o melhor:**

> Ele assina sem perceber que assinou um contrato clássico.

**Isso é design de sistema.**

---

## 🔄 Fluxo Completo (Prático)

### **1. Você convida (on-chain)**

```solidity
// No contrato NodeDesignerReview
inviteReviewer(
    andreAddress,
    "Identity & Visual Coherence",
    block.timestamp + 30 days, // 30 dias de prazo
    keccak256("NEØ::NodeDesigner::AndreMainart::PoI")
);
```

**Evento emitido:** `ReviewInvited(andreAddress, proofOfIntent, deadline)`

---

### **2. Você envia mensagem (off-chain)**

```
Já te convidei on-chain pra revisão do NEØ.

Quando puder, é só dar o accept no contrato que a análise começa oficialmente.

Depois disso eu libero o material.
```

**Link:** Etherscan ou interface customizada

---

### **3. Ele aceita (on-chain)**

```solidity
// Ele executa
acceptReview();
```

**Evento emitido:** `ReviewAccepted(andreAddress)`  
**Estado:** `INVITED` → `ACCEPTED`

---

### **4. Você libera material (off-chain)**

```
Status = ACCEPTED
    ↓
Liberar dossiê (Notion/IPFS/GitHub)
    ↓
Silêncio
```

---

### **5. Ele submete (on-chain)**

```solidity
// Ele executa quando terminar
submitReview(keccak256("IPFS_HASH_OU_NOTION_LINK"));
```

**Evento emitido:** `ReviewSubmitted(andreAddress, proofOfDelivery)`  
**Estado:** `ACCEPTED` → `SUBMITTED`

---

### **6. Você valida (on-chain)**

```solidity
// Você executa após revisar o material
validateReview(andreAddress);
```

**Evento emitido:** `ReviewValidated(andreAddress)`  
**Estado:** `SUBMITTED` → `VALIDATED`

---

### **7. Integração Automática (off-chain)**

O evento `ReviewValidated` é automaticamente capturado pelo `reputationBridge.js`:

```javascript
// Automaticamente executado
onReviewValidated(andreAddress) {
  // Adiciona ao Identity Graph
  graph.addNode(reviewerId, { ... });
  
  // Cria edge de validação
  graph.addEdge('neo:protocol', reviewerId, 'review_validated', ...);
}
```

**Resultado:**
- ✅ Revisor entra no Identity Graph
- ✅ Relacionamento verificável criado
- ✅ Pronto para consumir em reputação futura

---

## 🎯 Exemplo Real (Código Completo)

### **Setup Inicial**

```javascript
import { ethers } from 'ethers';
import { setupEventListeners, initializeNeoProtocolNode } from './services/reputationBridge';

// Inicializar nó do protocolo no Identity Graph
initializeNeoProtocolNode();

// Setup listeners (quando contratos estiverem deployados)
const reviewContract = new ethers.Contract(
  REVIEW_CONTRACT_ADDRESS,
  REVIEW_ABI,
  provider
);

const admissionContract = new ethers.Contract(
  ADMISSION_CONTRACT_ADDRESS,
  ADMISSION_ABI,
  provider
);

setupEventListeners(reviewContract, admissionContract);
```

### **Convidar Revisor**

```javascript
// Você executa
const tx = await reviewContract.inviteReviewer(
  andreAddress,
  "Identity & Visual Coherence",
  Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 dias
  ethers.utils.keccak256(ethers.utils.toUtf8Bytes("NEØ::NodeDesigner::AndreMainart::PoI"))
);

await tx.wait();
console.log("Convite enviado on-chain");
```

### **Revisor Aceita**

```javascript
// Ele executa (via Etherscan ou interface)
const tx = await reviewContract.acceptReview();
await tx.wait();
console.log("Revisão aceita, análise iniciada");
```

### **Revisor Submete**

```javascript
// Ele executa quando terminar
const proofHash = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("https://notion.so/...")
);

const tx = await reviewContract.submitReview(proofHash);
await tx.wait();
console.log("Revisão submetida");
```

### **Você Valida**

```javascript
// Você executa após revisar
const tx = await reviewContract.validateReview(andreAddress);
await tx.wait();
console.log("Revisão validada");

// Automaticamente:
// - Evento ReviewValidated emitido
// - reputationBridge.js captura
// - Identity Graph atualizado
// - Pronto para reputação futura
```

---

## 📊 Estados do Contrato

```text
NONE
  ↓ (inviteReviewer)
INVITED
  ↓ (acceptReview)
ACCEPTED
  ↓ (submitReview)
SUBMITTED
  ↓ (validateReview)
VALIDATED
```

**Ou:**

```text
INVITED/ACCEPTED
  ↓ (deadline passou)
EXPIRED
```

---

## 🚫 O que NÃO Fazer

- ❌ **NÃO** enviar PDFs de "termo de compromisso"
- ❌ **NÃO** pedir assinatura em papel
- ❌ **NÃO** fazer follow-up emocional
- ❌ **NÃO** explicar demais
- ❌ **NÃO** criar burocracia

**O contrato já faz tudo isso.**

---

## ✅ O que Fazer

- ✅ **SIM** convidar on-chain
- ✅ **SIM** enviar mensagem curta
- ✅ **SIM** aguardar `ACCEPTED`
- ✅ **SIM** liberar material
- ✅ **SIM** aguardar `SUBMITTED`
- ✅ **SIM** validar quando pronto
- ✅ **SIM** deixar o sistema trabalhar

---

## 💬 Frase Final

> **No NEØ, quem assina é o estado do contrato, não a pessoa.**

**PDF é pra advogado inseguro.**  
**Tx é pra arquiteto de ecossistema.**

---

**NΞØ Protocol // A Mente é a Nova Blockchain**

---

## 📚 Referências

- [NodeDesignerReview.sol](../contracts/NodeDesignerReview.sol)
- [ARQUITETURA_CAMADAS_NEØ.md](./ARQUITETURA_CAMADAS_NEØ.md)
- [reputationBridge.js](../src/services/reputationBridge.js)
