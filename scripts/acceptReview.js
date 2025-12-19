/**
 * Script Hardhat - Accept Review
 * 
 * Executado pelo revisor com a wallet dele
 * 
 * Uso:
 * npx hardhat run scripts/acceptReview.js --network polygon
 */

const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  // =============================
  // CONFIGURAÇÃO
  // =============================
  
  const CONTRACT_ADDRESS = process.env.NODE_DESIGNER_REVIEW_ADDRESS || "0xCONTRATO_AQUI";

  // =============================
  // EXECUÇÃO
  // =============================

  console.log("\n🎯 NEØ Protocol — Accept Review");
  console.log("=================================");
  console.log("Contract:", CONTRACT_ADDRESS);
  
  const [signer] = await ethers.getSigners();
  console.log("Signer:", signer.address);
  console.log("\n");

  const contract = await ethers.getContractAt(
    "NodeDesignerReview",
    CONTRACT_ADDRESS,
    signer
  );

  // Verificar status atual
  const currentStatus = await contract.getStatus(signer.address);
  const statusNames = ["NONE", "INVITED", "ACCEPTED", "SUBMITTED", "VALIDATED", "EXPIRED"];
  console.log("Current status:", statusNames[Number(currentStatus)]);
  
  if (Number(currentStatus) !== 1) {
    console.error("❌ Error: You are not in INVITED status");
    console.error("Current status:", statusNames[Number(currentStatus)]);
    process.exit(1);
  }

  console.log("\nSending transaction...");
  const tx = await contract.acceptReview();

  console.log("Transaction hash:", tx.hash);
  console.log("Waiting for confirmation...");
  
  await tx.wait();

  console.log("\n🟢 Review accepted. Analysis officially started.");
  console.log("\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error);
    process.exit(1);
  });
