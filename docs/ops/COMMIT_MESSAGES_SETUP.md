# Configuração de Mensagens de Commit Padrão - NΞØ Protocol

## 📝 Templates Criados

### 1. Merge Commit Message
**Arquivo:** `.github/merge_message_template.md`

Usado quando você faz merge de um PR (não squash).

**Formato:**
```
Merge pull request #$NUMBER from $AUTHOR

$TITLE

$DESCRIPTION

---

Author: MELLØ // POST-HUMAN

This project follows my personal working standards.
Changes are allowed, inconsistency is not.
```

### 2. Squash Merge Message
**Arquivo:** `.github/squash_merge_message_template.md`

Usado quando você faz squash merge de um PR.

**Formato:**
```
$TITLE

$DESCRIPTION

Co-authored-by: $AUTHOR <$EMAIL>

---

Author: MELLØ // POST-HUMAN

This project follows my personal working standards.
Changes are allowed, inconsistency is not.
```

## ⚙️ Como Configurar no GitHub

### Opção 1: Via Interface Web

1. Acesse: https://github.com/NEO-PROTOCOL/neo-protcl/settings
2. Role até "Pull Requests"
3. Em "Default commit message":
   - **Merge commits:** Cole o conteúdo de `.github/merge_message_template.md`
   - **Squash merges:** Cole o conteúdo de `.github/squash_merge_message_template.md`

### Opção 2: Via API (se preferir automatizar)

Os templates já estão nos arquivos `.github/` e podem ser referenciados.

## 🔍 Variáveis Disponíveis

- `$NUMBER` - Número do PR
- `$AUTHOR` - Autor do PR
- `$TITLE` - Título do PR
- `$DESCRIPTION` - Descrição do PR
- `$EMAIL` - Email do autor (apenas em squash)

## 📋 Exemplo de Uso

### Merge Commit:
```
Merge pull request #42 from contributor/feature-x

feat: adicionar nova funcionalidade X

Implementa funcionalidade X que resolve o problema Y.

---

Author: MELLØ // POST-HUMAN

This project follows my personal working standards.
Changes are allowed, inconsistency is not.
```

### Squash Merge:
```
feat: adicionar nova funcionalidade X

Implementa funcionalidade X que resolve o problema Y.

Co-authored-by: Contributor <contributor@example.com>

---

Author: MELLØ // POST-HUMAN

This project follows my personal working standards.
Changes are allowed, inconsistency is not.
```

---

Author: MELLØ // POST-HUMAN

This project follows my personal working standards.
Changes are allowed, inconsistency is not.

