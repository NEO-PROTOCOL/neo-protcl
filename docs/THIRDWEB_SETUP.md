# 🔐 Configuração Thirdweb - Allowed Domains

## 📋 O que são Allowed Domains?

"Allowed Domains" é uma configuração de segurança do Thirdweb que restringe quais domínios podem usar seu Client ID. Isso protege seu Client ID de ser usado em sites não autorizados.

## 🛠️ Configuração

### Para Desenvolvimento Local

Adicione os seguintes domínios:

```
localhost
localhost:5173
127.0.0.1
127.0.0.1:5173
```

**Nota**: O Vite usa a porta `5173` por padrão. Se você mudar a porta, adicione também `localhost:SUA_PORTA`.

### Para Produção

Adicione o domínio onde seu app será hospedado:

#### Domínio Principal:

```
neoprotocol.space
www.neoprotocol.space
```

#### Se usar Vercel (previews e branches):

```
neo-protcl.vercel.app
neo-protcl-*.vercel.app
*.vercel.app
```

**Nota**: A Vercel gera automaticamente o domínio `neo-protcl.vercel.app` ou `neo-protcl-kauntdewn1.vercel.app` quando você conecta o repositório [kauntdewn1/neo-protcl](https://github.com/kauntdewn1/neo-protcl.git). Você também pode usar `*.vercel.app` para cobrir todos os previews e branches.

#### Se usar Netlify:

```
seu-app.netlify.app
seu-app--*.netlify.app
```

#### Se usar ENS Domain (neoprotocol.eth):

```
neoprotocol.eth
```

**Importante**: Se o ENS resolver para um domínio específico (ex: `neoprotocol.eth` → `neoprotocol.space`), adicione o domínio resolvido também.

## 📝 Exemplo Completo

Para um setup completo (desenvolvimento + produção), adicione:

```
localhost
localhost:5173
127.0.0.1
127.0.0.1:5173
neoprotocol.space
www.neoprotocol.space
neo-protcl.vercel.app
*.vercel.app
neoprotocol.eth
```

**Repositório**: [kauntdewn1/neo-protcl](https://github.com/kauntdewn1/neo-protcl.git)

**Domínio Principal**: `neoprotocol.space`

**Domínio Vercel gerado automaticamente**: `neo-protcl.vercel.app` ou `neo-protcl-kauntdewn1.vercel.app`

## ⚠️ Dicas Importantes

1. **Use wildcards quando possível**: `*.vercel.app` cobre todos os previews do Vercel
2. **Não use `*` sozinho**: Isso permite qualquer domínio (inseguro)
3. **Adicione todos os ambientes**: Desenvolvimento, staging e produção
4. **Teste após adicionar**: Recarregue o app e verifique se funciona

## 🔍 Como Verificar

Após configurar, teste:

1. Abra o app no domínio configurado
2. Abra o Console do navegador (F12)
3. Verifique se não há erros relacionados ao Thirdweb
4. Se houver erro de "domain not allowed", adicione o domínio na lista

## 📚 Referência

- [Thirdweb Dashboard](https://thirdweb.com/dashboard)
- [Thirdweb Documentation](https://portal.thirdweb.com)

