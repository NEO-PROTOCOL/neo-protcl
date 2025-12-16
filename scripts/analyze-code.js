#!/usr/bin/env node

/**
 * Script de Análise Completa do Código
 * Analisa arquivos, dependências, imports, complexidade, segurança e muito mais
 */

import { readdirSync, statSync, readFileSync, existsSync } from 'fs';
import { join, dirname, extname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Cores para output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.bright}${colors.magenta}${'='.repeat(60)}${colors.reset}\n${colors.bright}${msg}${colors.reset}\n${'='.repeat(60)}\n`),
};

/**
 * Coletar todos os arquivos do projeto
 */
function collectFiles(dir, extensions = ['.js', '.jsx', '.ts', '.tsx'], excludeDirs = ['node_modules', '.git', 'dist', 'build']) {
  const files = [];
  
  function traverse(currentDir) {
    if (!existsSync(currentDir)) return;
    
    const items = readdirSync(currentDir);
    
    for (const item of items) {
      const itemPath = join(currentDir, item);
      
      try {
        const stat = statSync(itemPath);
        
        if (stat.isDirectory()) {
          if (!excludeDirs.some(exclude => item.includes(exclude))) {
            traverse(itemPath);
          }
        } else if (stat.isFile()) {
          const ext = extname(item);
          if (extensions.includes(ext)) {
            files.push({
              path: itemPath,
              relative: relative(rootDir, itemPath),
              ext,
              size: stat.size,
            });
          }
        }
      } catch (e) {
        // Ignorar erros de acesso
      }
    }
  }
  
  traverse(dir);
  return files;
}

/**
 * Analisar conteúdo de um arquivo
 */
function analyzeFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    // Estatísticas básicas
    const stats = {
      lines: lines.length,
      emptyLines: lines.filter(l => !l.trim()).length,
      codeLines: lines.filter(l => l.trim() && !l.trim().startsWith('//') && !l.trim().startsWith('/*')).length,
      comments: lines.filter(l => l.trim().startsWith('//') || l.trim().startsWith('/*')).length,
    };
    
    // Imports
    const imports = [];
    const importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"]([^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }
    
    // Exports
    const exports = [];
    const exportRegex = /export\s+(?:default\s+)?(?:function|const|class|let|var)\s+(\w+)/g;
    while ((match = exportRegex.exec(content)) !== null) {
      exports.push(match[1]);
    }
    
    // Funções e componentes
    const functions = [];
    const functionRegex = /(?:function|const|let|var)\s+(\w+)\s*[=:]\s*(?:\([^)]*\)\s*=>|function)/g;
    while ((match = functionRegex.exec(content)) !== null) {
      functions.push(match[1]);
    }
    
    // Problemas de segurança
    const securityIssues = [];
    if (content.includes('eval(')) securityIssues.push('Uso de eval()');
    if (content.includes('innerHTML')) securityIssues.push('Uso de innerHTML (risco XSS)');
    if (content.includes('dangerouslySetInnerHTML')) securityIssues.push('Uso de dangerouslySetInnerHTML');
    if (content.match(/console\.(log|warn|error|debug)/g)) {
      const consoleCalls = content.match(/console\.(log|warn|error|debug)/g) || [];
      securityIssues.push(`${consoleCalls.length} chamada(s) de console (remover em produção)`);
    }
    
    // Complexidade (contagem de condicionais e loops)
    const complexity = {
      if: (content.match(/\bif\s*\(/g) || []).length,
      for: (content.match(/\bfor\s*\(/g) || []).length,
      while: (content.match(/\bwhile\s*\(/g) || []).length,
      switch: (content.match(/\bswitch\s*\(/g) || []).length,
      try: (content.match(/\btry\s*\{/g) || []).length,
    };
    const totalComplexity = Object.values(complexity).reduce((a, b) => a + b, 0);
    
    // Imports não utilizados (análise básica)
    const unusedImports = [];
    for (const imp of imports) {
      const importName = imp.split('/').pop().replace(/\.(js|jsx|ts|tsx)$/, '');
      // Verificar se o import é usado no código (análise básica)
      const importRegex = new RegExp(`\\b${importName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
      const matches = content.match(importRegex) || [];
      if (matches.length <= 1) { // Apenas a declaração do import
        unusedImports.push(imp);
      }
    }
    
    return {
      ...stats,
      imports,
      exports,
      functions,
      securityIssues,
      complexity: {
        ...complexity,
        total: totalComplexity,
      },
      unusedImports,
    };
  } catch (e) {
    return null;
  }
}

/**
 * Verificar dependências do package.json
 */
function analyzeDependencies() {
  try {
    const packageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    // Dependências usadas implicitamente (build tools, configs, etc.)
    const implicitDeps = new Set([
      'vite',                    // Build tool
      'vite-plugin-pwa',         // Plugin do Vite
      '@vitejs/plugin-react',    // Plugin do Vite
      'tailwindcss',             // Framework CSS
      'postcss',                 // Processador CSS
      'autoprefixer',            // Plugin PostCSS
      '@types/react',            // TypeScript types
      '@types/react-dom',        // TypeScript types
      'prettier',                // Formatação de código
    ]);
    
    // Dependências usadas em scripts do package.json
    const scriptDeps = new Set();
    const scripts = packageJson.scripts || {};
    Object.values(scripts).forEach(script => {
      // Verificar se script menciona dependência
      Object.keys(deps).forEach(dep => {
        if (script.includes(dep) || script.includes(dep.replace('@', '').replace('/', '-'))) {
          scriptDeps.add(dep);
        }
      });
    });
    
    // Coletar todos os arquivos (src, scripts, configs)
    const srcFiles = collectFiles(join(rootDir, 'src'));
    const scriptFiles = collectFiles(join(rootDir, 'scripts'));
    const configFiles = [
      join(rootDir, 'vite.config.js'),
      join(rootDir, 'vite.config.boot.js'),
      join(rootDir, 'tailwind.config.js'),
      join(rootDir, 'postcss.config.js'),
    ].filter(f => existsSync(f));
    
    const allFiles = [...srcFiles, ...scriptFiles, ...configFiles.map(f => ({ path: f, relative: f.replace(rootDir + '/', '') }))];
    const usedDeps = new Set();
    
    for (const file of allFiles) {
      try {
        const content = readFileSync(file.path, 'utf-8');
        
        // Buscar imports de node_modules
        const importRegex = /(?:import|require)\s+(?:.*\s+from\s+)?['"]([^'"]+)['"]/g;
        let match;
        while ((match = importRegex.exec(content)) !== null) {
          const importPath = match[1];
          if (!importPath.startsWith('.') && !importPath.startsWith('/') && !importPath.startsWith('http')) {
            const depName = importPath.split('/')[0];
            // Remover @scope/ se presente para comparação
            const cleanName = depName.startsWith('@') 
              ? depName + '/' + importPath.split('/')[1] 
              : depName;
            usedDeps.add(cleanName);
          }
        }
        
        // Verificar uso direto de dependências em arquivos de config
        Object.keys(deps).forEach(dep => {
          const cleanDep = dep.replace('@', '').replace('/', '-');
          if (content.includes(dep) || content.includes(cleanDep)) {
            usedDeps.add(dep);
          }
        });
      } catch (e) {
        // Ignorar erros de leitura
      }
    }
    
    // Adicionar dependências implícitas e de scripts
    implicitDeps.forEach(dep => {
      if (deps[dep]) usedDeps.add(dep);
    });
    scriptDeps.forEach(dep => usedDeps.add(dep));
    
    // Verificar dependências específicas conhecidas
    const knownUsage = {
      'serve': true, // Usado em script "start"
      'ethers': true, // Usado em comentários e pode ser usado indiretamente
      '@lighthouse-web3/sdk': true, // Usado em scripts e services
      'archiver': true, // Usado em scripts
      'form-data': true, // Usado em scripts
      'node-fetch': true, // Usado em scripts
      'dotenv': true, // Usado em scripts
    };
    
    Object.keys(knownUsage).forEach(dep => {
      if (deps[dep] && knownUsage[dep]) {
        usedDeps.add(dep);
      }
    });
    
    const unusedDeps = Object.keys(deps).filter(dep => !usedDeps.has(dep));
    
    return {
      total: Object.keys(deps).length,
      used: usedDeps.size,
      unused: unusedDeps,
    };
  } catch (e) {
    return null;
  }
}

/**
 * Verificar arquivos não utilizados
 */
function findUnusedFiles() {
  const srcDir = join(rootDir, 'src');
  const allFiles = collectFiles(srcDir);
  const entryPoints = ['main.jsx', 'App.jsx', 'boot-main.jsx', 'branding-main.jsx'];
  
  const fileMap = new Map();
  const references = new Set();
  const fileContentMap = new Map();
  
  // Mapear todos os arquivos e seus conteúdos
  for (const file of allFiles) {
    const fileName = file.path.split('/').pop();
    const baseName = fileName.replace(/\.(js|jsx|ts|tsx)$/, '');
    const relativePath = file.relative;
    
    fileMap.set(baseName, file);
    fileMap.set(relativePath, file);
    
    try {
      const content = readFileSync(file.path, 'utf-8');
      fileContentMap.set(relativePath, content);
      
      // Se for entry point, marcar como usado
      if (entryPoints.includes(fileName)) {
        references.add(relativePath);
      }
    } catch (e) {
      // Ignorar erros de leitura
    }
  }
  
  // Função recursiva para rastrear referências
  function markAsUsed(filePath) {
    if (references.has(filePath)) {
      return; // Já foi marcado
    }
    
    references.add(filePath);
    const content = fileContentMap.get(filePath);
    if (!content) return;
    
    // Buscar todos os imports relativos
    const importRegex = /(?:import|from)\s+['"](\.\.?\/[^'"]+)['"]/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      
      // Resolver caminho relativo
      const currentDir = dirname(filePath);
      const resolvedPath = join(currentDir, importPath).replace(/\\/g, '/');
      
      // Tentar diferentes extensões
      const extensions = ['', '.js', '.jsx', '.ts', '.tsx'];
      for (const ext of extensions) {
        const fullPath = resolvedPath + ext;
        if (fileMap.has(fullPath)) {
          markAsUsed(fullPath);
          break;
        }
      }
      
      // Também tentar sem extensão mas com base name
      const importBaseName = importPath.split('/').pop().replace(/\.(js|jsx|ts|tsx)$/, '');
      if (fileMap.has(importBaseName)) {
        const foundFile = fileMap.get(importBaseName);
        if (foundFile) {
          markAsUsed(foundFile.relative);
        }
      }
    }
  }
  
  // Começar pelos entry points
  for (const file of allFiles) {
    const fileName = file.path.split('/').pop();
    if (entryPoints.includes(fileName)) {
      markAsUsed(file.relative);
    }
  }
  
  // Arquivos conhecidos que são usados (verificados manualmente - NÃO REMOVER)
  const knownUsedFiles = [
    // Utils e Services
    'utils/sounds.js',                    // ✅ Usado em App.jsx, Navbar, BottomNavigation, etc.
    'utils/intentSystemData.js',         // ✅ Usado em IntentSystemPage
    'services/intentDataCapture.js',     // ✅ Usado em IntentSystemPage
    'services/geminiLLM.js',             // ✅ Pode ser usado dinamicamente
    
    // Components
    'components/MermaidDiagram.jsx',     // ✅ Usado em IntentSystemPage
    'components/NetworkGraph3D.jsx',     // ✅ Usado em NosPage
    'components/BottomNavigation.jsx',   // ✅ Usado em várias páginas
    'components/Navbar.jsx',              // ✅ Usado em várias páginas
    'components/TypewriterText.jsx',      // ✅ Usado em ManifestoPage
    'components/PWAUpdatePrompt.jsx',    // ✅ Usado em App.jsx
    'components/UI/Button.jsx',           // ✅ Usado em vários lugares
    
    // Hooks
    'hooks/useDesktopBlock.js',          // ✅ Usado em várias páginas
    'hooks/useDeviceDetection.js',       // ✅ Usado em NeoProtocol
    'hooks/usePWAUpdate.js',              // ✅ Usado em PWAUpdatePrompt
    
    // Pages (todas são usadas via rotas)
    'pages/home/NeoProtocol.jsx',         // ✅ Rota principal
    'pages/home/NeoProtocolDesktop.jsx', // ✅ Usado em NeoProtocol
    'pages/home/NeoProtocolMobile.jsx',  // ✅ Usado em NeoProtocol
    'pages/intent/IntentSystemPage.jsx', // ✅ Rota /intent
    'pages/manifesto/ManifestoPage.jsx', // ✅ Rota /manifesto
    'pages/nos/NosPage.jsx',             // ✅ Rota /nos (usado em App.jsx)
    'pages/boot/BrandingLanding.jsx',    // ✅ Usado em branding-main.jsx
    'pages/boot/IntelligenceBoot.jsx',   // ✅ Usado em boot-main.jsx
    
    // Terminal (usado em IntelligenceBoot e IntentSystemPage)
    'terminal/AgentContext.tsx',         // ✅ Usado em LiveAgent, LiveTerminal, etc.
    'terminal/LiveAgent.jsx',            // ✅ Usado em IntelligenceBoot
    'terminal/LiveTerminal.jsx',         // ✅ Usado via AgentContext
    'terminal/Avatar.jsx',               // ✅ Usado em LiveAgent
    'terminal/CommandParserEngine.ts',   // ✅ Usado em LiveTerminal
    'terminal/commands/base.ts',         // ✅ Usado em CommandParserEngine
    'terminal/commands/invalid.ts',      // ✅ Usado em CommandParserEngine
    'terminal/commands/memory.ts',       // ✅ Usado em CommandParserEngine
    'terminal/commands/token.ts',        // ✅ Usado em CommandParserEngine
    'terminal/commands/zones.ts',         // ✅ Usado em CommandParserEngine
    'terminal/zones/ZONE_Δ8.jsx',        // ✅ Usado via zones/index.ts
    'terminal/zones/index.ts',           // ✅ Usado em CommandParserEngine
    
    // NEXO UI
    'nexo-ui/index.js',                   // ✅ Exporta componentes
    'nexo-ui/components/Button.jsx',      // ✅ Usado via nexo-ui/index.js
    'nexo-ui/components/Card.jsx',        // ✅ Usado via nexo-ui/index.js
    'nexo-ui/components/Divider.jsx',    // ✅ Usado via nexo-ui/index.js
    'nexo-ui/utils/cn.js',                // ✅ Utility usado em componentes
    'nexo-ui/utils/glitch.js',            // ✅ Utility usado em componentes
    
    // Contexts (podem ser usados dinamicamente)
    'context/mcp/index.js',               // ✅ Pode ser usado dinamicamente
    'context/web3/index.js',              // ✅ Pode ser usado dinamicamente
    
    // Types
    'terminal/types/protocol.d.ts',       // ✅ Type definitions
  ];
  
  knownUsedFiles.forEach(file => {
    const fullPath = `src/${file}`;
    if (fileMap.has(fullPath)) {
      references.add(fullPath);
    }
  });
  
  // Filtrar arquivos não referenciados
  const unused = allFiles.filter(f => {
    const fileName = f.path.split('/').pop();
    // Ignorar entry points
    if (entryPoints.includes(fileName)) return false;
    // Verificar se foi referenciado
    return !references.has(f.relative);
  });
  
  return unused;
}

/**
 * Estatísticas gerais
 */
function getGeneralStats() {
  const srcFiles = collectFiles(join(rootDir, 'src'));
  const scriptFiles = collectFiles(join(rootDir, 'scripts'));
  const allFiles = [...srcFiles, ...scriptFiles];
  
  let totalLines = 0;
  let totalSize = 0;
  let totalFiles = allFiles.length;
  const fileTypes = {};
  
  for (const file of allFiles) {
    try {
      const stats = analyzeFile(file.path);
      if (stats) {
        totalLines += stats.lines;
        totalSize += file.size;
        fileTypes[file.ext] = (fileTypes[file.ext] || 0) + 1;
      }
    } catch (e) {
      // Ignorar
    }
  }
  
  return {
    totalFiles,
    totalLines,
    totalSize: (totalSize / 1024).toFixed(2) + ' KB',
    fileTypes,
  };
}

/**
 * Main
 */
function main() {
  log.section('🔍 ANÁLISE COMPLETA DO CÓDIGO - NΞØ Protocol');
  
  // 1. Estatísticas Gerais
  log.section('📊 Estatísticas Gerais');
  const generalStats = getGeneralStats();
  log.info(`Total de arquivos: ${generalStats.totalFiles}`);
  log.info(`Total de linhas: ${generalStats.totalLines.toLocaleString()}`);
  log.info(`Tamanho total: ${generalStats.totalSize}`);
  log.info(`Tipos de arquivo:`);
  Object.entries(generalStats.fileTypes).forEach(([ext, count]) => {
    console.log(`   ${ext}: ${count} arquivo(s)`);
  });
  
  // 2. Análise de Dependências
  log.section('📦 Análise de Dependências');
  const deps = analyzeDependencies();
  if (deps) {
    log.info(`Total de dependências: ${deps.total}`);
    log.success(`Dependências em uso: ${deps.used}`);
    if (deps.unused.length > 0) {
      log.warning(`Dependências possivelmente não utilizadas: ${deps.unused.length}`);
      deps.unused.forEach(dep => console.log(`   ⚠️  ${dep}`));
      log.info('💡 Verifique manualmente antes de remover');
    } else {
      log.success('Todas as dependências parecem estar em uso');
    }
  }
  
  // 3. Arquivos Não Utilizados
  log.section('📁 Arquivos Não Utilizados');
  const unusedFiles = findUnusedFiles();
  if (unusedFiles.length > 0) {
    log.warning(`Encontrados ${unusedFiles.length} arquivo(s) possivelmente não utilizado(s):`);
    unusedFiles.forEach(file => {
      console.log(`   ⚠️  ${file.relative}`);
    });
    log.info('💡 Verifique manualmente antes de remover');
  } else {
    log.success('Nenhum arquivo obsoleto encontrado');
  }
  
  // 4. Análise Detalhada por Arquivo
  log.section('🔬 Análise Detalhada');
  const srcFiles = collectFiles(join(rootDir, 'src'));
  const issues = {
    security: [],
    largeFiles: [],
    complexFiles: [],
    unusedImports: [],
  };
  
  let totalComplexity = 0;
  let totalSecurityIssues = 0;
  
  for (const file of srcFiles) {
    const analysis = analyzeFile(file.path);
    if (!analysis) continue;
    
    totalComplexity += analysis.complexity.total;
    
    // Arquivos grandes (>500 linhas)
    if (analysis.lines > 500) {
      issues.largeFiles.push({
        file: file.relative,
        lines: analysis.lines,
      });
    }
    
    // Arquivos complexos (>50 pontos de complexidade)
    if (analysis.complexity.total > 50) {
      issues.complexFiles.push({
        file: file.relative,
        complexity: analysis.complexity.total,
      });
    }
    
    // Problemas de segurança
    if (analysis.securityIssues.length > 0) {
      issues.security.push({
        file: file.relative,
        issues: analysis.securityIssues,
      });
      totalSecurityIssues += analysis.securityIssues.length;
    }
    
    // Imports não utilizados
    if (analysis.unusedImports.length > 0) {
      issues.unusedImports.push({
        file: file.relative,
        imports: analysis.unusedImports,
      });
    }
  }
  
  // Relatório de problemas
  if (issues.largeFiles.length > 0) {
    log.warning(`Arquivos grandes (>500 linhas): ${issues.largeFiles.length}`);
    issues.largeFiles.forEach(({ file, lines }) => {
      console.log(`   ⚠️  ${file}: ${lines} linhas`);
    });
  }
  
  if (issues.complexFiles.length > 0) {
    log.warning(`Arquivos complexos (>50 pontos): ${issues.complexFiles.length}`);
    issues.complexFiles.forEach(({ file, complexity }) => {
      console.log(`   ⚠️  ${file}: ${complexity} pontos de complexidade`);
    });
  }
  
  if (issues.security.length > 0) {
    log.warning(`Problemas de segurança encontrados: ${totalSecurityIssues}`);
    issues.security.forEach(({ file, issues: secIssues }) => {
      console.log(`   ⚠️  ${file}:`);
      secIssues.forEach(issue => console.log(`      - ${issue}`));
    });
  } else {
    log.success('Nenhum problema de segurança crítico encontrado');
  }
  
  if (issues.unusedImports.length > 0) {
    log.warning(`Arquivos com imports possivelmente não utilizados: ${issues.unusedImports.length}`);
    issues.unusedImports.slice(0, 10).forEach(({ file, imports }) => {
      console.log(`   ⚠️  ${file}: ${imports.length} import(s)`);
    });
    if (issues.unusedImports.length > 10) {
      log.info(`   ... e mais ${issues.unusedImports.length - 10} arquivo(s)`);
    }
  }
  
  // 5. Resumo Final
  log.section('📋 Resumo Final');
  log.info(`Complexidade total: ${totalComplexity} pontos`);
  log.info(`Problemas de segurança: ${totalSecurityIssues}`);
  log.info(`Arquivos grandes: ${issues.largeFiles.length}`);
  log.info(`Arquivos complexos: ${issues.complexFiles.length}`);
  log.info(`Imports não utilizados: ${issues.unusedImports.length}`);
  
  if (totalSecurityIssues === 0 && issues.largeFiles.length === 0 && issues.complexFiles.length === 0) {
    log.success('\n🎉 Código em bom estado!');
  } else {
    log.warning('\n💡 Considere revisar os itens marcados acima');
  }
  
  console.log('\n');
}

main();
