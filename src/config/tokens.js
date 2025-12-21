/**
 * Configuração de Tokens - NΞØ Protocol
 * 
 * Endereços de contratos de tokens usados no protocolo
 */

// Chain IDs
export const CHAINS = {
  ETHEREUM: 1,
  POLYGON: 137,
  BASE: 8453,
  BASE_SEPOLIA: 84532,
};

// Endereços de tokens
export const TOKEN_ADDRESSES = {
  // Token NEO - obtido das variáveis de ambiente
  NEO: {
    [CHAINS.POLYGON]: import.meta.env.VITE_NEO_TOKEN_ADDRESS_POLYGON || "0x0000000000000000000000000000000000000000",
    [CHAINS.BASE]: import.meta.env.VITE_NEO_TOKEN_ADDRESS_BASE || "0x0000000000000000000000000000000000000000",
  },
  // ETH (native token - usa endereço especial)
  ETH: {
    [CHAINS.ETHEREUM]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // Endereço especial para native token
    [CHAINS.BASE]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  },
};

// Configuração de swap padrão: $NEO/ETH
// Par: $NEO (Polygon) → ETH (Ethereum)
export const DEFAULT_SWAP_PAIR = {
  sellToken: {
    chainId: CHAINS.POLYGON, // Chain onde o token NEO está (Polygon)
    address: TOKEN_ADDRESSES.NEO[CHAINS.POLYGON],
  },
  buyToken: {
    chainId: CHAINS.ETHEREUM, // Chain do ETH (Ethereum Mainnet)
    address: TOKEN_ADDRESSES.ETH[CHAINS.ETHEREUM], // Native ETH
  },
};

// Helper para obter endereço de token
export function getTokenAddress(token, chainId) {
  return TOKEN_ADDRESSES[token]?.[chainId] || null;
}

// Helper para verificar se é native token
export function isNativeToken(address) {
  return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
}

// URLs das imagens dos tokens
export const TOKEN_IMAGES = {
  NEO: import.meta.env.VITE_NEO_TOKEN_IMAGE || "/logos/neo_ico.png",
  ETH: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
};
