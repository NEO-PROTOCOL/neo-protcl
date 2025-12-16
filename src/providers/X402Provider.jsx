/**
 * X402Provider - REMOVIDO
 * 
 * Este arquivo foi desabilitado porque o Thirdweb não está sendo usado no momento.
 * Para reativar no futuro, descomente o código abaixo e reinstale as dependências:
 * - thirdweb
 */

/*
import { createThirdwebClient } from "thirdweb";
import { facilitator } from "thirdweb/x402";
import { base } from "thirdweb/chains";

const secretKey = import.meta.env.VITE_THIRDWEB_SECRET_KEY;
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
const serverWalletAddress = import.meta.env.VITE_X402_SERVER_WALLET_ADDRESS || "0x765B22a98F101a82c071D4C36980B51213B98d4C";

const client = secretKey 
  ? createThirdwebClient({ secretKey })
  : clientId
  ? createThirdwebClient({ clientId })
  : null;

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
*/

// Exports vazios para manter compatibilidade
export const thirdwebX402Facilitator = null;
export const thirdwebClient = null;
export const x402Config = {
  client: null,
  facilitator: null,
  network: null,
  isConfigured: false,
  hasClient: false
};
export const thirdwebSDKConfig = {
  client: null,
  network: null,
  isConfigured: false
};

export default function X402Provider({ children }) {
  return <>{children}</>;
}
