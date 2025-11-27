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
 */

import { readdirSync, statSync, createReadStream, writeFileSync, createWriteStream, unlinkSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import FormData from 'form-data';
import archiver from 'archiver';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar variáveis de ambiente
dotenv.config({ path: join(__dirname, '..', '.env') });

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;
const PINATA_JWT_SECRET = process.env.PINATA_JWT_SECRET;

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
 */
function createZip(directory) {
  return new Promise((resolve, reject) => {
    const zipPath = join(__dirname, '..', 'dist-boot.zip');
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
          const relativePath = relative(baseDir, filePath);
          archive.file(filePath, { name: relativePath.replace(/\\/g, '/') });
        }
      }
    }

    addFiles(directory);
    archive.finalize();
  });
}

/**
 * Fazer upload de um arquivo ZIP para o Pinata
 */
async function uploadZip(zipPath, auth) {
  const formData = new FormData();
  
  // Adicionar arquivo - Pinata espera o campo 'file'
  // Usar apenas o stream, sem opções extras primeiro
  const fileStream = createReadStream(zipPath);
  formData.append('file', fileStream);

  console.log('📤 Fazendo upload para Pinata...');

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

    // Obter token de autenticação
    console.log('🔐 Preparando autenticação Pinata...');
    const auth = await getAuthToken();
    console.log('✅ Autenticação configurada\n');

    // Criar ZIP do diretório
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
    console.log(`   IPFS Gateway: https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
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
        unlinkSync(zipPath);
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

