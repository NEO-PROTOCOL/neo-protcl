# 📊 Captação de Dados - Intent System

## 🔍 **Dados Atualmente Capturados**

### **1. Dados do Usuário (localStorage)**

```javascript
// Armazenado em: localStorage.getItem('neo_agent_state')
{
  resonance: 0-10,           // Nível de ressonância
  zonesUnlocked: [],         // Zonas desbloqueadas
  memory: [],                // Fragmentos de memória (inclui padrões integrados)
  zone: null,                // Zona atual
  coherence: 0-10            // Nível de coerência
}
```

### **2. Dados do Mapeamento (estado React)**

```javascript
// Gerado em: handleGenerateMap()
{
  profileData: {
    [dimensionId]: {
      archetype: "Engenheiro" | "Contador de Histórias" | ...,
      intent: "string com intenção identificada"
    }
  },
  synergy: {
    name: "Nome do Padrão Integrado",
    intent: "Descrição da intenção",
    power: "Superpoder identificado",
    alert: "Alerta identificado",
    metaphor: "Metáfora operacional"
  },
  selectedDimensions: ["problem_solving", "collaboration", ...],
  mermaidDiagram: "código mermaid completo"
}
```

### **3. Respostas de Texto Livre**

```javascript
// Armazenado em: responses[dimensionId]
{
  problem_solving: "texto livre do usuário",
  collaboration: "texto livre do usuário",
  creation: "texto livre do usuário"
}
```

---

## 🚀 **Soluções Integradas Disponíveis**

### **Opção 1: IPFS (Descentralizado + Anonimizado)** ⭐ **RECOMENDADO**

**Vantagens:**

- ✅ Totalmente descentralizado
- ✅ Pode ser anonimizado (hash do wallet, sem dados pessoais)
- ✅ Já tem integração com Lighthouse
- ✅ Alinhado com filosofia Web3

**Implementação:**

```javascript
// src/services/intentDataCapture.js
import { upload } from '@lighthouse-web3/sdk';

export async function saveIntentToIPFS(intentData, walletAddress) {
  // Anonimizar dados (remover texto livre, manter apenas padrões)
  const anonymizedData = {
    timestamp: Date.now(),
    walletHash: hashWallet(walletAddress), // Hash do wallet (não o endereço completo)
    archetypes: Object.keys(intentData.profileData).map(dim => ({
      dimension: dim,
      archetype: intentData.profileData[dim].archetype
    })),
    synergy: {
      name: intentData.synergy.name,
      // Não incluir texto livre (responses)
    },
    dimensions: intentData.selectedDimensions,
    mermaidHash: hashMermaid(intentData.mermaidDiagram)
  };

  // Upload para IPFS via Lighthouse
  const response = await upload(
    JSON.stringify(anonymizedData),
    process.env.VITE_LIGHTHOUSE_API_KEY
  );

  return response.data.Hash; // CID do IPFS
}
```

**Uso no IntentSystemPage:**

```javascript
// Após handleGenerateMap()
if (walletAddress) {
  const cid = await saveIntentToIPFS(result, walletAddress);
  console.log('Intent salvo no IPFS:', cid);
}
```

---

### **Opção 2: Thirdweb Storage (Metadados)**

**Vantagens:**

- ✅ Integração nativa com Thirdweb
- ✅ Pode ser vinculado a NFTs
- ✅ Metadados estruturados

**Implementação:**

```javascript
import { upload } from "thirdweb/storage";

export async function saveIntentToThirdwebStorage(intentData, client) {
  const metadata = {
    name: `Intent Map: ${intentData.synergy.name}`,
    description: intentData.synergy.intent,
    image: "ipfs://...", // Imagem do diagrama (se gerada)
    attributes: [
      {
        trait_type: "Archetype Pattern",
        value: intentData.synergy.name
      },
      {
        trait_type: "Dimensions",
        value: intentData.selectedDimensions.join(", ")
      }
    ],
    // Dados anonimizados
    archetypes: Object.values(intentData.profileData).map(p => p.archetype)
  };

  const uri = await upload({
    client,
    files: [new File([JSON.stringify(metadata)], "intent.json")]
  });

  return uri;
}
```

---

### **Opção 3: Analytics Opcional (Google Analytics / Plausible)**

**Vantagens:**

- ✅ Métricas agregadas (não dados pessoais)
- ✅ Entender uso do sistema
- ✅ Melhorar UX

**Implementação:**

```javascript
// src/utils/analytics.js
export function trackIntentEvent(eventName, data) {
  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'Intent System',
      ...data
    });
  }

  // Plausible (mais privado)
  if (window.plausible) {
    window.plausible(eventName, {
      props: data
    });
  }
}

// Uso:
trackIntentEvent('intent_mapped', {
  synergy_name: result.synergy.name,
  dimensions_count: result.selectedDimensions.length,
  // Não incluir texto livre
});
```

---

### **Opção 4: Smart Contract (Base Chain)**

**Vantagens:**
- ✅ On-chain, imutável
- ✅ Pode emitir NFT como certificado
- ✅ Integração com $NEO token

**Implementação:**
```solidity
// Contrato: IntentRegistry.sol
contract IntentRegistry {
    struct IntentMap {
        string synergyName;
        string[] archetypes;
        uint256 timestamp;
        address user;
    }

    mapping(address => IntentMap[]) public userIntents;
    
    function registerIntent(
        string memory synergyName,
        string[] memory archetypes
    ) public {
        userIntents[msg.sender].push(IntentMap({
            synergyName: synergyName,
            archetypes: archetypes,
            timestamp: block.timestamp,
            user: msg.sender
        }));
    }
}
```

**Uso:**
```javascript
// Após handleGenerateMap()
const contract = getContractInstance(INTENT_REGISTRY_ADDRESS);
await contract.call("registerIntent", [
  result.synergy.name,
  Object.values(result.profileData).map(p => p.archetype)
]);
```

---

### **Opção 5: Backend Próprio (Opcional, com Consentimento)**

**Vantagens:**
- ✅ Controle total
- ✅ Análise avançada
- ✅ Exportação de dados

**Implementação:**
```javascript
// src/services/intentBackend.js
export async function saveIntentToBackend(intentData, consent) {
  if (!consent) return null;

  const response = await fetch('https://api.neoprotocol.eth/intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // Dados anonimizados
      archetypes: Object.values(intentData.profileData).map(p => p.archetype),
      synergy: intentData.synergy.name,
      dimensions: intentData.selectedDimensions,
      timestamp: Date.now(),
      // Hash do wallet (não endereço completo)
      userHash: hashWallet(walletAddress)
    })
  });

  return response.json();
}
```

---

## 🛡️ **Privacidade e Consentimento**

### **Princípios:**

1. **Opt-in explícito** - Usuário deve consentir
2. **Anonimização** - Nunca salvar texto livre sem consentimento
3. **Transparência** - Mostrar claramente o que será salvo
4. **LGPD/GDPR compliant** - Permitir exclusão de dados

### **Componente de Consentimento:**

```jsx
// src/components/IntentConsent.jsx
function IntentConsent({ onConsent }) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB]">
      <h3 className="text-lg font-semibold mb-3">Privacidade e Dados</h3>
      <p className="text-sm text-[#4B5563] mb-4">
        Seus padrões podem ser salvos de forma anonimizada para:
      </p>
      <ul className="text-sm text-[#4B5563] space-y-2 mb-4">
        <li>• Melhorar o sistema</li>
        <li>• Pesquisa de padrões morfológicos</li>
        <li>• Análise agregada (sem dados pessoais)</li>
      </ul>
      <div className="flex gap-3">
        <button onClick={() => onConsent(true)}>
          Permitir (Anonimizado)
        </button>
        <button onClick={() => onConsent(false)}>
          Apenas Local
        </button>
      </div>
    </div>
  );
}
```

---

## 📋 **Recomendação de Implementação**

### **Fase 1: IPFS (Imediato)**

- ✅ Mais alinhado com Web3
- ✅ Descentralizado
- ✅ Já tem infraestrutura (Lighthouse)

### **Fase 2: Analytics Agregado**

- ✅ Entender uso
- ✅ Melhorar UX
- ✅ Sem dados pessoais

### **Fase 3: Smart Contract (Futuro)**

- ✅ NFT como certificado
- ✅ Integração com $NEO token
- ✅ On-chain, imutável

---

## 🔧 **Variáveis de Ambiente Necessárias**

```env
# IPFS (Lighthouse)

VITE_LIGHTHOUSE_API_KEY=your_api_key

# Thirdweb (já configurado)

VITE_THIRDWEB_SECRET_KEY=your_secret_key
VITE_THIRDWEB_CLIENT_ID=your_client_id

# Analytics (opcional)

VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_PLAUSIBLE_DOMAIN=neoprotocol.eth

# Backend (opcional)

VITE_BACKEND_API_URL=https://api.neoprotocol.eth
```

---

## 📊 **Estrutura de Dados Recomendada**

```json
{
  "version": "1.0",
  "timestamp": 1234567890,
  "userHash": "0xabc...", // Hash do wallet (não endereço completo)
  "archetypes": {
    "problem_solving": "Engenheiro",
    "collaboration": "Catalisador",
    "creation": "Artista"
  },
  "synergy": {
    "name": "Nome do Padrão",
    "intent": "Descrição",
    "power": "Superpoder",
    "alert": "Alerta"
  },
  "dimensions": ["problem_solving", "collaboration"],
  "mermaidHash": "abc123...", // Hash do código Mermaid
  "ipfsCID": "QmXxx...", // CID do IPFS (se salvo)
  "privacy": {
    "textResponses": false, // Nunca salvar texto livre
    "anonymized": true,
    "consentGiven": true
  }
}
```

---

## ✅ **Checklist de Implementação**

- [ ] Criar serviço de captura de dados (`src/services/intentDataCapture.js`)
- [ ] Adicionar componente de consentimento
- [ ] Implementar upload para IPFS
- [ ] Configurar analytics (opcional)
- [ ] Adicionar hash de wallet (anonimização)
- [ ] Testar fluxo completo
- [ ] Documentar política de privacidade
- [ ] Adicionar opção de exclusão de dados

---

**Status:** Proposta | **Autor:** NΞØ Protocol | **Data:** 2025

