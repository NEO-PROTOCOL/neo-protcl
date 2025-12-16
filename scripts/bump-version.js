#!/usr/bin/env node

/**
 * Script para atualizar versão do PWA automaticamente
 * Atualiza: package.json, manifest.json, service-worker.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

/**
 * Incrementa versão semver
 * @param {string} version - Versão atual (ex: "1.0.0")
 * @param {string} type - Tipo: "patch", "minor", "major"
 * @returns {string} Nova versão
 */
function bumpVersion(version, type = 'patch') {
  const [major, minor, patch] = version.split('.').map(Number);
  
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
    default:
      return `${major}.${minor}.${patch + 1}`;
  }
}

/**
 * Atualiza versão em arquivo JSON
 */
function updateJsonVersion(filePath, newVersion) {
  const content = JSON.parse(readFileSync(filePath, 'utf-8'));
  content.version = newVersion;
  writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
  console.log(`✅ ${filePath} atualizado para versão ${newVersion}`);
}

/**
 * Atualiza versão no service-worker.js
 */
function updateServiceWorkerVersion(filePath, newVersion) {
  let content = readFileSync(filePath, 'utf-8');
  
  // Atualiza CACHE_NAME e RUNTIME_CACHE
  content = content.replace(
    /const CACHE_NAME = ['"]neo-protocol-v[\d.]+['"];/,
    `const CACHE_NAME = 'neo-protocol-v${newVersion}';`
  );
  content = content.replace(
    /const RUNTIME_CACHE = ['"]neo-protocol-runtime-v[\d.]+['"];/,
    `const RUNTIME_CACHE = 'neo-protocol-runtime-v${newVersion}';`
  );
  
  writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ ${filePath} atualizado para versão ${newVersion}`);
}

/**
 * Atualiza versão no vite.config.js (cache names)
 */
function updateViteConfigVersion(filePath, newVersion) {
  let content = readFileSync(filePath, 'utf-8');
  
  // Atualiza cache names no workbox (detecta qualquer versão)
  content = content.replace(
    /cacheName: ['"]google-fonts-cache-v[\d.]+['"]/g,
    `cacheName: 'google-fonts-cache-v${newVersion}'`
  );
  content = content.replace(
    /cacheName: ['"]images-cache-v[\d.]+['"]/g,
    `cacheName: 'images-cache-v${newVersion}'`
  );
  content = content.replace(
    /cacheName: ['"]ipfs-cache-v[\d.]+['"]/g,
    `cacheName: 'ipfs-cache-v${newVersion}'`
  );
  
  writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ ${filePath} atualizado para versão ${newVersion}`);
}

/**
 * Main
 */
function main() {
  const versionType = process.argv[2] || 'patch'; // patch, minor, major
  
  if (!['patch', 'minor', 'major'].includes(versionType)) {
    console.error('❌ Tipo de versão inválido. Use: patch, minor ou major');
    process.exit(1);
  }

  console.log(`📦 Atualizando versão (${versionType})...\n`);

  // Ler versão atual do package.json
  const packagePath = join(rootDir, 'package.json');
  const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));
  const currentVersion = packageJson.version;
  const newVersion = bumpVersion(currentVersion, versionType);

  console.log(`📌 Versão atual: ${currentVersion}`);
  console.log(`📌 Nova versão: ${newVersion}\n`);

  // Atualizar package.json
  updateJsonVersion(packagePath, newVersion);

  // Atualizar manifest.json
  const manifestPath = join(rootDir, 'public', 'manifest.json');
  updateJsonVersion(manifestPath, newVersion);

  // Atualizar service-worker.js
  const swPath = join(rootDir, 'public', 'service-worker.js');
  updateServiceWorkerVersion(swPath, newVersion);

  // Atualizar vite.config.js (cache names)
  const viteConfigPath = join(rootDir, 'vite.config.js');
  updateViteConfigVersion(viteConfigPath, newVersion);

  console.log(`\n✅ Versão atualizada para ${newVersion} em todos os arquivos!`);
  console.log(`💡 Execute 'git add . && git commit -m "chore: bump version to ${newVersion}" && git push' para commitar`);
  
  // Retornar versão para uso em scripts
  console.log(`VERSION:${newVersion}`);
  
  return newVersion;
}

main();
