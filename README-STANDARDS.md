# Padrões NEØ - Configuração Global

Este diretório contém os padrões de desenvolvimento NEØ que podem ser aplicados automaticamente em novos projetos.

## Configuração Automática

### Opção 1: Git Template (Automático)

Os padrões são aplicados automaticamente quando você usa `git init`:

```bash
git init
# Padrões são aplicados automaticamente via hook
```

### Opção 2: Função Manual

Use a função `neo-init` em qualquer projeto:

```bash
neo-init
# ou
neo-init /caminho/do/projeto
```

### Opção 3: Script Direto

```bash
~/neo-protcl/scripts/apply-neo-standards.sh
# ou
~/neo-protcl/scripts/apply-neo-standards.sh /caminho/do/projeto
```

## O que é Aplicado

-  `.cursorrules` - Regras do Cursor IDE
-  `.editorconfig` - Configuração do editor
-  `.cursor/standards/` - Padrões de desenvolvimento
-  `.github/workflows/` - Workflows CI/CD (se não existirem)
-  `.markdownlint.json` - Validação Markdown (se não existir)
-  `.prettierrc.json` - Configuração Prettier (se não existir)

## Verificação

Para verificar se está configurado:

```bash
git config --global init.templateDir
# Deve retornar: /Users/nettomello/.git-templates
```

## Atualização

Para atualizar os padrões em um projeto existente:

```bash
neo-init
```

Isso não sobrescreve arquivos existentes, apenas adiciona os que faltam.

---

**Autor:** MELLØ // NEØ DEV
