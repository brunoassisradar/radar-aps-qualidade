

## Adicionar Scripts do Storybook ao package.json

### Objetivo
Adicionar os comandos necessários para executar e compilar o Storybook localmente, permitindo visualizar e testar todos os componentes da biblioteca.

### Alteração

Adicionar dois scripts na seção `"scripts"` do `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "build:dev": "vite build --mode development",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}
```

### Como usar

Após a alteração, você poderá:

1. **Iniciar o Storybook em modo desenvolvimento:**
   ```bash
   npm run storybook
   ```
   Abre em `http://localhost:6006`

2. **Compilar o Storybook para produção:**
   ```bash
   npm run build-storybook
   ```
   Gera arquivos estáticos na pasta `storybook-static/`

---

**Detalhes técnicos:**
- `storybook dev -p 6006`: Inicia servidor de desenvolvimento na porta 6006
- `storybook build`: Compila documentação estática para deploy

