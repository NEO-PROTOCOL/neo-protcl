/**
 * thirdwebSDK.js - REMOVIDO
 * 
 * Este arquivo foi desabilitado porque o Thirdweb não está sendo usado no momento.
 * Para reativar no futuro, descomente o código abaixo e reinstale as dependências:
 * - thirdweb
 */

/*
import { thirdwebClient, thirdwebSDKConfig } from "../providers/X402Provider";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { base } from "thirdweb/chains";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";

export function getContractInstance(contractAddress) {
  if (!thirdwebSDKConfig.isConfigured) {
    throw new Error("Thirdweb client não está configurado. Configure VITE_THIRDWEB_SECRET_KEY ou VITE_THIRDWEB_CLIENT_ID");
  }

  return getContract({
    client: thirdwebClient,
    chain: base,
    address: contractAddress
  });
}

export function prepareContractCall(contract, method, params) {
  return prepareContractCall({
    contract,
    method,
    params
  });
}

export async function callContractFunction(contractAddress, method, params) {
  const contract = getContractInstance(contractAddress);
  const tx = prepareContractCall(contract, method, params);
  const account = useActiveAccount();
  
  if (!account) {
    throw new Error("Nenhuma conta ativa encontrada");
  }

  return await sendTransaction({ transaction: tx, account });
}

export async function sendTransactionViaAPI({ chainId = "8453", from, transactions }) {
  const secretKey = import.meta.env.VITE_THIRDWEB_SECRET_KEY;
  if (!secretKey) {
    throw new Error("VITE_THIRDWEB_SECRET_KEY é necessário para enviar transações via API");
  }

  const response = await fetch("https://api.thirdweb.com/v1/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-secret-key": secretKey
    },
    body: JSON.stringify({
      chainId,
      from,
      transactions
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro desconhecido" }));
    throw new Error(error.message || "Erro ao enviar transação");
  }

  return response.json();
}
*/

// Exports vazios para manter compatibilidade
export function getContractInstance(contractAddress) {
  throw new Error("Thirdweb SDK não está disponível. Reative o Thirdweb para usar esta funcionalidade.");
}

export function prepareContractCall(contract, method, params) {
  throw new Error("Thirdweb SDK não está disponível. Reative o Thirdweb para usar esta funcionalidade.");
}

export async function callContractFunction(contractAddress, method, params) {
  throw new Error("Thirdweb SDK não está disponível. Reative o Thirdweb para usar esta funcionalidade.");
}

export async function sendTransactionViaAPI({ chainId, from, transactions }) {
  throw new Error("Thirdweb SDK não está disponível. Reative o Thirdweb para usar esta funcionalidade.");
}
