import type { Meta, StoryObj } from '@storybook/react';
import { ResultadoMunicipio } from '@/components/financiamento/ResultadoMunicipio';

const meta: Meta<typeof ResultadoMunicipio> = {
  title: 'Organisms/ResultadoMunicipio',
  component: ResultadoMunicipio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    escoreCadastro: {
      control: { type: 'range', min: 0, max: 5, step: 0.5 },
      description: 'Escore da dimensão Cadastro (0-5)',
    },
    escoreAcompanhamento: {
      control: { type: 'range', min: 0, max: 5, step: 0.5 },
      description: 'Escore da dimensão Acompanhamento (0-5)',
    },
    notaFinal: {
      control: { type: 'range', min: 0, max: 10, step: 0.5 },
      description: 'Nota final calculada',
    },
    classificacao: {
      control: 'select',
      options: ['otimo', 'bom', 'suficiente', 'regular'],
      description: 'Classificação do município',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Otimo: Story = {
  args: {
    escoreCadastro: 4.5,
    escoreAcompanhamento: 4,
    notaFinal: 8.5,
    classificacao: 'otimo',
  },
};

export const Bom: Story = {
  args: {
    escoreCadastro: 3.5,
    escoreAcompanhamento: 3,
    notaFinal: 6.5,
    classificacao: 'bom',
  },
};

export const Suficiente: Story = {
  args: {
    escoreCadastro: 3,
    escoreAcompanhamento: 2,
    notaFinal: 5,
    classificacao: 'suficiente',
  },
};

export const Regular: Story = {
  args: {
    escoreCadastro: 1.5,
    escoreAcompanhamento: 2,
    notaFinal: 3.5,
    classificacao: 'regular',
  },
};

export const AllClassifications: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <ResultadoMunicipio
        escoreCadastro={4.5}
        escoreAcompanhamento={4}
        notaFinal={8.5}
        classificacao="otimo"
      />
      <ResultadoMunicipio
        escoreCadastro={3.5}
        escoreAcompanhamento={3}
        notaFinal={6.5}
        classificacao="bom"
      />
      <ResultadoMunicipio
        escoreCadastro={3}
        escoreAcompanhamento={2}
        notaFinal={5}
        classificacao="suficiente"
      />
      <ResultadoMunicipio
        escoreCadastro={1.5}
        escoreAcompanhamento={2}
        notaFinal={3.5}
        classificacao="regular"
      />
    </div>
  ),
};
