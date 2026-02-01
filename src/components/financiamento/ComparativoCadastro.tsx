import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Cell, LabelList } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

interface ComparativoCadastroProps {
  municipio?: string;
  pessoasCadastradas?: number;
  pessoasCadastroAtualizado?: number;
  pessoasAcompanhadas?: number;
  populacaoIBGE?: number;
  populacaoLimite?: number;
}

export const ComparativoCadastro: React.FC<ComparativoCadastroProps> = ({
  municipio = 'Lorem ipsum*',
  pessoasCadastradas = 2339333,
  pessoasCadastroAtualizado = 1500703,
  pessoasAcompanhadas = 825242,
  populacaoIBGE = 2800000,
  populacaoLimite = 3200000,
}) => {
  const isMobile = useIsMobile();
  
  const data = [
    { name: 'Pessoas cadastradas', value: pessoasCadastradas, color: '#A8D5E5' },
    { name: 'Pessoas com cadastro atualizado', value: pessoasCadastroAtualizado, color: '#3B82F6' },
    { name: 'Pessoas acompanhadas', value: pessoasAcompanhadas, color: '#1E40AF' },
  ];

  const maxValue = Math.max(pessoasCadastradas, populacaoLimite) * 1.1;

  const formatNumber = (value: number) => {
    if (isMobile) {
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toLocaleString('pt-BR');
  };

  return (
    <div className="bg-card rounded-lg shadow-sm p-4 sm:p-6">
      <div className="mb-3 sm:mb-4">
        <h3 className="text-sm sm:text-base font-semibold text-foreground">
          Comparativo de pessoas cadastradas e acompanhadas
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Clique para visualizar os cidadãos cadastrados, com o cadastro atualizado e acompanhados.
        </p>
      </div>

      {/* Legend - responsive wrap */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5 sm:gap-2">
            <span 
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs sm:text-sm text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="text-xs sm:text-sm text-muted-foreground sm:w-24 sm:text-right shrink-0">
            {municipio}
          </div>
          <div className="flex-1 w-full h-24 sm:h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={data}
                margin={{ 
                  top: 5, 
                  right: isMobile ? 60 : 120, 
                  left: 0, 
                  bottom: 5 
                }}
              >
                <XAxis 
                  type="number" 
                  domain={[0, maxValue]} 
                  tickFormatter={formatNumber}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: isMobile ? 9 : 11, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  hide 
                />
                {!isMobile && (
                  <>
                    <ReferenceLine
                      x={populacaoIBGE}
                      stroke="#9CA3AF"
                      strokeDasharray="4 4"
                      label={{
                        value: 'Pop. parâmetro IBGE',
                        position: 'top',
                        fill: 'hsl(var(--muted-foreground))',
                        fontSize: 10,
                        textAnchor: 'middle',
                      }}
                    />
                    <ReferenceLine
                      x={populacaoLimite}
                      stroke="#9CA3AF"
                      strokeDasharray="4 4"
                      label={{
                        value: 'Pop. limite máximo',
                        position: 'insideBottomRight',
                        fill: 'hsl(var(--muted-foreground))',
                        fontSize: 10,
                        dy: 20,
                      }}
                    />
                  </>
                )}
                <Bar 
                  dataKey="value" 
                  radius={[0, 4, 4, 0]}
                  barSize={isMobile ? 18 : 24}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList 
                    dataKey="value" 
                    position="right"
                    formatter={formatNumber}
                    style={{ 
                      fontSize: isMobile ? 10 : 12, 
                      fill: 'hsl(var(--foreground))',
                      fontWeight: 500,
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* X-axis start label */}
        <div className="absolute bottom-0 left-0 sm:left-24 text-xs text-muted-foreground">0</div>
      </div>

      {/* Mobile reference lines legend */}
      {isMobile && (
        <div className="mt-3 pt-3 border-t border-border space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-4 h-0 border-t-2 border-dashed border-gray-400" />
            <span>Pop. parâmetro IBGE: {formatNumber(populacaoIBGE)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-4 h-0 border-t-2 border-dashed border-gray-400" />
            <span>Pop. limite máximo: {formatNumber(populacaoLimite)}</span>
          </div>
        </div>
      )}
    </div>
  );
};
