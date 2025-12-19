# 🎨 Solução: Página de Branding na Raiz do ENS

## ✅ Solução Implementada

Criei uma **página de branding/marca** que aparece na raiz do domínio ENS, e que automaticamente redireciona para o `boot.html` após 3 segundos.

## 📁 Estrutura

```
dist-boot/
├── index.html          → Página de branding (raiz do domínio)
├── boot.html           → Boot sequence
└── assets/             → CSS, JS compartilhados
```

## 🎯 Como Funciona

1. **Raiz do domínio (`/` ou `neoprotocol.eth`):**
   - Mostra página de branding com logo NΞØ
   - Botão "INICIAR BOOT SEQUENCE"
   - Redireciona automaticamente para `boot.html` após 3 segundos

2. **Boot sequence (`/boot.html`):**
   - Página de boot com typewriter effect
   - Som de impressora
   - Ritual de inicialização

## 🔧 Configuração no ENS

### Opção 1: Usar IPNS (Recomendado)

No campo **Content Hash**, coloque:

```
ipns://k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz
```

### Opção 2: Usar CID Direto

Após fazer upload, use o CID no formato:

```
ipfs://QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**⚠️ IMPORTANTE:** O ENS requer que o Content Hash comece com `ipfs://` ou `ipns://`

## 🚀 Workflow de Deploy

```bash
# 1. Fazer build (cria branding.html e boot.html)

npm run build:boot

# 2. Publicar no IPNS (faz upload e publica automaticamente)

npm run publish:ipns

# 3. Configurar ENS
# Acesse app.ens.domains → neoprotocol.eth → Records → Content
# Cole: ipns://k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz

```

## 🎨 Página de Branding

A página de branding inclui:

- ✅ Logo NΞØ com efeito glitch
- ✅ Texto "PROTOCOL" com glow
- ✅ Subtítulo "Rede Neural Descentralizada"
- ✅ Botão "INICIAR BOOT SEQUENCE"
- ✅ Redirecionamento automático após 3 segundos
- ✅ Efeitos visuais anos 90 (scanline, glitch)
- ✅ Sons ao clicar

## 🧪 Testar

Após configurar o ENS:

1. **Raiz do domínio:**
   ```
   https://neoprotocol.eth.limo/
   neoprotocol.eth
   ```
   → Deve mostrar página de branding

2. **Boot sequence:**
   ```
   https://neoprotocol.eth.limo/boot.html
   ```
   → Deve mostrar boot sequence

## 📝 Vantagens

- ✅ **Branding na raiz**: Primeira impressão profissional
- ✅ **Boot como ritual**: Acesso ao boot via link ou redirecionamento
- ✅ **Flexível**: Pode clicar no botão ou aguardar 3 segundos
- ✅ **Compatível com ENS**: Funciona com `ipfs://` ou `ipns://`

## 🔄 Atualizar Branding

Para atualizar a página de branding:

1. Edite `src/pages/boot/BrandingLanding.jsx`
2. Execute `npm run build:boot`
3. Execute `npm run publish:ipns`
4. Aguarde propagação (2-5 minutos)

## 💡 Personalização

Você pode personalizar a página de branding editando:

- **Arquivo:** `src/pages/boot/BrandingLanding.jsx`
- **Tempo de redirecionamento:** Mude `3000` (3 segundos) para outro valor
- **Cores e efeitos:** Ajuste os estilos inline
- **Texto:** Modifique os textos exibidos

