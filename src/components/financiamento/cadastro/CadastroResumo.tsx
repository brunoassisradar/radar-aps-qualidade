import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface CadastroResumoProps {
  totalCadastradas: number;
  cadastroAtualizado: number;
  cadastroDesatualizado: number;
  apenasIndividual: number;
  cadastroCompleto: number;
}

export const CadastroResumo: React.FC<Partial<CadastroResumoProps>> = ({
  totalCadastradas = 15088,
  cadastroAtualizado = 13358,
  cadastroDesatualizado = 1730,
  apenasIndividual = 1041,
  cadastroCompleto = 12317,
}) => {
  const percentAtualizado = ((cadastroAtualizado / totalCadastradas) * 100).toFixed(1);
  const percentDesatualizado = ((cadastroDesatualizado / totalCadastradas) * 100).toFixed(1);

  const donutData = [
    { name: 'Atualizado', value: cadastroAtualizado, color: '#3C8DBC' },
    { name: 'Desatualizado', value: cadastroDesatualizado, color: '#E5E7EB' },
  ];

  return (
    <div className="rounded-lg bg-card p-6 shadow-sm">
      <h3 className="text-base font-semibold text-foreground mb-6">Resumo</h3>
      
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Donut Chart */}
        <div className="relative w-40 h-40 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">{totalCadastradas.toLocaleString('pt-BR')}</span>
            <span className="text-xs text-muted-foreground text-center leading-tight">total de pessoas<br />cadastradas</span>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-4">
          {/* Atualizado */}
          <div className="flex items-start gap-3">
            <span className="w-3 h-3 rounded-full bg-[#3C8DBC] mt-1.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-foreground">
                <strong>{cadastroAtualizado.toLocaleString('pt-BR')} ({percentAtualizado}%)</strong> pessoas com cadastro atualizado nos 24 meses anteriores à data de término do quadrimestre (01/05/2024 - 30/04/2026).
              </p>
              <div className="mt-2 pl-4 border-l-2 border-muted space-y-1">
                <p className="text-xs text-muted-foreground">
                  • <strong>{apenasIndividual.toLocaleString('pt-BR')}</strong> possuem apenas Cadastro Individual<br />
                  <span className="text-[10px] uppercase tracking-wider">Fator multiplicador: 0,75</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  • <strong>{cadastroCompleto.toLocaleString('pt-BR')}</strong> possuem cadastro completo (Cadastro Individual + Cadastro Domiciliar)<br />
                  <span className="text-[10px] uppercase tracking-wider">Fator multiplicador: 1,50</span>
                </p>
              </div>
            </div>
          </div>

          {/* Desatualizado */}
          <div className="flex items-start gap-3">
            <span className="w-3 h-3 rounded-full bg-muted mt-1.5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              <strong>{cadastroDesatualizado.toLocaleString('pt-BR')} ({percentDesatualizado}%)</strong> pessoas sem cadastro atualizado nos 24 meses anteriores à data de término do quadrimestre (01/05/2024 - 30/04/2026).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
