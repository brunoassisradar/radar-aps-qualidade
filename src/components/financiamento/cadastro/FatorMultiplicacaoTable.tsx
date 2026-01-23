import React from 'react';

interface FatorRow {
  tipo: string;
  descricao: string;
  numeroPessoas: number;
  fator: number;
  total: number;
}

interface FatorMultiplicacaoTableProps {
  data?: FatorRow[];
}

const defaultData: FatorRow[] = [
  {
    tipo: 'Pessoas cadastradas',
    descricao: '(Apenas com cadastro individual atualizado)',
    numeroPessoas: 1041,
    fator: 0.75,
    total: 780,
  },
  {
    tipo: 'Pessoas com cadastro completo',
    descricao: '(Com cadastro individual e cadastro domiciliar atualizados)',
    numeroPessoas: 12317,
    fator: 1.50,
    total: 18475,
  },
];

export const FatorMultiplicacaoTable: React.FC<FatorMultiplicacaoTableProps> = ({
  data = defaultData,
}) => {
  return (
    <div className="rounded-lg bg-card p-6 shadow-sm">
      <h3 className="text-base font-semibold text-foreground mb-4">1. Fator multiplicação</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tipos de cadastro</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Número de pessoas</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Fator multiplicação</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border-border last:border-0">
                <td className="py-4 px-4">
                  <div>
                    <span className="text-sm font-medium text-foreground">{row.tipo}</span>
                    <p className="text-xs text-muted-foreground">{row.descricao}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="px-4 py-2 bg-muted rounded text-sm font-medium text-foreground">
                      {row.numeroPessoas.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-muted-foreground">×</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="px-4 py-2 bg-muted rounded text-sm font-medium text-foreground">
                      {row.fator.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-muted-foreground">=</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="px-4 py-2 bg-muted rounded text-sm font-medium text-foreground">
                    {row.total.toLocaleString('pt-BR')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
