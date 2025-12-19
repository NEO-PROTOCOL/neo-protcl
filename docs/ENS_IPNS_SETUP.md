# 🚀 Configuração Final: ENS + IPNS

## ✅ Situação Atual

Você já tem:
- ✅ IPNS configurado: `k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz`
- ✅ IPNS apontando para: `Qmar2He46w4Muwen5qdYzu45gypGbZBMw6MYhLpqA4heX1`
- ✅ Build configurado com caminhos relativos
- ✅ `index.html` criado automaticamente

## 🎯 Solução: Usar IPNS no ENS

### Por que IPNS?

1. **ENS não aceita caminho**: O contenthash não pode ter `/boot.html` no final
2. **IPNS resolve automaticamente**: Quando você acessa um diretório IPNS, ele procura `index.html`
3. **Endereço fixo**: Não precisa atualizar o ENS a cada deploy

### Passo 1: Configurar ENS com IPNS

1. Acesse [app.ens.domains](https://app.ens.domains)
2. Conecte sua wallet
3. Vá em `neoprotocol.eth` → **Records** → **Content**
4. Configure o **Content Hash** como:
   ```
   ipns://k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz
   ```
5. Confirme a transação

### Passo 2: Atualizar IPNS com Novo Build

Após fazer o build com caminhos relativos:

```bash
# 1. Fazer build (já cria index.html automaticamente)

npm run build:boot

# 2. Upload para IPFS (via Pinata ou IPFS local)
# Pegue o novo CID do upload

# 3. Publicar no IPNS

ipfs name publish /ipfs/NOVO_CID

# Ou se você tem uma chave específica:

ipfs name publish --key=neo-protocol-key /ipfs/NOVO_CID
```

## 🔄 Workflow Completo de Deploy

### 1. Desenvolvimento Local

```bash
npm run dev:boot
```

Acesse: `http://localhost:5173/boot.html`

### 2. Build para IPFS

```bash
npm run build:boot
```

Isso:
- ✅ Faz build com caminhos relativos (`base: './'`)
- ✅ Cria `index.html` automaticamente
- ✅ Prepara `dist-boot` para upload

### 3. Upload para IPFS

**Opção A: Via Pinata (Interface Web)**
1. Acesse [pinata.cloud](https://pinata.cloud)
2. Faça upload da pasta `dist-boot`
3. Copie o CID retornado

**Opção B: Via Script**
```bash
npm run deploy:pinata
```

**Opção C: Via IPFS Local**
```bash
ipfs add -r dist-boot
# Copie o CID do diretório (última linha)

```

### 4. Publicar no IPNS

```bash
# Substitua NOVO_CID pelo CID do upload

ipfs name publish /ipfs/NOVO_CID
```

**Resposta esperada:**
```
Published to k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz: /ipfs/NOVO_CID
```

### 5. Verificar

Após alguns minutos (propagação do IPNS):

1. **Via IPNS direto:**
   ```
   https://ipfs.io/ipns/k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz
   ```

2. **Via ENS:**
   ```
   neoprotocol.eth
   neoprotocol.eth.link
   ```

## 🧪 Testar Localmente

Antes de fazer upload, teste localmente:

```bash
# Servir dist-boot localmente

cd dist-boot
python3 -m http.server 8080
# ou

npx serve -s . -l 8080
```

Acesse: `http://localhost:8080`

Deve abrir `index.html` automaticamente e os assets devem carregar.

## 📝 Checklist de Deploy

- [x] Vite configurado com `base: './'` (caminhos relativos)
- [x] Script `post-build-boot.js` criado (gera index.html automaticamente)
- [ ] Build feito: `npm run build:boot`
- [ ] Upload para IPFS feito
- [ ] IPNS atualizado com novo CID
- [ ] ENS configurado com IPNS: `ipns://k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz`
- [ ] Testado via IPNS direto
- [ ] Testado via ENS

## ⚠️ Problemas Comuns

### Assets não carregam

**Sintoma:** Tela branca, erros 404 nos assets

**Solução:**
- Verifique se o build foi feito com `base: './'`
- Verifique se os caminhos no HTML são relativos (`./assets/...`)

### IPNS não resolve

**Sintoma:** Timeout ao acessar via IPNS

**Solução:**
- Aguarde alguns minutos (propagação)
- Verifique se o IPNS foi publicado: `ipfs name resolve k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz`
- Tente republicar: `ipfs name publish /ipfs/CID`

### ENS não resolve

**Sintoma:** `neoprotocol.eth` não abre

**Solução:**
- Verifique se o Content Hash está configurado como `ipns://...`
- Aguarde alguns minutos (propagação)
- Teste via `neoprotocol.eth.link`

## 🎉 Resultado Final

Após configurar tudo:

- ✅ `neoprotocol.eth` → Abre a página de boot
- ✅ `neoprotocol.eth.link` → Abre a página de boot
- ✅ Assets carregam corretamente
- ✅ Funciona em todos os gateways IPFS

