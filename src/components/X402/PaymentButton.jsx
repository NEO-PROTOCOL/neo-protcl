import { useState } from 'react'
import { useX402Payment } from '../../hooks/useX402Payment'

export default function PaymentButton({
  resourceUrl,
  price = '$0.01',
  method = 'GET',
  paymentData: externalPaymentData,
  onSuccess,
  onError,
  children,
  className = '',
}) {
  const { fetchWithPayment, generatePaymentData, loading, error, isConfigured } = useX402Payment()
  const [paymentData] = useState(externalPaymentData || generatePaymentData(price))

  const handlePayment = async () => {
    if (!isConfigured) {
      alert(
        'x402 Payments não está configurado. Configure VITE_X402_SERVER_WALLET_ADDRESS no .env'
      )
      return
    }

    try {
      // Fazer requisição com header x-payment
      // O backend processa o pagamento usando settlePayment
      const response = await fetchWithPayment(resourceUrl, {
        method,
        paymentData,
        price,
      })

      if (response.ok) {
        const data = await response.json()
        onSuccess?.(data)
      } else {
        const errorData = await response.json().catch(() => ({ status: response.status }))
        onError?.(errorData)
      }
    } catch (err) {
      onError?.(err)
    }
  }

  if (!isConfigured) {
    return (
      <div className="text-xs text-gray-400 p-4 text-center">✶ x402 Payments não configurado</div>
    )
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handlePayment}
        disabled={loading || !paymentData}
        className={`px-6 py-3 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors touch-manipulation w-full ${className}`}
      >
        {loading ? 'Processando...' : children || `Pagar ${price}`}
      </button>
      {error && <p className="text-xs text-red-400 text-center">{error}</p>}
    </div>
  )
}
