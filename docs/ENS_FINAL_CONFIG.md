# 🎯 Configuração Final do ENS

## ✅ O que colocar no ENS

No campo **Content Hash**, coloque:

```
ipns://k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz
```

## 📝 Passo a Passo

### 1. Acesse o ENS App

Vá para: [app.ens.domains](https://app.ens.domains)

### 2. Conecte sua Wallet

- Clique em "Connect Wallet"
- Escolha sua wallet (MetaMask, WalletConnect, etc.)
- Confirme a conexão

### 3. Procure pelo Domínio

- No campo de busca, digite: `neoprotocol.eth`
- Clique no domínio quando aparecer

### 4. Vá em Records → Content

- Na página do domínio, procure por "Records" ou "Registros"
- Clique na aba "Content" ou "Conteúdo"

### 5. Configure o Content Hash

- No campo **Content Hash**, cole:
  ```
  ipns://k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz
  ```

- **IMPORTANTE:** Use exatamente este formato, com `ipns://` no início

### 6. Confirme a Transação

- Clique em "Save" ou "Salvar"
- Confirme a transação na sua wallet
- Aguarde a confirmação na blockchain

## ⚠️ Formato Correto

**✅ CORRETO:**
```
ipns://k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz
```

**❌ ERRADO:**
```
k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz
```
(Sem o prefixo `ipns://`)

**❌ ERRADO:**
```
ipfs://k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz
```
(Usando `ipfs://` em vez de `ipns://`)

**❌ ERRADO:**
```
ipns://k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz/index.html
```
(ENS não aceita caminho no contenthash)

## 🧪 Testar Após Configurar

Após configurar e aguardar alguns minutos (propagação):

1. **Via ENS direto:**
   - No Brave Browser: `neoprotocol.eth`
   - No MetaMask: `neoprotocol.eth`

2. **Via ENS Link:**
   - `neoprotocol.eth.link`

3. **Via IPNS direto:**
   - `https://ipfs.io/ipns/k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz/index.html`

## 📋 Checklist

- [ ] Wallet conectada no ENS App
- [ ] Domínio `neoprotocol.eth` encontrado
- [ ] Aba "Content" ou "Records" → "Content" aberta
- [ ] Content Hash configurado como: `ipns://k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz`
- [ ] Transação confirmada na blockchain
- [ ] Aguardado alguns minutos para propagação
- [ ] Testado via `neoprotocol.eth` ou `neoprotocol.eth.link`

## ⏱️ Tempo de Propagação

- **Transação na blockchain**: ~1-2 minutos
- **Propagação do ENS**: 2-5 minutos
- **Cache dos gateways**: Pode levar até 10 minutos

Se não funcionar imediatamente, aguarde alguns minutos e tente novamente.

## 🔍 Verificar Configuração

Para verificar se está configurado corretamente:

1. No ENS App, veja o campo "Content Hash"
2. Deve mostrar: `ipns://k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz`
3. Ou use um explorador ENS como [ens.vision](https://ens.vision) para verificar

## 🎉 Resultado Final

Após configurar corretamente:

- ✅ `neoprotocol.eth` → Resolve para o IPNS
- ✅ `neoprotocol.eth.link` → Resolve para o IPNS
- ✅ IPNS aponta para o CID mais recente
- ✅ CID contém `index.html` que abre a página de boot

