/**
 * Botão de wallet como ícone para o Navbar.
 * Placeholder: wallet desabilitada até nova integração.
 */
export default function WalletIconButton() {
  return null

  /* Código original comentado:
  if (address) {
    return (
      <div className="relative group opacity-50 blur-[1px] pointer-events-none">
        <button
          disabled
          className="p-2 border-2 border-green-400/50 bg-gray-800/50 backdrop-blur-sm rounded transition-all"
          style={{
            boxShadow: '0 0 10px rgba(34, 197, 94, 0.3)',
            textShadow: '0 0 5px rgba(34, 197, 94, 0.5)',
            cursor: 'not-allowed'
          }}
          title={`Conectado: ${address.slice(0, 6)}...${address.slice(-4)}`}
          aria-label={`Wallet conectada: ${address.slice(0, 6)}...${address.slice(-4)}`}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className="text-green-400"
          >
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="relative opacity-50 blur-[1px] pointer-events-none">
      <ConnectWallet
        theme="dark"
        btnTitle=""
        modalTitle="Conectar Wallet"
        modalSize="wide"
        welcomeScreen={{
          title: "Bem-vindo ao NΞØ Protocol",
          subtitle: "Conecte sua wallet para começar"
        }}
        className="wallet-icon-button"
      />
      <style>{`
        .wallet-icon-button button {
          padding: 8px !important;
          border: 2px solid rgba(0, 255, 255, 0.5) !important;
          background: rgba(31, 41, 55, 0.5) !important;
          backdrop-filter: blur(8px) !important;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.2) !important;
          border-radius: 4px !important;
          min-width: 40px !important;
          width: 40px !important;
          height: 40px !important;
          font-family: 'Courier New', monospace !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: not-allowed !important;
          pointer-events: none !important;
        }
        .wallet-icon-button button > * {
          display: none !important;
        }
        .wallet-icon-button button::before {
          content: '' !important;
          display: block !important;
          width: 20px !important;
          height: 20px !important;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2300ffff' stroke-width='2'%3E%3Cpath d='M21 12V7H5a2 2 0 0 1 0-4h14v4'%3E%3C/path%3E%3Cpath d='M3 5v14a2 2 0 0 0 2 2h16v-5'%3E%3C/path%3E%3Cpath d='M18 12a2 2 0 0 0 0 4h4v-4Z'%3E%3C/path%3E%3C/svg%3E") !important;
          background-size: contain !important;
          background-repeat: no-repeat !important;
          background-position: center !important;
        }
      `}</style>
    </div>
  );
  */
}
