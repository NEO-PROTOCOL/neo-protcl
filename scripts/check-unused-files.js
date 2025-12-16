#!/usr/bin/env node

/**
 * Script para verificar arquivos potencialmente não utilizados
 * Identifica componentes, hooks e services que não são importados
 */

import { readdirSync, statSync, readFileSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

/**
 * Buscar todas as referências a um arquivo no código
 */
function findReferences(fileName, baseDir = join(rootDir, 'src')) {
  const references = [];
  const searchName = fileName.replace(/\.(js|jsx|ts|tsx)$/, '');

  function searchInDir(dir) {
    const files = readdirSync(dir);

    for (const file of files) {
      const filePath = join(dir, file);
      const stat = statSync(filePath);

      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        searchInDir(filePath);
      } else if (stat.isFile() && /\.(js|jsx|ts|tsx|json)$/.test(file)) {
        try {
          const content = readFileSync(filePath, 'utf-8');
          
          // Buscar imports e requires
          const importPattern = new RegExp(
            `(import|require|from).*['"]\\.?/?.*${searchName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`,
            'gi'
          );
          
          if (importPattern.test(content)) {
            references.push(filePath);
          }
        } catch (e) {
          // Ignorar erros de leitura
        }
      }
    }
  }

  searchInDir(baseDir);
  return references;
}

/**
 * Listar arquivos em um diretório
 */
function listFiles(dir, extensions = ['.js', '.jsx', '.ts', '.tsx']) {
  const files = [];
  
  function traverse(currentDir) {
    const items = readdirSync(currentDir);
    
    for (const item of items) {
      const itemPath = join(currentDir, item);
      const stat = statSync(itemPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        traverse(itemPath);
      } else if (stat.isFile()) {
        const ext = extname(item);
        if (extensions.includes(ext)) {
          files.push(itemPath);
        }
      }
    }
  }
  
  traverse(dir);
  return files;
}

/**
 * Main
 */
function main() {
  console.log('🔍 Verificando arquivos não utilizados...\n');

  const srcDir = join(rootDir, 'src');
  const componentsDir = join(srcDir, 'components');
  const hooksDir = join(srcDir, 'hooks');
  const servicesDir = join(srcDir, 'services');

  const allFiles = [
    ...listFiles(componentsDir),
    ...listFiles(hooksDir),
    ...listFiles(servicesDir),
  ];

  const unused = [];
  const used = [];

  console.log(`📋 Analisando ${allFiles.length} arquivos...\n`);

  for (const filePath of allFiles) {
    const fileName = filePath.split('/').pop();
    const relativePath = filePath.replace(rootDir + '/', '');
    
    // Ignorar arquivos de entrada
    if (fileName === 'main.jsx' || fileName === 'App.jsx' || fileName.includes('main')) {
      used.push({ file: relativePath, reason: 'Entry point' });
      continue;
    }

    const references = findReferences(fileName, srcDir);
    
    if (references.length === 0) {
      unused.push({ file: relativePath, references: [] });
    } else {
      used.push({ file: relativePath, references: references.length });
    }
  }

  console.log('\n✅ Arquivos em uso:');
  used.forEach(({ file, references, reason }) => {
    if (reason) {
      console.log(`   ✅ ${file} - ${reason}`);
    } else {
      console.log(`   ✅ ${file} - ${references} referência(s)`);
    }
  });

  if (unused.length > 0) {
    console.log('\n⚠️  Arquivos sem referências encontradas:');
    unused.forEach(({ file }) => {
      console.log(`   ⚠️  ${file}`);
    });
    console.log('\n💡 Verifique manualmente se estes arquivos são realmente não utilizados');
  } else {
    console.log('\n✅ Nenhum arquivo obsoleto encontrado!');
  }
}

main();
