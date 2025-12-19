# 📁 Images - NΞØ Protocol

## 🌐 ENS Domain

**neoprotocol.eth**

## 📁 Estrutura de Pastas

```
images/
├── hero/           # Imagens da seção hero
├── sections/       # Imagens das seções
├── backgrounds/    # Imagens de fundo
├── illustrations/  # Ilustrações e gráficos
└── screenshots/    # Screenshots (se necessário)
```

## 📝 Tipos de Imagens

### Hero Images

- **Localização**: `images/hero/`
- **Uso**: Imagens principais da seção hero
- **Formato**: WebP (preferencial) ou PNG/JPG
- **Tamanho**: Otimizado para web (máx 500KB)

### Section Images

- **Localização**: `images/sections/`
- **Uso**: Imagens para seções específicas (Manifesto, Como Funciona, Token)
- **Formato**: WebP ou PNG/JPG
- **Tamanho**: Otimizado para web

### Backgrounds

- **Localização**: `images/backgrounds/`
- **Uso**: Imagens de fundo, padrões, texturas
- **Formato**: WebP ou PNG/JPG
- **Tamanho**: Otimizado, considerar lazy loading

### Illustrations

- **Localização**: `images/illustrations/`
- **Uso**: Ilustrações, diagramas, gráficos
- **Formato**: SVG (preferencial) ou PNG
- **Tamanho**: SVG escalável ou PNG otimizado

## 🎨 Especificações

- **Cores**: Manter identidade visual NΞØ
- **Estilo**: Terminal/Neon aesthetic quando aplicável
- **Otimização**: Sempre comprimir antes de adicionar
- **Lazy Loading**: Usar `loading="lazy"` em imagens abaixo da dobra

## 📐 Tamanhos Recomendados

- **Hero**: 1920x1080px (desktop), 800x600px (mobile)
- **Sections**: 1200x800px (desktop)
- **Backgrounds**: 1920x1080px ou padrões repetíveis
- **Illustrations**: SVG ou 800x600px (PNG)

## 🔗 Referência ENS

O ENS domain `neoprotocol.eth` pode hospedar:
- Assets via IPFS
- Metadados de imagens
- CDN descentralizado

## 💡 Dicas

1. Use WebP para melhor compressão
2. Forneça fallback PNG/JPG para compatibilidade
3. Use `srcset` para diferentes resoluções
4. Considere usar `picture` element para art direction

