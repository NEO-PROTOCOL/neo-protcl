# 🚀 Deploy para IPFS + ENS (neoprotocol.eth)

Guia para fazer deploy do IntelligenceBoot no IPFS e configurar o ENS.

## 📋 Pré-requisitos

1. **Node.js** e **npm** instalados
2. **IPFS CLI** instalado (opcional, pode usar serviços como Pinata, Lighthouse, etc)
3. **ENS Domain** `neoprotocol.eth` configurado
4. **Wallet** com controle do ENS

## 🛠️ Passo 1: Build do Projeto

### Opção A: Build Completo (App + Boot)

```bash
# Build de produção completo

npm run build

# O build será gerado em ./dist

```

### Opção B: Build Apenas da Página de Boot (Recomendado para ENS)

```bash
# Build apenas da página de boot (mais leve, ideal para ENS)

npm run build:boot

# O build será gerado em ./dist-boot
# Este build contém apenas a página IntelligenceBoot

```

**Recomendação**: Use `build:boot` para o deploy no ENS, pois é mais leve e focado no ritual de entrada.

## 📦 Passo 2: Upload para IPFS

### Opção A: Usando Script Automatizado (Pinata) ⭐ RECOMENDADO

**Pré-requisito**: Configure as chaves do Pinata no arquivo `.env`:

```env
PINATA_JWT_SECRET=seu_jwt_token_aqui
# OU

PINATA_API_KEY=sua_api_key
PINATA_API_SECRET=sua_api_secret
```

**Executar**:

```bash
# Build + Upload em um comando

npm run deploy:boot

# Ou separadamente:

npm run build:boot
npm run deploy:pinata
```

O script irá:

- ✅ Verificar se o build existe
- ✅ Autenticar no Pinata
- ✅ Fazer upload do diretório `dist-boot`
- ✅ Exibir o CID e URLs de acesso
- ✅ Salvar o CID em `.pinata-cid` para referência

### Opção B: Usando IPFS CLI

```bash
# Instalar IPFS CLI (se não tiver)
# macOS: brew install ipfs
# Linux: https://docs.ipfs.tech/install/command-line/

# Iniciar IPFS local (se necessário)

ipfs daemon

# Adicionar diretório ao IPFS
# Para build completo:

ipfs add -r dist

# Para build apenas boot (recomendado):

ipfs add -r dist-boot

# Você receberá um hash como:
# QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
# Copie o hash do diretório (última linha)

```

### Opção C: Usando Pinata (Interface Web)

1. Acesse [pinata.cloud](https://pinata.cloud)
2. Faça upload da pasta `dist-boot`
3. Copie o CID retornado

### Opção D: Usando Lighthouse Storage

```bash
# Se já tem Lighthouse configurado

npx lighthouse upload dist --apiKey YOUR_API_KEY
```

## 🔗 Passo 3: Configurar ENS Content Hash

**Nota**: Você já tem o conteúdo no IPFS! CID: `Qmar2He46w4Muwen5qdYzu45gypGbZBMw6MYhLpqA4heX1`

Você pode usar este CID diretamente no ENS ou configurar IPNS (veja [IPNS_SETUP.md](./IPNS_SETUP.md) para mais detalhes).

### Usando Ethers.js (JavaScript)

```javascript
import { ethers } from 'ethers';

// Conectar à wallet
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Resolver do ENS
const resolver = await provider.getResolver('neoprotocol.eth');

// Converter hash IPFS para contenthash
const ipfsHash = 'QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Seu hash
const contentHash = `ipfs://${ipfsHash}`;

// Configurar contenthash
const tx = await resolver.setContenthash(contentHash);
await tx.wait();
```

### Usando ENS App (Interface Web)

1. Acesse [app.ens.domains](https://app.ens.domains)
2. Conecte sua wallet
3. Procure por `neoprotocol.eth`
4. Vá em "Records" → "Content"
5. Adicione: `ipfs://QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
6. Confirme a transação

### Usando Etherscan (Manual)

1. Acesse o contrato do Resolver do ENS
2. Use a função `setContenthash`
3. Passe o hash IPFS formatado

## ✅ Passo 4: Verificar

Após configurar o contenthash, você pode acessar:

- **Brave Browser**: `neoprotocol.eth`
- **MetaMask**: `neoprotocol.eth`
- **ENS Link**: `neoprotocol.eth.link`
- **IPFS Gateway**: `https://ipfs.io/ipfs/QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

## 🎯 Estrutura do Build

O build gera:
```
dist/
├── index.html          # Página principal (pode ser configurada para /boot)
├── assets/             # JS, CSS, imagens
└── ...
```

## 🔧 Configuração para Boot como Página Principal

Se quiser que `/boot` seja a página inicial quando acessar via ENS:

1. **Opção 1**: Renomear `IntelligenceBoot.jsx` para ser renderizado em `/`
2. **Opção 2**: Configurar redirect no `index.html`
3. **Opção 3**: Criar build separado apenas com a página de boot

### Criar Build Apenas com Boot

Crie um `vite.config.boot.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './boot.html' // HTML customizado que renderiza apenas IntelligenceBoot
      }
    }
  }
})
```

## 📝 Notas Importantes

- **Hash IPFS é imutável**: Qualquer mudança no código requer novo upload e novo hash
- **Cache do ENS**: Pode levar alguns minutos para propagar
- **Gateways IPFS**: Use múltiplos gateways para redundância
- **CORS**: Certifique-se de que os gateways IPFS permitem CORS

## 🔄 Atualizar Deploy

Para atualizar:

1. Faça as alterações no código
2. `npm run build`
3. Upload novo para IPFS (novo hash)
4. Atualize o contenthash no ENS

## 🌐 Gateways IPFS Recomendados

- `https://ipfs.io/ipfs/`
- `https://gateway.pinata.cloud/ipfs/`
- `https://cloudflare-ipfs.com/ipfs/`
- `https://dweb.link/ipfs/`

## 📚 Referências

- [ENS Documentation](https://docs.ens.domains/)
- [IPFS Documentation](https://docs.ipfs.tech/)
- [Content Hash Format](https://github.com/ensdomains/content-hash)

