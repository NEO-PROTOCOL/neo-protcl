#!/usr/bin/env node

/**
 * Script para fazer upload do dist-boot para o Pinata
 * 
 * Uso: node scripts/upload-to-pinata.js
 * 
 * Requer variáveis de ambiente no .env:
 * - PINATA_API_KEY
 * - PINATA_API_SECRET
 * - PINATA_JWT_SECRET (opcional, pode usar API_KEY + API_SECRET)
 * - PINATA_GATEWAY (opcional, gateway dedicado, ex: amaranth-advisory-coyote-805.mypinata.cloud)
 */

import { readdirSync, statSync, createReadStream, writeFileSync, createWriteStream, unlinkSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import FormData from 'form-data';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar variáveis de ambiente
dotenv.config({ path: join(__dirname, '..', '.env') });

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;
const PINATA_JWT_SECRET = process.env.PINATA_JWT_SECRET;
const PINATA_GATEWAY = process.env.PINATA_GATEWAY || 'gateway.pinata.cloud'; // Gateway dedicado ou público

const DIST_BOOT_DIR = join(__dirname, '..', 'dist-boot');
const PINATA_API_URL = 'https://api.pinata.cloud';

/**
 * Obter token de autenticação do Pinata
 * Prioriza JWT se disponível, caso contrário usa API Key + Secret
 */
async function getAuthToken() {
  // Se JWT está disponível, usar diretamente
  if (PINATA_JWT_SECRET) {
    return PINATA_JWT_SECRET;
  }

  // Caso contrário, usar API Key + Secret diretamente no header
  if (!PINATA_API_KEY || !PINATA_API_SECRET) {
    throw new Error('PINATA_JWT_SECRET ou (PINATA_API_KEY + PINATA_API_SECRET) são obrigatórios');
  }

  // Para API Key + Secret, retornar objeto com headers
  return {
    pinata_api_key: PINATA_API_KEY,
    pinata_secret_api_key: PINATA_API_SECRET,
  };
}


/**
 * Criar arquivo ZIP do diretório
 * Pinata aceita ZIP como arquivo único, o que é mais confiável
 */
function createZip(directory) {
  return new Promise((resolve, reject) => {
    const zipPath = join(__dirname, '..', 'dist-boot-temp.zip');
    const output = createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`📦 ZIP criado: ${archive.pointer()} bytes`);
      resolve(zipPath);
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    // Adicionar todos os arquivos do diretório ao ZIP
    function addFiles(dir, baseDir = dir) {
      const files = readdirSync(dir);

      for (const file of files) {
        const filePath = join(dir, file);
        const stat = statSync(filePath);

        if (stat.isDirectory()) {
          addFiles(filePath, baseDir);
        } else {
          const relativePath = relative(baseDir, filePath).replace(/\\/g, '/');
          archive.file(filePath, { name: relativePath });
        }
      }
    }

    addFiles(directory);
    archive.finalize();
  });
}

/**
 * Fazer upload de um arquivo ZIP para o Pinata
 * Usa ZIP porque é mais confiável que enviar múltiplos arquivos
 */
async function uploadZip(zipPath, auth) {
  const formData = new FormData();
  
  // Adicionar arquivo ZIP - Pinata aceita ZIP e extrai automaticamente
  console.log('📤 Fazendo upload do ZIP para Pinata...');
  formData.append('file', createReadStream(zipPath));

  // Adicionar opções de pinning
  const pinataOptions = {
    cidVersion: 0,
    wrapWithDirectory: false
  };
  formData.append('pinataOptions', JSON.stringify(pinataOptions));

  // Preparar headers de autenticação
  const headers = formData.getHeaders();
  
  if (typeof auth === 'string') {
    // JWT token - usar Bearer
    headers['Authorization'] = `Bearer ${auth}`;
  } else {
    // API Key + Secret - adicionar como headers
    headers['pinata_api_key'] = auth.pinata_api_key;
    headers['pinata_secret_api_key'] = auth.pinata_secret_api_key;
  }

  console.log('📡 Enviando requisição...');

  try {
    const response = await fetch(`${PINATA_API_URL}/pinning/pinFileToIPFS`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Falha no upload: ${response.status} ${response.statusText}`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage += ` - ${JSON.stringify(errorJson)}`;
      } catch {
        errorMessage += ` - ${errorText}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message.includes('Falha no upload')) {
      throw error;
    }
    throw new Error(`Erro ao fazer upload: ${error.message}`);
  }
}

/**
 * Verificar se o diretório dist-boot existe
 */
function checkDistBoot() {
  try {
    const stat = statSync(DIST_BOOT_DIR);
    if (!stat.isDirectory()) {
      throw new Error('dist-boot não é um diretório');
    }
    return true;
  } catch (error) {
    throw new Error(`Diretório dist-boot não encontrado. Execute 'npm run build:boot' primeiro.`);
  }
}

/**
 * Main
 */
async function main() {
  try {
    console.log('🚀 Iniciando upload para Pinata...\n');

    // Verificar se dist-boot existe
    checkDistBoot();
    console.log('✅ Diretório dist-boot encontrado\n');

    // Verificar variáveis de ambiente
    console.log('🔐 Verificando configuração...');
    if (PINATA_JWT_SECRET) {
      console.log('✅ PINATA_JWT_SECRET encontrado');
    } else if (PINATA_API_KEY && PINATA_API_SECRET) {
      console.log('✅ PINATA_API_KEY e PINATA_API_SECRET encontrados');
    } else {
      throw new Error('Configuração incompleta: Configure PINATA_JWT_SECRET ou (PINATA_API_KEY + PINATA_API_SECRET) no .env');
    }

    // Obter token de autenticação
    console.log('🔐 Preparando autenticação Pinata...');
    const auth = await getAuthToken();
    console.log('✅ Autenticação configurada\n');

    // Criar ZIP do diretório (mais confiável que enviar múltiplos arquivos)
    console.log('📦 Criando arquivo ZIP...');
    const zipPath = await createZip(DIST_BOOT_DIR);
    
    let result;
    try {
      // Fazer upload do ZIP
      result = await uploadZip(zipPath, auth);
      
      // Limpar arquivo ZIP após upload
      unlinkSync(zipPath);
      console.log('🧹 Arquivo ZIP temporário removido\n');

      console.log('\n✅ Upload concluído com sucesso!\n');
      console.log('📋 Informações do upload:');
      console.log(`   CID: ${result.IpfsHash}`);
      console.log(`   Tamanho: ${result.PinSize} bytes`);
      console.log(`   Timestamp: ${result.Timestamp}\n`);

      console.log('🌐 URLs de acesso:');
      // Gateway dedicado da Pinata (se configurado) ou público
      const gatewayUrl = PINATA_GATEWAY && PINATA_GATEWAY !== 'gateway.pinata.cloud'
        ? `https://${PINATA_GATEWAY}/ipfs/${result.IpfsHash}`
        : `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
      
      if (PINATA_GATEWAY && PINATA_GATEWAY !== 'gateway.pinata.cloud') {
        console.log(`   Pinata Gateway (Dedicado): ${gatewayUrl}`);
      } else {
        console.log(`   Pinata Gateway (Público): ${gatewayUrl}`);
      }
      console.log(`   IPFS.io: https://ipfs.io/ipfs/${result.IpfsHash}`);
      console.log(`   Cloudflare: https://cloudflare-ipfs.com/ipfs/${result.IpfsHash}\n`);

      console.log('📝 Para configurar no ENS:');
      console.log(`   contenthash: ipfs://${result.IpfsHash}\n`);

      // Salvar CID em arquivo para referência
      const cidFile = join(__dirname, '..', '.pinata-cid');
      writeFileSync(cidFile, result.IpfsHash);
      console.log(`💾 CID salvo em: .pinata-cid\n`);
    } catch (error) {
      // Limpar ZIP em caso de erro
      try {
        if (zipPath) unlinkSync(zipPath);
      } catch (e) {
        // Ignorar erro ao remover
      }
      throw error;
    }

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    process.exit(1);
  }
}

main();

