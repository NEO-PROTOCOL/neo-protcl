/**
 * AcceptReview Component - NEØ Protocol
 * 
 * UI mínima para aceitar revisão on-chain
 * Zero firula, apenas funcionalidade
 */

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { NODE_DESIGNER_REVIEW_ABI, STATUS, STATUS_NAMES } from "../../abi/nodeDesignerReview";

// Configuração - deve vir de .env ou config
const CONTRACT_ADDRESS = import.meta.env.VITE_NODE_DESIGNER_REVIEW_ADDRESS || "0xCONTRATO_AQUI";

export default function AcceptReview() {
  const [status, setStatus] = useState(null);
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);

  // Verificar se wallet está conectada
  useEffect(() => {
    checkConnection();
  }, []);

  async function checkConnection() {
    if (!window.ethereum) {
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        setConnected(true);
        setAccount(accounts[0]);
        await checkStatus(accounts[0]);
      }
    } catch (error) {
      console.error("Error checking connection:", error);
    }
  }

  async function connect() {
    if (!window.ethereum) {
      alert("Wallet not found. Please install MetaMask or another Web3 wallet.");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      await checkConnection();
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Error connecting wallet");
    }
  }

  async function checkStatus(address) {
    if (!address) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        NODE_DESIGNER_REVIEW_ABI,
        provider
      );

      const s = await contract.getStatus(address);
      const statusNum = Number(s);
      setStatus(statusNum);

      // Se tiver missão, buscar detalhes
      if (statusNum !== STATUS.NONE) {
        try {
          const missionData = await contract.getMission(address);
          setMission({
            scope: missionData.scope,
            deadline: Number(missionData.deadline),
            invitedAt: Number(missionData.invitedAt),
            acceptedAt: missionData.acceptedAt ? Number(missionData.acceptedAt) : null,
          });
        } catch (err) {
          console.warn("Could not fetch mission details:", err);
        }
      }
    } catch (error) {
      console.error("Error checking status:", error);
    }
  }

  async function accept() {
    if (!window.ethereum) {
      alert("Wallet not found");
      return;
    }

    try {
      setLoading(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        NODE_DESIGNER_REVIEW_ABI,
        signer
      );

      // Verificar status antes de aceitar
      const currentStatus = await contract.getStatus(address);
      if (Number(currentStatus) !== STATUS.INVITED) {
        alert(`Cannot accept. Current status: ${STATUS_NAMES[Number(currentStatus)]}`);
        setLoading(false);
        return;
      }

      const tx = await contract.acceptReview();
      console.log("Transaction sent:", tx.hash);

      await tx.wait();
      console.log("Transaction confirmed");

      alert("✅ Review accepted. Analysis officially started.");

      // Atualizar status
      await checkStatus(address);
    } catch (error) {
      console.error("Error accepting review:", error);
      
      if (error.code === 4001) {
        alert("Transaction rejected by user");
      } else {
        alert(`Error accepting review: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div 
      style={{ 
        padding: 24, 
        background: "#000", 
        color: "#0ff",
        fontFamily: "monospace",
        maxWidth: 600,
        margin: "0 auto"
      }}
    >
      <h2 style={{ marginBottom: 24, color: "#0ff" }}>
        NEØ — Design Review Access
      </h2>

      {!connected ? (
        <button
          onClick={connect}
          style={{
            padding: "12px 24px",
            background: "#0ff",
            color: "#000",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>
            <p>Connected: {account?.substring(0, 6)}...{account?.substring(38)}</p>
          </div>

          <button
            onClick={() => checkStatus(account)}
            style={{
              padding: "8px 16px",
              background: "transparent",
              color: "#0ff",
              border: "1px solid #0ff",
              cursor: "pointer",
              marginRight: 8,
              marginBottom: 16
            }}
          >
            Check Status
          </button>

          {status !== null && (
            <div style={{ marginBottom: 16, padding: 16, background: "#111", border: "1px solid #0ff" }}>
              <p><strong>Status:</strong> {STATUS_NAMES[status]}</p>
              
              {mission && (
                <>
                  <p><strong>Scope:</strong> {mission.scope}</p>
                  {mission.deadline && (
                    <p><strong>Deadline:</strong> {new Date(mission.deadline * 1000).toLocaleString()}</p>
                  )}
                </>
              )}
            </div>
          )}

          {status === STATUS.INVITED && (
            <button
              onClick={accept}
              disabled={loading}
              style={{
                padding: "12px 24px",
                background: loading ? "#666" : "#0ff",
                color: "#000",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "bold",
                width: "100%"
              }}
            >
              {loading ? "Processing..." : "Accept Review"}
            </button>
          )}

          {status === STATUS.ACCEPTED && (
            <div style={{ padding: 16, background: "#0f0", color: "#000" }}>
              ✅ Review accepted. Analysis started.
            </div>
          )}

          {status === STATUS.SUBMITTED && (
            <div style={{ padding: 16, background: "#ff0", color: "#000" }}>
              ⏳ Review submitted. Waiting for validation.
            </div>
          )}

          {status === STATUS.VALIDATED && (
            <div style={{ padding: 16, background: "#0f0", color: "#000" }}>
              ✅ Review validated.
            </div>
          )}

          {status === STATUS.EXPIRED && (
            <div style={{ padding: 16, background: "#f00", color: "#fff" }}>
              ❌ Review expired.
            </div>
          )}
        </>
      )}
    </div>
  );
}
