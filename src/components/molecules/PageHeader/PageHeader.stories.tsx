import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Download, Plus } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { PageHeader } from './PageHeader';

const meta: Meta<typeof PageHeader> = {
  title: 'Molecules/PageHeader',
  component: PageHeader,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título da página',
    },
    breadcrumbs: {
      control: 'object',
      description: 'Array de itens do breadcrumb',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Visão Geral',
    breadcrumbs: [
      { label: 'Início', path: '/' },
      { label: 'Qualidade', path: '/qualidade' },
      { label: 'Visão Geral' },
    ],
  },
};

export const WithActions: Story = {
  args: {
    title: 'Relatório de Equipes',
    breadcrumbs: [
      { label: 'Início', path: '/' },
      { label: 'Relatórios', path: '/relatorios' },
      { label: 'Equipes' },
    ],
    actions: (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Exportar
        </Button>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Novo
        </Button>
      </div>
    ),
  },
};

export const SingleBreadcrumb: Story = {
  args: {
    title: 'Dashboard',
    breadcrumbs: [{ label: 'Dashboard' }],
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Acompanhamento de Indicadores de Qualidade da Atenção Primária',
    breadcrumbs: [
      { label: 'Início', path: '/' },
      { label: 'Financiamento APS', path: '/financiamento' },
      { label: 'Componente II', path: '/componente-2' },
      { label: 'Indicadores' },
    ],
  },
};
