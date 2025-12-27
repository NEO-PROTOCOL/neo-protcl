/**
 * ReviewPage - NEØ Protocol
 *
 * Página mínima para aceitar revisão on-chain
 */

import AcceptReviewThirdweb from '../../components/Review/AcceptReviewThirdweb'

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <AcceptReviewThirdweb />
      </div>
    </div>
  )
}
