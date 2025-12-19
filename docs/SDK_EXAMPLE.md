# 📘 SDK Example - Explicação

## O que é o Thirdweb SDK?

O **Thirdweb SDK** é uma biblioteca JavaScript/TypeScript que permite interagir com contratos inteligentes, NFTs e executar transações na blockchain de forma simplificada.

## 🎯 Funcionalidades Principais

### 1. **Interação com Contratos Inteligentes**

- Ler dados de contratos (funções `view`)
- Executar funções de contratos (transações)
- Preparar e enviar transações
- Escutar eventos de contratos

### 2. **Gestão de NFTs**

- Mint de NFTs
- Transferência de NFTs
- Consulta de propriedade
- Metadados de NFTs

### 3. **Transações Blockchain**

- Enviar transações na rede Base (e outras)
- Preparar transações complexas
- Gerenciar gas e nonces

## 🔧 Como Funciona no Projeto

### Configuração

O SDK usa o mesmo cliente Thirdweb configurado no `X402Provider`:

```javascript
// Pode usar SECRET_KEY (server-side) ou CLIENT_ID (client-side)
const client = createThirdwebClient({ 
  secretKey: VITE_THIRDWEB_SECRET_KEY 
  // ou
  clientId: VITE_THIRDWEB_CLIENT_ID 
});
```

### Uso Básico

```javascript
// 1. Obter instância de contrato
const contract = getContractInstance("0x...");

// 2. Chamar função read (view)
const totalSupply = await contract.call("totalSupply");

// 3. Preparar transação (write)
const transaction = await contract.prepare("mint", [to, amount]);

// 4. Enviar transação
const receipt = await sendTransaction({ transaction });
```

## 📍 Rota: `/sdk-example`

**URL Local:** `http://localhost:5173/sdk-example`

### O que a página demonstra:

1. **Status de Configuração**
   - Verifica se o SDK está configurado
   - Mostra a rede conectada (Base, Chain ID: 8453)

2. **Obter Contrato**
   - Input para endereço do contrato
   - Botão para obter instância do contrato
   - Validação e feedback

3. **Chamar Função**
   - Exemplo de chamada de função `totalSupply()`
   - Preparação de transação
   - Feedback de sucesso/erro

4. **Resultados**
   - Exibição formatada de resultados
   - JSON com detalhes da transação/contrato

## 🔗 Integração com Outros Sistemas

### Relação com x402 Payments

- **Mesmo cliente:** Ambos usam o mesmo `thirdwebClient`
- **Configuração compartilhada:** `VITE_THIRDWEB_SECRET_KEY`
- **Rede Base:** Ambos operam na rede Base (Chain ID: 8453)

### Casos de Uso

1. **Mint de Tokens**
   ```javascript
   const contract = getContractInstance(tokenAddress);
   const tx = await contract.prepare("mint", [to, amount]);
   ```

2. **Transferência de NFTs**
   ```javascript
   const nft = getContractInstance(nftAddress);
   const tx = await nft.prepare("transferFrom", [from, to, tokenId]);
   ```

3. **Leitura de Dados**
   ```javascript
   const balance = await contract.call("balanceOf", [address]);
   ```

## ⚙️ Configuração Necessária

### Variáveis de Ambiente

```env
# Opção 1: Secret Key (recomendado para server-side)

VITE_THIRDWEB_SECRET_KEY=your_secret_key_here

# Opção 2: Client ID (para client-side)

VITE_THIRDWEB_CLIENT_ID=your_client_id_here
```

### Onde Obter

1. **Secret Key:** Dashboard Thirdweb → Settings → API Keys
2. **Client ID:** Dashboard Thirdweb → Settings → Client ID

## 🚀 Próximos Passos

A página `/sdk-example` serve como:
- ✅ Base para implementações futuras
- ✅ Referência de uso do SDK
- ✅ Teste de integração com contratos
- ✅ Template para novas funcionalidades blockchain

---

**Nota:** Esta página está guardada para implementação futura de funcionalidades blockchain mais avançadas no NΞØ Protocol.

