

## ✅ Conflito de Versões do Storybook - RESOLVIDO

### Solução Aplicada

Todos os pacotes Storybook foram padronizados para a versão **8.6.14** (versão estável com todos os addons disponíveis):

```json
"@storybook/addon-a11y": "^8.6.14",
"@storybook/addon-essentials": "^8.6.14",
"@storybook/addon-interactions": "^8.6.14",
"@storybook/addon-links": "^8.6.14",
"@storybook/blocks": "^8.6.14",
"@storybook/react": "^8.6.14",
"@storybook/react-vite": "^8.6.14",
"@storybook/test": "^8.6.15",
"storybook": "^8.6.14"
```

### Para rodar localmente

1. Clone o projeto e delete `node_modules` e `package-lock.json`
2. Execute `npm install`
3. Execute `npm run storybook`

