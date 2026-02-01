
# Plano de Migração: Ant Design v6 para v4

## Resumo da Situação

O projeto atualmente utiliza **Ant Design v6.2.0** e você deseja fazer o downgrade para a **versão 4.x** mantendo todos os componentes equivalentes sem substituir a funcionalidade.

## Breaking Changes Identificados

### 1. Sistema de Tematização
- **v5/v6**: Usa `ConfigProvider theme={{ token: { colorPrimary: '...' } }}`
- **v4**: Usa `ConfigProvider.config({ theme: { primaryColor: '...' } })` ou tematização via Less

### 2. Modal e Popover
- **v5/v6**: Usa prop `open`
- **v4**: Usa prop `visible`

### 3. Tabs API
- **v5/v6**: Usa prop `items` com array de objetos
- **v4**: Usa children com `<Tabs.TabPane key="..." tab="...">content</Tabs.TabPane>`

### 4. Locale Import Path
- **v5/v6**: `import ptBR from "antd/locale/pt_BR"`
- **v4**: `import ptBR from "antd/lib/locale/pt_BR"` ou `"antd/es/locale/pt_BR"`

### 5. Segmented
- O componente **existe no v4** (adicionado na versão 4.20), portanto continua funcionando

## Arquivos a Serem Modificados

### 1. package.json
Atualizar a versão do antd de `^6.2.0` para `^4.24.16` (última versão estável do v4)

### 2. src/App.tsx
- Alterar import do locale: `antd/locale/pt_BR` -> `antd/lib/locale/pt_BR`
- Converter configuração de tema de `theme={{ token: {...} }}` para `ConfigProvider.config()` no useEffect ou remover (v4 não suporta token system nativo)

### 3. src/pages/QualidadeVisaoGeral.tsx
- Converter `<Tabs items={tabItems} ...>` para `<Tabs ...>{tabItems.map(item => <Tabs.TabPane>)}</Tabs>`

### 4. src/pages/QualidadeRelatorio.tsx
- Converter `<Tabs items={tabItems} ...>` para children com `<Tabs.TabPane>`

### 5. src/pages/QualidadeIndividualizado.tsx
- Converter `<Tabs items={tabItems} ...>` para children com `<Tabs.TabPane>`

### 6. src/components/financiamento/ResultadoMunicipio.tsx
- Alterar `<Modal ... open={isHelpOpen}>` para `<Modal ... visible={isHelpOpen}>`

### 7. src/components/financiamento/OverviewTable.tsx
- Alterar `<Modal ... open={isHelpModalOpen}>` para `<Modal ... visible={isHelpModalOpen}>`

---

## Detalhamento Técnico das Alterações

### package.json
```json
// De:
"antd": "^6.2.0"

// Para:
"antd": "^4.24.16"
```

### src/App.tsx
```typescript
// De:
import ptBR from "antd/locale/pt_BR";

const antTheme = {
  token: {
    colorPrimary: "#1677ff",
    borderRadius: 6,
    fontFamily: "'Inter', ...",
  },
};

<ConfigProvider locale={ptBR} theme={antTheme}>

// Para:
import ptBR from "antd/lib/locale/pt_BR";

// Remover antTheme pois v4 não suporta token system
// Tematização em v4 é feita via Less ou CSS overrides

<ConfigProvider locale={ptBR}>
```

### Tabs (todos os arquivos de página)
```typescript
// De (v5/v6):
<Tabs
  activeKey={activeTab}
  onChange={handleTabChange}
  items={tabItems}
  size="large"
  className="financiamento-tabs"
/>

// Para (v4):
<Tabs
  activeKey={activeTab}
  onChange={handleTabChange}
  size="large"
  className="financiamento-tabs"
>
  {tabItems.map(item => (
    <Tabs.TabPane key={item.key} tab={item.label}>
      {item.children}
    </Tabs.TabPane>
  ))}
</Tabs>
```

### Modal (ResultadoMunicipio.tsx e OverviewTable.tsx)
```typescript
// De (v5/v6):
<Modal open={isHelpOpen} ...>

// Para (v4):
<Modal visible={isHelpOpen} ...>
```

---

## Componentes que Continuam Iguais

Os seguintes componentes continuam funcionando da mesma forma em v4:

- **Table**: A API de colunas, expandable, pagination permanece compatível
- **Button**: A API permanece igual
- **Select**: A API permanece compatível
- **Progress**: A API permanece compatível
- **Badge**: A API permanece compatível
- **Tooltip**: A API permanece compatível
- **Segmented**: Disponível desde v4.20 com a mesma API

---

## Impacto Visual

Como v4 não suporta o sistema de design tokens do v5/v6, algumas diferenças visuais menores podem ocorrer:

1. A cor primária padrão do v4 é `#1890ff` (azul ligeiramente diferente de `#1677ff`)
2. O border-radius padrão pode ser ligeiramente diferente
3. A fonte pode precisar ser ajustada via CSS customizado

Para manter a consistência visual, você pode adicionar CSS customizado ou usar a tematização via Less se necessário em um momento posterior.

---

## Ordem de Implementação

1. Atualizar `package.json` com a nova versão
2. Atualizar `src/App.tsx` (ConfigProvider e locale)
3. Atualizar as 3 páginas com Tabs (QualidadeVisaoGeral, QualidadeRelatorio, QualidadeIndividualizado)
4. Atualizar os 2 componentes com Modal (ResultadoMunicipio, OverviewTable)
5. Testar a aplicação

---

## Observações Importantes

1. **Segmented continua funcionando**: O componente `Segmented` foi adicionado ao Ant Design v4.20, então você pode continuar usando-o normalmente

2. **Nenhuma substituição de funcionalidade**: Todas as alterações são apenas de sintaxe/API, mantendo os mesmos componentes e comportamentos

3. **Tematização**: Se você precisar manter as cores customizadas, será necessário configurar Less no Vite ou usar CSS overrides após a migração básica
