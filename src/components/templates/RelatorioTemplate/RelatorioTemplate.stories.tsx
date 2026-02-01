import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { RelatorioTemplate } from './RelatorioTemplate';

const meta: Meta<typeof RelatorioTemplate> = {
  title: 'Templates/RelatorioTemplate',
  component: RelatorioTemplate,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="p-6 bg-background min-h-screen">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = ({ period }: { period: string }) => (
  <div className="space-y-4">
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold mb-2">Dados do período: {period}</h3>
      <p className="text-muted-foreground">
        Conteúdo do relatório para o período selecionado seria exibido aqui.
      </p>
    </div>
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold mb-2">Tabela de Equipes</h3>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3 text-sm">Equipe</th>
              <th className="text-left p-3 text-sm">Unidade</th>
              <th className="text-left p-3 text-sm">Pontuação</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="p-3 text-sm">ESF Vila Nova</td>
              <td className="p-3 text-sm">UBS Centro</td>
              <td className="p-3 text-sm">85%</td>
            </tr>
            <tr className="border-t border-border">
              <td className="p-3 text-sm">ESF Jardim</td>
              <td className="p-3 text-sm">UBS Norte</td>
              <td className="p-3 text-sm">72%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export const Interactive: Story = {
  render: () => {
    const [period, setPeriod] = useState('Consolidado');
    
    return (
      <RelatorioTemplate
        title="Relatório de Qualidade"
        breadcrumbs={[
          { label: 'Financiamento APS', path: '/financiamento' },
          { label: 'Qualidade eSF/eAP', path: '/qualidade' },
          { label: 'Relatório' },
        ]}
        periodOptions={['Consolidado', 'Janeiro', 'Fevereiro', 'Março', 'Abril']}
        selectedPeriod={period}
        onPeriodChange={setPeriod}
        headerActions={
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        }
      >
        <SampleContent period={period} />
      </RelatorioTemplate>
    );
  },
};

export const Consolidado: Story = {
  args: {
    title: 'Relatório Consolidado',
    breadcrumbs: [
      { label: 'Financiamento APS', path: '/financiamento' },
      { label: 'Relatório' },
    ],
    periodOptions: ['Consolidado', 'Janeiro', 'Fevereiro', 'Março', 'Abril'],
    selectedPeriod: 'Consolidado',
    onPeriodChange: () => {},
    children: <SampleContent period="Consolidado" />,
  },
};

export const Monthly: Story = {
  args: {
    title: 'Relatório Mensal',
    breadcrumbs: [
      { label: 'Financiamento APS', path: '/financiamento' },
      { label: 'Relatório' },
    ],
    periodOptions: ['Consolidado', 'Janeiro', 'Fevereiro', 'Março', 'Abril'],
    selectedPeriod: 'Janeiro',
    onPeriodChange: () => {},
    headerActions: (
      <Button variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Exportar
      </Button>
    ),
    children: <SampleContent period="Janeiro" />,
  },
};

export const Quarterly: Story = {
  args: {
    title: 'Relatório Quadrimestral',
    breadcrumbs: [{ label: 'Relatórios' }],
    periodOptions: ['1° Quadrimestre', '2° Quadrimestre', '3° Quadrimestre'],
    selectedPeriod: '1° Quadrimestre',
    onPeriodChange: () => {},
    children: <SampleContent period="1° Quadrimestre" />,
  },
};
