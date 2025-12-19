# 📌 Configurar IPNS para neoprotocol.eth

## 🤔 IPNS vs CID Direto no ENS

### Opção 1: CID Direto no ENS (Mais Simples) ✅ RECOMENDADO

**Vantagens:**

- ✅ Mais simples e direto
- ✅ Não precisa manter IPNS rodando
- ✅ Acesso imediato ao conteúdo

**Desvantagens:**

- ❌ Cada atualização requer atualizar o ENS (custo de gas)
- ❌ CID muda a cada atualização

**Como usar:**

```javascript
// No ENS, configure o contenthash como:
ipfs://Qmar2He46w4Muwen5qdYzu45gypGbZBMw6MYhLpqA4heX1
```

### Opção 2: IPNS (Mais Flexível)

**Vantagens:**

- ✅ Endereço fixo que não muda
- ✅ Atualizações sem modificar o ENS
- ✅ Pode atualizar o conteúdo facilmente

**Desvantagens:**

- ❌ Requer manter o IPFS node rodando para republicar
- ❌ Primeira publicação pode levar alguns minutos para propagar
- ❌ Mais complexo de configurar

**Como usar:**

```javascript
// No ENS, configure o contenthash como:
ipns://k51qzi5uqu5d...
```

## 🚀 Configurar IPNS (Se Escolher Esta Opção)

### Passo 1: Gerar Chave IPNS

```bash
# Gerar uma nova chave IPNS

ipfs key gen neo-protocol-key

# Ou usar a chave padrão (self)
# A chave padrão já existe: self

```

### Passo 2: Publicar CID no IPNS

```bash
# Publicar o CID no IPNS usando a chave gerada

ipfs name publish --key=neo-protocol-key /ipfs/Qmar2He46w4Muwen5qdYzu45gypGbZBMw6MYhLpqA4heX1

# Ou usando a chave padrão (self)

ipfs name publish /ipfs/Qmar2He46w4Muwen5qdYzu45gypGbZBMw6MYhLpqA4heX1
```

**Resposta esperada:**
```
Published to k51qzi5uqu5d...: /ipfs/Qmar2He46w4Muwen5qdYzu45gypGbZBMw6MYhLpqA4heX1
```

### Passo 3: Verificar Publicação

```bash
# Verificar o IPNS

ipfs name resolve k51qzi5uqu5d...

# Deve retornar:
# /ipfs/Qmar2He46w4Muwen5qdYzu45gypGbZBMw6MYhLpqA4heX1

```

### Passo 4: Configurar no ENS

No ENS, configure o contenthash como:
```
ipns://k51qzi5uqu5d...
```

## 🔄 Atualizar Conteúdo no IPNS

Quando você atualizar o conteúdo e gerar um novo CID:

```bash
# 1. Fazer build

npm run build:boot

# 2. Adicionar ao IPFS (se ainda não estiver)

ipfs add -r dist-boot

# 3. Publicar novo CID no IPNS

ipfs name publish --key=neo-protocol-key /ipfs/NOVO_CID_AQUI
```

## ⚠️ Importante sobre IPNS

1. **Propagação**: Pode levar 5-30 minutos para o IPNS propagar
2. **Node Ativo**: Você precisa manter o IPFS node rodando para republicar
3. **TTL**: O IPNS tem um TTL (Time To Live), pode precisar republicar periodicamente

## 📝 Script Automatizado para IPNS

Crie um script `scripts/publish-ipns.js`:

```javascript
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Ler CID do arquivo .pinata-cid ou usar o CID conhecido
const CID = process.argv[2] || 'Qmar2He46w4Muwen5qdYzu45gypGbZBMw6MYhLpqA4heX1';
const KEY_NAME = process.env.IPNS_KEY_NAME || 'neo-protocol-key';

console.log(`📌 Publicando CID ${CID} no IPNS...`);

try {
  // Publicar no IPNS
  const output = execSync(
    `ipfs name publish --key=${KEY_NAME} /ipfs/${CID}`,
    { encoding: 'utf-8' }
  );
  
  console.log('✅ Publicado com sucesso!');
  console.log(output);
  
  // Extrair o IPNS hash
  const ipnsMatch = output.match(/Published to ([^:]+)/);
  if (ipnsMatch) {
    const ipnsHash = ipnsMatch[1];
    console.log(`\n📋 IPNS Hash: ${ipnsHash}`);
    console.log(`🌐 Acesse em: https://ipfs.io/ipns/${ipnsHash}`);
    console.log(`📝 Configure no ENS como: ipns://${ipnsHash}`);
  }
} catch (error) {
  console.error('❌ Erro ao publicar:', error.message);
  process.exit(1);
}
```

## 🎯 Recomendação

Para o caso do **neoprotocol.eth**, recomendo usar **CID direto** no ENS porque:

1. ✅ Mais simples e confiável
2. ✅ Não depende de manter IPFS node rodando
3. ✅ Acesso imediato
4. ✅ O conteúdo do boot não muda frequentemente

Use IPNS apenas se você planeja atualizar o conteúdo frequentemente sem querer atualizar o ENS toda vez.

