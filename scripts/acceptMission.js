/**
 * Script Hardhat - Accept Mission (Generic)
 * 
 * Generic script to accept any node mission.
 * 
 * Usage:
 *   npx hardhat run scripts/acceptMission.js --network base
 * 
 * Note: 
 * - Uses wallet from Hardhat config or environment
 * - For production, prefer manual wallet connection or Hardhat impersonation
 * - .env is operational detail, not conceptual layer
 */

const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const CONTRACT_ADDRESS = process.env.NEO_NODE_ADMISSION_ADDRESS || "0xCONTRATO_AQUI";

  console.log("\n🎯 NEØ Protocol — Accept Mission");
  console.log("=================================");
  console.log("Contract:", CONTRACT_ADDRESS);
  
  const [signer] = await ethers.getSigners();
  console.log("Signer:", signer.address);
  console.log("\n");

  const contract = await ethers.getContractAt(
    "NeoNodeAdmission",
    CONTRACT_ADDRESS,
    signer
  );

  // Verificar status atual
  const currentStatus = await contract.getStatus(signer.address);
  const statusNames = ["NONE", "INVITED", "ACCEPTED", "SUBMITTED", "VALIDATED", "EXPIRED"];
  console.log("Current status:", statusNames[Number(currentStatus)]);
  
  if (Number(currentStatus) !== 1) { // 1 = INVITED
    console.error("❌ Error: You are not in INVITED status");
    console.error("Current status:", statusNames[Number(currentStatus)]);
    process.exit(1);
  }

  // Obter informações da missão
  const mission = await contract.getMission(signer.address);
  console.log("Node Type:", mission.nodeType);
  console.log("Scope:", mission.scope);
  console.log("Deadline:", new Date(Number(mission.deadline) * 1000).toISOString());

  console.log("\nSending transaction...");
  const tx = await contract.acceptMission();

  console.log("Transaction hash:", tx.hash);
  console.log("Waiting for confirmation...");
  
  await tx.wait();

  console.log("\n🟢 Mission accepted. Node admission process officially started.");
  console.log("\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error);
    process.exit(1);
  });
