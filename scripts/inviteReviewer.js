/**
 * Script Hardhat - Invite Reviewer
 * 
 * Executado por você (architect) para criar convite on-chain
 * 
 * Uso:
 * npx hardhat run scripts/inviteReviewer.js --network polygon
 */

const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  // =============================
  // CONFIGURAÇÃO
  // =============================
  
  const CONTRACT_ADDRESS = process.env.NODE_DESIGNER_REVIEW_ADDRESS || "0xCONTRATO_AQUI";
  const REVIEWER_ADDRESS = process.env.REVIEWER_ADDRESS || "0xANDRE_AQUI";

  const scope = process.env.REVIEW_SCOPE || "Identity & Visual Coherence";
  const deadlineDays = parseInt(process.env.DEADLINE_DAYS || "7");
  const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * deadlineDays;

  const proofOfIntent = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(
      process.env.PROOF_OF_INTENT || "NEØ::NodeDesigner::AndreMainart::Review::PoI"
    )
  );

  // =============================
  // EXECUÇÃO
  // =============================

  console.log("\n🎯 NEØ Protocol — Inviting Reviewer");
  console.log("=====================================");
  console.log("Contract:", CONTRACT_ADDRESS);
  console.log("Reviewer:", REVIEWER_ADDRESS);
  console.log("Scope:", scope);
  console.log("Deadline:", new Date(deadline * 1000).toISOString());
  console.log("PoI Hash:", proofOfIntent);
  console.log("\n");

  const contract = await ethers.getContractAt(
    "NodeDesignerReview",
    CONTRACT_ADDRESS
  );

  console.log("Sending transaction...");
  const tx = await contract.inviteReviewer(
    REVIEWER_ADDRESS,
    scope,
    deadline,
    proofOfIntent
  );

  console.log("Transaction hash:", tx.hash);
  console.log("Waiting for confirmation...");
  
  await tx.wait();

  console.log("\n✅ Review invited successfully!");
  console.log("Deadline:", new Date(deadline * 1000).toISOString());
  console.log("\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error);
    process.exit(1);
  });
