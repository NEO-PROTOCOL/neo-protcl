/**
 * Preset: Invite Node Designer
 * 
 * This is a PRESET for the generic NeoNodeAdmission contract.
 * 
 * Usage:
 *   npx hardhat run scripts/presets/inviteNodeDesigner.js --network base
 * 
 * Note: Uses wallet from Hardhat config or environment.
 * For production, prefer manual wallet connection or Hardhat impersonation.
 */

const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const CONTRACT_ADDRESS = process.env.NEO_NODE_ADMISSION_ADDRESS || "0xCONTRATO_AQUI";
  const CANDIDATE_ADDRESS = process.env.CANDIDATE_ADDRESS || "0xCANDIDATO_AQUI";

  const nodeType = "Designer";
  const scope = process.env.MISSION_SCOPE || "Identity & Visual Coherence";
  const deadlineDays = parseInt(process.env.DEADLINE_DAYS || "7");
  const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * deadlineDays;
  const proofOfIntent = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(
      process.env.PROOF_OF_INTENT || `NEØ::Node::${nodeType}::${CANDIDATE_ADDRESS}::PoI`
    )
  );

  const contract = await ethers.getContractAt("NeoNodeAdmission", CONTRACT_ADDRESS);

  console.log("🎯 NEØ Protocol — Inviting Node Designer");
  console.log("=====================================");
  console.log("Contract:", CONTRACT_ADDRESS);
  console.log("Candidate:", CANDIDATE_ADDRESS);
  console.log("Node Type:", nodeType);
  console.log("Scope:", scope);
  console.log("Deadline:", new Date(deadline * 1000).toISOString());
  console.log("PoI Hash:", proofOfIntent);

  console.log("\nSending transaction...");
  const tx = await contract.inviteNode(
    CANDIDATE_ADDRESS,
    nodeType,
    scope,
    deadline,
    proofOfIntent
  );

  console.log("Transaction hash:", tx.hash);
  console.log("Waiting for confirmation...");
  await tx.wait();

  console.log("\n✅ Node Designer invited successfully!");
  console.log("Deadline:", new Date(deadline * 1000).toISOString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
