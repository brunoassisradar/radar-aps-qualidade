import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { ReportTable } from '@/components/financiamento/ReportTable';

const meta: Meta<typeof ReportTable> = {
  title: 'Organisms/ReportTable',
  component: ReportTable,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="p-4 bg-background min-h-screen">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    totalEquipes: {
      control: 'number',
      description: 'Total de equipes',
    },
    selectedPeriod: {
      control: 'select',
      options: ['Consolidado', 'Janeiro', 'Fevereiro', 'Março', 'Abril'],
      description: 'Período selecionado',
    },
    onViewIndividual: {
      action: 'view individual',
      description: 'Callback ao clicar em ver individual',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalEquipes: 398,
    selectedPeriod: 'Consolidado',
  },
};

export const MonthlyView: Story = {
  args: {
    totalEquipes: 398,
    selectedPeriod: 'Janeiro',
  },
};

export const WithCustomData: Story = {
  args: {
    totalEquipes: 50,
    selectedPeriod: 'Consolidado',
    data: [
      {
        key: '1',
        equipe: 'ESF Vila Nova',
        unidade: 'UBS Centro',
        classificacao: 'otimo',
        numerador: 3.5,
        denominador: 4,
        pontuacao: 87.5,
        fichasDesatualizadas: 0,
      },
      {
        key: '2',
        equipe: 'ESF Jardim',
        unidade: 'UBS Norte',
        classificacao: 'regular',
        numerador: 1.5,
        denominador: 4,
        pontuacao: 37.5,
        fichasDesatualizadas: 15,
      },
    ],
  },
};
