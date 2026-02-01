import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { BarChart3, Users, FileText, TrendingUp } from 'lucide-react';
import { InfoCard } from './InfoCard';

const meta: Meta<typeof InfoCard> = {
  title: 'Molecules/InfoCard',
  component: InfoCard,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary'],
      description: 'Variante visual do card',
    },
    title: {
      control: 'text',
      description: 'Título do card',
    },
    description: {
      control: 'text',
      description: 'Descrição do conteúdo',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <BarChart3 className="h-6 w-6 text-primary-foreground" />,
    title: 'Indicadores de Qualidade',
    description: 'Acompanhe os indicadores de qualidade da atenção primária à saúde.',
    links: [
      { label: 'Visão Geral', path: '/visao-geral' },
      { label: 'Relatório Detalhado', path: '/relatorio' },
    ],
  },
};

export const Primary: Story = {
  args: {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: 'Financiamento APS',
    description: 'Gerencie e acompanhe o financiamento da Atenção Primária à Saúde.',
    variant: 'primary',
    links: [
      { label: 'Componente I', path: '/componente-1' },
      { label: 'Componente II', path: '/componente-2' },
    ],
  },
};

export const WithoutLinks: Story = {
  args: {
    icon: <Users className="h-6 w-6 text-primary-foreground" />,
    title: 'Equipes de Saúde',
    description: 'Informações sobre as equipes de saúde cadastradas no município.',
    variant: 'default',
  },
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
      <InfoCard
        icon={<BarChart3 className="h-6 w-6 text-primary-foreground" />}
        title="Indicadores"
        description="Acompanhe os indicadores de qualidade."
        links={[{ label: 'Ver indicadores', path: '/indicadores' }]}
      />
      <InfoCard
        icon={<Users className="h-6 w-6 text-primary" />}
        title="Equipes"
        description="Gerencie suas equipes de saúde."
        variant="primary"
        links={[{ label: 'Ver equipes', path: '/equipes' }]}
      />
      <InfoCard
        icon={<FileText className="h-6 w-6 text-primary-foreground" />}
        title="Relatórios"
        description="Acesse relatórios detalhados."
        links={[{ label: 'Ver relatórios', path: '/relatorios' }]}
      />
    </div>
  ),
};
