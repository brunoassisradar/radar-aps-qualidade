

## Corrigir Conflito de Versões do Storybook

### Problema Identificado

O `package.json` contém uma mistura de versões incompatíveis do Storybook:

| Pacote | Versão Atual | Problema |
|--------|--------------|----------|
| `storybook` | ^10.2.3 | OK |
| `@storybook/react` | ^10.2.3 | OK |
| `@storybook/react-vite` | ^10.2.3 | OK |
| `@storybook/addon-a11y` | ^10.2.3 | OK |
| `@storybook/addon-links` | ^10.2.3 | OK |
| `@storybook/addon-essentials` | ^8.6.14 | **CONFLITO** |
| `@storybook/addon-interactions` | ^8.6.14 | **CONFLITO** |
| `@storybook/blocks` | ^8.6.14 | **CONFLITO** |
| `@storybook/test` | ^8.6.15 | **CONFLITO** |

### Solucao

Atualizar todos os pacotes Storybook para a versao 10.x, garantindo compatibilidade.

### Alteracoes no package.json

Substituir as versoes 8.x pelos equivalentes 10.x:

```json
"@storybook/addon-a11y": "^10.2.3",
"@storybook/addon-essentials": "^10.2.3",
"@storybook/addon-interactions": "^10.2.3",
"@storybook/addon-links": "^10.2.3",
"@storybook/blocks": "^10.2.3",
"@storybook/react": "^10.2.3",
"@storybook/react-vite": "^10.2.3",
"@storybook/test": "^10.2.3",
"storybook": "^10.2.3",
```

### Passos apos a correcao

1. **Apague a pasta `node_modules`** e o arquivo `package-lock.json`:
   ```bash
   rm -rf node_modules package-lock.json
   ```
   No Windows:
   ```cmd
   rmdir /s /q node_modules
   del package-lock.json
   ```

2. **Reinstale as dependencias**:
   ```bash
   npm install
   ```

3. **Execute o Storybook**:
   ```bash
   npm run storybook
   ```

---

### Detalhes Tecnicos

- O Storybook 10 foi lancado recentemente e trouxe mudancas na estrutura de pacotes
- Todos os addons oficiais precisam estar na mesma major version
- O `@storybook/test` substitui o antigo `@storybook/testing-library` na versao 10

