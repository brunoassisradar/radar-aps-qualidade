import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { AppLayout } from './AppLayout';

const meta: Meta<typeof AppLayout> = {
  title: 'Templates/AppLayout',
  component: AppLayout,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
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

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Conteúdo da Página</h1>
        <p className="text-muted-foreground">
          Este é um exemplo do layout principal da aplicação com sidebar e header.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <h3 className="font-semibold mb-2">Card {i}</h3>
              <p className="text-sm text-muted-foreground">
                Conteúdo do card de exemplo.
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

export const WithTable: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Relatório de Equipes</h1>
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 text-sm font-medium">Equipe</th>
                <th className="text-left p-3 text-sm font-medium">Unidade</th>
                <th className="text-left p-3 text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {['ESF Vila Nova', 'ESF Centro', 'ESF Norte'].map((equipe, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 text-sm">{equipe}</td>
                  <td className="p-3 text-sm">UBS {i + 1}</td>
                  <td className="p-3 text-sm">
                    <span className="px-2 py-1 bg-status-bom/20 text-status-bom rounded text-xs">
                      Ativo
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
};

export const Empty: Story = {
  args: {
    children: (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-muted-foreground">Nenhum conteúdo</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Selecione uma opção no menu para começar.
          </p>
        </div>
      </div>
    ),
  },
};
