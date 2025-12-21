import React, { useEffect } from "react";
import { ConnectButton as ThirdwebConnectButton, useActiveAccount, useActiveWallet, useDisconnect } from "thirdweb/react";
import { useThirdwebClient } from "../../providers/X402Provider";

/**
 * Botão de conexão de wallet usando Thirdweb Embedded Wallets
 * 
 * Suporta:
 * - Embedded Wallets (email, social login, passkey) - Self-custodial via MPC
 * - Wallets tradicionais (MetaMask, WalletConnect, Coinbase) - Fallback
 * 
 * Fix para acessibilidade: Adiciona DialogTitle ao modal do ConnectWallet
 * 
 * @param {boolean} compact - Se true, renderiza versão compacta para Navbar
 */
export default function ConnectButton({ compact = false }) {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const disconnect = useDisconnect();
  const client = useThirdwebClient();

  const handleDisconnect = () => {
    if (wallet) {
      disconnect(wallet);
    }
  };

  // Fix para acessibilidade: Garantir que o modal tenha um DialogTitle acessível
  useEffect(() => {
    // O ConnectButton do Thirdweb usa Radix UI internamente
    // O Radix UI requer um DialogTitle para acessibilidade
    const fixDialogTitle = () => {
      const dialogs = document.querySelectorAll('[role="dialog"]');
      dialogs.forEach((dialog) => {
        // Verificar se já existe um título acessível com id
        const existingTitle = dialog.querySelector('[id*="title"][id*="radix"], h2[id], h3[id]');
        
        if (!existingTitle) {
          // Procurar por elementos que possam ser títulos
          const possibleTitles = dialog.querySelectorAll('h1, h2, h3, [class*="title"], [class*="Title"]');
          let titleFound = false;

          possibleTitles.forEach((el) => {
            if (el.textContent && el.textContent.trim().length > 0) {
              // Se encontrou um título visual, garantir que tenha id para acessibilidade
              if (!el.id) {
                el.id = 'connect-wallet-dialog-title';
                el.setAttribute('aria-label', el.textContent.trim());
                titleFound = true;
              }
            }
          });

          // Se não encontrou nenhum título, criar um oculto para screen readers
          if (!titleFound) {
            const title = document.createElement('h2');
            title.id = 'connect-wallet-dialog-title';
            title.className = 'sr-only';
            title.textContent = 'Conectar Wallet';
            title.setAttribute('aria-label', 'Conectar Wallet');
            // Inserir no início do dialog
            const firstChild = dialog.firstElementChild || dialog.firstChild;
            if (firstChild) {
              dialog.insertBefore(title, firstChild);
            } else {
              dialog.appendChild(title);
            }
          }
        }
      });
    };

    // Executar imediatamente e depois observar mudanças
    fixDialogTitle();

    const observer = new MutationObserver(() => {
      fixDialogTitle();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false
    });

    return () => observer.disconnect();
  }, []);

  // Se já conectado, mostrar informações da conta
  if (account) {
    if (compact) {
      // Versão compacta para Navbar
      return (
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 border border-green-400/50 bg-gray-800/50 backdrop-blur-sm font-mono text-xs text-green-300 rounded-lg"
            style={{
              borderColor: 'rgba(34, 197, 94, 0.5)',
              boxShadow: '0 0 10px rgba(34, 197, 94, 0.2)',
              textShadow: '0 0 5px rgba(34, 197, 94, 0.4)'
            }}
          >
            <span className="text-green-400">●</span> {account.address.slice(0, 4)}...{account.address.slice(-4)}
          </div>
          <button
            onClick={handleDisconnect}
            className="px-2 py-1.5 border border-red-400/50 bg-gray-800/50 hover:bg-gray-800/70 hover:border-red-400 text-red-300 font-mono text-xs transition-all rounded-lg"
            style={{
              textShadow: '0 0 3px rgba(239, 68, 68, 0.4)',
              boxShadow: '0 0 8px rgba(239, 68, 68, 0.15)'
            }}
            title="Desconectar"
          >
            ✕
          </button>
        </div>
      );
    }
    
    // Versão completa
    return (
      <div className="flex flex-col items-center my-6 space-y-3 w-full">
        <div 
          className="px-6 py-3 border-2 border-green-400/50 bg-gray-800/50 backdrop-blur-sm font-mono text-sm text-green-300 w-full text-center cyber-glow"
          style={{
            borderColor: 'rgba(34, 197, 94, 0.5)',
            boxShadow: '0 0 15px rgba(34, 197, 94, 0.3), inset 0 0 10px rgba(34, 197, 94, 0.1)',
            textShadow: '0 0 8px rgba(34, 197, 94, 0.6)'
          }}
        >
          <span className="text-green-400">●</span> CONECTADO: <span className="text-cyan-300 font-bold">{account.address.slice(0, 6)}...{account.address.slice(-4)}</span>
        </div>
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 border-2 border-red-400/50 bg-gray-800/50 hover:bg-gray-800/70 hover:border-red-400 text-red-300 font-mono text-xs transition-all w-full cyber-glow"
          style={{
            textShadow: '0 0 5px rgba(239, 68, 68, 0.5)',
            boxShadow: '0 0 10px rgba(239, 68, 68, 0.2)'
          }}
        >
          &gt; DESCONECTAR
        </button>
      </div>
    );
  }

  // Botão de conexão com Embedded Wallets
  if (!client) return null;

  if (compact) {
    // Versão compacta para Navbar
    return (
      <div className="flex items-center">
        <ThirdwebConnectButton
          client={client}
          connectModal={{
            size: "wide",
            title: "Conectar Wallet",
            welcomeScreen: {
              title: "Bem-vindo ao NΞØ Protocol",
              subtitle: "Conecte sua wallet para começar"
            }
          }}
          connectButton={{
            label: "Wallet",
            className: "px-3 py-1.5 text-xs"
          }}
        />
        <style>{`
          [data-theme="dark"] button {
            font-family: 'Courier New', monospace !important;
            border: 1px solid rgba(0, 255, 255, 0.5) !important;
            background: rgba(31, 41, 55, 0.5) !important;
            backdrop-filter: blur(8px) !important;
            color: #00ffff !important;
            text-shadow: 0 0 5px rgba(0, 255, 255, 0.4) !important;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.2) !important;
            transition: all 0.3s ease !important;
            border-radius: 0.5rem !important;
          }
          [data-theme="dark"] button:hover {
            border-color: rgba(0, 255, 255, 0.8) !important;
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.4) !important;
          }
        `}</style>
      </div>
    );
  }
  
  // Versão completa
  return (
    <div className="flex justify-center my-6 w-full">
      <div className="w-full">
        <ThirdwebConnectButton
          client={client}
          connectModal={{
            size: "wide",
            title: "Conectar Wallet",
            welcomeScreen: {
              title: "Bem-vindo ao NΞØ Protocol",
              subtitle: "Conecte sua wallet para começar"
            }
          }}
          connectButton={{
            label: "> CONECTAR WALLET",
            className: "w-full"
          }}
        />
        <style>{`
          [data-theme="dark"] button {
            font-family: 'Courier New', monospace !important;
            border: 2px solid rgba(0, 255, 255, 0.5) !important;
            background: rgba(31, 41, 55, 0.5) !important;
            backdrop-filter: blur(8px) !important;
            color: #00ffff !important;
            text-shadow: 0 0 8px rgba(0, 255, 255, 0.6) !important;
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.1) !important;
            transition: all 0.3s ease !important;
          }
          [data-theme="dark"] button:hover {
            border-color: rgba(0, 255, 255, 0.8) !important;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 15px rgba(0, 255, 255, 0.2) !important;
          }
        `}</style>
      </div>
    </div>
  );
}
