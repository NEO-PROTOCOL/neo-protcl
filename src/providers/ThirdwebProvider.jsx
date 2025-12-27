import React, { useMemo } from 'react'
import { ThirdwebProvider } from 'thirdweb/react'
import { base } from 'thirdweb/chains'
import { inAppWallet } from 'thirdweb/wallets'
import { createThirdwebClient } from 'thirdweb'
import { thirdwebClient } from './X402Provider'
import X402Provider from './X402Provider'

/**
 * TWProvider - Wrapper para o ThirdwebProvider oficial
 * Garante que o ThirdwebProvider sempre seja renderizado para evitar erros
 * com hooks que dependem do contexto (useActiveAccount, etc.)
 */
export default function TWProvider({ children }) {
  // Usamos o cliente exportado pelo X402Provider (Singleton)
  let client = thirdwebClient

  // Se não houver cliente, tentamos criar um com clientId do env
  if (!client) {
    const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID
    if (clientId && typeof clientId === 'string' && clientId.trim().length > 0) {
      try {
        client = createThirdwebClient({ clientId })
        if (import.meta.env.DEV) {
          console.warn(
            '[ThirdwebProvider] Cliente criado com clientId do ambiente (modo limitado).'
          )
        }
      } catch (e) {
        console.error('[ThirdwebProvider] Erro ao criar cliente:', e)
      }
    }
  }

  // Se ainda não houver cliente, tentamos criar um com um clientId de desenvolvimento
  // Isso garante que o ThirdwebProvider sempre seja renderizado
  // e os hooks não falhem, mesmo que algumas funcionalidades estejam limitadas
  if (!client) {
    // Tentar usar um clientId de desenvolvimento público do Thirdweb
    // Isso permite que a aplicação funcione em desenvolvimento sem configuração
    const devClientId = import.meta.env.DEV
      ? '59f235f6f336240358b556b366ae268d' // Thirdweb public dev clientId (apenas em dev)
      : null

    if (devClientId) {
      try {
        client = createThirdwebClient({ clientId: devClientId })
        if (import.meta.env.DEV) {
          console.warn(
            '[ThirdwebProvider] Usando cliente de desenvolvimento. Configure VITE_THIRDWEB_CLIENT_ID para produção.'
          )
        }
      } catch (e) {
        console.error('[ThirdwebProvider] Erro ao criar cliente de desenvolvimento:', e)
      }
    }

    // Se ainda não houver cliente, logamos um erro mas ainda renderizamos
    // O ThirdwebProvider pode funcionar com cliente null em alguns casos
    if (!client && import.meta.env.DEV) {
      console.error(
        '[ThirdwebProvider] ⚠️ Nenhum cliente válido encontrado. Configure VITE_THIRDWEB_CLIENT_ID ou VITE_THIRDWEB_SECRET_KEY.'
      )
    }
  }

  // Configuração das Wallets (só se houver cliente válido)
  const wallets = useMemo(() => {
    if (!client) return []
    return [
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
      }),
    ]
  }, [client])

  // Sempre renderizar o ThirdwebProvider, mesmo se o cliente for null
  // Isso evita erros nos hooks, mas algumas funcionalidades podem não funcionar
  return (
    <ThirdwebProvider client={client} activeChain={base} wallets={wallets}>
      <X402Provider>{children}</X402Provider>
    </ThirdwebProvider>
  )
}
