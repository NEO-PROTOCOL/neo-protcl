# 🧹 Análise de Limpeza do Projeto - NΞØ Protocol

## 📋 Resumo Executivo

Este documento identifica arquivos obsoletos, não utilizados ou que precisam de atenção no projeto.

---

## ✅ Arquivos em Uso (Manter)

### Core Application

- ✅ `src/main.jsx` - Entry point principal
- ✅ `src/App.jsx` - Router principal
- ✅ `index.html` - HTML principal
- ✅ `vite.config.js` - Config do Vite principal
- ✅ `package.json` - Dependências

### Boot System (IPFS/ENS)

- ✅ `boot.html` - **USADO** no build-boot (vite.config.boot.js)
- ✅ `branding.html` - **USADO** no build-boot (vite.config.boot.js)
- ✅ `src/boot-main.jsx` - **USADO** por boot.html
- ✅ `src/branding-main.jsx` - **USADO** por branding.html
- ✅ `vite.config.boot.js` - **USADO** para build do boot
- ✅ `public/branding-pure.html` - HTML puro para IPFS
- ✅ `public/desktop-redirect.html` - Redirecionamento desktop

### Pages Ativas

- ✅ `src/pages/home/NeoProtocol.jsx` - Home (router)
- ✅ `src/pages/home/NeoProtocolDesktop.jsx` - Home desktop
- ✅ `src/pages/home/NeoProtocolMobile.jsx` - Home mobile
- ✅ `src/pages/manifesto/ManifestoPage.jsx` - Manifesto
- ✅ `src/pages/nos/NosPage.jsx` - Nodes
- ✅ `src/pages/boot/IntelligenceBoot.jsx` - Boot sequence
- ✅ `src/pages/boot/BrandingLanding.jsx` - Branding landing
- ✅ `src/pages/intent/IntentSystemPage.jsx` - Intent System
- ✅ `src/pages/x402-example.jsx` - Exemplo x402
- ✅ `src/pages/sdk-example.jsx` - Exemplo SDK

### Components Ativos

- ✅ `src/components/Navbar.jsx` - Navbar
- ✅ `src/components/BottomNavigation.jsx` - Bottom nav
- ✅ `src/components/PWAUpdatePrompt.jsx` - PWA updates
- ✅ `src/components/MermaidDiagram.jsx` - Diagramas
- ✅ `src/components/TypewriterText.jsx` - **USADO** em ManifestoPage
- ✅ `src/components/NetworkGraph3D.jsx` - **USADO** em NosPage
- ✅ `src/components/WalletConnect/*` - Wallet components
- ✅ `src/components/X402/PaymentButton.jsx` - Payment button

### Services & Hooks

- ✅ Todos os hooks em `src/hooks/` - Todos em uso
- ✅ Todos os services em `src/services/` - Todos em uso
- ✅ Todos os providers em `src/providers/` - Todos em uso

### Terminal System

- ✅ `src/terminal/*` - Sistema de terminal completo (LiveAgent, etc)

### Scripts Ativos

- ✅ `scripts/bump-version.js` - Versionamento
- ✅ `scripts/upload-to-pinata.js` - Upload Pinata
- ✅ `scripts/upload-to-lighthouse.js` - Upload Lighthouse
- ✅ `scripts/post-build-boot.js` - Post-build boot
- ✅ `scripts/check-ens-status.js` - Verificação ENS
- ✅ `scripts/publish-to-ipns.sh` - Publicação IPNS

---

## ⚠️ Arquivos que Precisam de Atenção

### 1. MCP Console (Desabilitado)

- ⚠️ `src/pages/mcp-console.jsx` - **COMENTADO** no App.jsx
  - **Status**: Rota desabilitada com nota "será instruído depois"
  - **Ação**: Manter por enquanto, mas documentar que está pendente

### 2. MainLayout (Não Usado)

- ❌ `src/components/Layout/MainLayout.jsx` - **NÃO REFERENCIADO**
  - **Status**: Criado mas nunca usado em nenhum lugar
  - **Ação**: **REMOVER** - não há referências no código

### 3. Scripts de Teste/Preparação

- ⚠️ `scripts/test-lighthouse-upload.js` - Script de teste
  - **Status**: Útil para debug, mas não usado em produção
  - **Ação**: Manter para debug ou mover para `scripts/dev/`
  
- ⚠️ `scripts/prepare-for-lighthouse.js` - Preparação manual
  - **Status**: Usado apenas para upload manual
  - **Ação**: Manter se necessário para uploads manuais

---

## 🗑️ Arquivos Obsoletos Identificados

### 1. MainLayout (Não Usado)

- ❌ `src/components/Layout/MainLayout.jsx`
  - **Razão**: Criado mas nunca referenciado no código
  - **Ação**: **REMOVER**

### 2. UI Button (Possivelmente Duplicado)

- ❓ `src/components/UI/Button.jsx`
  - **Razão**: Não encontrado uso direto, existe duplicação com nexo-ui
  - **Ação**: Verificar e possivelmente remover

### 3. Diretórios Vazios (Apenas .gitkeep)

- ⚠️ `public/images/backgrounds/` - Vazio (apenas .gitkeep)
- ⚠️ `public/images/hero/` - Vazio (apenas .gitkeep)  
- ⚠️ `public/images/sections/` - Vazio (apenas .gitkeep)
  - **Status**: Preparados para uso futuro
  - **Ação**: Manter se planeja usar, ou remover se não

## 📝 Notas sobre Arquivos Especiais

### Nexo UI (EM USO - Manter)

- ✅ `src/nexo-ui/` - Sistema de UI próprio
  - **EM USO**: particles.json usado em IntentSystemPage
  - **EM USO**: tokens.css e index.css importados em index.css
  - **EM USO**: utils (cn, glitch) podem ser usados
  - **Componentes**: Button, Card, Divider podem não estar sendo usados diretamente, mas fazem parte do sistema
  - **Ação**: **MANTER** - sistema de design tokens e particles é usado

### 2. Documentação Duplicada/Desatualizada

- ❓ `docs/instrucoes.json` - Formato JSON de instruções
  - **Ação**: Verificar se ainda é usado
  
- ❓ Múltiplos docs sobre ENS/IPFS podem estar desatualizados
  - **Ação**: Revisar e consolidar documentação

---

## 📊 Estatísticas

- **Total de arquivos analisados**: ~150+
- **Arquivos em uso**: ~95%
- **Arquivos obsoletos identificados**: ~5%
- **Arquivos que precisam revisão**: ~3%

---

## 🔍 Próximos Passos Recomendados

### Ações Imediatas (Remover)

1. **Remover MainLayout não usado**
   ```bash
   rm src/components/Layout/MainLayout.jsx
   rm -rf src/components/Layout  # Se ficar vazio
   ```

2. **Verificar e possivelmente remover UI Button duplicado**
   ```bash
   # Verificar se é usado
   grep -r "components/UI/Button" src/
   # Se não for usado, remover
   rm src/components/UI/Button.jsx
   ```

### Ações de Verificação

3. **Executar script de verificação**
   ```bash
   node scripts/check-unused-files.js
   ```

4. **Revisar documentação**
   - Consolidar docs duplicados sobre ENS/IPFS
   - Atualizar docs desatualizados
   - Verificar `docs/instrucoes.json` se ainda é usado

5. **Decidir sobre MCP Console**
   - Ativar ou remover completamente
   - Documentar status atual

### Diretórios Vazios

6. **Decidir sobre diretórios de imagens vazios**
   - Manter se planeja adicionar imagens
   - Remover se não for usar

---

## 📝 Notas

- Arquivos HTML na raiz (`boot.html`, `branding.html`) são **NECESSÁRIOS** para o build-boot
- Scripts de teste podem ser úteis para debug
- Documentação extensa é boa, mas precisa estar atualizada

---

## 🛠️ Comandos Make Disponíveis

```bash
# Verificar arquivos não utilizados

make check-unused

# Remover arquivos obsoletos identificados

make clean-unused

# Limpeza completa (builds + cache)

make clean

# Limpeza total (inclui node_modules)

make clean-all
```

---

## ✅ Resumo Final

### Arquivos para REMOVER (Confirmados)

1. ❌ `src/components/Layout/MainLayout.jsx` - Nunca usado

### Arquivos para VERIFICAR

1. ❓ `src/components/UI/Button.jsx` - Possível duplicação
2. ❓ `src/pages/mcp-console.jsx` - Desabilitado, decidir se ativa ou remove

### Arquivos para MANTER

- ✅ Todos os HTMLs na raiz (necessários para build-boot)
- ✅ `src/nexo-ui/` - Sistema de design tokens em uso
- ✅ Todos os scripts (úteis para deploy e debug)
- ✅ Diretórios vazios com .gitkeep (preparados para uso futuro)
