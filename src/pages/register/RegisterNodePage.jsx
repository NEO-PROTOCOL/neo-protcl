import React, { useState, useEffect } from 'react';
import { useActiveAccount, useActiveWallet, useDisconnect } from 'thirdweb/react';
import { acknowledgeNodeOffChain, readNodes, persistMCPState } from '../../context/mcp';
import { identityGraph } from '../../context/mcp/identityGraph';
import Navbar from '../../components/Navbar';
import BottomNavigation from '../../components/BottomNavigation';
import Footer from '../../components/Footer';
import ConnectButton from '../../components/WalletConnect/ConnectButton';
import { soundManager } from '../../utils/sounds';

/**
 * Página de Cadastro de Nós - NΞØ Protocol
 * 
 * Funciona off-chain agora (sem depender de token verificado)
 * Pode migrar para on-chain depois quando token estiver verificado
 */
export default function RegisterNodePage() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const disconnect = useDisconnect();
  const [domain, setDomain] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [registeredNodes, setRegisteredNodes] = useState([]);

  const handleDisconnect = () => {
    if (wallet) {
      soundManager.playClick();
      disconnect(wallet);
    }
  };

  // Carregar nós já registrados
  useEffect(() => {
    const nodes = readNodes();
    setRegisteredNodes(Object.values(nodes));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!account) {
      setError('Conecte sua wallet primeiro');
      return;
    }

    if (!domain.trim()) {
      setError('Domínio é obrigatório');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const nodeId = `node:${account.address.toLowerCase()}`;
      const nodeData = {
        address: account.address,
        domain: domain.trim(),
        description: description.trim() || null,
        registeredAt: Date.now(),
        registeredBy: account.address,
        status: 'pending', // Pending até token estar verificado e migrar para on-chain
        source: 'off-chain-registration',
      };

      // Registrar off-chain via MCP
      acknowledgeNodeOffChain(nodeId, nodeData);

      // Adicionar ao Identity Graph (opcional/fallback de segurança)
      // Nota: acknowledgeNodeOffChain já deve ter adicionado, mas garantimos aqui
      if (identityGraph && typeof identityGraph.addNode === 'function') {
        try {
          identityGraph.addNode(nodeId, {
            address: account.address,
            domain: domain.trim(),
            metadata: nodeData,
          });
        } catch (graphError) {
          console.warn('[Register] IdentityGraph update failed, but node was registered:', graphError);
        }
      }

      // Persistir estado
      persistMCPState();

      setSuccess(true);
      setDomain('');
      setDescription('');

      // Atualizar lista
      const nodes = readNodes();
      setRegisteredNodes(Object.values(nodes));

      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      console.error('Erro ao registrar nó:', err);
      setError(err.message || 'Erro ao registrar nó');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-16 safe-area-inset relative">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8 max-w-4xl pt-safe">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Cadastro de Nós</h1>
            <p className="text-gray-400">
              Registre seu nó no protocolo NΞØ. Funciona off-chain agora, migra para on-chain depois.
            </p>
          </div>

          {/* Status Banner */}
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-300 text-sm">
              ⚠️ <strong>Modo Off-Chain:</strong> Seu cadastro será registrado localmente e migrado para blockchain quando o token $NEO estiver verificado.
            </p>
          </div>

          {/* Formulário */}
          <div className="bg-gray-900/50 border border-cyan-500/30 rounded-lg p-6 mb-6">
            {!account ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">Conecte sua wallet para continuar</p>
                <ConnectButton />
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm text-gray-400">
                      Endereço da Wallet
                    </label>
                    <button
                      type="button"
                      onClick={handleDisconnect}
                      className="px-3 py-1 border border-red-400/50 bg-gray-800/50 hover:bg-gray-800/70 hover:border-red-400 text-red-300 font-mono text-xs transition-all rounded-lg"
                      style={{
                        textShadow: '0 0 3px rgba(239, 68, 68, 0.4)',
                        boxShadow: '0 0 8px rgba(239, 68, 68, 0.15)'
                      }}
                    >
                      ✕ DESCONECTAR
                    </button>
                  </div>
                  <div className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 font-mono text-sm">
                    {account.address}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Domínio <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="exemplo.eth ou exemplo.com"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Domínio que identifica seu nó (pode ser ENS, domínio tradicional, etc.)
                  </p>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Descrição (opcional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreva seu nó, propósito, etc."
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none resize-none"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                    <p className="text-green-300 text-sm">
                      ✅ Nó registrado com sucesso! Será migrado para blockchain quando o token estiver verificado.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !domain.trim()}
                  className="w-full px-4 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                >
                  {loading ? 'Registrando...' : 'Registrar Nó'}
                </button>
              </form>
            )}
          </div>

          {/* Lista de Nós Registrados */}
          {registeredNodes.length > 0 && (
            <div className="bg-gray-900/50 border border-cyan-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Nós Registrados (Off-Chain)</h2>
              <div className="space-y-3">
                {registeredNodes.map((node, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-mono text-sm text-cyan-400 mb-1">
                          {node.address}
                        </div>
                        <div className="text-white font-semibold mb-1">
                          {node.domain}
                        </div>
                        {node.description && (
                          <div className="text-gray-400 text-sm mb-2">
                            {node.description}
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>
                            Registrado: {new Date(node.registeredAt).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded">
                            Off-Chain
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <Footer />
        <BottomNavigation />
      </div>
    </div>
  );
}
