import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface CadastroResumoProps {
  totalPessoas?: number;
  cadastroAtualizado?: number;
  cadastroAtualizadoPercent?: number;
  semCadastroAtualizado?: number;
  semCadastroAtualizadoPercent?: number;
  cadastroIndividual?: number;
  cadastroCompleto?: number;
  periodoInicio?: string;
  periodoFim?: string;
}

export const CadastroResumo: React.FC<CadastroResumoProps> = ({
  totalPessoas = 15088,
  cadastroAtualizado = 13358,
  cadastroAtualizadoPercent = 88.5,
  semCadastroAtualizado = 1730,
  semCadastroAtualizadoPercent = 11.5,
  cadastroIndividual = 1041,
  cadastroCompleto = 12317,
  periodoInicio = '01/05/2024',
  periodoFim = '30/04/2026',
}) => {
  const chartData = [
    { name: 'Atualizado', value: cadastroAtualizado, color: '#3C8DBC' },
    { name: 'Desatualizado', value: semCadastroAtualizado, color: '#E5E7EB' },
  ];

  return (
    <div className="rounded-lg bg-card shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-base font-semibold text-foreground">Resumo</h3>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Donut Chart */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="relative w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={55}
                    paddingAngle={0}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    strokeWidth={0}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-foreground">
                  {totalPessoas.toLocaleString('pt-BR')}
                </span>
                <span className="text-xs text-muted-foreground text-center leading-tight">
                  total de pessoas<br />cadastradas
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {/* Cadastro Atualizado */}
            <div className="flex items-start gap-6">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1.5 w-3 h-3 rounded-full border-2 border-[#3C8DBC] shrink-0" />
                <div>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{cadastroAtualizado.toLocaleString('pt-BR')} ({cadastroAtualizadoPercent.toLocaleString('pt-BR')}%)</span>{' '}
                    pessoas com cadastro atualizado nos 24 meses anteriores à data de término do quadrimestre ({periodoInicio} - {periodoFim})
                  </p>
                </div>
              </div>
              
              {/* Detalhamento */}
              <div className="shrink-0 border-l-2 border-muted pl-4 space-y-3">
                <div>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{cadastroIndividual.toLocaleString('pt-BR')}</span> possuem apenas Cadastro Individual
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    FATOR MULTIPLICADOR: 0,75
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{cadastroCompleto.toLocaleString('pt-BR')}</span> possuem cadastro completo (Cadastro Individual + Cadastro Domiciliar)
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    FATOR MULTIPLICADOR: 1,50
                  </p>
                </div>
              </div>
            </div>

            {/* Sem Cadastro Atualizado */}
            <div className="flex items-start gap-3">
              <div className="mt-1.5 w-3 h-3 rounded-full border-2 border-muted-foreground/30 shrink-0" />
              <div>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">{semCadastroAtualizado.toLocaleString('pt-BR')} ({semCadastroAtualizadoPercent.toLocaleString('pt-BR')}%)</span>{' '}
                  pessoas sem cadastro atualizado nos 24 meses anteriores à data de término do quadrimestre ({periodoInicio} - {periodoFim})
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroResumo;
