/**
 * Reputation Bridge - NEØ Protocol
 * 
 * Bridge between on-chain events and off-chain Identity Graph
 * 
 * Principle:
 * - Contract does NOT write to graph
 * - Contract EMITS events
 * - Off-chain LISTENS, INTERPRETS, and WRITES
 * 
 * This maintains:
 * - On-chain determinism
 * - Off-chain flexibility
 * - Complete auditability
 */

import { getIdentityGraph } from '../context/mcp/identityGraph';
import { ethers } from 'ethers';

const NEO_PROTOCOL_NODE_ID = 'neo:protocol';

/**
 * Handle ReviewValidated event from NodeDesignerReview contract
 * 
 * @param {string} reviewerAddress - Address of the reviewer
 * @param {Object} eventData - Event data from contract
 */
export function onReviewValidated(reviewerAddress, eventData = {}) {
  const graph = getIdentityGraph();
  const reviewerId = `node:${reviewerAddress.toLowerCase()}`;

  // Ensure node exists in graph
  graph.addNode(reviewerId, {
    address: reviewerAddress,
    domain: 'design',
    metadata: {
      source: 'NodeDesignerReview',
      status: 'validated',
      validatedAt: Date.now(),
      ...eventData
    }
  });

  // Create symbolic validation edge
  graph.addEdge(
    NEO_PROTOCOL_NODE_ID,
    reviewerId,
    'review_validated',
    {
      contract: 'NodeDesignerReview',
      event: 'ReviewValidated',
      timestamp: Date.now()
    },
    0.4 // Weight: validated review has moderate impact
  );

  console.log(`[ReputationBridge] Review validated for ${reviewerId}`);
  
  return {
    nodeId: reviewerId,
    edgeCreated: true
  };
}

/**
 * Handle NodeAdmitted event from NodeAdmission contract
 * 
 * @param {string} nodeAddress - Address of the admitted node
 * @param {Object} eventData - Event data from contract
 */
export function onNodeAdmitted(nodeAddress, eventData = {}) {
  const graph = getIdentityGraph();
  const nodeId = `node:${nodeAddress.toLowerCase()}`;

  // Ensure node exists
  if (!graph.getNode(nodeId)) {
    graph.addNode(nodeId, {
      address: nodeAddress,
      domain: 'admitted',
      metadata: {
        source: 'NodeAdmission',
        admittedAt: Date.now(),
        ...eventData
      }
    });
  } else {
    // Update existing node
    const node = graph.getNode(nodeId);
    graph.addNode(nodeId, {
      ...node,
      metadata: {
        ...node.metadata,
        admitted: true,
        admittedAt: Date.now(),
        ...eventData
      }
    });
  }

  // Create admission edge
  graph.addEdge(
    NEO_PROTOCOL_NODE_ID,
    nodeId,
    'admitted',
    {
      contract: 'NodeAdmission',
      event: 'NodeAdmitted',
      timestamp: Date.now()
    },
    0.8 // Weight: admission has high impact
  );

  console.log(`[ReputationBridge] Node admitted: ${nodeId}`);
  
  return {
    nodeId,
    edgeCreated: true
  };
}

/**
 * Setup event listeners for NEØ Protocol contracts
 * 
 * @param {ethers.Contract} reviewContract - NodeDesignerReview contract instance
 * @param {ethers.Contract} admissionContract - NodeAdmission contract instance
 */
export function setupEventListeners(reviewContract, admissionContract) {
  if (!reviewContract || !admissionContract) {
    console.warn('[ReputationBridge] Contracts not provided, skipping listener setup');
    return;
  }

  // Listen to ReviewValidated events
  reviewContract.on('ReviewValidated', (reviewer, event) => {
    onReviewValidated(reviewer, {
      blockNumber: event.blockNumber,
      transactionHash: event.transactionHash
    });
  });

  // Listen to NodeAdmitted events
  admissionContract.on('NodeAdmitted', (node, event) => {
    onNodeAdmitted(node, {
      blockNumber: event.blockNumber,
      transactionHash: event.transactionHash
    });
  });

  console.log('[ReputationBridge] Event listeners setup complete');
}

/**
 * Initialize NEØ Protocol node in Identity Graph
 * This should be called once during app initialization
 */
export function initializeNeoProtocolNode() {
  const graph = getIdentityGraph();
  
  graph.addNode(NEO_PROTOCOL_NODE_ID, {
    address: null, // Protocol doesn't have a single address
    domain: 'protocol',
    metadata: {
      source: 'system',
      type: 'protocol',
      initializedAt: Date.now()
    }
  });

  console.log('[ReputationBridge] NEØ Protocol node initialized');
}
