/**
 * ThirdwebProvider - REMOVIDO
 * 
 * Este arquivo foi desabilitado porque o Thirdweb não está sendo usado no momento.
 * Para reativar no futuro, descomente o código abaixo e reinstale as dependências:
 * - @thirdweb-dev/react
 * - @thirdweb-dev/chains
 */

/*
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Base } from "@thirdweb-dev/chains";
import X402Provider from "./X402Provider";

export default function TWProvider({ children }) {
  const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
  const hasClientId = clientId && clientId !== "SEU_CLIENT_ID_THIRDWEB" && clientId !== "your-thirdweb-client-id-here";

  return (
    <ThirdwebProvider
      activeChain={Base}
      clientId={hasClientId ? clientId : undefined}
    >
      <X402Provider>
        {children}
      </X402Provider>
    </ThirdwebProvider>
  );
}
*/

// Provider vazio para manter compatibilidade
export default function TWProvider({ children }) {
  return <>{children}</>;
}
