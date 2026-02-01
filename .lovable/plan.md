
# Plano de Migração: Ant Design v6 para v4

## Resumo

Este plano detalha as alterações necessárias para fazer downgrade do Ant Design da versão 6.2.0 (que é baseada na v5) para a versão 4.x, preparando os componentes para uma futura biblioteca de estilos.

---

## Componentes Ant Design Utilizados no Projeto

Após análise do código, os seguintes componentes são utilizados:

| Componente | Arquivos que utilizam |
|------------|----------------------|
| `Table` | OverviewTable, VinculoAcompanhamentoTable, ReportTable, QualidadeIndividualizado |
| `Button` | FilterBar, OverviewTable, VinculoAcompanhamentoTable, ReportTable, QualidadeIndividualizado |
| `Modal` | OverviewTable, ResultadoMunicipio |
| `Tabs` | QualidadeVisaoGeral, QualidadeRelatorio, QualidadeIndividualizado |
| `Select` | FilterBar |
| `Progress` | FilterBar |
| `Segmented` | QualidadeRelatorio |
| `Badge` | ReportTable |
| `Tooltip` | IndicatorChart, CadastroResumo, AcompanhamentoResumo |
| `ConfigProvider` | App.tsx |

---

## Alterações Necessárias

### 1. Atualização do package.json

Alterar a versão do antd de `^6.2.0` para `^4.24.15` (última versão estável da v4).

### 2. Configuração de Estilos (IMPORTANTE)

**AntD v4 usa LESS ao invés de CSS-in-JS**

Adicionar o import do CSS do Ant Design no arquivo principal:

```typescript
// src/main.tsx
import 'antd/dist/antd.css'; // ou antd.min.css
```

### 3. Alterações no ConfigProvider

**Arquivo: `src/App.tsx`**

A API de tema mudou significativamente entre v4 e v5:

```text
v5/v6 (atual):
const antTheme = {
  token: {
    colorPrimary: "#1677ff",
    borderRadius: 6,
    fontFamily: "...",
  },
};
<ConfigProvider theme={antTheme} />

v4 (novo):
// Não usa "token", customização é feita via LESS variables ou CSS overrides
<ConfigProvider locale={ptBR} />
```

### 4. Alterações no Componente Tabs

**Arquivos afetados:**
- `QualidadeVisaoGeral.tsx`
- `QualidadeRelatorio.tsx`
- `QualidadeIndividualizado.tsx`

**Mudança de API:**

```text
v5/v6 (atual):
<Tabs items={tabItems} />

v4 (novo):
<Tabs>
  <Tabs.TabPane tab="Label" key="key">
    {content}
  </Tabs.TabPane>
</Tabs>
```

### 5. Componente Segmented

**Arquivo: `QualidadeRelatorio.tsx`**

O componente `Segmented` não existe no Ant Design v4. Opções:

1. **Substituir por Radio.Group com buttonStyle="solid"** (recomendado)
2. Criar componente customizado

```text
v5/v6 (atual):
<Segmented options={periods} value={selected} onChange={...} />

v4 (novo):
<Radio.Group
  options={periods.map(p => ({ label: p, value: p }))}
  optionType="button"
  buttonStyle="solid"
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
/>
```

### 6. Componente Modal

**Arquivos afetados:**
- `OverviewTable.tsx`
- `ResultadoMunicipio.tsx`

**Mudança de API:**

```text
v5/v6 (atual):
<Modal open={isOpen} onCancel={...} />

v4 (novo):
<Modal visible={isOpen} onCancel={...} />
```

### 7. Componente Table

A API do Table é compatível entre v4 e v5, mas alguns detalhes podem variar:

- Os tipos `ColumnsType` continuam funcionando
- Propriedade `expandable` é compatível
- Verificar se há uso de APIs novas introduzidas na v5

### 8. Componente Button

Compatível entre versões, sem alterações necessárias.

### 9. Componente Select

Compatível entre versões, sem alterações necessárias.

### 10. Componente Progress

**Arquivo: `FilterBar.tsx`**

A propriedade `steps` foi introduzida na v4, então é compatível. Verificar apenas estilos customizados.

### 11. Componente Badge

Compatível entre versões, sem alterações necessárias.

### 12. Componente Tooltip

Compatível entre versões, sem alterações necessárias.

### 13. Import de Locale

**Arquivo: `src/App.tsx`**

```text
v5/v6 (atual):
import ptBR from "antd/locale/pt_BR";

v4 (novo):
import ptBR from "antd/lib/locale/pt_BR";
```

### 14. Atualização de Estilos Customizados

**Arquivo: `src/index.css`**

Os estilos customizados do Ant Design Segmented precisarão ser adaptados para o Radio.Group:

```css
/* Remover estilos do Segmented */
/* .ant-segmented { ... } */

/* Adicionar estilos equivalentes para Radio.Group se necessário */
.ant-radio-group-solid .ant-radio-button-wrapper-checked {
  background: #EBF3FE !important;
  color: hsl(var(--primary)) !important;
}
```

---

## Sequência de Implementação

1. **Atualizar package.json** - Mudar versão do antd para ^4.24.15
2. **Adicionar import CSS** - No main.tsx
3. **Atualizar App.tsx** - ConfigProvider e locale import
4. **Migrar Tabs** - Converter de `items` para `TabPane` em 3 arquivos
5. **Substituir Segmented** - Usar Radio.Group em QualidadeRelatorio
6. **Atualizar Modal** - Trocar `open` por `visible` em 2 arquivos
7. **Ajustar estilos** - Atualizar index.css para novos seletores
8. **Testar** - Verificar todos os componentes funcionando

---

## Possíveis Desafios

1. **Estilos visuais diferentes**: A v4 tem um design ligeiramente diferente da v5
2. **Customização de tema**: Será mais limitada sem CSS-in-JS
3. **Dependências de tipos**: Pode ser necessário ajustar imports de tipos TypeScript

---

## Arquivos a Serem Modificados

| Arquivo | Tipo de Alteração |
|---------|-------------------|
| `package.json` | Versão do antd |
| `src/main.tsx` | Import do CSS |
| `src/App.tsx` | ConfigProvider e locale |
| `src/pages/QualidadeVisaoGeral.tsx` | Tabs API |
| `src/pages/QualidadeRelatorio.tsx` | Tabs API + Segmented -> Radio |
| `src/pages/QualidadeIndividualizado.tsx` | Tabs API |
| `src/components/financiamento/OverviewTable.tsx` | Modal visible |
| `src/components/financiamento/ResultadoMunicipio.tsx` | Modal visible |
| `src/index.css` | Estilos customizados |

