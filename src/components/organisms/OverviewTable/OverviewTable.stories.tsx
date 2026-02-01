import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { OverviewTable } from '@/components/financiamento/OverviewTable';

const meta: Meta<typeof OverviewTable> = {
  title: 'Organisms/OverviewTable',
  component: OverviewTable,
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
      description: 'Total de equipes para exibir no contador',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalEquipes: 398,
  },
};

export const FewTeams: Story = {
  args: {
    totalEquipes: 25,
    data: [
      {
        key: '1',
        equipe: 'ESF Vila Nova',
        unidade: 'UBS Centro',
        tipoEquipe: 'eSF',
        consolidado: { status: 'otimo', value: '85%' },
        indicadores: [],
      },
      {
        key: '2',
        equipe: 'ESF Jardim América',
        unidade: 'UBS Norte',
        tipoEquipe: 'eAP',
        consolidado: { status: 'bom', value: '72%' },
        indicadores: [],
      },
    ],
  },
};

export const AllClassifications: Story = {
  args: {
    totalEquipes: 100,
    data: [
      {
        key: '1',
        equipe: 'ESF Ótimo',
        unidade: 'UBS 1',
        tipoEquipe: 'eSF',
        consolidado: { status: 'otimo', value: '92%' },
        indicadores: [],
      },
      {
        key: '2',
        equipe: 'ESF Bom',
        unidade: 'UBS 2',
        tipoEquipe: 'eSF',
        consolidado: { status: 'bom', value: '75%' },
        indicadores: [],
      },
      {
        key: '3',
        equipe: 'ESF Suficiente',
        unidade: 'UBS 3',
        tipoEquipe: 'eAP',
        consolidado: { status: 'suficiente', value: '55%' },
        indicadores: [],
      },
      {
        key: '4',
        equipe: 'ESF Regular',
        unidade: 'UBS 4',
        tipoEquipe: 'eSF',
        consolidado: { status: 'regular', value: '35%' },
        indicadores: [],
      },
    ],
  },
};
