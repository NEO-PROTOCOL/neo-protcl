# 📝 Cadastro de Nós - NΞØ Protocol

## 📋 Visão Geral

Sistema de cadastro de nós que funciona **off-chain agora** e pode migrar para **on-chain depois** quando o token $NEO estiver verificado.

## 🎯 Objetivo

Permitir que usuários se cadastrem no protocolo **sem depender** do token estar verificado, mantendo a funcionalidade ativa enquanto o token está em processo de verificação.

## 🔄 Fluxo de Funcionamento

### 1. **Cadastro Off-Chain (Atual)**

- Usuário conecta wallet
- Preenche domínio e descrição
- Registro é salvo localmente via MCP (Model Context Protocol)
- Dados são persistidos no `localStorage`
- Nó é adicionado ao Identity Graph

### 2. **Migração para On-Chain (Futuro)**

Quando o token $NEO estiver verificado:

- Nós registrados off-chain podem ser migrados
- Chamada ao contrato `NodeRegistry.registerNode()`
- Dados permanecem no Identity Graph
- Status muda de `pending` para `on-chain`

## 📍 Acesso

**URLs:**
- `/register` - Página de cadastro
- `/cadastro` - Alias em português

## 🛠️ Funcionalidades

### Cadastro de Nó

1. **Conectar Wallet** - Via Thirdweb ConnectButton
2. **Preencher Domínio** - ENS, domínio tradicional, etc.
3. **Descrição (opcional)** - Informações sobre o nó
4. **Registrar** - Salva off-chain via MCP

### Visualização

- Lista de nós registrados (off-chain)
- Status: `Off-Chain` (será migrado depois)
- Data de registro
- Endereço e domínio

## 🔧 Implementação Técnica

### Componente Principal

`src/pages/register/RegisterNodePage.jsx`

### Dependências

- **MCP (Model Context Protocol)**: Sistema off-chain de registro
- **Identity Graph**: Grafo de relacionamentos entre nós
- **Thirdweb**: Conexão de wallet

### Estrutura de Dados

```javascript
{
  address: "0x...",
  domain: "exemplo.eth",
  description: "Descrição do nó",
  registeredAt: 1234567890,
  registeredBy: "0x...",
  status: "pending", // pending → on-chain (depois)
  source: "off-chain-registration"
}
```

## 🔄 Migração para On-Chain

Quando o token estiver verificado, criar script de migração:

```javascript
// scripts/migrate-nodes-to-chain.js
import { readNodes } from '../src/context/mcp';
import { NodeRegistry } from './contracts';

async function migrateNodes() {
  const nodes = readNodes();
  
  for (const node of Object.values(nodes)) {
    if (node.status === 'pending') {
      // Chamar NodeRegistry.registerNode()
      await registry.registerNode(node.address, node.domain);
      // Atualizar status para 'on-chain'
    }
  }
}
```

## ⚠️ Importante

1. **Dados Off-Chain**: Armazenados no `localStorage` do navegador
2. **Backup**: Considerar exportar dados periodicamente
3. **Migração**: Planejar migração quando token estiver verificado
4. **Validação**: Validar domínios antes de migrar para on-chain

## 📊 Status

- ✅ **Cadastro Off-Chain**: Funcionando
- ⏳ **Migração On-Chain**: Aguardando verificação do token
- ✅ **Identity Graph**: Integrado
- ✅ **Persistência**: localStorage

## 🔗 Referências

- [NodeRegistry Contract](./contracts/NodeRegistry.sol)
- [MCP Context](./src/context/mcp/index.js)
- [Identity Graph](./src/context/mcp/identityGraph.js)
