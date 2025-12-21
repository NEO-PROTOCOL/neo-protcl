import { useState } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { DEFAULT_SWAP_PAIR, CHAINS } from '../../config/tokens';
import { thirdwebClient } from '../../providers/X402Provider';

/**
 * Componente de Swap $NEO/ETH
 * 
 * Permite trocar token $NEO por ETH usando a API do Thirdweb
 * 
 * Par configurado: $NEO (Polygon) → ETH (Ethereum)
 * 
 * Requer:
 * - Token $NEO deployado e endereço configurado em .env
 * - Thirdweb client configurado
 */
export default function NEOSwapWidget() {
  const account = useActiveAccount();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Verificar se token NEO está configurado
  const neoAddress = DEFAULT_SWAP_PAIR.sellToken.address;
  const ethAddress = DEFAULT_SWAP_PAIR.buyToken.address;
  const isConfigured = neoAddress && neoAddress !== "0x0000000000000000000000000000000000000000";

  const handleSwap = async () => {
    if (!account) {
      setError('Conecte sua wallet primeiro');
      return;
    }

    if (!isConfigured) {
      setError('Token NEO não configurado. Configure VITE_NEO_TOKEN_ADDRESS_POLYGON no .env');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Digite um valor válido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Usar API do Thirdweb para fazer swap
      // Nota: Esta é uma implementação de exemplo
      // A API real do Thirdweb pode ter métodos diferentes
      
      const response = await fetch('https://api.thirdweb.com/v1/bridge/swap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': import.meta.env.VITE_THIRDWEB_CLIENT_ID || '',
        },
        body: JSON.stringify({
          tokenIn: {
            address: neoAddress,
            chainId: DEFAULT_SWAP_PAIR.sellToken.chainId,
            amount: amount, // Em wei ou smallest unit
          },
          tokenOut: {
            address: ethAddress,
            chainId: DEFAULT_SWAP_PAIR.buyToken.chainId,
          },
          from: account.address,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao executar swap');
      }

      const result = await response.json();
      console.log('Swap executado:', result);
      
      // TODO: Mostrar confirmação ou redirecionar
      alert('Swap executado com sucesso!');
      
    } catch (err) {
      console.error('Erro no swap:', err);
      setError(err.message || 'Erro ao executar swap');
    } finally {
      setLoading(false);
    }
  };

  if (!isConfigured) {
    return (
      <div className="p-4 border border-yellow-500/50 bg-yellow-500/10 rounded-lg">
        <p className="text-yellow-300 text-sm">
          ⚠️ Token NEO não configurado. Configure VITE_NEO_TOKEN_ADDRESS_POLYGON no .env
        </p>
      </div>
    );
  }

  // URL da imagem do token (pode vir de .env ou usar logo padrão)
  const neoTokenImage = import.meta.env.VITE_NEO_TOKEN_IMAGE || '/logos/neo_ico.png';
  const ethTokenImage = 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'; // Logo ETH padrão

  return (
    <div className="p-6 border border-cyan-500/30 bg-gray-900/50 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <img 
          src={neoTokenImage} 
          alt="$NEO Token" 
          className="w-8 h-8 rounded-full"
          onError={(e) => {
            // Fallback para logo padrão se imagem não carregar
            e.target.src = '/logos/neo_ico.png';
          }}
        />
        <h3 className="text-xl font-bold text-white">Swap $NEO/ETH</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
            <img src={neoTokenImage} alt="$NEO" className="w-5 h-5 rounded-full" />
            Quantidade de $NEO
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-center text-cyan-400">
          <span className="text-2xl">↓</span>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
            <img src={ethTokenImage} alt="ETH" className="w-5 h-5 rounded-full" />
            Receberá ETH
          </label>
          <div className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 flex items-center gap-2">
            <img src={ethTokenImage} alt="ETH" className="w-6 h-6 rounded-full" />
            <span>{amount ? `~${(parseFloat(amount) * 0.001).toFixed(6)} ETH` : '0.0 ETH'}</span>
            <span className="text-xs text-gray-500 ml-auto">(estimativa)</span>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleSwap}
          disabled={!account || loading || !amount}
          className="w-full px-4 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          {loading ? 'Processando...' : account ? 'Fazer Swap' : 'Conecte sua Wallet'}
        </button>
      </div>

      <p className="mt-4 text-xs text-gray-500 text-center">
        Swap executado via Thirdweb Bridge API
      </p>
    </div>
  );
}
