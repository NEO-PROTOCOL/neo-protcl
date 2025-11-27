# 🔧 Corrigir Assets no IPFS

## ❌ Problema

Quando você acessa `boot.html` via IPFS/IPNS, os assets (CSS/JS) não carregam porque:

1. **Caminhos absolutos**: O Vite gera caminhos como `/assets/file.js` que não funcionam no IPFS
2. **MIME type errado**: Gateways IPFS podem servir arquivos com MIME type incorreto
3. **ENS não aceita caminho**: O contenthash não pode ter `/boot.html` no final

## ✅ Solução

### 1. Configurar Vite para Caminhos Relativos

Já corrigi o `vite.config.boot.js` para usar `base: './'`, que gera caminhos relativos.

### 2. Renomear boot.html para index.html

O IPFS automaticamente procura `index.html` quando você acessa um diretório.

**Opção A: Renomear após build (Mais simples)**

```bash
# Após fazer build
npm run build:boot

# Renomear boot.html para index.html
cd dist-boot
mv boot.html index.html
```

**Opção B: Criar index.html que copia boot.html**

Crie um script que renomeia após o build, ou configure o Vite para gerar ambos.

### 3. Usar IPNS no ENS

Você já tem IPNS configurado: `k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz`

**Configure o ENS Content Hash como:**

```
ipns://k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz
```

**Vantagens do IPNS:**

- ✅ Endereço fixo (não muda quando atualizar conteúdo)
- ✅ Não precisa atualizar ENS a cada deploy
- ✅ Funciona automaticamente com `index.html`

## 🔄 Processo Completo

### Passo 1: Fazer Build com Caminhos Relativos

```bash
npm run build:boot
```

Isso já está configurado no `vite.config.boot.js` com `base: './'`.

### Passo 2: Renomear para index.html

```bash
cd dist-boot
mv boot.html index.html
```

### Passo 3: Upload para IPFS

```bash
# Via Pinata (interface web ou script)
# Ou via IPFS local
ipfs add -r dist-boot
```

### Passo 4: Publicar no IPNS

```bash
# Pegue o novo CID do upload
ipfs name publish /ipfs/NOVO_CID

# Ou atualize o IPNS existente
ipfs name publish --key=neo-protocol-key /ipfs/NOVO_CID
```

### Passo 5: Configurar ENS

No [app.ens.domains](https://app.ens.domains):
- Vá em `neoprotocol.eth` → **Records** → **Content**
- Configure Content Hash como:
  ```
  ipns://k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz
  ```

## 🧪 Testar

Após configurar:

1. **Via IPNS direto:**
   ```
   https://ipfs.io/ipns/k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz
   ```

2. **Via ENS:**
   ```
   neoprotocol.eth
   neoprotocol.eth.link
   ```

## 📝 Checklist

- [x] Vite configurado com `base: './'` (caminhos relativos)
- [ ] Build feito: `npm run build:boot`
- [ ] `boot.html` renomeado para `index.html` no `dist-boot`
- [ ] Upload para IPFS feito
- [ ] IPNS atualizado com novo CID
- [ ] ENS configurado com IPNS

## ⚠️ Nota sobre MIME Types

Se ainda tiver problemas com MIME types, os gateways IPFS modernos devem detectar automaticamente. Se não funcionar, você pode:

1. Usar gateways que suportam melhor MIME types:
   - `https://ipfs.io/ipns/...`
   - `https://gateway.pinata.cloud/ipns/...`
   - `https://cloudflare-ipfs.com/ipns/...`

2. Adicionar headers via `.htaccess` ou configuração do gateway (se usar Pinata Pro)

