# 🔑 Lighthouse API Keys - Guia de Configuração

## 📋 **Resumo**

O NΞØ Protocol usa o **Lighthouse** para fazer upload de arquivos no IPFS. Existem duas variáveis de ambiente que podem ser usadas:

1. **`VITE_LIGHTHOUSE_API_KEY`** ⭐ **RECOMENDADO**
   - Usada no **frontend** (browser) para upload de dados do Intent System
   - Precisa do prefixo `VITE_` para ser exposta pelo Vite no browser
   - Usada em: `src/services/intentDataCapture.js`

2. **`IPFS_API_KEY`** (Legado)
   - Usada em **scripts Node.js** para upload de builds completos
   - Não precisa do prefixo `VITE_` (não é exposta no browser)
   - Usada em: `scripts/upload-to-lighthouse.js`

## ✅ **Recomendação**

**Use a mesma API Key do Lighthouse para ambas as variáveis:**

```env
# Chave principal (frontend + scripts)

VITE_LIGHTHOUSE_API_KEY=sua_api_key_aqui

# Chave legada (scripts Node.js - aceita VITE_LIGHTHOUSE_API_KEY também)

IPFS_API_KEY=sua_api_key_aqui
```

**OU** (mais simples):

```env
# Uma única chave (scripts aceitam VITE_LIGHTHOUSE_API_KEY também)

VITE_LIGHTHOUSE_API_KEY=sua_api_key_aqui
```

## 🔧 **Como Obter a API Key**

1. Acesse: https://lighthouse.storage/
2. Crie uma conta ou faça login
3. Vá em **"API Keys"** ou **"Settings"**
4. Crie uma nova API Key
5. Copie a chave e cole no `.env`

## 📝 **Onde Cada Chave é Usada**

### Frontend (Browser)

- **Arquivo**: `src/services/intentDataCapture.js`
- **Função**: `saveIntentToIPFS()`
- **Uso**: Upload de dados anonimizados do Intent System
- **Variável**: `VITE_LIGHTHOUSE_API_KEY`

### Scripts Node.js

- **Arquivo**: `scripts/upload-to-lighthouse.js`
- **Função**: Upload de builds completos para IPFS
- **Variável**: `VITE_LIGHTHOUSE_API_KEY` ou `IPFS_API_KEY` (compatibilidade)

## ⚠️ **Problemas Comuns**

### Erro: "VITE_LIGHTHOUSE_API_KEY não configurada"

- **Causa**: Chave não está no `.env` ou não tem o prefixo `VITE_`
- **Solução**: Adicione `VITE_LIGHTHOUSE_API_KEY=sua_chave` no `.env`

### Erro: "CID não encontrado na resposta do Lighthouse"

- **Causa**: API Key inválida ou expirada
- **Solução**: Verifique a chave em https://lighthouse.storage/ e gere uma nova se necessário

### Erro: "401 Unauthorized"

- **Causa**: API Key inválida ou sem permissões
- **Solução**: Verifique se a chave está correta e ativa

## 🔒 **Segurança**

- ⚠️ **NUNCA** commite o arquivo `.env` no git (já está no `.gitignore`)
- ✅ Use `.env.example` para documentar as variáveis necessárias
- ✅ Use chaves diferentes para desenvolvimento e produção (se possível)

## 📚 **Documentação Relacionada**

- `docs/INTENT_DATA_CAPTURE.md` - Detalhes sobre captura de dados
- `docs/IPFS_DEPLOY.md` - Guia de deploy para IPFS

