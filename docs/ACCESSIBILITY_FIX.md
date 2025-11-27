# ♿ Correção de Acessibilidade - ConnectWallet

## Problema

O componente `ConnectWallet` do Thirdweb usa Radix UI internamente e requer um `DialogTitle` para acessibilidade. O aviso aparecia no console:

```
DialogContent requires a DialogTitle for the component to be accessible for screen reader users.
```

## Solução Implementada

Foi criado um `useEffect` no componente `ConnectButton` que:

1. **Detecta quando o modal é aberto** usando `MutationObserver`
2. **Verifica se existe um título acessível** no dialog
3. **Adiciona um título acessível** se não existir:
   - Procura por títulos existentes e adiciona `id` se necessário
   - Se não encontrar, cria um título oculto para screen readers (`.sr-only`)

## Código

```jsx
useEffect(() => {
  const fixDialogTitle = () => {
    const dialogs = document.querySelectorAll('[role="dialog"]');
    dialogs.forEach((dialog) => {
      // Verifica e adiciona título acessível se necessário
      // ...
    });
  };

  fixDialogTitle();
  const observer = new MutationObserver(() => fixDialogTitle());
  observer.observe(document.body, { childList: true, subtree: true });
  
  return () => observer.disconnect();
}, []);
```

## Classe CSS `.sr-only`

Adicionada ao `src/index.css` para ocultar visualmente mas manter acessível:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

## Resultado

- ✅ Modal agora tem título acessível para screen readers
- ✅ Aviso de acessibilidade resolvido
- ✅ Compatível com WCAG 2.1
- ✅ Não afeta a experiência visual do usuário

## Nota

O `modalTitle` já está sendo passado para o `ConnectWallet`, mas o Radix UI pode não estar usando corretamente. Esta solução garante que sempre haverá um título acessível, mesmo que o Thirdweb não o passe corretamente para o Radix UI.

