/**
 * ABI mínima para NodeDesignerReview.sol
 * 
 * Apenas as funções necessárias para UI mínima
 */

export const NODE_DESIGNER_REVIEW_ABI = [
  "function acceptReview() external",
  "function getStatus(address reviewer) view returns (uint8)",
  "function getMission(address reviewer) view returns (tuple(address reviewer, string scope, bytes32 proofOfIntent, uint256 invitedAt, uint256 acceptedAt, uint256 deadline, uint256 submittedAt, bytes32 proofOfDelivery, uint8 status))",
  "event ReviewInvited(address indexed reviewer, bytes32 proofOfIntent, uint256 deadline)",
  "event ReviewAccepted(address indexed reviewer)",
  "event ReviewSubmitted(address indexed reviewer, bytes32 proofOfDelivery)",
  "event ReviewValidated(address indexed reviewer)",
  "event ReviewExpired(address indexed reviewer)"
];

/**
 * Status enum values
 */
export const STATUS = {
  NONE: 0,
  INVITED: 1,
  ACCEPTED: 2,
  SUBMITTED: 3,
  VALIDATED: 4,
  EXPIRED: 5
};

export const STATUS_NAMES = {
  0: "NONE",
  1: "INVITED",
  2: "ACCEPTED",
  3: "SUBMITTED",
  4: "VALIDATED",
  5: "EXPIRED"
};
