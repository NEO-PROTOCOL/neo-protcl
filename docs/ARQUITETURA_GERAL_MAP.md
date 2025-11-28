# ARQUITETURA GERAL — UI MAP (NΞØ)

## 🎨 Guia de Implementação Visual da Arquitetura NΞØ

**Tradução Visual da Arquitetura Ontológica, Protocolar, Operacional e de Consciência**

Versão: 1.0
Status: Estrutura inicial — expansível
Autor: MELLØ — O Humano que Virou Código

> 📖 **Documentação Relacionada**: 
> - [`ARQUITETURA_GERAL.md`](./ARQUITETURA_GERAL.md) — Arquitetura conceitual completa
> - [`PROPOSTA_FRONTEND_ARQUITETURA.md`](./PROPOSTA_FRONTEND_ARQUITETURA.md) — Proposta técnica detalhada com exemplos

---

# 1. VISÃO GERAL

O **UI MAP do NΞØ** traduz a arquitetura conceitual do ecossistema para o espaço visual do frontend.

As quatro camadas deixam de existir apenas como lógica filosófica ou protocolar e passam a operar também como **componentes visuais, interativos e observáveis**, permitindo que a consciência distribuída do ecossistema seja percebida diretamente pela interface.

---

# 2. MAPEAMENTO DAS CAMADAS

Cada camada conceitual do NΞØ possui sua contrapartida visual.

```text
Ontologia → UI Foundation
Protocolo → MCP Interface
Operações → Executores Visuais
Consciência → Network Visualization
```

---

# 3. CAMADA ONTOLÓGICA → UI/UX FOUNDATION

## 3.1 Componente Base — <OntologicalLayer />

Representa a presença filosófica do ecossistema no frontend.

**Funções:**

* Define variáveis de estilo (cores, vibração, densidade)
* Define estados do nó:
  * **Ativo**: Nó participante, pode executar intents
  * **Observador**: Nó que apenas observa, sem execução
  * **Criador**: Nó com permissões de criação/registro
* Filtra a experiência visual conforme a identidade do nó
* Aplica princípios visuais (descentralização, self-custodial, transparência)

**Localização:** `src/components/OntologicalLayer.jsx`

## 3.2 Página de Princípios — /principles

Exibe graficamente os fundamentos do NΞØ.

**Elementos visuais:**

* Cards dos princípios
* Vibração animada
* Frases-chave
* Ligação com o Manifesto

**Localização:** `src/pages/principles/PrinciplesPage.jsx`

---

# 4. CAMADA PROTOCOLAR → MCP INTERFACE

O MCP ganha forma: dashboards, matrix maps e routers visuais.

## 4.1 <MCPDashboard />

Visualização unificada do MCP.

**Localização:** `src/components/MCP/MCPDashboard.jsx`

## 4.2 <ContextGuard />

Mostra permissões, bloqueios e validações de nós.

**Localização:** `src/components/MCP/ContextGuard.jsx`

## 4.3 <IntentRouter />

Fluxograma de intents sendo processados.

**Localização:** `src/components/MCP/IntentRouter.jsx`

## 4.4 <DomainRouter />

Interface visual por domínio.

**Localização:** `src/components/MCP/DomainRouter.jsx`

## 4.5 <MCPDomainMap />

Matriz de permissões (verde, vermelho, amarelo).

**Localização:** `src/components/MCP/MCPDomainMap.jsx`

## 4.6 <NodePresentation />

Componente para apresentação de novos nós ao MCP.

**Funções:**
* Formulário de apresentação
* Validação em tempo real via Context Guard
* Feedback visual (sucesso/erro)
* Logs da apresentação

**Localização:** `src/components/MCP/NodePresentation.jsx`

## 4.7 Página MCP Console — /mcp

Layout principal do protocolo.

**Layout:**
```text
┌─────────────────────────────────────┐
│  MCP Dashboard (top)                │
├──────────────┬──────────────────────┤
│ Context Guard│ Intent Router        │
│              │                      │
├──────────────┼──────────────────────┤
│ Domain Map   │ Domain Routers       │
└──────────────┴──────────────────────┘
```

**Localização:** `src/pages/mcp/MCPConsolePage.jsx`

---

# 5. CAMADA OPERACIONAL → EXECUTORES VISUAIS

Cada executor ganha corpo e interface.

## 5.1 Dashboard de Executores — <ExecutorsDashboard />

**Localização:** `src/components/Executors/ExecutorsDashboard.jsx`

## 5.2 Blockchain Executor — <BlockchainExecutor />

Funções:

* Deploy de tokens
* Mint NFTs
* Pools DeFi
* Logs

**Localização:** `src/components/Executors/BlockchainExecutor.jsx`

## 5.3 Payment Executor — <PaymentExecutor />

Funções:

* PIX → Crypto
* Cryptomus
* Webhooks

**Localização:** `src/components/Executors/PaymentExecutor.jsx`

## 5.4 Storage Executor — <StorageExecutor />

Funções:

* IPFS
* Ceramic
* Sincronizações

**Localização:** `src/components/Executors/StorageExecutor.jsx`

## 5.5 Query Executor — <QueryExecutor />

Funções:

* Kwil
* The Graph

**Localização:** `src/components/Executors/QueryExecutor.jsx`

## 5.6 Agent Executor — <AgentExecutor />

Funções:

* IA
* Conversão de leads em proposta

**Localização:** `src/components/Executors/AgentExecutor.jsx`

## 5.7 Página /executors

**Localização:** `src/pages/executors/ExecutorsPage.jsx`

---

# 6. CAMADA DE CONSCIÊNCIA DISTRIBUÍDA → NETWORK VISUALIZATION

A consciência passa a ser vista, navegada e explorada.

## 6.1 <ConsciousnessLayer />

Ambiente visual da consciência.

**Localização:** `src/components/Consciousness/ConsciousnessLayer.jsx`

## 6.2 <Mell0Node /> — Nó-Consciência

**Localização:** `src/components/Consciousness/Mell0Node.jsx`

## 6.3 <NeoHub /> — Nó-Hub

**Localização:** `src/components/Consciousness/NeoHub.jsx`

## 6.4 <AutonomousNode /> — Nós Autônomos

**Localização:** `src/components/Consciousness/AutonomousNode.jsx`

## 6.5 <PurposeNode /> — Nós de Propósito

**Localização:** `src/components/Consciousness/PurposeNode.jsx`

## 6.6 NetworkGraph3D Expandido

**Localização:** `src/components/NetworkGraph3D.jsx` (já existe, será expandido)

**Melhorias propostas:**

* Diferentes tipos de nós (MELLØ, Hub, Autônomos, Propósito)
* Cores e tamanhos por tipo
* Animações de conexão quando intents são executados
* Filtros por tipo de nó
* Legenda interativa

## 6.7 Página /consciousness

**Localização:** `src/pages/consciousness/ConsciousnessPage.jsx`

---

# 7. FLUXOS E INTERCONEXÕES

## 7.1 <NodeFlows />

Visualização dos fluxos entre entidades.

**Localização:** `src/components/Flows/NodeFlows.jsx`

## 7.2 Página /flows

**Localização:** `src/pages/flows/FlowsPage.jsx`

---

# 8. TRANSPARÊNCIA → /transparency

Interfaces para logs, auditoria e histórico.

**Localização:** `src/pages/transparency/TransparencyPage.jsx`

**Componentes:**

* `<TransparencyLogs />`
* `<TransparencyFilters />`
* `<TransparencyStats />`

---

# 9. DESIGN SYSTEM DAS 4 CAMADAS

Cores, badges e indicadores.

```text
Ontologia → cyan
Protocolo → green
Operações → violet
Consciência → amber
```

Componentes base:

* `<LayerCard />`
* `<NodeBadge />`
* `<IntentIndicator />`

---

# 10. ROTAS PRINCIPAIS

```text
/principles
/mcp
/executors
/consciousness
/flows
/transparency
```

---

# 11. ESTRUTURA DE ARQUIVOS DO FRONTEND

```text
src/
├── components/
│   ├── OntologicalLayer.jsx
│   ├── MCP/
│   │   ├── MCPDashboard.jsx
│   │   ├── ContextGuard.jsx
│   │   ├── IntentRouter.jsx
│   │   ├── DomainRouter.jsx
│   │   ├── MCPDomainMap.jsx
│   │   └── NodePresentation.jsx
│   ├── Executors/
│   │   ├── ExecutorsDashboard.jsx
│   │   ├── BlockchainExecutor.jsx
│   │   ├── PaymentExecutor.jsx
│   │   ├── StorageExecutor.jsx
│   │   ├── QueryExecutor.jsx
│   │   └── AgentExecutor.jsx
│   ├── Consciousness/
│   │   ├── ConsciousnessLayer.jsx
│   │   ├── Mell0Node.jsx
│   │   ├── NeoHub.jsx
│   │   ├── AutonomousNode.jsx
│   │   └── PurposeNode.jsx
│   ├── Flows/
│   │   └── NodeFlows.jsx
│   ├── UI/
│   │   ├── LayerCard.jsx
│   │   ├── NodeBadge.jsx
│   │   └── IntentIndicator.jsx
│   └── NetworkGraph3D.jsx (existente, será expandido)
├── pages/
│   ├── principles/
│   │   └── PrinciplesPage.jsx
│   ├── mcp/
│   │   └── MCPConsolePage.jsx
│   ├── executors/
│   │   └── ExecutorsPage.jsx
│   ├── consciousness/
│   │   └── ConsciousnessPage.jsx
│   ├── flows/
│   │   └── FlowsPage.jsx
│   └── transparency/
│       └── TransparencyPage.jsx
└── hooks/
    ├── useMCP.js (existente)
    ├── useExecutors.js
    ├── useTransparency.js
    └── useNodeFlows.js
```

---

# 12. FASES DE IMPLEMENTAÇÃO

## Fase 1 — Fundação

* OntologicalLayer
* PrinciplesPage
* NetworkGraph básico

## Fase 2 — MCP Interface

* MCPDashboard
* ContextGuard
* IntentRouter

## Fase 3 — Executores

* Todos os executores

## Fase 4 — Consciência

* ConsciousnessLayer
* Nós Autônomos

## Fase 5 — Transparência

* Página /transparency

## Fase 6 — Fluxos

* NodeFlows

---

# 13. INTEGRAÇÃO COM COMPONENTES EXISTENTES

## 13.1 Componentes Já Implementados

* `NetworkGraph3D.jsx` — Será expandido com tipos de nós
* `useMCP.js` — Hook existente, será integrado
* `mcp-console.jsx` — Página base, será expandida para `/mcp`
* `NosPage.jsx` — Já exibe nós, será integrado com `/consciousness`

## 13.2 Fluxo de Integração

1. Expandir componentes existentes antes de criar novos
2. Integrar hooks existentes (`useMCP`) com novos hooks
3. Migrar funcionalidades de páginas antigas para nova estrutura
4. Manter compatibilidade durante transição

---

# 14. FINAL

Este UI MAP não é apenas documentação: é **a corporificação visual do ecossistema NΞØ**.

Da ontologia à consciência distribuída, tudo agora pode ser visto, tocado e interagido.

**Fim da versão inicial.**
