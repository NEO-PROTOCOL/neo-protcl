#!/usr/bin/env node

/**
 * Script para fazer upload de uma imagem individual para IPFS
 * Retorna o CID correto para usar nas referências
 * 
 * Uso: node scripts/upload-image-to-ipfs.js [caminho-da-imagem]
 */

import { existsSync, readFileSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import FormData from 'form-data';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Carregar variáveis de ambiente
dotenv.config({ path: join(rootDir, '.env') });

// Aceita Pinata ou Lighthouse
const PINATA_JWT_SECRET = process.env.PINATA_JWT_SECRET;
const LIGHTHOUSE_API_KEY = process.env.VITE_LIGHTHOUSE_API_KEY || process.env.IPFS_API_KEY;

// Caminho da imagem (padrão: neo_ico.png)
const imagePath = process.argv[2] || join(rootDir, 'public', 'favicons', 'neo_ico.png');
const resolvedPath = resolve(imagePath);

async function uploadToPinata(filePath) {
  if (!PINATA_JWT_SECRET) {
    throw new Error('PINATA_JWT_SECRET não encontrado no .env');
  }

  console.log('📤 Fazendo upload para Pinata...');
  
  const formData = new FormData();
  const fileStream = readFileSync(filePath);
  const fileName = filePath.split('/').pop();
  
  formData.append('file', fileStream, {
    filename: fileName,
    contentType: 'image/png',
  });

  const metadata = JSON.stringify({
    name: fileName,
  });
  formData.append('pinataMetadata', metadata);

  const options = JSON.stringify({
    cidVersion: 1,
  });
  formData.append('pinataOptions', options);

  const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PINATA_JWT_SECRET}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Pinata upload failed: ${error}`);
  }

  const result = await response.json();
  return result.IpfsHash;
}

async function uploadToLighthouse(filePath) {
  if (!LIGHTHOUSE_API_KEY) {
    throw new Error('VITE_LIGHTHOUSE_API_KEY não encontrado no .env');
  }

  console.log('📤 Fazendo upload para Lighthouse...');
  
  const lighthouse = await import('@lighthouse-web3/sdk');
  
  const response = await lighthouse.upload(
    filePath,
    LIGHTHOUSE_API_KEY
  );
  
  const cid = response.data?.Hash || response.Hash || response.cid;
  
  if (!cid) {
    throw new Error('CID não encontrado na resposta do Lighthouse');
  }
  
  return cid;
}

async function main() {
  try {
    console.log('🚀 Upload de imagem para IPFS\n');
    console.log('📁 Arquivo:', resolvedPath);

    if (!existsSync(resolvedPath)) {
      console.error('❌ Erro: Arquivo não encontrado!');
      process.exit(1);
    }

    let cid;

    // Tentar Pinata primeiro, depois Lighthouse
    if (PINATA_JWT_SECRET) {
      try {
        cid = await uploadToPinata(resolvedPath);
        console.log('✅ Upload concluído com sucesso!\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📋 CID da imagem:');
        console.log(`   ${cid}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        console.log('🔗 URLs de acesso:');
        console.log(`   Pinata Gateway: https://gateway.pinata.cloud/ipfs/${cid}`);
        console.log(`   Cloudflare: https://cloudflare-ipfs.com/ipfs/${cid}`);
        console.log(`   IPFS.io: https://ipfs.io/ipfs/${cid}\n`);
        
        console.log('📝 Use este CID no código:');
        console.log(`   https://cloudflare-ipfs.com/ipfs/${cid}\n`);
        
        return cid;
      } catch (error) {
        console.warn('⚠️  Erro com Pinata, tentando Lighthouse...');
        if (!LIGHTHOUSE_API_KEY) {
          throw error;
        }
      }
    }

    if (LIGHTHOUSE_API_KEY) {
      cid = await uploadToLighthouse(resolvedPath);
      console.log('✅ Upload concluído com sucesso!\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📋 CID da imagem:');
      console.log(`   ${cid}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      console.log('🔗 URLs de acesso:');
      console.log(`   Lighthouse: https://gateway.lighthouse.storage/ipfs/${cid}`);
      console.log(`   Cloudflare: https://cloudflare-ipfs.com/ipfs/${cid}`);
      console.log(`   IPFS.io: https://ipfs.io/ipfs/${cid}\n`);
      
      console.log('📝 Use este CID no código:');
      console.log(`   https://cloudflare-ipfs.com/ipfs/${cid}\n`);
      
      return cid;
    }

    throw new Error('Nenhum serviço IPFS configurado (PINATA_JWT_SECRET ou VITE_LIGHTHOUSE_API_KEY)');

  } catch (error) {
    console.error('\n❌ Erro ao fazer upload:', error.message);
    process.exit(1);
  }
}

main();
