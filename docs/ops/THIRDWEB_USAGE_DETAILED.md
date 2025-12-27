# 📋 Uso Detalhado do Thirdweb no NΞØ Protocol

**Data**: 2025-01-27  
**Versão Thirdweb**: `^5.116.1`

---

## 📦 Dependência

```json
{
  "dependencies": {
    "thirdweb": "^5.116.1"
  }
}
```

---

## 🔧 Módulos e Funcionalidades Utilizadas

### 1. **Core SDK** (`thirdweb`)

#### `createThirdwebClient`

- **Onde**: `src/providers/X402Provider.jsx`, `src/providers/ThirdwebProvider.jsx`
- **Uso**: Criar instância única (Singleton) do cliente Thirdweb
- **Configuração**:
  - Com `secretKey`: `createThirdwebClient({ secretKey })`
  - Com `clientId`: `createThirdwebClient({ clientId })`
- **Variáveis de ambiente**:
  - `VITE_THIRDWEB_SECRET_KEY` (opcional, para funcionalidades avançadas)
  - `VITE_THIRDWEB_CLIENT_ID` (obrigatório para produção)

---

### 2. **React Hooks** (`thirdweb/react`)

#### `ThirdwebProvider`

- **Onde**: `src/providers/ThirdwebProvider.jsx`
- **Uso**: Provider principal que envolve toda a aplicação
- **Configuração**:
  ```jsx
  <ThirdwebProvider client={client} activeChain={base} wallets={wallets}>
    {children}
  </ThirdwebProvider>
  ```
- **Props**:
  - `client`: Cliente Thirdweb criado com `createThirdwebClient`
  - `activeChain`: Chain ativa (usando `base` da Base network)
  - `wallets`: Array de wallets configuradas

#### `useActiveAccount()`

- **Onde usado**:
  - `src/pages/home/NeoProtocolMobile.jsx` (linha 17)
  - `src/pages/home/NeoProtocolDesktop.jsx` (linha 16)
  - `src/components/WalletConnect/ConnectButton.jsx` (linha 22)
  - `src/components/Navbar.jsx` (linha 10)
  - `src/components/BottomNavigation.jsx` (linha 16)
  - `src/components/Swap/NEOSwapWidget.jsx` (linha 18)
  - `src/pages/register/RegisterNodePage.jsx` (linha 18)
- **Retorna**: Objeto `account` com:
  - `address`: Endereço da wallet conectada
  - Outras propriedades da conta ativa
- **Uso**: Obter conta atualmente conectada

#### `useActiveWallet()`

- **Onde usado**:
  - `src/components/WalletConnect/ConnectButton.jsx` (linha 23)
  - `src/components/Navbar.jsx` (linha 11)
  - `src/components/BottomNavigation.jsx` (linha 17)
  - `src/pages/register/RegisterNodePage.jsx` (linha 19)
- **Retorna**: Objeto `wallet` com informações da wallet conectada
- **Uso**: Obter wallet ativa para desconexão e outras operações

#### `useDisconnect()`

- **Onde usado**:
  - `src/components/WalletConnect/ConnectButton.jsx` (linha 24)
  - `src/components/Navbar.jsx` (linha 12)
  - `src/components/BottomNavigation.jsx` (linha 18)
  - `src/pages/register/RegisterNodePage.jsx` (linha 20)
- **Retorna**: Função `disconnect(wallet)` para desconectar wallet
- **Uso**: Desconectar wallet do usuário

#### `ConnectButton` (Componente)

- **Onde usado**: `src/components/WalletConnect/ConnectButton.jsx`
- **Import**: `import { ConnectButton as ThirdwebConnectButton } from 'thirdweb/react'`
- **Props utilizadas**:
  - `client`: Cliente Thirdweb
  - `connectModal`: Configuração do modal
    - `size`: 'wide'
    - `title`: 'Conectar Wallet'
    - `welcomeScreen`: Tela de boas-vindas customizada
  - `connectButton`: Configuração do botão
    - `label`: Texto do botão
    - `className`: Classes CSS customizadas
- **Funcionalidade**: Botão de conexão de wallet com modal integrado
- **Suporta**:
  - Embedded Wallets (email, social login, passkey)
  - Wallets tradicionais (MetaMask, WalletConnect, Coinbase)

---

### 3. **Chains** (`thirdweb/chains`)

#### `base`

- **Onde**: `src/providers/ThirdwebProvider.jsx`, `src/providers/X402Provider.jsx`
- **Uso**: Configurar a rede Base como chain ativa
- **Import**: `import { base } from 'thirdweb/chains'`
- **Rede**: Base Mainnet (Chain ID: 8453)

---

### 4. **Wallets** (`thirdweb/wallets`)

#### `inAppWallet`

- **Onde**: `src/providers/ThirdwebProvider.jsx`
- **Uso**: Configurar Embedded Wallets (self-custodial via MPC)
- **Configuração**:
  ```javascript
  inAppWallet({
    auth: {
      options: ['email', 'google', 'apple', 'passkey'],
    },
    metadata: {
      name: 'NΞØ Protocol',
      image: { src: '/logos/neo-logo.png', width: 100, height: 100 },
    },
    executionMode: {
      mode: 'EIP7702',
      sponsorGas: true,
    },
  })
  ```
- **Opções de autenticação**:
  - `email`: Autenticação por email com código de verificação
  - `google`: Google OAuth
  - `apple`: Apple Sign-In
  - `passkey`: WebAuthn/biometria
- **Execution Mode**: EIP7702 com gasless transactions (gas patrocinado)

---

### 5. **X402 Payments** (`thirdweb/x402`)

#### `facilitator`

- **Onde**: `src/providers/X402Provider.jsx`
- **Uso**: Criar facilitador para pagamentos x402 (micropagamentos descentralizados)
- **Configuração**:
  ```javascript
  facilitator({
    client: globalClient,
    serverWalletAddress: '0x765B22a98F101a82c071D4C36980B51213B98d4C',
  })
  ```
- **Variáveis de ambiente**:
  - `VITE_X402_SERVER_WALLET_ADDRESS`: Endereço da wallet do servidor
  - `VITE_THIRDWEB_SECRET_KEY`: Secret key para funcionalidades avançadas
- **Funcionalidade**: Permite pagamentos gasless via x402 protocol

---

## 📁 Arquivos que Usam Thirdweb

### Providers

1. **`src/providers/ThirdwebProvider.jsx`**
   - `ThirdwebProvider` (componente)
   - `createThirdwebClient` (função)
   - `base` (chain)
   - `inAppWallet` (wallet)

2. **`src/providers/X402Provider.jsx`**
   - `createThirdwebClient` (função)
   - `facilitator` (x402)
   - `base` (chain)
   - Exporta `thirdwebClient` (singleton)
   - Exporta `useThirdwebClient()` (hook customizado)

### Componentes

3. **`src/components/WalletConnect/ConnectButton.jsx`**
   - `ConnectButton` (componente)
   - `useActiveAccount` (hook)
   - `useActiveWallet` (hook)
   - `useDisconnect` (hook)

4. **`src/components/Navbar.jsx`**
   - `useActiveAccount` (hook)
   - `useActiveWallet` (hook)
   - `useDisconnect` (hook)

5. **`src/components/BottomNavigation.jsx`**
   - `useActiveAccount` (hook)
   - `useActiveWallet` (hook)
   - `useDisconnect` (hook)
   - `ConnectButton` (componente)

6. **`src/components/Swap/NEOSwapWidget.jsx`**
   - `useActiveAccount` (hook)
   - Usa `VITE_THIRDWEB_CLIENT_ID` para API calls

### Páginas

7. **`src/pages/home/NeoProtocolMobile.jsx`**
   - `useActiveAccount` (hook)

8. **`src/pages/home/NeoProtocolDesktop.jsx`**
   - `useActiveAccount` (hook)

9. **`src/pages/register/RegisterNodePage.jsx`**
   - `useActiveAccount` (hook)
   - `useActiveWallet` (hook)
   - `useDisconnect` (hook)

### Main Entry

10. **`src/main.jsx`**
    - Importa `TWProvider` (wrapper do ThirdwebProvider)

---

## 🔌 Integrações e APIs

### Thirdweb API (HTTP)

- **Onde**: `src/components/Swap/NEOSwapWidget.jsx`
- **Endpoint**: `https://api.thirdweb.com/v1/bridge/swap`
- **Método**: POST
- **Headers**:
  - `Content-Type: application/json`
  - `x-client-id: VITE_THIRDWEB_CLIENT_ID`
- **Uso**: Executar swaps de tokens via Bridge API

---

## 🎯 Funcionalidades Principais

### 1. **Embedded Wallets (Self-Custodial)**

- Autenticação sem fricção (email, social, passkey)
- Self-custodial via MPC (Multi-Party Computation)
- Gasless transactions (EIP7702)

### 2. **Wallet Connection**

- Botão de conexão com modal integrado
- Suporte a múltiplos métodos de autenticação
- Fallback para wallets tradicionais

### 3. **Account Management**

- Obter conta ativa
- Obter wallet ativa
- Desconectar wallet

### 4. **X402 Payments**

- Micropagamentos descentralizados
- Gasless transactions
- Integração com facilitador

### 5. **Chain Configuration**

- Base network como chain padrão
- Configuração de rede única

---

## ⚙️ Configuração Necessária

### Variáveis de Ambiente

#### Obrigatórias (Produção)

```bash
VITE_THIRDWEB_CLIENT_ID=seu_client_id_aqui
```

#### Opcionais (Funcionalidades Avançadas)

```bash
VITE_THIRDWEB_SECRET_KEY=seu_secret_key_aqui
VITE_X402_SERVER_WALLET_ADDRESS=0x765B22a98F101a82c071D4C36980B51213B98d4C
```

### Fallback de Desenvolvimento

- Em modo de desenvolvimento (`import.meta.env.DEV`), se não houver `clientId` configurado, usa um clientId público de desenvolvimento do Thirdweb
- Isso permite que a aplicação funcione em desenvolvimento sem configuração completa

---

## 📊 Resumo de Uso

| Módulo             | Função/Componente      | Arquivos que Usam | Quantidade |
| ------------------ | ---------------------- | ----------------- | ---------- |
| `thirdweb`         | `createThirdwebClient` | 2                 | 2          |
| `thirdweb/react`   | `ThirdwebProvider`     | 1                 | 1          |
| `thirdweb/react`   | `useActiveAccount`     | 7                 | 7          |
| `thirdweb/react`   | `useActiveWallet`      | 4                 | 4          |
| `thirdweb/react`   | `useDisconnect`        | 4                 | 4          |
| `thirdweb/react`   | `ConnectButton`        | 2                 | 2          |
| `thirdweb/chains`  | `base`                 | 2                 | 2          |
| `thirdweb/wallets` | `inAppWallet`          | 1                 | 1          |
| `thirdweb/x402`    | `facilitator`          | 1                 | 1          |

**Total de arquivos que usam Thirdweb**: 10 arquivos principais

---

## 🔄 Fluxo de Integração

```
main.jsx
  └─> TWProvider (ThirdwebProvider.jsx)
      ├─> createThirdwebClient (com clientId/secretKey)
      ├─> ThirdwebProvider (react)
      │   ├─> activeChain: base
      │   └─> wallets: [inAppWallet]
      └─> X402Provider
          └─> facilitator (x402 payments)
              └─> children (App)
                  └─> Componentes que usam hooks
                      ├─> useActiveAccount
                      ├─> useActiveWallet
                      ├─> useDisconnect
                      └─> ConnectButton
```

---

## 🚨 Dependências Críticas

1. **ThirdwebProvider sempre deve ser renderizado**
   - Hooks como `useActiveAccount` falham se o provider não estiver presente
   - Solução implementada: Fallback para cliente de desenvolvimento se não houver configuração

2. **Cliente deve ser criado antes do provider**
   - O `thirdwebClient` é criado no `X402Provider` como singleton
   - `ThirdwebProvider` usa esse cliente ou cria um novo se necessário

3. **Variáveis de ambiente**
   - `VITE_THIRDWEB_CLIENT_ID` é obrigatório para produção
   - `VITE_THIRDWEB_SECRET_KEY` é opcional mas necessário para x402

---

## 📝 Notas Importantes

1. **Versão**: Usando Thirdweb v5 (`^5.116.1`)
2. **Chain**: Base network (Chain ID: 8453)
3. **Wallets**: Embedded Wallets com EIP7702 (gasless)
4. **Payments**: X402 protocol para micropagamentos
5. **Self-Custodial**: Todas as wallets são self-custodial via MPC

---

## 🔗 Referências

- [Thirdweb Documentation](https://portal.thirdweb.com/)
- [Thirdweb React SDK](https://portal.thirdweb.com/react)
- [X402 Payments](https://portal.thirdweb.com/x402)
- [Embedded Wallets](https://portal.thirdweb.com/wallets/in-app-wallet)
