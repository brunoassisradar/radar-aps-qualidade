import type { Meta, StoryObj } from '@storybook/react';
import { ClassificationCard } from './ClassificationCard';

const meta: Meta<typeof ClassificationCard> = {
  title: 'Molecules/ClassificationCard',
  component: ClassificationCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    classification: {
      control: 'select',
      options: ['otimo', 'bom', 'suficiente', 'regular'],
      description: 'Classificação do status da equipe',
    },
    count: {
      control: 'number',
      description: 'Número de equipes nesta classificação',
    },
    description: {
      control: 'text',
      description: 'Descrição adicional sobre a classificação',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Otimo: Story = {
  args: {
    classification: 'otimo',
    count: 12,
    description: 'Equipes com desempenho excepcional em todos os indicadores',
  },
};

export const Bom: Story = {
  args: {
    classification: 'bom',
    count: 8,
    description: 'Equipes com bom desempenho na maioria dos indicadores',
  },
};

export const Suficiente: Story = {
  args: {
    classification: 'suficiente',
    count: 5,
    description: 'Equipes que atingiram o mínimo necessário',
  },
};

export const Regular: Story = {
  args: {
    classification: 'regular',
    count: 3,
    description: 'Equipes que precisam melhorar seus indicadores',
  },
};

export const AllClassifications: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
      <ClassificationCard
        classification="otimo"
        count={12}
        description="Equipes com desempenho excepcional"
      />
      <ClassificationCard
        classification="bom"
        count={8}
        description="Equipes com bom desempenho"
      />
      <ClassificationCard
        classification="suficiente"
        count={5}
        description="Equipes que atingiram o mínimo"
      />
      <ClassificationCard
        classification="regular"
        count={3}
        description="Equipes que precisam melhorar"
      />
    </div>
  ),
};
