# 📝 Configuração de Padrão Markdown no Mac

Este guia explica como configurar o padrão de formatação Markdown no seu Mac e garantir que IAs reconheçam o padrão.

## 📋 Arquivos Criados

O projeto agora inclui os seguintes arquivos de configuração:

1. **`.editorconfig`** - Configurações universais do editor
2. **`.prettierrc.json`** - Formatação automática com Prettier
3. **`.markdownlint.json`** - Validação de estilo Markdown
4. **`.markdown-style-guide.md`** - Guia completo de estilo
5. **`.cursorrules`** - Regras específicas para Cursor AI

## 🚀 Configuração no Mac

### 1. EditorConfig (Suporte Universal)

O `.editorconfig` funciona automaticamente na maioria dos editores. Para garantir suporte:

#### VS Code / Cursor

- Instale a extensão: **EditorConfig for VS Code**
- Já deve estar instalada por padrão no Cursor

#### Outros Editores

- **Sublime Text**: Instale `EditorConfig` via Package Control
- **Atom**: Instale `editorconfig`
- **Vim/Neovim**: Use plugin `editorconfig-vim`

### 2. Prettier (Formatação Automática)

#### Instalação

```bash
# Instalar Prettier globalmente (opcional)

npm install -g prettier

# Ou usar localmente no projeto

npm install --save-dev prettier
```

#### Configuração no VS Code / Cursor

1. Instale a extensão: **Prettier - Code formatter**
2. Adicione ao `settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[markdown]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

#### Uso Manual

```bash
# Formatar todos os arquivos Markdown

prettier --write "**/*.md"

# Verificar formatação

prettier --check "**/*.md"
```

### 3. Markdownlint (Validação)

#### Instalação

```bash
npm install -g markdownlint-cli
```

#### Configuração no VS Code / Cursor

1. Instale a extensão: **Markdownlint**
2. A extensão lerá automaticamente o `.markdownlint.json`

#### Uso Manual

```bash
# Validar todos os arquivos Markdown

markdownlint "**/*.md"

# Corrigir automaticamente

markdownlint --fix "**/*.md"
```

## 🤖 Configuração para IAs

### Cursor AI

O arquivo `.cursorrules` já está configurado. O Cursor AI lerá automaticamente este arquivo e seguirá as regras definidas.

### Outras IAs (Claude, ChatGPT, etc.)

Ao trabalhar com IAs, mencione:

> "Siga o padrão de formatação Markdown definido em `.markdown-style-guide.md`. Sempre adicione uma linha em branco após títulos (###, ##, #) antes do conteúdo."

Ou inclua no prompt:

```
Ao criar ou editar arquivos Markdown, siga estas regras:
- SEMPRE adicione uma linha em branco após títulos (###, ##, #)
- Use indentação de 2 espaços
- Remova espaços em branco no final das linhas
- Adicione linha em branco no final do arquivo
```

## 📝 Padrão Principal

**Regra Crítica**: Sempre adicione uma linha em branco após títulos.

### ✅ Correto

```markdown
### 1. **Título** ✅ STATUS

- Conteúdo aqui
```

### ❌ Incorreto

```markdown
### 1. **Título** ✅ STATUS

- Conteúdo aqui
```

## 🔧 Scripts Úteis (Opcional)

Adicione ao `package.json`:

```json
{
  "scripts": {
    "format:md": "prettier --write \"**/*.md\"",
    "lint:md": "markdownlint \"**/*.md\"",
    "fix:md": "markdownlint --fix \"**/*.md\""
  }
}
```

Uso:

```bash
npm run format:md    # Formatar todos os .md
npm run lint:md      # Validar todos os .md
npm run fix:md       # Corrigir problemas
```

## ✅ Verificação

Para verificar se está funcionando:

1. Abra um arquivo `.md`
2. Adicione um título sem linha em branco
3. Salve o arquivo
4. O Prettier/EditorConfig deve formatar automaticamente

## 📚 Referências

- [EditorConfig](https://editorconfig.org/)
- [Prettier](https://prettier.io/docs/en/options.html)
- [Markdownlint](https://github.com/DavidAnson/markdownlint)
- [Guia de Estilo do Projeto](.markdown-style-guide.md)
