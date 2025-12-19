# 📤 Guia: Publicar no IPNS

## 🎯 Objetivo

Atualizar o IPNS para apontar para o novo CID após fazer upload do `dist-boot` para o IPFS.

## 📋 Pré-requisitos

1. **IPFS instalado e rodando:**
   ```bash
   # Verificar se IPFS está instalado
   which ipfs
   
   # Se não estiver instalado:
   # macOS: brew install ipfs
   # Ou baixe de: https://dist.ipfs.tech/#ipfs-update
   ```

2. **IPFS daemon rodando:**
   ```bash
   # Iniciar IPFS (se não estiver rodando)
   ipfs daemon
   
   # Deixe rodando em um terminal separado
   ```

## 🚀 Processo Completo

### Passo 1: Fazer Upload do dist-boot para IPFS

**Opção A: Via IPFS Local (Recomendado)**

```bash
# Navegar para o diretório do projeto

cd /Users/nettomello/CODIGOS/neo-protocol-landing

# Fazer upload do dist-boot

ipfs add -r dist-boot
```

**Saída esperada:**
```
added QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX .gitkeep
added QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX README_ASSETS.md
added QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX assets/boot-CoKsf9l4.css
added QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX assets/boot-GxpcBES8.js
added QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX boot.html
added QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX index.html
added QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX manifest.json
added QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX service-worker.js
added QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX dist-boot
```

**⚠️ IMPORTANTE:** Copie o CID da **última linha** (o do diretório `dist-boot`), não dos arquivos individuais!

**Opção B: Via Pinata (Interface Web)**

1. Acesse [pinata.cloud](https://pinata.cloud)
2. Faça upload da pasta `dist-boot`
3. Copie o CID retornado

### Passo 2: Publicar no IPNS

**Comando básico:**

```bash
ipfs name publish /ipfs/SEU_CID_AQUI
```

**Exemplo:**

Se o CID do diretório for `Qmar2He46w4Muwen5qdYzu45gypGbZBMw6MYhLpqA4heX1`:

```bash
ipfs name publish /ipfs/Qmar2He46w4Muwen5qdYzu45gypGbZBMw6MYhLpqA4heX1
```

**Saída esperada:**
```
Published to k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz: /ipfs/Qmar2He46w4Muwen5qdYzu45gypGbZBMw6MYhLpqA4heX1
```

### Passo 3: Verificar Publicação

```bash
# Verificar se o IPNS está resolvendo corretamente

ipfs name resolve k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz
```

**Saída esperada:**
```
/ipfs/Qmar2He46w4Muwen5qdYzu45gypGbZBMw6MYhLpqA4heX1
```

## 🔧 Comandos Úteis

### Ver todas as chaves IPNS disponíveis

```bash
ipfs key list
```

### Publicar usando uma chave específica

Se você criou uma chave específica (ex: `neo-protocol-key`):

```bash
ipfs name publish --key=neo-protocol-key /ipfs/SEU_CID
```

### Ver o valor atual do IPNS

```bash
ipfs name resolve k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz
```

### Ver histórico de publicações

```bash
ipfs name resolve --recursive k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz
```

## ⚠️ Troubleshooting

### Erro: "ipfs: command not found"

**Solução:**
```bash
# Instalar IPFS no macOS

brew install ipfs

# Ou baixar manualmente:
# https://dist.ipfs.tech/#ipfs-update

```

### Erro: "daemon is not running"

**Solução:**
```bash
# Iniciar IPFS daemon em um terminal separado

ipfs daemon

# Deixe rodando enquanto faz o publish

```

### Erro: "context deadline exceeded"

**Solução:**
- Aguarde alguns minutos e tente novamente
- Verifique se o IPFS daemon está rodando
- Verifique sua conexão com a rede IPFS

### IPNS não resolve imediatamente

**Normal!** O IPNS pode levar alguns minutos para propagar. Aguarde 2-5 minutos e tente novamente.

## 📝 Exemplo Completo

```bash
# 1. Navegar para o projeto

cd /Users/nettomello/CODIGOS/neo-protocol-landing

# 2. Fazer build (já cria index.html)

npm run build:boot

# 3. Upload para IPFS

ipfs add -r dist-boot

# 4. Copiar o CID do diretório (última linha)
# Exemplo: Qmar2He46w4Muwen5qdYzu45gypGbZBMw6MYhLpqA4heX1

# 5. Publicar no IPNS

ipfs name publish /ipfs/Qmar2He46w4Muwen5qdYzu45gypGbZBMw6MYhLpqA4heX1

# 6. Verificar

ipfs name resolve k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz

# 7. Testar no navegador
# https://ipfs.io/ipns/k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz

```

## 🎯 Resultado Final

Após publicar, o IPNS `k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz` apontará para o novo CID, e o ENS `neoprotocol.eth` (configurado com IPNS) mostrará a página atualizada.

