import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from 'antd';

interface EquipeParametroRow {
  tipoEquipe: string;
  quantidade: number;
  parametroPorPorte: number;
  parametroPorTipo: number;
  limiteMaximo: number;
}

interface PopulacaoParametroTableProps {
  data?: EquipeParametroRow[];
  totalParametro?: number;
  totalLimiteMaximo?: number;
}

const defaultData: EquipeParametroRow[] = [
  {
    tipoEquipe: 'eSF',
    quantidade: 9,
    parametroPorPorte: 2000,
    parametroPorTipo: 18000,
    limiteMaximo: 27000,
  },
  {
    tipoEquipe: 'eAP 20h',
    quantidade: 0,
    parametroPorPorte: 1000,
    parametroPorTipo: 0,
    limiteMaximo: 0,
  },
  {
    tipoEquipe: 'eAP 30h',
    quantidade: 1,
    parametroPorPorte: 1500,
    parametroPorTipo: 1500,
    limiteMaximo: 2250,
  },
];

export const PopulacaoParametroTable: React.FC<PopulacaoParametroTableProps> = ({
  data = defaultData,
  totalParametro = 19500,
  totalLimiteMaximo = 29250,
}) => {
  return (
    <div className="rounded-lg bg-card p-6 shadow-sm">
      <h3 className="text-base font-semibold text-foreground mb-2">2. População de parâmetro e limite máximo</h3>
      <p className="text-xs text-muted-foreground mb-4">
        A população parâmetro varia de acordo com o porte populacional do município e o tipo de equipe, conforme os valores a seguir:
      </p>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tipo de equipe</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Quantidade de equipes</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                <div className="flex items-center justify-center gap-1">
                  Parâmetro de acordo com o porte
                  <Tooltip title="Valor do parâmetro populacional definido de acordo com o porte do município">
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </Tooltip>
                </div>
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Parâmetro por tipo de equipe</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Limite máximo (Parâmetro + 50%)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border-border last:border-0">
                <td className="py-4 px-4">
                  <span className="px-4 py-2 bg-muted rounded text-sm font-medium text-foreground">
                    {row.tipoEquipe}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="px-4 py-2 bg-muted rounded text-sm font-medium text-foreground">
                    {row.quantidade}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-muted-foreground">×</span>
                    <span className="px-4 py-2 bg-muted rounded text-sm font-medium text-foreground">
                      {row.parametroPorPorte.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-muted-foreground">=</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="px-4 py-2 bg-muted rounded text-sm font-medium text-foreground">
                    {row.parametroPorTipo.toLocaleString('pt-BR')}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="px-4 py-2 bg-muted rounded text-sm font-medium text-foreground">
                    {row.limiteMaximo.toLocaleString('pt-BR')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right space-y-1">
        <p className="text-sm text-muted-foreground">
          Valor total de população de parâmetro (por tipo de equipe) no município: <strong className="text-foreground">{totalParametro.toLocaleString('pt-BR')}</strong>
        </p>
        <p className="text-sm text-muted-foreground">
          Valor limite máximo de população vinculada do município: <strong className="text-foreground">{totalLimiteMaximo.toLocaleString('pt-BR')}</strong>
        </p>
      </div>
    </div>
  );
};
