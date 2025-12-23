# Badges do Repositório - NΞØ Protocol

**Princípio-mãe:** Se o badge não informa estado, intenção ou risco, ele vira ruído visual.  
GitHub não é landing page. É painel de controle.

## Filosofia Epistemológica

Badge não é enfeite, é **telemetria pública**.  
Cada badge precisa responder a uma pergunta real de quem olha o repositório por 10 segundos e decide se confia ou fecha a aba.

### Regra de Ouro

Badge só entra se:

- Representar **estado verificável**
- Sobreviver ao tempo
- Ou carregar **significado estrutural**, não marketing

O resto é ruído decorativo de README que envelhece mal.

## Camadas de Badges por Função Cognitiva

### CAMADA 1 — Estado Operacional (obrigatória)

Esses dizem: *o sistema está vivo e íntegro agora?*

**Badges ativos:**

- `CI` - Status do workflow de CI completo
- `Security` - Estado de segurança revisado
- `License` - Licença do repositório

**Cortados:**

- `Auto Assign` - Implementação interna, não sinal sistêmico
- `Validate HTML` - Implementação interna, não sinal sistêmico

### CAMADA 2 — Estado Evolutivo (obrigatória)

Esses respondem: *isso anda ou está morto?*

**Badges ativos:**

- `Last Commit` - Último commit realizado
- `Activity` - Atividade de commits mensal

**Cortados:**

- `Repo Size` - Tamanho não diz nada sobre qualidade
- `Contributors` - Cedo demais vira fetiche vazio

### CAMADA 3 — Contrato Cognitivo do Projeto (essencial)

Esses badges não dizem *o que é*, dizem *como pensar sobre*.

**Badges ativos:**

- `Protocol` - Versão do protocolo NΞØ
- `Node` - Status do nó (Genesis, Active, Experimental)
- `Network` - Redes blockchain suportadas

**Diferencial:** Comunica arquitetura, não stack.

### CAMADA 4 — Dependências e Métricas Externas (cortado)

**Cortados:**

- `david` / dev dependencies - Voláteis, quebram com frequência
- `npm downloads` - Não representa risco real nem maturidade
- `dependabot badge` - Para Web3 + protocolo, isso é ruído herdado do mundo npm

**Alternativa:** Security.md + audit link quando necessário.

### CAMADA 5 — Tech Stack (reduzido ao essencial)

Badge de versão exata vira mentira em 2 semanas.

**Badges ativos:**

- `Solidity` - Versão do Solidity (0.8.x)
- `Node.js` - Versão mínima requerida (>=18)

**Cortados:**

- `React` - Stack de interface muda
- `Vite` - Stack de interface muda
- `Hardhat` - Ferramenta de desenvolvimento muda

**Motivo:** Stack de interface muda. Protocolo não.

## Badges Customizados: Menos é Mais

### Badge que Vale Manter

**Genesis Node**

```markdown
![Node](https://img.shields.io/badge/Node-Genesis-black)
```

Isso não é status técnico.  
É **marco histórico**.

### Badges que NÃO Recomendamos Agora

**Layer 1, 2, 3, 4**

Bonito, mas sem documentação pública clara vira símbolo vazio.

**Quando adicionar:** Quando existir `docs/ARCHITECTURE.md` público e claro.

## Badges Adicionais Disponíveis (Referência)

### Badges Padrão (Shields.io) - Para Referência Futura

#### Status do Projeto

```markdown
![GitHub last commit](https://img.shields.io/github/last-commit/NEO-PROTOCOL/neo-protcl)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/NEO-PROTOCOL/neo-protcl)
![GitHub contributors](https://img.shields.io/github/contributors/NEO-PROTOCOL/neo-protcl)
![GitHub repo size](https://img.shields.io/github/repo-size/NEO-PROTOCOL/neo-protcl)
```

#### Dependências

```markdown
![Dependencies](https://img.shields.io/david/NEO-PROTOCOL/neo-protcl)
![Dev Dependencies](https://img.shields.io/david/dev/NEO-PROTOCOL/neo-protcl)
![npm](https://img.shields.io/npm/dm/neo-protocol-webapp)
```

#### Segurança

```markdown
![Known Vulnerabilities](https://snyk.io/test/github/NEO-PROTOCOL/neo-protcl/badge.svg)
![Dependabot](https://img.shields.io/dependabot/NEO-PROTOCOL/neo-protcl)
```

#### Tecnologias

```markdown
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.3.0-purple)
![Hardhat](https://img.shields.io/badge/Hardhat-2.19.0-yellow)
```

## Badges Customizados - NΞØ Protocol

### Badges Específicos do Protocolo

#### Status da Rede

```markdown
![NΞØ Network Status](https://img.shields.io/badge/NΞØ-Network%20Active-green?logo=data:image/svg+xml;base64,...)
![Protocol Version](https://img.shields.io/badge/Protocol-v3.0.0-blue)
![Node Status](https://img.shields.io/badge/Node-Genesis-green)
```

#### Badges de Camadas

```markdown
![Layer 1 - Anchoring](https://img.shields.io/badge/Layer%201-Anchoring-blue)
![Layer 2 - Semantic](https://img.shields.io/badge/Layer%202-Semantic-purple)
![Layer 3 - Operational](https://img.shields.io/badge/Layer%203-Operational-green)
![Layer 4 - Interface](https://img.shields.io/badge/Layer%204-Interface-orange)
```

#### Badges de Contratos

```markdown
![NodeRegistry](https://img.shields.io/badge/Contract-NodeRegistry-blue)
![Base Network](https://img.shields.io/badge/Network-Base-0052FF)
![Polygon Network](https://img.shields.io/badge/Network-Polygon-8247E5)
```

### Como Criar Badges Customizados

#### 1. Usando Shields.io (Recomendado)

**Formato básico:**
```
https://img.shields.io/badge/{label}-{message}-{color}
```

**Exemplo customizado:**
```markdown
![NΞØ Protocol](https://img.shields.io/badge/NΞØ-Protocol-black?style=for-the-badge&logo=data:image/svg+xml;base64,...)
```

**Parâmetros disponíveis:**
- `label` - Texto do lado esquerdo
- `message` - Texto do lado direito
- `color` - Cor do badge (blue, green, red, yellow, orange, purple, etc.)
- `style` - Estilo (flat, flat-square, for-the-badge, plastic)
- `logo` - Logo (nome ou data URI)

#### 2. Badges Dinâmicos com GitHub Actions

Criar workflow que gera badge dinamicamente:

```yaml
name: Generate Badge

on:
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * *' # Diário

jobs:
  badge:
    runs-on: ubuntu-latest
    steps:
      - name: Generate Protocol Status Badge
        uses: schneegans/dynamic-badges-action@v1.1.0
        with:
          auth: ${{ secrets.GITHUB_TOKEN }}
          gistID: YOUR_GIST_ID
          filename: protocol-status.json
          label: NΞØ Protocol
          message: Active
          color: green
```

#### 3. Badges com Dados do Projeto

**Versão do package.json:**
```markdown
![Version](https://img.shields.io/npm/v/neo-protocol-webapp)
```

**Status do site:**
```markdown
![Website](https://img.shields.io/website?url=https://neoprotocol.space)
```

**Uptime (se tiver monitoramento):**
```markdown
![Uptime](https://img.shields.io/uptimerobot/ratio/mYOUR_MONITOR_ID)
```

## Badges Específicos para Web3/Blockchain

### Networks

```markdown
![Base](https://img.shields.io/badge/Base-Chain-0052FF?logo=base)
![Polygon](https://img.shields.io/badge/Polygon-Chain-8247E5?logo=polygon)
![Ethereum](https://img.shields.io/badge/Ethereum-Chain-627EEA?logo=ethereum)
```

### Wallets

```markdown
![Wallet Connect](https://img.shields.io/badge/Wallet-Connect-blue?logo=walletconnect)
![MetaMask](https://img.shields.io/badge/MetaMask-Compatible-orange?logo=metamask)
```

### IPFS/Deploy

```markdown
![IPFS](https://img.shields.io/badge/IPFS-Deployed-blue?logo=ipfs)
![ENS](https://img.shields.io/badge/ENS-neoprotocol.eth-green)
```

## Estrutura Final Implementada

```markdown
## Status

![CI](https://github.com/NEO-PROTOCOL/neo-protcl/actions/workflows/ci.yml/badge.svg)
![Security](https://img.shields.io/badge/security-reviewed-green)
![License](https://img.shields.io/github/license/NEO-PROTOCOL/neo-protcl)
![Last Commit](https://img.shields.io/github/last-commit/NEO-PROTOCOL/neo-protcl)
![Activity](https://img.shields.io/github/commit-activity/m/NEO-PROTOCOL/neo-protcl)

## Protocol

![Protocol](https://img.shields.io/badge/Protocol-v3.0.0-blue)
![Node](https://img.shields.io/badge/Node-Genesis-black)
![Network](https://img.shields.io/badge/Network-Base%20%7C%20Polygon-blue)

## Runtime

![Solidity](https://img.shields.io/badge/Solidity-0.8.x-blue)
![Node.js](https://img.shields.io/badge/Node.js->=18-green)
```

## Evolução Futura (Fase 2)

No próximo passo, dá para:

- Atrelar badge a **estado on-chain real**
- Gerar badge via indexador
- Usar badge como **gatilho de governança**

Mas isso é fase 2.  
Aqui você acabou de limpar o painel de controle do organismo.

---

Author: MELLØ // POST-HUMAN

This project follows my personal working standards.
Changes are allowed, inconsistency is not.

