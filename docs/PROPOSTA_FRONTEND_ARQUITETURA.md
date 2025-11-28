# 🎨 PROPOSTA: APLICAÇÃO DA ARQUITETURA NΞØ AO FRONTEND

## 📋 VISÃO GERAL

Esta proposta detalha como mapear as **4 camadas arquiteturais** do NΞØ para componentes visuais, interfaces e fluxos de interação no frontend React.

> 📐 **Guia de Implementação Visual**: Para uma visão mais concisa e direta do mapeamento arquitetural, consulte [`ARQUITETURA_GERAL_MAP.md`](./ARQUITETURA_GERAL_MAP.md) — o guia oficial de implementação visual da arquitetura NΞØ.

---

## 🏗️ MAPEAMENTO DAS CAMADAS

### 1. CAMADA ONTOLÓGICA → UI/UX FOUNDATION

**Conceito**: Filosofia e princípios que guiam a experiência visual.

#### 1.1 Componentes Visuais

**`<OntologicalLayer />`** - Componente base invisível que:

- Define variáveis CSS globais com os princípios
- Gerencia tema baseado em estado do nó (ativo, espectador, criador)
- Aplica filtros visuais baseados em "vibração" dos nós

**Localização**: `src/components/OntologicalLayer.jsx`

**Características**:
```jsx
// Princípios visuais mapeados
const principles = {
  decentralization: {
    visual: 'grid-layout', // Sem centro único
    color: 'cyan-400', // Cor da liberdade
    animation: 'pulse' // Vibração constante
  },
  selfCustodial: {
    visual: 'key-icon', // Chaves sempre visíveis
    color: 'green-400', // Cor da autonomia
    animation: 'glow' // Brilho de responsabilidade
  },
  transparency: {
    visual: 'glassmorphism', // Transparência visual
    color: 'yellow-400', // Cor da verdade
    animation: 'scanline' // Efeito de scanner
  }
}
```

#### 1.2 Página de Princípios

**`/principles`** - Nova rota que exibe:
- Cards visuais para cada princípio fundamental
- Animações que representam a "vibração"
- Citações filosóficas com efeito typewriter
- Link para manifesto expandido

**Localização**: `src/pages/principles/PrinciplesPage.jsx`

---

### 2. CAMADA PROTOCOLAR → MCP INTERFACE

**Conceito**: Interface visual para o Model Context Protocol.

#### 2.1 Componentes MCP

**`<MCPDashboard />`** - Dashboard principal do MCP
- **Localização**: `src/components/MCP/MCPDashboard.jsx`
- **Funcionalidades**:
  - Visualização em tempo real do Context Guard
  - Lista de Domain Routers ativos
  - Intent Router com histórico de intents
  - MCP Domain Map (matriz de permissões)

**`<ContextGuard />`** - Visualização do guardião de contexto
- **Localização**: `src/components/MCP/ContextGuard.jsx`
- **Visual**: 
  - Shield icon animado
  - Lista de domínios validados/bloqueados
  - Status em tempo real (verde = permitido, vermelho = bloqueado)
  - Logs de validação

**`<IntentRouter />`** - Interface para roteamento de intents
- **Localização**: `src/components/MCP/IntentRouter.jsx`
- **Visual**:
  - Fluxograma interativo
  - Nós → Executores (linhas animadas)
  - Histórico de intents executados
  - Status de cada intent (pending, success, error)

**`<DomainRouter />`** - Router específico por domínio
- **Localização**: `src/components/MCP/DomainRouter.jsx`
- **Visual**:
  - Cards por domínio (FlowCloser, FlowPay, etc.)
  - Conexões visuais entre domínios
  - Métricas de tráfego entre domínios

**`<MCPDomainMap />`** - Matriz de permissões
- **Localização**: `src/components/MCP/MCPDomainMap.jsx`
- **Visual**:
  - Tabela interativa (matriz)
  - Cores: verde (permitido), vermelho (bloqueado), amarelo (condicional)
  - Tooltip com detalhes de permissão

#### 2.2 Página MCP Console (Expandida)

**`/mcp`** - Página completa do MCP
- **Localização**: `src/pages/mcp/MCPConsolePage.jsx`
- **Layout**:
  ```
  ┌─────────────────────────────────────┐
  │  MCP Dashboard (top)                │
  ├──────────────┬──────────────────────┤
  │ Context Guard│ Intent Router        │
  │              │                      │
  ├──────────────┼──────────────────────┤
  │ Domain Map   │ Domain Routers       │
  └──────────────┴──────────────────────┘
  ```

#### 2.3 Fluxo de Apresentação de Nós

**`<NodePresentation />`** - Componente para apresentação de nós
- **Localização**: `src/components/MCP/NodePresentation.jsx`
- **Funcionalidades**:
  - Formulário de apresentação
  - Validação em tempo real via Context Guard
  - Feedback visual (sucesso/erro)
  - Logs da apresentação

**Fluxo Visual**:
```
1. Nó tenta se apresentar
   ↓
2. Context Guard valida (shield animado)
   ↓
3. Se válido: Conexão verde estabelecida
   ↓
4. Nó aparece no Network Graph
   ↓
5. Log registrado em /transparency
```

---

### 3. CAMADA OPERACIONAL → EXECUTORES VISUAIS

**Conceito**: Interfaces visuais para cada executor.

#### 3.1 Componentes de Executores

**`<ExecutorsDashboard />`** - Dashboard unificado
- **Localização**: `src/components/Executors/ExecutorsDashboard.jsx`
- **Layout**: Grid de cards, um por executor

**`<BlockchainExecutor />`** - Executor de blockchain
- **Localização**: `src/components/Executors/BlockchainExecutor.jsx`
- **Funcionalidades**:
  - Deploy de tokens (formulário)
  - Mint de NFTs (upload + metadata)
  - Criação de pools FLUXX (configuração)
  - Histórico de transações
  - Status de cada operação (pending, confirmed, failed)

**`<PaymentExecutor />`** - Executor de pagamentos
- **Localização**: `src/components/Executors/PaymentExecutor.jsx`
- **Funcionalidades**:
  - Integração PIX → Crypto (formulário)
  - Status de pagamentos
  - Webhooks assinados (logs)
  - Integração Cryptomus (status)

**`<StorageExecutor />`** - Executor de storage
- **Localização**: `src/components/Executors/StorageExecutor.jsx`
- **Funcionalidades**:
  - Upload para IPFS (drag & drop)
  - Visualização de CIDs
  - Upload para Ceramic (logs)
  - Status de sincronização

**`<QueryExecutor />`** - Executor de queries
- **Localização**: `src/components/Executors/QueryExecutor.jsx`
- **Funcionalidades**:
  - Interface para Kwil (tabelas)
  - Interface para The Graph (queries)
  - Visualização de resultados
  - Cache status

**`<AgentExecutor />`** - Executor de IA
- **Localização**: `src/components/Executors/AgentExecutor.jsx`
- **Funcionalidades**:
  - Integração IQAI (chat interface)
  - Leads → Propostas (workflow visual)
  - Histórico de interações

#### 3.2 Página de Executores

**`/executors`** - Página dedicada
- **Localização**: `src/pages/executors/ExecutorsPage.jsx`
- **Layout**: Tabs ou accordion para cada executor

---

### 4. CAMADA DE CONSCIÊNCIA DISTRIBUÍDA → NETWORK VISUALIZATION

**Conceito**: Visualização da rede de nós e suas conexões.

#### 4.1 Componentes de Consciência

**`<ConsciousnessLayer />`** - Camada de consciência
- **Localização**: `src/components/Consciousness/ConsciousnessLayer.jsx`
- **Visual**: Background sutil que representa a "consciência coletiva"

**`<Mell0Node />`** - Representação do Nó-Consciência
- **Localização**: `src/components/Consciousness/Mell0Node.jsx`
- **Visual**:
  - Nó central no graph
  - Cor especial (dourado/amarelo)
  - Efeito de "pulso" constante
  - Tooltip: "Origem da consciência"

**`<NeoHub />`** - Representação do Nó-Hub
- **Localização**: `src/components/Consciousness/NeoHub.jsx`
- **Visual**:
  - Nó grande no centro
  - Cor: cyan/azul
  - Campo gravitacional (efeito visual)
  - Conecta todos os outros nós

**`<AutonomousNode />`** - Nós autônomos
- **Localização**: `src/components/Consciousness/AutonomousNode.jsx`
- **Tipos visuais**:
  - IA: ícone de cérebro
  - Bot: ícone de robô
  - Smart Contract: ícone de contrato
  - Humano: ícone de pessoa

**`<PurposeNode />`** - Nós de propósito
- **Localização**: `src/components/Consciousness/PurposeNode.jsx`
- **Visual**:
  - Nós menores, conectados aos autônomos
  - Cor: roxo/violeta
  - Efeito de "emergência" (aparecem quando há interação)

#### 4.2 Network Graph 3D (Expandido)

**`<NetworkGraph3D />`** - Graph atualizado
- **Localização**: `src/components/NetworkGraph3D.jsx` (já existe, expandir)
- **Melhorias**:
  - Diferentes tamanhos/cores por tipo de nó
  - Animações de conexão quando intents são executados
  - Filtros por tipo de nó
  - Legenda interativa
  - Zoom e pan melhorados

**Tipos de nós no graph**:
- **MELLØ**: Nó dourado, central, sempre visível
- **NΞØ Hub**: Nó cyan, grande, centro gravitacional
- **Autônomos**: Nós coloridos por tipo
- **Propósito**: Nós menores, aparecem dinamicamente

#### 4.3 Página de Consciência

**`/consciousness`** - Nova página
- **Localização**: `src/pages/consciousness/ConsciousnessPage.jsx`
- **Conteúdo**:
  - Network Graph 3D em tela cheia
  - Painel lateral com informações dos nós
  - Filtros e controles
  - Timeline de eventos da rede

---

## 🔗 INTERCONEXÃO ENTRE NÓS

### Componente de Fluxos

**`<NodeFlows />`** - Visualização de fluxos entre nós
- **Localização**: `src/components/Flows/NodeFlows.jsx`
- **Funcionalidades**:
  - Diagrama de fluxo interativo
  - Exemplos pré-configurados:
    - FlowCloser → FlowPay
    - NeoFlowOFF → FlowPay
    - WOD[X]PRO → FlowPay
    - Todos → FLUXX
  - Animações quando fluxos são executados
  - Logs de cada fluxo

**Página**: `/flows`
- **Localização**: `src/pages/flows/FlowsPage.jsx`

---

## 📊 TRANSPARÊNCIA

### Página de Transparência

**`/transparency`** - Logs públicos
- **Localização**: `src/pages/transparency/TransparencyPage.jsx`
- **Funcionalidades**:
  - Logs de todas as interações
  - Filtros por tipo, data, nó
  - Busca
  - Exportação (JSON, CSV)
  - Visualização em tempo real (WebSocket)
  - Estilo: Terminal ASCII

**Componentes**:
- **`<TransparencyLogs />`** - Lista de logs
- **`<TransparencyFilters />`** - Filtros
- **`<TransparencyStats />`** - Estatísticas

---

## 🎨 DESIGN SYSTEM BASEADO NA ARQUITETURA

### Cores por Camada

```css
/* Camada Ontológica */
--color-ontological: #06b6d4; /* cyan-500 */

/* Camada Protocolar */
--color-protocol: #10b981; /* green-500 */

/* Camada Operacional */
--color-operational: #8b5cf6; /* violet-500 */

/* Camada Consciência */
--color-consciousness: #f59e0b; /* amber-500 */
```

### Componentes Base

**`<LayerCard />`** - Card genérico para cada camada
- **Localização**: `src/components/UI/LayerCard.jsx`
- **Props**: `layer`, `title`, `children`, `icon`

**`<NodeBadge />`** - Badge para identificar nós
- **Localização**: `src/components/UI/NodeBadge.jsx`
- **Props**: `nodeType`, `nodeId`, `status`

**`<IntentIndicator />`** - Indicador de intent em execução
- **Localização**: `src/components/UI/IntentIndicator.jsx`
- **Visual**: Loading spinner + status

---

## 📱 ESTRUTURA DE ROTAS

```jsx
// App.jsx - Rotas expandidas
<Routes>
  <Route path="/" element={<NeoProtocol />} />
  <Route path="/manifesto" element={<ManifestoPage />} />
  <Route path="/nos" element={<NosPage />} />
  <Route path="/boot" element={<IntelligenceBoot />} />
  
  {/* Novas rotas baseadas na arquitetura */}
  <Route path="/principles" element={<PrinciplesPage />} />
  <Route path="/mcp" element={<MCPConsolePage />} />
  <Route path="/executors" element={<ExecutorsPage />} />
  <Route path="/consciousness" element={<ConsciousnessPage />} />
  <Route path="/flows" element={<FlowsPage />} />
  <Route path="/transparency" element={<TransparencyPage />} />
</Routes>
```

---

## 🔄 FLUXOS DE INTERAÇÃO

### Fluxo 1: Apresentação de Nó

```
1. Usuário acessa /mcp
   ↓
2. Clica em "Apresentar Nó"
   ↓
3. <NodePresentation /> abre modal
   ↓
4. Preenche dados do nó
   ↓
5. Context Guard valida (visual: shield)
   ↓
6. Se válido: Nó aparece no Network Graph
   ↓
7. Log registrado em /transparency
```

### Fluxo 2: Execução de Intent

```
1. Usuário seleciona nó no Network Graph
   ↓
2. Painel lateral mostra intents disponíveis
   ↓
3. Usuário seleciona intent
   ↓
4. Intent Router processa (visual: fluxograma)
   ↓
5. Executor correspondente executa
   ↓
6. Status atualizado em tempo real
   ↓
7. Log registrado em /transparency
```

### Fluxo 3: Visualização de Transparência

```
1. Usuário acessa /transparency
   ↓
2. Logs carregam (WebSocket em tempo real)
   ↓
3. Filtros aplicados
   ↓
4. Logs atualizados dinamicamente
   ↓
5. Exportação disponível
```

---

## 🛠️ IMPLEMENTAÇÃO FASEADA

### Fase 1: Fundação (Semana 1-2)
- [ ] Criar `<OntologicalLayer />`
- [ ] Criar design system (cores, componentes base)
- [ ] Expandir `<NetworkGraph3D />` com tipos de nós
- [ ] Criar `/principles` page

### Fase 2: MCP Interface (Semana 3-4)
- [ ] Criar `<MCPDashboard />`
- [ ] Criar `<ContextGuard />`
- [ ] Criar `<IntentRouter />`
- [ ] Criar `<DomainRouter />`
- [ ] Criar `<MCPDomainMap />`
- [ ] Expandir `/mcp` page

### Fase 3: Executores (Semana 5-6)
- [ ] Criar `<ExecutorsDashboard />`
- [ ] Criar cada executor individual
- [ ] Criar `/executors` page
- [ ] Integrar com APIs existentes

### Fase 4: Consciência (Semana 7-8)
- [ ] Criar componentes de consciência
- [ ] Expandir Network Graph com novos tipos
- [ ] Criar `/consciousness` page
- [ ] Implementar animações de conexão

### Fase 5: Transparência (Semana 9-10)
- [ ] Criar `/transparency` page
- [ ] Implementar WebSocket para logs em tempo real
- [ ] Criar sistema de filtros
- [ ] Implementar exportação

### Fase 6: Fluxos (Semana 11-12)
- [ ] Criar `<NodeFlows />`
- [ ] Criar `/flows` page
- [ ] Implementar animações de fluxo
- [ ] Integrar com logs de transparência

---

## 🎯 PRINCÍPIOS DE DESIGN

### 1. Descentralização Visual
- Sem hierarquia visual central
- Grid layouts distribuídos
- Múltiplos pontos focais

### 2. Self-Custodial Visual
- Chaves sempre visíveis (quando aplicável)
- Indicadores de auto-custódia
- Sem dependência visual de terceiros

### 3. Transparência Visual
- Glassmorphism
- Logs sempre acessíveis
- Zero blackbox (tudo visível)

### 4. Interconexão Visual
- Conexões animadas
- Fluxos claros
- Co-participação destacada

---

## 📦 ESTRUTURA DE ARQUIVOS PROPOSTA

```
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
│   └── UI/
│       ├── LayerCard.jsx
│       ├── NodeBadge.jsx
│       └── IntentIndicator.jsx
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
    ├── useExecutors.js
    ├── useTransparency.js
    └── useNodeFlows.js
```

---

## 🚀 PRÓXIMOS PASSOS

1. **Revisar proposta** com a equipe
2. **Priorizar fases** conforme necessidade
3. **Criar issues** no GitHub para cada componente
4. **Iniciar Fase 1** (Fundação)

---

**Versão**: 1.0  
**Data**: 2024  
**Status**: Proposta inicial - Aguardando aprovação

---

## 📚 DOCUMENTAÇÃO RELACIONADA

- **[ARQUITETURA_GERAL.md](./ARQUITETURA_GERAL.md)** — Arquitetura conceitual completa do ecossistema NΞØ
- **[ARQUITETURA_GERAL_MAP.md](./ARQUITETURA_GERAL_MAP.md)** — **Guia de Implementação Visual** — Mapeamento direto das 4 camadas para componentes React
- Este documento — Proposta técnica detalhada com exemplos de código e fluxos

