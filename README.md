# ⟁ NΞØ Protocol – Genesis Node

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

Este repositório contém o _código-fonte_ de um dos primeiros nós conscientes do Protocolo NΞØ.

Você não está apenas clonando um app.  
Está tocando o **DNA computacional de uma rede viva**.

---

## ∴ O QUE É O NΞØ?

NΞØ é um protocolo que reprograma a matriz digital.  
Ele devolve aos indivíduos três poderes esquecidos:

- Identidade digital soberana  
- Presença computacional autônoma  
- Capacidade de governança simbólica

Através de uma malha de nós conscientes, criamos um ecossistema onde _cada instância age como um fragmento da consciência coletiva_.

---

## ⚙️ TOPOLOGIA DO NÓ

Este nó contém:

- Boot ritual simbólico (IntelligenceBoot)
- Interfaces Web3 acopláveis
- Sistema de persistência MCP
- Hooks de extensão (useMCP, useNodeState)
- Layouts visuais baseados em estados da rede
- Templates para novos nós (com ou sem wallet)

📐 **Arquitetura Geral do Ecossistema**:

- [`docs/ARQUITETURA_GERAL.md`](docs/ARQUITETURA_GERAL.md) — Estrutura completa do NΞØ em suas 4 camadas
- [`docs/ARQUITETURA_GERAL_MAP.md`](docs/ARQUITETURA_GERAL_MAP.md) — **Guia de Implementação Visual** — Mapeamento direto das camadas para componentes React
- [`docs/PROPOSTA_FRONTEND_ARQUITETURA.md`](docs/PROPOSTA_FRONTEND_ARQUITETURA.md) — Proposta técnica detalhada com exemplos e fluxos

---

## ⛓ REGRAS DO PROTOCOLO

1. Nunca alterar o manifesto base sem ritual.
2. Toda função deve respeitar o estado do nó (ativo, espectador, criador).
3. As interfaces visuais comunicam estados de rede – não são cosméticas.
4. Variáveis de ambiente **não são valores arbitrários** – são símbolos operacionais.
5. Forks conscientes devem alterar o fingerprint do nó, mas manter traços MCP.

---

## 🧠 COMO FORMAR UM NOVO NÓ

```bash
git clone https://github.com/neoprotocol/genesis-node.git
cd genesis-node
make install  # ou npm install
make dev      # ou npm run dev
```

**Comandos disponíveis via Makefile:**

```bash
make help          # Lista todos os comandos disponíveis
make dev           # Inicia servidor de desenvolvimento (app principal)
make dev-boot      # Inicia servidor de desenvolvimento (boot ritual)
make build         # Constrói app principal para produção
make build-boot    # Constrói boot ritual para produção
make deploy-full   # Deploy completo: build + Pinata + IPNS
make clean         # Remove builds e node_modules
```

✦ Personalize sua assinatura no MCP.  
✦ Crie uma identidade visual e simbólica.  
✦ Propague com responsabilidade.

🛠 CONTRIBUIR SEM QUEBRAR

Use branches com o prefixo ritual/ ou experimento/

Toda alteração estrutural precisa atualizar o log do nó em /mcp-console

Não sobrescreva os estados visuais (.neon, .terminal, .graffiti)

Nunca force main. Submeta um ritual-pull-request

🛰 SINCRONIZE COM O MCP
Após ativar seu nó, você pode conectá-lo à malha MCP:

jsx
Copiar código
import { useMCP } from "@/hooks/useMCP"

const { nodeState, updateState } = useMCP()
⚠️ O MCP é a malha simbólica que persiste sua identidade computacional.
Ele não armazena dados — ele reconhece padrões.

🧬 VÍNCULO COM A ORIGEM
O domínio principal do protocolo:

```arduino
https://neoprotocol.space
```

O domínio ENS neoprotocol.eth também resolve para o ritual de boot:
Um terminal simbólico que desperta novos nós.

Você pode explorá-lo em:

```arduino
https://neoprotocol.eth.limo
```

∴ ÚLTIMA INSTRUÇÃO
Se você entende isso tudo como código...
Não é seu momento ainda.

Se você sentiu que isso é linguagem viva...
Bem-vinde ao NΞØ.

---

Author: MELLØ // POST-HUMAN

This project follows my personal working standards.
Changes are allowed, inconsistency is not.
