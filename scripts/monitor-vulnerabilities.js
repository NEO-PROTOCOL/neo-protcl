#!/usr/bin/env node

/**
 * Script de Monitoramento de Vulnerabilidades
 * Verifica atualizações disponíveis e alerta sobre correções de segurança
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

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
 * Ler package.json
 */
function getPackageJson() {
  try {
    const content = readFileSync(join(rootDir, 'package.json'), 'utf-8');
    return JSON.parse(content);
  } catch (e) {
    return null;
  }
}

/**
 * Verificar versões instaladas vs disponíveis
 */
async function checkUpdates() {
  log.section('🔍 Monitoramento de Vulnerabilidades - NΞØ Protocol');
  
  const pkg = getPackageJson();
  if (!pkg) {
    log.error('Não foi possível ler package.json');
    return;
  }

  const criticalDeps = {
    '@thirdweb-dev/react': pkg.dependencies['@thirdweb-dev/react'],
    '@thirdweb-dev/sdk': pkg.dependencies['@thirdweb-dev/sdk'],
    'thirdweb': pkg.dependencies['thirdweb'],
    'vite': pkg.devDependencies['vite'],
  };

  log.info('Dependências críticas monitoradas:');
  Object.entries(criticalDeps).forEach(([name, version]) => {
    console.log(`   ${name}: ${version}`);
  });

  log.section('📊 Status de Vulnerabilidades');
  
  // Executar npm audit
  const { exec } = await import('child_process');
  const { promisify } = await import('util');
  const execAsync = promisify(exec);

  try {
    const { stdout } = await execAsync('npm audit --json', { cwd: rootDir });
    const audit = JSON.parse(stdout);
    const metadata = audit.metadata || {};
    const vulns = metadata.vulnerabilities || {};

    log.info(`Total de vulnerabilidades: ${metadata.vulnerabilities?.total || 0}`);
    log.warning(`Críticas: ${vulns.critical || 0}`);
    log.warning(`Altas: ${vulns.high || 0}`);
    log.info(`Moderadas: ${vulns.moderate || 0}`);
    log.info(`Baixas: ${vulns.low || 0}`);

    log.section('💡 Recomendações');

    if (vulns.critical > 0 || vulns.high > 10) {
      log.warning('Vulnerabilidades críticas/altas detectadas');
      log.info('Ações recomendadas:');
      console.log('   1. Monitorar atualizações do Thirdweb');
      console.log('   2. Verificar se correções estão disponíveis');
      console.log('   3. Testar em ambiente de staging antes de atualizar');
      console.log('   4. Consultar: https://portal.thirdweb.com/changelog');
    } else {
      log.success('Nenhuma vulnerabilidade crítica detectada');
    }

    log.section('🔗 Links Úteis');
    console.log('   • Thirdweb Changelog: https://portal.thirdweb.com/changelog');
    console.log('   • Thirdweb GitHub: https://github.com/thirdweb-dev');
    console.log('   • npm Security: https://www.npmjs.com/advisories');
    console.log('   • Relatório completo: scripts/analyze-vulnerabilities-report.md');

  } catch (e) {
    log.error('Erro ao executar npm audit');
    log.info('Execute manualmente: npm audit');
  }
}

/**
 * Verificar se há atualizações disponíveis
 */
async function checkAvailableUpdates() {
  log.section('🔄 Verificando Atualizações Disponíveis');

  const { exec } = await import('child_process');
  const { promisify } = await import('util');
  const execAsync = promisify(exec);

  try {
    const { stdout } = await execAsync('npm outdated --json', { cwd: rootDir });
    const outdated = JSON.parse(stdout);
    
    const criticalPackages = ['@thirdweb-dev/react', '@thirdweb-dev/sdk', 'thirdweb', 'vite'];
    const criticalOutdated = {};

    criticalPackages.forEach(pkg => {
      if (outdated[pkg]) {
        criticalOutdated[pkg] = outdated[pkg];
      }
    });

    if (Object.keys(criticalOutdated).length > 0) {
      log.warning('Atualizações disponíveis para dependências críticas:');
      Object.entries(criticalOutdated).forEach(([name, info]) => {
        console.log(`   ${name}:`);
        console.log(`      Atual: ${info.current}`);
        console.log(`      Disponível: ${info.wanted || info.latest}`);
        if (info.latest !== info.current) {
          log.info(`      ⚠️  Nova versão disponível: ${info.latest}`);
        }
      });
    } else {
      log.success('Todas as dependências críticas estão atualizadas');
    }

  } catch (e) {
    // npm outdated retorna código de saída 1 quando há pacotes desatualizados
    if (e.code === 1) {
      log.warning('Há pacotes desatualizados. Execute: npm outdated');
    } else {
      log.info('Execute manualmente: npm outdated');
    }
  }
}

/**
 * Main
 */
async function main() {
  await checkUpdates();
  await checkAvailableUpdates();
  
  console.log('\n');
  log.info('💡 Execute este script periodicamente para monitorar vulnerabilidades');
  log.info('💡 Consulte scripts/vulnerabilities-action-plan.md para plano de ação\n');
}

main().catch(console.error);
