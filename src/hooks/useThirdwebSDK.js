/**
 * useThirdwebSDK.js - REMOVIDO
 * 
 * Este arquivo foi desabilitado porque o Thirdweb não está sendo usado no momento.
 * Para reativar no futuro, descomente o código abaixo e reinstale as dependências:
 * - thirdweb
 */

/*
import { thirdwebClient, thirdwebSDKConfig } from "../providers/X402Provider";
import { base } from "thirdweb/chains";

export function useThirdwebSDK() {
  const isConfigured = thirdwebSDKConfig.isConfigured;
  const client = thirdwebClient;

  const sendTransaction = async ({ chainId = "8453", from, transactions }) => {
    if (!client) {
      throw new Error("Thirdweb client não está configurado");
    }

    const secretKey = import.meta.env.VITE_THIRDWEB_SECRET_KEY;
    if (!secretKey) {
      throw new Error("VITE_THIRDWEB_SECRET_KEY é necessário para enviar transações via API");
    }

    const response = await fetch("https://api.thirdweb.com/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret-key": secretKey
      },
      body: JSON.stringify({
        chainId,
        from,
        transactions
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Erro desconhecido" }));
      throw new Error(error.message || "Erro ao enviar transação");
    }

    return response.json();
  };

  return {
    client,
    isConfigured,
    sendTransaction,
    network: base
  };
}
*/

// Hook vazio para manter compatibilidade
export function useThirdwebSDK() {
  return {
    client: null,
    isConfigured: false,
    sendTransaction: async () => {
      throw new Error("Thirdweb SDK não está disponível. Reative o Thirdweb para usar esta funcionalidade.");
    },
    network: null
  };
}
