# 🔧 Corrigir: Domínio mostrando listagem em vez de abrir boot.html

## ❌ Problema Atual

Quando você acessa `neoprotocol.eth.link`, está mostrando uma **listagem de diretório** em vez de abrir o arquivo `boot.html` diretamente.

**O que está acontecendo:**
- URL: `neoprotocol.eth.link`
- Mostra: Listagem do diretório IPFS
- Hash atual: `bafybeifz2j6c4d2bqjn27qpfmjph56qsp3yjrhwugqvplnjhlimqqpdvsa`

## ✅ Soluções

### Opção 1: Apontar diretamente para boot.html (Recomendado)

Configure o Content Hash no ENS para apontar diretamente para o arquivo:

```
ipfs://bafybeifz2j6c4d2bqjn27qpfmjph56qsp3yjrhwugqvplnjhlimqqpdvsa/boot.html
```

**Como fazer:**
1. Acesse [app.ens.domains](https://app.ens.domains)
2. Vá em `neoprotocol.eth` → **Records** → **Content**
3. Configure o Content Hash como:
   ```
   ipfs://bafybeifz2j6c4d2bqjn27qpfmjph56qsp3yjrhwugqvplnjhlimqqpdvsa/boot.html
   ```

### Opção 2: Renomear boot.html para index.html

Se você fizer um novo upload do IPFS, renomeie `boot.html` para `index.html`:

```bash
# No diretório dist-boot

mv boot.html index.html

# Fazer novo upload

npm run build:boot
# Depois fazer upload manual ou via script

```

Então configure o Content Hash como:
```
ipfs://NOVO_HASH
```

O IPFS automaticamente procurará por `index.html` quando acessar um diretório.

### Opção 3: Criar index.html que redireciona

Crie um arquivo `index.html` no `dist-boot` que redireciona para `boot.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=boot.html">
    <script>window.location.href = 'boot.html';</script>
</head>
<body>
    <p>Redirecionando... <a href="boot.html">Clique aqui</a></p>
</body>
</html>
```

## 🔍 Verificar Hash Atual

Note que há dois CIDs diferentes:

1. **CIDv0 (base58)**: `Qmar2He46w4Muwen5qdYzu45gypGbZBMw6MYhLpqA4heX1`
2. **CIDv1 (base32)**: `bafybeifz2j6c4d2bqjn27qpfmjph56qsp3yjrhwugqvplnjhlimqqpdvsa`

Eles representam o mesmo conteúdo, mas em formatos diferentes. O gateway está usando o CIDv1.

## ✅ Solução Rápida (Recomendada)

### Opção A: Apontar diretamente para boot.html

**Configure o Content Hash no ENS como:**

```
ipfs://bafybeifz2j6c4d2bqjn27qpfmjph56qsp3yjrhwugqvplnjhlimqqpdvsa/boot.html
```

Isso fará com que o domínio abra diretamente o `boot.html` em vez da listagem.

### Opção B: Criar index.html (Melhor para futuro)

Criei um arquivo `index.html` no `dist-boot` que redireciona para `boot.html`. 

**Próximos passos:**
1. Faça um novo build: `npm run build:boot`
2. Faça upload do novo `dist-boot` para o IPFS
3. Configure o Content Hash no ENS com o novo CID (sem `/boot.html`)
4. O IPFS automaticamente procurará `index.html` quando acessar o diretório

## 🧪 Testar

Após configurar, teste:
- `neoprotocol.eth` (no Brave/MetaMask)
- `neoprotocol.eth.link`
- `https://ipfs.io/ipfs/bafybeifz2j6c4d2bqjn27qpfmjph56qsp3yjrhwugqvplnjhlimqqpdvsa/boot.html`

