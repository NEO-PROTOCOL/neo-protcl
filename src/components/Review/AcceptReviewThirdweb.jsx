/**
 * AcceptReview - NEØ Protocol
 *
 * Placeholder: integração wallet on-chain desabilitada (projeto não usa mais Thirdweb).
 * Rota /review permanece ativa; funcionalidade pode ser reativada com outra stack de wallet.
 */

export default function AcceptReviewThirdweb() {
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
      <div style={{ padding: 16, background: '#111', border: '1px solid #0ff' }}>
        <p style={{ marginBottom: 12 }}>
          Review on-chain indisponível (integração wallet desabilitada).
        </p>
        <p style={{ fontSize: '0.9em', color: '#888' }}>
          Use a barra de navegação para acessar as demais rotas do protocolo.
        </p>
      </div>
    </div>
  )
}
