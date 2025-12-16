# 📦 Relatório de Análise de Dependências

## ✅ DEPENDÊNCIAS EM USO (Manter)

### 1. **@thirdweb-dev/chains** ✅ USADO

- **Status**: ✅ **MANTER**
- **Onde**: `src/providers/ThirdwebProvider.jsx:2`
- **Uso**: `import { Base } from "@thirdweb-dev/chains";`
- **Motivo**: Necessário para configurar a chain Base no ThirdwebProvider

### 2. **@thirdweb-dev/react** ✅ USADO

- **Status**: ✅ **MANTER**
- **Onde**: `src/providers/ThirdwebProvider.jsx:1`
- **Uso**: `import { ThirdwebProvider } from "@thirdweb-dev/react";`
- **Motivo**: Provider principal do Thirdweb para React

### 3. **@thirdweb-dev/sdk** ✅ USADO (Indiretamente)

- **Status**: ✅ **MANTER**
- **Onde**: Dependência transitiva de `@thirdweb-dev/react`
- **Motivo**: Necessário para funcionamento do ThirdwebProvider

### 4. **ethers** ✅ USADO (Indiretamente)

- **Status**: ✅ **MANTER**
- **Onde**: 
  - Dependência transitiva de várias libs blockchain
  - Comentado em `src/main.jsx:7` como necessário para libs blockchain
- **Motivo**: Usado por dependências transitivas (Safe SDK, etc.)

### 5. **@lighthouse-web3/sdk** ✅ USADO

- **Status**: ✅ **MANTER**
- **Onde**: 
  - `src/services/intentDataCapture.js:174`
  - `scripts/upload-to-lighthouse.js:49`
  - `scripts/test-lighthouse-upload.js:30`
  - `vite.config.js:32` (optimizeDeps)
- **Uso**: Upload de arquivos para IPFS via Lighthouse
- **Motivo**: Funcionalidade crítica de upload IPFS

### 6. **archiver** ✅ USADO

- **Status**: ✅ **MANTER**
- **Onde**: 
  - `scripts/upload-to-pinata.js:22,69`
  - `scripts/prepare-for-lighthouse.js:11,36`
- **Uso**: Criar arquivos ZIP para deploy
- **Motivo**: Necessário para scripts de deploy

### 7. **form-data** ✅ USADO

- **Status**: ✅ **MANTER**
- **Onde**: `scripts/upload-to-pinata.js:19,109`
- **Uso**: Upload multipart/form-data para Pinata
- **Motivo**: Necessário para upload de arquivos

### 8. **node-fetch** ✅ USADO

- **Status**: ✅ **MANTER**
- **Onde**: 
  - `scripts/check-ens-status.js:10`
  - `scripts/upload-to-pinata.js:21`
- **Uso**: Requisições HTTP em scripts Node.js
- **Motivo**: Necessário para scripts de deploy/verificação

### 9. **dotenv** ✅ USADO

- **Status**: ✅ **MANTER**
- **Onde**: 
  - `scripts/upload-to-pinata.js:20,28`
  - `scripts/upload-to-lighthouse.js:11,18`
  - `scripts/check-ens-status.js:11,18`
  - `scripts/test-lighthouse-upload.js:6`
- **Uso**: Carregar variáveis de ambiente
- **Motivo**: Necessário para todos os scripts de deploy

### 10. **serve** ✅ USADO

- **Status**: ✅ **MANTER**
- **Onde**: `package.json:18` (script "start")
- **Uso**: `"start": "serve -s dist -l 10000"`
- **Motivo**: Servir build de produção localmente

### 11. **thirdweb** ✅ USADO

- **Status**: ✅ **MANTER**
- **Onde**: 
  - `src/providers/X402Provider.jsx:1-3`
  - `src/services/thirdwebSDK.js:2-3`
  - `src/hooks/useThirdwebSDK.js:2`
- **Uso**: SDK principal do Thirdweb (v5) para contratos e x402
- **Motivo**: Funcionalidade crítica de blockchain

### 12. **@vitejs/plugin-react** ✅ USADO

- **Status**: ✅ **MANTER**
- **Onde**: `vite.config.js:2,40`
- **Uso**: Plugin React para Vite
- **Motivo**: Necessário para build do projeto

### 13. **autoprefixer** ✅ USADO

- **Status**: ✅ **MANTER**
- **Onde**: `postcss.config.js:4`
- **Uso**: Plugin PostCSS para autoprefixer
- **Motivo**: Necessário para processamento de CSS

### 14. **postcss** ✅ USADO

- **Status**: ✅ **MANTER**
- **Onde**: `postcss.config.js` (arquivo de configuração)
- **Uso**: Processador CSS
- **Motivo**: Necessário para Tailwind CSS

### 15. **tailwindcss** ✅ USADO

- **Status**: ✅ **MANTER**
- **Onde**: `tailwind.config.js` (arquivo de configuração)
- **Uso**: Framework CSS utility-first
- **Motivo**: Sistema de design do projeto

### 16. **vite** ✅ USADO

- **Status**: ✅ **MANTER**
- **Onde**: Build tool principal
- **Uso**: Bundler e dev server
- **Motivo**: Ferramenta de build essencial

### 17. **vite-plugin-pwa** ✅ USADO

- **Status**: ✅ **MANTER**
- **Onde**: `vite.config.js:3,41-139`
- **Uso**: Plugin PWA para Vite
- **Motivo**: Funcionalidade PWA crítica

### 18. **@types/react** ✅ USADO

- **Status**: ✅ **MANTER**
- **Onde**: TypeScript types para React
- **Uso**: Tipos TypeScript
- **Motivo**: Necessário para desenvolvimento TypeScript/JSX

### 19. **@types/react-dom** ✅ USADO

- **Status**: ✅ **MANTER**
- **Onde**: TypeScript types para React DOM
- **Uso**: Tipos TypeScript
- **Motivo**: Necessário para desenvolvimento TypeScript/JSX

---

## ⚠️ DEPENDÊNCIAS QUESTIONÁVEIS

### 1. **@safe-global/safe-core-sdk-types** ❌ REMOVER

- **Status**: ❌ **PODE SER REMOVIDO**
- **Análise**: 
  - Não encontrado uso direto no código fonte
  - Já é fornecido como dependência transitiva via `@thirdweb-dev/react`
  - Versão instalada: `2.3.0` (diretamente)
  - Versão transitiva: `1.10.1` (via @thirdweb-dev/wallets → @safe-global/safe-core-sdk)
  - A versão direta não está sendo usada
- **Recomendação**: 
  - ✅ **PODE SER REMOVIDO** - já está disponível como dependência transitiva
  - Comando: `npm uninstall @safe-global/safe-core-sdk-types`
  - **AÇÃO**: Remover do package.json

---

## 📊 Resumo

### ✅ Manter (18 dependências)

Todas as dependências listadas acima estão em uso ativo no projeto.

### ❌ Remover (1 dependência)

- `@safe-global/safe-core-sdk-types` - Já disponível como dependência transitiva

---

## 🔍 Conclusão

O script de análise inicialmente marcou 19 dependências como não utilizadas, mas após análise detalhada:

- **18 dependências** estão realmente em uso (algumas indiretamente ou em scripts)
- **1 dependência** (`@safe-global/safe-core-sdk-types`) pode ser removida (já disponível como transitiva)

### ✅ Ação Recomendada

```bash
npm uninstall @safe-global/safe-core-sdk-types
```

Esta dependência já está sendo fornecida automaticamente pelo `@thirdweb-dev/react` através de suas dependências transitivas.

**Recomendação**: O script de análise precisa ser melhorado para detectar:

1. Uso em arquivos de configuração (vite.config.js, tailwind.config.js, postcss.config.js)
2. Uso em scripts (pasta scripts/)
3. Dependências transitivas necessárias
4. Uso em comentários/documentação que indicam necessidade futura
