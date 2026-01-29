# Status do Dependabot - NΞØ Protocol

## 📊 Resumo

O Dependabot está ativo e monitorando vulnerabilidades no repositório.

**Última atualização:** 29/01/2026

## 🟡 Alertas Abertos (Baixa Prioridade)

### 1. ethers / @ethersproject/* (14 alertas LOW)

- **Severidade:** LOW
- **Pacote:** `ethers` e pacotes `@ethersproject/*`
- **Versão atual:** 5.7.2
- **Versão corrigida:** 6.16.0+
- **Tipo:** Dependência direta
- **CVE:** GHSA-848j-6mx2-7j84
- **Descrição:** Elliptic usa primitiva criptográfica com implementação arriscada
- **Status:** OPEN (aguardando atualização)

**Impacto:** Baixo - vulnerabilidade criptográfica de baixa severidade

**Ação:** Atualização para ethers@6.x requer breaking changes. Avaliar migração em versão futura.

**Pacotes afetados:**
- `elliptic`
- `@ethersproject/signing-key`
- `@ethersproject/hdnode`
- `@ethersproject/json-wallets`
- `@ethersproject/transactions`
- `@ethersproject/abstract-provider`
- `@ethersproject/abstract-signer`
- `@ethersproject/hash`
- `@ethersproject/abi`
- `@ethersproject/contracts`
- `@ethersproject/providers`
- `@ethersproject/wallet`
- `@ethersproject/wordlists`
- `ethers`

## ✅ Alertas Corrigidos (Resolvidos)

### Vulnerabilidades Corrigidas em 29/01/2026:

- ✅ **hono** (Moderate) - Prototype Pollution via JSON parsing → Corrigido para 4.11.7 via override
- ✅ **lodash-es** (Moderate) - Prototype Pollution em `_.unset` e `_.omit` → Corrigido para 4.17.23 via override
- ✅ **preact** (High) - JSON VNode Injection → Corrigido via `npm audit fix`
- ✅ **cookie** (Low) - CVE-2024-47764 → Corrigido para 0.7.0+ via override
- ✅ **tmp** (Low) - Vulnerabilidades diversas → Corrigido para 0.2.1+ via override

### Vulnerabilidades Corrigidas Anteriormente:

- ✅ **elliptic** (múltiplas CVEs) - Corrigido para 6.6.1+
- ✅ **@coinbase/wallet-sdk** - Corrigido para 4.3.0+
- ✅ **esbuild** - Corrigido para 0.25.0+
- ✅ **ws** (WebSocket) - Corrigido para 8.17.1+
- ✅ **axios** - Corrigido para 1.6.0+

## 🔍 Como Verificar Alertas

### Via GitHub Web:

https://github.com/NEO-PROTOCOL/neo-protcl/security/dependabot

### Via CLI:

```bash
gh api repos/NEO-PROTOCOL/neo-protcl/dependabot/alerts
```

### Via API:

```bash
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/NEO-PROTOCOL/neo-protcl/dependabot/alerts
```

## 🛠️ Overrides Aplicados

Os seguintes overrides foram aplicados no `package.json` para corrigir vulnerabilidades:

```json
{
  "overrides": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "cookie": "^0.7.0",
    "tmp": "^0.2.1",
    "source-map": "^0.7.4",
    "lodash-es": "^4.17.23",
    "hono": "^4.11.7",
    "@walletconnect/sign-client": "^2.23.1",
    "@walletconnect/universal-provider": "^2.23.1",
    "@walletconnect/ethereum-provider": "^2.23.1"
  }
}
```

## 📈 Monitoramento

- **Total de vulnerabilidades:** 14
- **Severidade:**
  - 🔴 Critical: 0
  - 🟠 High: 0
  - 🟡 Moderate: 0
  - 🟢 Low: 14 (todas relacionadas ao ethers@5.x)
- **Última verificação:** 29/01/2026
- **Última correção:** 29/01/2026

## ⚙️ Configuração do Dependabot

O Dependabot está configurado para:

- ✅ Alertas de segurança automáticos
- ✅ Atualizações de segurança automáticas (se habilitado)
- ✅ Dependency graph ativo

## 🔗 Links Úteis

- **Dependabot Alerts:** https://github.com/NEO-PROTOCOL/neo-protcl/security/dependabot
- **Dependency Graph:** https://github.com/NEO-PROTOCOL/neo-protcl/network/dependencies
- **Security Settings:** https://github.com/NEO-PROTOCOL/neo-protcl/settings/security_analysis

---

Author: MELLØ // POST-HUMAN

This project follows my personal working standards.
Changes are allowed, inconsistency is not.
