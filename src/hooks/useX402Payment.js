import { useState } from 'react'
import { fetchWithX402Payment, generateX402PaymentData } from '../services/x402Payment'
import { x402Config } from '../providers/X402Provider'

/**
 * Hook para usar x402 Payments
 *
 * NOTA: settlePayment é processado no BACKEND.
 * No frontend, você apenas faz requisições com o header x-payment.
 */
export function useX402Payment() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * Faz uma requisição HTTP com pagamento x402
   * O backend processa o pagamento usando settlePayment
   */
  const fetchWithPayment = async (url, options = {}) => {
    setLoading(true)
    setError(null)

    try {
      if (!x402Config.isConfigured) {
        throw new Error(
          'x402 Payments não está configurado. Configure VITE_X402_SERVER_WALLET_ADDRESS (e secret no backend)'
        )
      }

      // Gerar ou usar paymentData fornecido
      const paymentData = options.paymentData || generateX402PaymentData(options.price)

      const result = await fetchWithX402Payment(url, {
        ...options,
        paymentData,
      })

      setLoading(false)
      return result
    } catch (err) {
      setError(err.message)
      setLoading(false)
      throw err
    }
  }

  return {
    fetchWithPayment,
    generatePaymentData: generateX402PaymentData,
    loading,
    error,
    isConfigured: x402Config.isConfigured,
  }
}
