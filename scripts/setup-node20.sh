#!/bin/bash
# Script para garantir Node 20 e regenerar lockfile

set -e

# Carregar nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Instalar Node 20 se não estiver instalado
if ! nvm list | grep -q "v20"; then
  echo "Instalando Node 20..."
  nvm install 20
fi

# Usar Node 20
echo "Ativando Node 20..."
nvm use 20

# Verificar versão
echo "Verificando versão do Node:"
node -v

# Regenerar lockfile
echo "Regenerando package-lock.json..."
rm -f package-lock.json
npm install

echo "✓ Node 20 configurado e lockfile regenerado!"

