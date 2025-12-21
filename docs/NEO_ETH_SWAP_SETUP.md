# 🔄 Configuração de Swap $NEO/ETH

## 📋 Visão Geral

Este documento explica como configurar o swap do token $NEO para ETH usando a API do Thirdweb.

**Par configurado:** $NEO (Polygon) → ETH (Ethereum)

## ✅ Pré-requisitos

1. **Token NEO deployado** em uma chain EVM (Polygon, Base, etc.)
2. **Endereço do contrato** do token NEO
3. **Thirdweb configurado** (Client ID ou Secret Key)

## 🔧 Configuração

### 1. Adicionar Endereço do Token $NEO no .env

```bash
# Token $NEO na Polygon (usado no par $NEO/ETH)
VITE_NEO_TOKEN_ADDRESS_POLYGON=0xSeuEnderecoDoTokenNEO

# Token $NEO na Base (opcional)
VITE_NEO_TOKEN_ADDRESS_BASE=0xSeuEnderecoDoTokenNEO
```

### 2. Estrutura de Configuração

O arquivo `src/config/tokens.js` já está configurado com:

- **DEFAULT_SWAP_PAIR**: Par padrão $NEO → ETH
- **TOKEN_ADDRESSES**: Mapeamento de endereços por chain
- **Helpers**: Funções para obter endereços e verificar native tokens

### 3. Usar o Componente de Swap

```jsx
import NEOSwapWidget from './components/Swap/NEOSwapWidget';

function MyPage() {
  return (
    <div>
      <NEOSwapWidget />
    </div>
  );
}
```

## 🔄 Como Funciona

### Fluxo de Swap

1. **Usuário conecta wallet** (via Thirdweb ConnectButton)
2. **Insere quantidade** de $NEO a trocar
3. **Sistema calcula** quantidade estimada de ETH
4. **Usuário confirma** o swap
5. **API Thirdweb executa** o swap via bridge
6. **Transação confirmada** na blockchain

### Chains Suportadas

- **Token $NEO**: Polygon (137) - usado no par padrão
- **Token ETH**: Ethereum (1) - usado no par padrão

## 📝 Exemplo de Uso com API Thirdweb

```javascript
import { thirdwebClient } from './providers/X402Provider';

// Fazer swap usando API do Thirdweb
const swapResult = await fetch('https://api.thirdweb.com/v1/bridge/swap', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-client-id': import.meta.env.VITE_THIRDWEB_CLIENT_ID,
  },
  body: JSON.stringify({
    tokenIn: {
      address: '0x...NEO', // Endereço do token $NEO
      chainId: 137, // Polygon
      amount: '1000000000000000000', // 1 $NEO em wei
    },
    tokenOut: {
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // ETH native
      chainId: 1, // Ethereum
    },
    from: walletAddress,
  }),
});
```

## ⚠️ Importante

1. **Endereço do Token**: Certifique-se de usar o endereço correto do contrato $NEO
2. **Native ETH**: Para ETH, use o endereço especial `0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE`
3. **Liquidez**: O swap requer liquidez no par $NEO/ETH
4. **Gas Fees**: Usuário precisa ter ETH para pagar gas (ou usar gasless se configurado)
5. **Par Padrão**: $NEO (Polygon) → ETH (Ethereum)

## 🔗 Referências

- [Thirdweb Bridge API](https://portal.thirdweb.com/bridge)
- [Thirdweb Swap Documentation](https://portal.thirdweb.com/bridge/swap)
- [Token Configuration](./src/config/tokens.js)
