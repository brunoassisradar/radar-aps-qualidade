import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { VisaoGeralTemplate } from './VisaoGeralTemplate';
import { ClassificationCard } from '@/components/molecules/ClassificationCard';

const meta: Meta<typeof VisaoGeralTemplate> = {
  title: 'Templates/VisaoGeralTemplate',
  component: VisaoGeralTemplate,
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

const QualidadeContent = () => (
  <div className="space-y-4 pt-4">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <ClassificationCard classification="otimo" count={12} description="Ótimo: > 75%" />
      <ClassificationCard classification="bom" count={36} description="Bom: 50-75%" />
      <ClassificationCard classification="suficiente" count={68} description="Suficiente: 25-50%" />
      <ClassificationCard classification="regular" count={304} description="Regular: < 25%" />
    </div>
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <p className="text-muted-foreground">Tabela de equipes seria exibida aqui...</p>
    </div>
  </div>
);

const VinculoContent = () => (
  <div className="space-y-4 pt-4">
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold mb-2">Resultado do Município</h3>
      <p className="text-muted-foreground">Cards de resultado seriam exibidos aqui...</p>
    </div>
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold mb-2">Critérios de Vinculação</h3>
      <p className="text-muted-foreground">Detalhes dos critérios...</p>
    </div>
  </div>
);

export const Interactive: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('qualidade');
    
    return (
      <VisaoGeralTemplate
        title="Visão Geral de Qualidade eSF/eAP"
        breadcrumbs={[
          { label: 'Financiamento APS', path: '/financiamento' },
          { label: 'Qualidade eSF/eAP' },
        ]}
        tabs={[
          { key: 'vinculo', label: 'Vínculo e Acompanhamento', children: <VinculoContent /> },
          { key: 'qualidade', label: 'Qualidade eSF/eAP', children: <QualidadeContent /> },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        headerActions={
          <Button variant="outline" size="sm">
            Busca ativa
          </Button>
        }
      />
    );
  },
};

export const VinculoTab: Story = {
  args: {
    title: 'Visão Geral de Vínculo e Acompanhamento',
    breadcrumbs: [
      { label: 'Financiamento APS', path: '/financiamento' },
      { label: 'Vínculo e Acompanhamento' },
    ],
    tabs: [
      { key: 'vinculo', label: 'Vínculo e Acompanhamento', children: <VinculoContent /> },
      { key: 'qualidade', label: 'Qualidade eSF/eAP', children: <QualidadeContent /> },
    ],
    activeTab: 'vinculo',
    onTabChange: () => {},
  },
};

export const QualidadeTab: Story = {
  args: {
    title: 'Visão Geral de Qualidade eSF/eAP',
    breadcrumbs: [
      { label: 'Financiamento APS', path: '/financiamento' },
      { label: 'Qualidade eSF/eAP' },
    ],
    tabs: [
      { key: 'vinculo', label: 'Vínculo e Acompanhamento', children: <VinculoContent /> },
      { key: 'qualidade', label: 'Qualidade eSF/eAP', children: <QualidadeContent /> },
    ],
    activeTab: 'qualidade',
    onTabChange: () => {},
    headerActions: (
      <Button variant="outline" size="sm">
        Busca ativa
      </Button>
    ),
  },
};

export const ManyTabs: Story = {
  args: {
    title: 'Dashboard Completo',
    breadcrumbs: [{ label: 'Dashboard' }],
    tabs: [
      { key: 'tab1', label: 'Resumo', children: <div className="p-4 bg-card rounded-lg mt-4">Conteúdo do Resumo</div> },
      { key: 'tab2', label: 'Indicadores', children: <div className="p-4 bg-card rounded-lg mt-4">Conteúdo de Indicadores</div> },
      { key: 'tab3', label: 'Equipes', children: <div className="p-4 bg-card rounded-lg mt-4">Conteúdo de Equipes</div> },
      { key: 'tab4', label: 'Relatórios', children: <div className="p-4 bg-card rounded-lg mt-4">Conteúdo de Relatórios</div> },
      { key: 'tab5', label: 'Configurações', children: <div className="p-4 bg-card rounded-lg mt-4">Conteúdo de Configurações</div> },
    ],
    activeTab: 'tab1',
    onTabChange: () => {},
  },
};
