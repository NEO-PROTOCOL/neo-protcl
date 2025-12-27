/**
 * AcceptReview Component - NEØ Protocol (Thirdweb)
 *
 * Versão atualizada usando Thirdweb SDK
 * Suporta gasless transactions e embedded wallets
 */

import { useState, useEffect } from 'react'
import { useActiveAccount, useActiveWallet } from 'thirdweb/react'
import { prepareContractCall, sendTransaction, readContract } from 'thirdweb'
import { base } from 'thirdweb/chains'
import { useThirdwebClient } from '../../providers/X402Provider'
import { getContract } from 'thirdweb/contract'
import { STATUS, STATUS_NAMES } from '../../abi/nodeDesignerReview'

// Endereço do contrato deployado (Base Mainnet)
const CONTRACT_ADDRESS =
  import.meta.env.VITE_NODE_DESIGNER_REVIEW_ADDRESS ||
  '0x426542498Ab03246DaDe955dF25845e446a13C2B'

export default function AcceptReviewThirdweb() {
  const account = useActiveAccount()
  const wallet = useActiveWallet()
  const client = useThirdwebClient()

  const [status, setStatus] = useState(null)
  const [mission, setMission] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // ABI mínima do contrato
  const contractAbi = [
    {
      type: 'function',
      name: 'acceptReview',
      inputs: [],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'getStatus',
      inputs: [{ name: 'reviewer', type: 'address' }],
      outputs: [{ name: '', type: 'uint8' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'getMission',
      inputs: [{ name: 'reviewer', type: 'address' }],
      outputs: [
        {
          name: '',
          type: 'tuple',
          components: [
            { name: 'reviewer', type: 'address' },
            { name: 'scope', type: 'string' },
            { name: 'proofOfIntent', type: 'bytes32' },
            { name: 'invitedAt', type: 'uint256' },
            { name: 'acceptedAt', type: 'uint256' },
            { name: 'deadline', type: 'uint256' },
            { name: 'submittedAt', type: 'uint256' },
            { name: 'proofOfDelivery', type: 'bytes32' },
            { name: 'status', type: 'uint8' },
          ],
        },
      ],
      stateMutability: 'view',
    },
  ]

  // Obter instância do contrato
  const getContractInstance = () => {
    if (!client) return null

    return getContract({
      client,
      chain: base,
      address: CONTRACT_ADDRESS,
      abi: contractAbi,
    })
  }

  // Verificar status da missão
  const checkStatus = async () => {
    if (!account?.address || !client) {
      setError('Wallet não conectada')
      return
    }

    try {
      setError(null)
      const contract = getContractInstance()
      if (!contract) {
        setError('Cliente Thirdweb não configurado')
        return
      }

      // Ler status do contrato
      const statusResult = await readContract({
        contract,
        method: 'function getStatus(address) view returns (uint8)',
        params: [account.address],
      })

      const statusNum = Number(statusResult)
      setStatus(statusNum)

      // Se tiver missão, buscar detalhes
      if (statusNum !== STATUS.NONE) {
        try {
          const missionData = await readContract({
            contract,
            method: 'function getMission(address) view returns (tuple)',
            params: [account.address],
          })

          setMission({
            scope: missionData.scope,
            deadline: Number(missionData.deadline),
            invitedAt: Number(missionData.invitedAt),
            acceptedAt: missionData.acceptedAt ? Number(missionData.acceptedAt) : null,
          })
        } catch (err) {
          if (import.meta.env.DEV) {
            console.warn('Could not fetch mission details:', err)
          }
        }
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error checking status:', error)
      }
      setError(`Erro ao verificar status: ${error.message}`)
    }
  }

  // Aceitar revisão
  const accept = async () => {
    if (!account?.address || !wallet || !client) {
      setError('Wallet não conectada')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const contract = getContractInstance()
      if (!contract) {
        throw new Error('Cliente Thirdweb não configurado')
      }

      // Verificar status antes de aceitar
      const currentStatus = await readContract({
        contract,
        method: 'function getStatus(address) view returns (uint8)',
        params: [account.address],
      })

      if (Number(currentStatus) !== STATUS.INVITED) {
        throw new Error(
          `Não é possível aceitar. Status atual: ${STATUS_NAMES[Number(currentStatus)]}`
        )
      }

      // Preparar chamada do contrato
      const transaction = prepareContractCall({
        contract,
        method: 'function acceptReview()',
        params: [],
      })

      // Enviar transação (gasless se configurado)
      const result = await sendTransaction({
        transaction,
        account,
      })

      if (import.meta.env.DEV) {
        console.log('Transaction sent:', result.transactionHash)
      }

      // Atualizar status após confirmação
      await checkStatus()

      // Mostrar sucesso
      setError(null)
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error accepting review:', error)
      }

      if (error.message?.includes('rejected') || error.message?.includes('User rejected')) {
        setError('Transação rejeitada pelo usuário')
      } else {
        setError(`Erro ao aceitar revisão: ${error.message || 'Erro desconhecido'}`)
      }
    } finally {
      setLoading(false)
    }
  }

  // Verificar status quando wallet conectar
  useEffect(() => {
    if (account?.address) {
      checkStatus()
    }
  }, [account?.address, client])

  return (
    <div
      style={{
        padding: 24,
        background: '#000',
        color: '#0ff',
        fontFamily: 'monospace',
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <h2 style={{ marginBottom: 24, color: '#0ff' }}>NEØ — Design Review Access</h2>

      {!account ? (
        <div style={{ padding: 16, background: '#111', border: '1px solid #0ff' }}>
          <p style={{ marginBottom: 16 }}>
            Conecte sua wallet para verificar seu status de revisão.
          </p>
          <p style={{ fontSize: '0.9em', color: '#888' }}>
            Use o botão de conexão no topo da página.
          </p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>
            <p>
              <strong>Conectado:</strong> {account.address.substring(0, 6)}...
              {account.address.substring(38)}
            </p>
          </div>

          <button
            onClick={checkStatus}
            disabled={loading}
            style={{
              padding: '8px 16px',
              background: 'transparent',
              color: '#0ff',
              border: '1px solid #0ff',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginRight: 8,
              marginBottom: 16,
            }}
          >
            Verificar Status
          </button>

          {error && (
            <div
              style={{
                marginBottom: 16,
                padding: 12,
                background: '#300',
                border: '1px solid #f00',
                color: '#faa',
              }}
            >
              ❌ {error}
            </div>
          )}

          {status !== null && (
            <div
              style={{
                marginBottom: 16,
                padding: 16,
                background: '#111',
                border: '1px solid #0ff',
              }}
            >
              <p>
                <strong>Status:</strong> {STATUS_NAMES[status]}
              </p>

              {mission && (
                <>
                  <p>
                    <strong>Scope:</strong> {mission.scope}
                  </p>
                  {mission.deadline && (
                    <p>
                      <strong>Deadline:</strong>{' '}
                      {new Date(mission.deadline * 1000).toLocaleString()}
                    </p>
                  )}
                  {mission.acceptedAt && (
                    <p>
                      <strong>Aceito em:</strong>{' '}
                      {new Date(mission.acceptedAt * 1000).toLocaleString()}
                    </p>
                  )}
                </>
              )}
            </div>
          )}

          {status === STATUS.INVITED && (
            <button
              onClick={accept}
              disabled={loading}
              style={{
                padding: '12px 24px',
                background: loading ? '#666' : '#0ff',
                color: '#000',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                width: '100%',
              }}
            >
              {loading ? 'Processando...' : 'Aceitar Revisão'}
            </button>
          )}

          {status === STATUS.ACCEPTED && (
            <div style={{ padding: 16, background: '#0f0', color: '#000' }}>
              ✅ Revisão aceita. Análise iniciada oficialmente.
            </div>
          )}

          {status === STATUS.SUBMITTED && (
            <div style={{ padding: 16, background: '#ff0', color: '#000' }}>
              ⏳ Revisão submetida. Aguardando validação.
            </div>
          )}

          {status === STATUS.VALIDATED && (
            <div style={{ padding: 16, background: '#0f0', color: '#000' }}>
              ✅ Revisão validada.
            </div>
          )}

          {status === STATUS.EXPIRED && (
            <div style={{ padding: 16, background: '#f00', color: '#fff' }}>
              ❌ Revisão expirada.
            </div>
          )}
        </>
      )}
    </div>
  )
}

