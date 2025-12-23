#!/bin/bash

# Script para configurar organização NEO-PROTOCOL
# Este script fornece links e comandos para configuração manual

set -e

ORG="NEO-PROTOCOL"
REPO="neo-protcl"

echo "🚀 Configuração da Organização ${ORG}"
echo "======================================"
echo ""

echo "📋 CHECKLIST DE CONFIGURAÇÃO"
echo ""

echo "1️⃣  CONFIGURAÇÕES DA ORGANIZAÇÃO"
echo "   URL: https://github.com/organizations/${ORG}/settings"
echo "   - [ ] Profile: Descrição, website, localização"
echo "   - [ ] Member privileges: Permissões padrão"
echo "   - [ ] Security: Exigir 2FA para membros"
echo ""

echo "2️⃣  CONFIGURAÇÕES DO REPOSITÓRIO"
echo "   URL: https://github.com/${ORG}/${REPO}/settings"
echo "   - [ ] General: Descrição, topics, website"
echo "   - [ ] Features: Issues, Projects, Discussions"
echo "   - [ ] Security: Dependency graph, Dependabot, Code scanning"
echo ""

echo "3️⃣  BRANCH PROTECTION (CRÍTICO)"
echo "   URL: https://github.com/${ORG}/${REPO}/settings/branches"
echo "   - [ ] Proteger branch 'main'"
echo "   - [ ] Require pull request before merging"
echo "   - [ ] Require approvals: 1+"
echo "   - [ ] Require status checks"
echo "   - [ ] Require conversation resolution"
echo "   - [ ] Do not allow force pushes"
echo "   - [ ] Do not allow deletions"
echo ""

echo "4️⃣  COLLABORATORS"
echo "   URL: https://github.com/${ORG}/${REPO}/settings/access"
echo "   - [ ] Adicionar colaboradores conforme necessário"
echo "   - [ ] Definir níveis de acesso (Read, Write, Admin)"
echo ""

echo "5️⃣  ACTIONS & CI/CD"
echo "   URL: https://github.com/${ORG}/${REPO}/settings/actions"
echo "   - [ ] Allow all actions"
echo "   - [ ] Configurar workflow permissions"
echo ""

echo "6️⃣  SECRETS"
echo "   URL: https://github.com/${ORG}/${REPO}/settings/secrets/actions"
echo "   - [ ] Adicionar secrets necessários:"
echo "     - VITE_THIRDWEB_CLIENT_ID"
echo "     - VITE_THIRDWEB_SECRET_KEY"
echo "     - VITE_X402_SERVER_WALLET_ADDRESS"
echo ""

echo "✅ ARQUIVOS CRIADOS NO REPOSITÓRIO:"
echo "   - .github/CODEOWNERS"
echo "   - .github/ISSUE_TEMPLATE/bug_report.md"
echo "   - .github/ISSUE_TEMPLATE/feature_request.md"
echo "   - .github/pull_request_template.md"
echo "   - CONTRIBUTING.md"
echo "   - SECURITY.md"
echo "   - docs/ops/ORGANIZATION_SETUP.md"
echo ""

echo "📝 PRÓXIMOS PASSOS:"
echo "   1. Revisar e ajustar CODEOWNERS se necessário"
echo "   2. Fazer commit e push dos arquivos criados"
echo "   3. Seguir checklist acima no GitHub"
echo "   4. Configurar branch protection"
echo "   5. Adicionar colaboradores"
echo ""

echo "🔗 LINKS ÚTEIS:"
echo "   Organização: https://github.com/${ORG}"
echo "   Repositório: https://github.com/${ORG}/${REPO}"
echo "   Settings: https://github.com/${ORG}/${REPO}/settings"
echo "   Insights: https://github.com/${ORG}/${REPO}/insights"
echo ""

