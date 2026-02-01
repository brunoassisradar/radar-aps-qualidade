import type { Meta, StoryObj } from '@storybook/react';
import { IndicatorChart } from '@/components/financiamento/IndicatorChart';

const meta: Meta<typeof IndicatorChart> = {
  title: 'Organisms/IndicatorChart',
  component: IndicatorChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    selectedIndicador: {
      control: 'select',
      options: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'],
      description: 'Indicador selecionado (C1-C7)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const C1_MaisAcesso: Story = {
  args: {
    selectedIndicador: 'c1',
    kpiValues: { primary: 70, secondary: 30 },
  },
};

export const C2_CuidadoInfantil: Story = {
  args: {
    selectedIndicador: 'c2',
    kpiValues: { primary: 150 },
  },
};

export const C3_GestantePuerpera: Story = {
  args: {
    selectedIndicador: 'c3',
    kpiValues: { primary: 85 },
  },
};

export const C4_Diabetes: Story = {
  args: {
    selectedIndicador: 'c4',
    kpiValues: { primary: 220 },
  },
};

export const C5_Hipertensao: Story = {
  args: {
    selectedIndicador: 'c5',
    kpiValues: { primary: 340 },
  },
};

export const C6_PessoaIdosa: Story = {
  args: {
    selectedIndicador: 'c6',
    kpiValues: { primary: 180 },
  },
};

export const C7_CuidadoMulher: Story = {
  args: {
    selectedIndicador: 'c7',
    kpiValues: { primary: 420 },
  },
};

export const WithCustomData: Story = {
  args: {
    selectedIndicador: 'c3',
    kpiValues: { primary: 100 },
    data: [
      { equipe: 'A', equipeName: 'Equipe Alpha', tooltipText: 'UBS Centro', cumprioBoaPratica: 80, naoCumpriuBoaPratica: 20, cumprioECadastroOk: 90, cumprioComPendencia: 10 },
      { equipe: 'B', equipeName: 'Equipe Beta', tooltipText: 'UBS Norte', cumprioBoaPratica: 60, naoCumpriuBoaPratica: 40, cumprioECadastroOk: 70, cumprioComPendencia: 30 },
      { equipe: 'C', equipeName: 'Equipe Gamma', tooltipText: 'UBS Sul', cumprioBoaPratica: 45, naoCumpriuBoaPratica: 55, cumprioECadastroOk: 50, cumprioComPendencia: 50 },
    ],
  },
};
