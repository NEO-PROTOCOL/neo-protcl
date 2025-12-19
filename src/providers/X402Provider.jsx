import { createThirdwebClient } from "thirdweb";
import { facilitator } from "thirdweb/x402";
import { base } from "thirdweb/chains";

const secretKey = import.meta.env.VITE_THIRDWEB_SECRET_KEY;
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
const serverWalletAddress = import.meta.env.VITE_X402_SERVER_WALLET_ADDRESS || "0x765B22a98F101a82c071D4C36980B51213B98d4C";

// Validar secretKey e clientId antes de usar
const isValidSecretKey = secretKey && 
  typeof secretKey === 'string' && 
  secretKey.trim().length > 0 &&
  secretKey !== "your-thirdweb-secret-key-here";

const isValidClientId = clientId && 
  typeof clientId === 'string' &&
  clientId !== "SEU_CLIENT_ID_THIRDWEB" && 
  clientId !== "your-thirdweb-client-id-here" &&
  clientId.trim().length > 0;

// Criar cliente Thirdweb (prioriza secretKey, fallback para clientId)
// Adicionar try-catch para evitar erros se createThirdwebClient falhar
let client = null;
try {
  if (isValidSecretKey) {
    client = createThirdwebClient({ secretKey });
  } else if (isValidClientId) {
    client = createThirdwebClient({ clientId });
  }
} catch (error) {
  console.error('[X402Provider] Failed to create Thirdweb client:', error);
  client = null;
}

// Configurar x402 Facilitator (requer secretKey + serverWalletAddress)
export const thirdwebX402Facilitator = secretKey && client && serverWalletAddress
  ? facilitator({
      client,
      serverWalletAddress,
    })
  : null;

export const thirdwebClient = client;

export const x402Config = {
  client,
  facilitator: thirdwebX402Facilitator,
  network: base,
  isConfigured: !!(secretKey && serverWalletAddress),
  hasClient: !!client
};

export const thirdwebSDKConfig = {
  client,
  network: base,
  isConfigured: !!client
};

export default function X402Provider({ children }) {
  return <>{children}</>;
}
