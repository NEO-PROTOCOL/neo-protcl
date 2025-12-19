# 🔧 Configuração Thirdweb na Vercel

## Problema: Inconsistência com CLIENT_ID

Se a Vercel está reportando inconsistência com o `VITE_THIRDWEB_CLIENT_ID`, siga estes passos:

## ✅ Passo 1: Verificar Variável de Ambiente na Vercel

1. Acesse o [Dashboard da Vercel](https://vercel.com/dashboard)
2. Selecione o projeto `neo-protcl`
3. Vá em **Settings** → **Environment Variables**
4. Verifique se `VITE_THIRDWEB_CLIENT_ID` está configurada

### Se NÃO estiver configurada:

1. Clique em **Add New**
2. **Name**: `VITE_THIRDWEB_CLIENT_ID`
3. **Value**: Seu Client ID do Thirdweb (obtido em [thirdweb.com/dashboard](https://thirdweb.com/dashboard))
4. **Environment**: Selecione todas as opções:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Clique em **Save**

## ✅ Passo 2: Configurar Domínios Permitidos no Thirdweb

O Client ID precisa ter os domínios da Vercel configurados:

1. Acesse [thirdweb.com/dashboard](https://thirdweb.com/dashboard)
2. Vá em **Settings** → **API Keys**
3. Encontre seu Client ID
4. Clique em **Edit** ou **Configure**
5. Em **Allowed Domains**, adicione:
   ```
   localhost
   localhost:5173
   *.vercel.app
   neo-protcl.vercel.app
   neoprotocol.eth
   neoprotocol.eth.link
   ```
6. Salve as alterações

## ✅ Passo 3: Verificar Valor do Client ID

O Client ID deve:
- ✅ Ter pelo menos 32 caracteres
- ✅ Não ser `your-thirdweb-client-id-here`
- ✅ Não ser `SEU_CLIENT_ID_THIRDWEB`
- ✅ Estar no formato correto (geralmente hexadecimal)

### Exemplo de Client ID válido:
```
223d53b50916d72d63cc00ceaaba7ec0
```

## ✅ Passo 4: Re-deploy na Vercel

Após configurar a variável de ambiente:

1. Vá em **Deployments** no dashboard da Vercel
2. Clique nos três pontos (⋯) do último deployment
3. Selecione **Redeploy**
4. Ou faça um novo commit para trigger automático

## 🔍 Verificação de Debug

O código já tem logs de debug que aparecem no console do navegador:

```javascript
// Em desenvolvimento, você verá:
[ThirdwebProvider] Client configured successfully
// OU
[ThirdwebProvider] Client not configured. Using X402Provider fallback.
[ThirdwebProvider] clientId: invalid/missing
```

## ⚠️ Comportamento sem Client ID

Se o `VITE_THIRDWEB_CLIENT_ID` não estiver configurado:

- ✅ O app **funciona normalmente** (sem erro)
- ⚠️ Funcionalidades de wallet connect ficam **limitadas**
- ✅ O app usa fallback para `X402Provider`
- ⚠️ Embedded Wallets (email, social, passkey) **não funcionam**

## 📝 Checklist

- [ ] Variável `VITE_THIRDWEB_CLIENT_ID` configurada na Vercel
- [ ] Client ID válido (não é placeholder)
- [ ] Domínios da Vercel adicionados no Thirdweb Dashboard
- [ ] Re-deploy feito após configurar variável
- [ ] Verificar logs do console no navegador

## 🔗 Links Úteis

- [Thirdweb Dashboard](https://thirdweb.com/dashboard)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Thirdweb Documentation](https://portal.thirdweb.com/)
