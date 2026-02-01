import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Link2, BarChart3, FileText, Users, Heart } from 'lucide-react';
import { DashboardTemplate } from './DashboardTemplate';

const meta: Meta<typeof DashboardTemplate> = {
  title: 'Templates/DashboardTemplate',
  component: DashboardTemplate,
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

export const FinanciamentoAPS: Story = {
  args: {
    title: 'Financiamento APS',
    breadcrumbs: [{ label: 'Financiamento APS' }],
    cards: [
      {
        icon: <Link2 className="h-6 w-6 text-white" />,
        title: 'Vínculo e Acompanhamento',
        description: 'Acesse os dados detalhados sobre o cálculo do Componente Vínculo e Acompanhamento Territorial.',
        links: [
          { label: 'Visão geral', path: '/visao-geral' },
          { label: 'Relatório', path: '/relatorio' },
        ],
      },
      {
        icon: <BarChart3 className="h-6 w-6 text-white" />,
        title: 'Qualidade eSF/eAP',
        description: 'Acesse os dados detalhados sobre os Indicadores de qualidade.',
        links: [
          { label: 'Visão geral', path: '/qualidade' },
          { label: 'Relatório', path: '/qualidade/relatorio' },
        ],
      },
      {
        icon: <FileText className="h-6 w-6 text-white" />,
        title: 'Outros Componentes',
        description: 'Valor mensal fixo por equipe transferido para os municípios.',
        links: [],
      },
    ],
    faqItems: [
      {
        question: 'O que é o Financiamento APS?',
        answer: 'O Financiamento da Atenção Primária à Saúde é um modelo de custeio baseado em resultados.',
      },
      {
        question: 'Como são calculados os indicadores?',
        answer: 'Os indicadores são calculados com base nos dados enviados pelas equipes através do SISAB.',
      },
    ],
  },
};

export const LinhasDeCuidado: Story = {
  args: {
    title: 'Linhas de Cuidado',
    breadcrumbs: [
      { label: 'Início', path: '/' },
      { label: 'Linhas de Cuidado' },
    ],
    cards: [
      {
        icon: <Heart className="h-6 w-6 text-white" />,
        title: 'Saúde da Mulher',
        description: 'Acompanhamento de gestantes e puérperas.',
        variant: 'primary',
        links: [
          { label: 'Ver detalhes', path: '/mulher' },
        ],
      },
      {
        icon: <Users className="h-6 w-6 text-white" />,
        title: 'Saúde da Criança',
        description: 'Monitoramento do desenvolvimento infantil.',
        links: [
          { label: 'Ver detalhes', path: '/crianca' },
        ],
      },
    ],
    faqItems: [],
  },
};

export const WithoutFAQ: Story = {
  args: {
    title: 'Dashboard Simples',
    breadcrumbs: [{ label: 'Dashboard' }],
    cards: [
      {
        icon: <BarChart3 className="h-6 w-6 text-white" />,
        title: 'Indicadores',
        description: 'Visualize os principais indicadores.',
        links: [{ label: 'Acessar', path: '/indicadores' }],
      },
    ],
    faqItems: [],
  },
};
