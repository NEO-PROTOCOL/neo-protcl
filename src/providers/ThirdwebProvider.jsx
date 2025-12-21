import React from "react";
import { ThirdwebProvider } from "thirdweb/react";
import { base } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";
import { thirdwebClient } from "./X402Provider";
import X402Provider from "./X402Provider";

/**
 * TWProvider - Wrapper para o ThirdwebProvider oficial
 * Garante que o cliente exista antes de inicializar o SDK
 */
export default function TWProvider({ children }) {
  // Usamos o cliente exportado pelo X402Provider (Singleton)
  const client = thirdwebClient;

  // Se não houver cliente, renderizamos apenas o X402Provider (fallback seguro)
  if (!client) {
    if (import.meta.env.DEV) {
      console.warn('[ThirdwebProvider] Nenhum cliente válido encontrado. Operando em modo limitado.');
    }
    return <X402Provider>{children}</X402Provider>;
  }

  // Configuração das Wallets
  const wallets = [
    inAppWallet({
      auth: {
        options: ["email", "google", "apple", "passkey"],
      },
      metadata: {
        name: "NΞØ Protocol",
        image: { src: "/logos/neo-logo.png", width: 100, height: 100 },
      },
      executionMode: {
        mode: "EIP7702",
        sponsorGas: true,
      },
    }),
  ];

  return (
    <ThirdwebProvider
      client={client}
      activeChain={base}
      wallets={wallets}
    >
      <X402Provider>{children}</X402Provider>
    </ThirdwebProvider>
  );
}
