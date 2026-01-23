import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from 'antd';

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
  periodoFim = '30/04/2026'
}) => {
  const chartData = [{
    name: 'Atualizado',
    value: cadastroAtualizado,
    color: '#3C8DBC'
  }, {
    name: 'Desatualizado',
    value: semCadastroAtualizado,
    color: '#E5E7EB'
  }];
  return <div className="rounded-lg bg-card shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-base font-semibold text-foreground">Resumo</h3>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Donut Chart */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="relative w-36 h-36">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={45} outerRadius={62} paddingAngle={0} dataKey="value" startAngle={90} endAngle={-270} strokeWidth={0}>
                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
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
            <div className="gap-6 flex items-center justify-start">
              <div className="gap-3 flex-1 flex items-center justify-start">
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
            <div className="gap-3 flex items-center justify-start">
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

      {/* Tabela Fator Multiplicação */}
      <div className="px-6 pb-6">
        <h4 className="text-sm font-semibold text-foreground mb-4">1. Fator multiplicação</h4>
        
        <div className="overflow-hidden rounded-lg border border-border">
          {/* Header */}
          <div className="grid grid-cols-[2fr_1fr_auto_1fr_auto_1fr] bg-muted/50 text-xs font-medium text-muted-foreground">
            <div className="px-4 py-3 text-center">Tipos de cadastro</div>
            <div className="px-4 py-3 text-center">Número de pessoas</div>
            <div className="px-2 py-3 text-center"></div>
            <div className="px-4 py-3 text-center">Fator multiplicação</div>
            <div className="px-2 py-3 text-center"></div>
            <div className="px-4 py-3 text-center">Total</div>
          </div>

          {/* Row 1 - Cadastro Individual */}
          <div className="grid grid-cols-[2fr_1fr_auto_1fr_auto_1fr] border-t border-border items-center">
            <div className="px-4 py-4">
              <p className="text-sm font-medium text-primary">Pessoas cadastradas</p>
              <p className="text-xs text-muted-foreground">(Apenas com cadastro individual atualizado)</p>
            </div>
            <div className="px-4 py-4 text-center">
              <span className="inline-flex items-center justify-center px-4 py-2 bg-muted/50 rounded text-sm font-medium text-foreground min-w-[80px]">
                {cadastroIndividual.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="px-2 py-4 text-center text-muted-foreground">×</div>
            <div className="px-4 py-4 text-center">
              <span className="inline-flex items-center justify-center px-4 py-2 bg-muted/50 rounded text-sm font-medium text-foreground min-w-[80px]">
                0,75
              </span>
            </div>
            <div className="px-2 py-4 text-center text-muted-foreground">=</div>
            <div className="px-4 py-4 text-center">
              <span className="text-sm font-semibold text-foreground">
                {Math.round(cadastroIndividual * 0.75).toLocaleString('pt-BR')}
              </span>
            </div>
          </div>

          {/* Row 2 - Cadastro Completo */}
          <div className="grid grid-cols-[2fr_1fr_auto_1fr_auto_1fr] border-t border-border items-center">
            <div className="px-4 py-4">
              <p className="text-sm font-medium text-primary">Pessoas com cadastro completo</p>
              <p className="text-xs text-muted-foreground">(Com cadastro individual e cadastro domiciliar atualizados)</p>
            </div>
            <div className="px-4 py-4 text-center">
              <span className="inline-flex items-center justify-center px-4 py-2 bg-muted/50 rounded text-sm font-medium text-foreground min-w-[80px]">
                {cadastroCompleto.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="px-2 py-4 text-center text-muted-foreground">×</div>
            <div className="px-4 py-4 text-center">
              <span className="inline-flex items-center justify-center px-4 py-2 bg-muted/50 rounded text-sm font-medium text-foreground min-w-[80px]">
                1,50
              </span>
            </div>
            <div className="px-2 py-4 text-center text-muted-foreground">=</div>
            <div className="px-4 py-4 text-center">
              <span className="text-sm font-semibold text-foreground">
                {Math.round(cadastroCompleto * 1.50).toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela População de Parâmetro */}
      <div className="px-6 pb-6">
        <h4 className="text-sm font-semibold text-foreground mb-1">2. População de parâmetro e limite máximo</h4>
        <p className="text-xs text-muted-foreground mb-4">
          A população parâmetro varia de acordo com o porte populacional do município e o tipo de equipe, conforme os valores a seguir:
        </p>
        
        <div className="overflow-hidden rounded-lg border border-border">
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr_auto_1.2fr_auto_1fr_1fr] bg-muted/50 text-xs font-medium text-muted-foreground">
            <div className="px-4 py-3 text-center">Tipo de equipe</div>
            <div className="px-4 py-3 text-center">Quantidade de equipes</div>
            <div className="px-2 py-3 text-center"></div>
            <div className="px-4 py-3 text-center flex items-center justify-center gap-1">
              Parâmetro de acordo com o porte
              <Tooltip title="O parâmetro varia de acordo com o porte populacional do município">
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
              </Tooltip>
            </div>
            <div className="px-2 py-3 text-center"></div>
            <div className="px-4 py-3 text-center">Parâmetro por tipo de equipe</div>
            <div className="px-4 py-3 text-center">Limite máximo (Parâmetro + 50%)</div>
          </div>

          {/* Row 1 - eSF */}
          <div className="grid grid-cols-[1fr_1fr_auto_1.2fr_auto_1fr_1fr] border-t border-border items-center">
            <div className="px-4 py-4 text-center">
              <span className="text-sm text-foreground">eSF</span>
            </div>
            <div className="px-4 py-4 text-center">
              <span className="inline-flex items-center justify-center px-4 py-2 bg-muted/50 rounded text-sm font-medium text-foreground min-w-[60px]">
                9
              </span>
            </div>
            <div className="px-2 py-4 text-center text-muted-foreground">×</div>
            <div className="px-4 py-4 text-center">
              <span className="inline-flex items-center justify-center px-4 py-2 bg-muted/50 rounded text-sm font-medium text-foreground min-w-[80px]">
                2.000
              </span>
            </div>
            <div className="px-2 py-4 text-center text-muted-foreground">=</div>
            <div className="px-4 py-4 text-center">
              <span className="inline-flex items-center justify-center px-4 py-2 bg-muted/50 rounded text-sm font-medium text-foreground min-w-[80px]">
                18.000
              </span>
            </div>
            <div className="px-4 py-4 text-center">
              <span className="text-sm font-semibold text-foreground">27.000</span>
            </div>
          </div>

          {/* Row 2 - eAP 20h */}
          <div className="grid grid-cols-[1fr_1fr_auto_1.2fr_auto_1fr_1fr] border-t border-border items-center">
            <div className="px-4 py-4 text-center">
              <span className="text-sm text-foreground">eAP 20h</span>
            </div>
            <div className="px-4 py-4 text-center">
              <span className="inline-flex items-center justify-center px-4 py-2 bg-muted/50 rounded text-sm font-medium text-foreground min-w-[60px]">
                0
              </span>
            </div>
            <div className="px-2 py-4 text-center text-muted-foreground">×</div>
            <div className="px-4 py-4 text-center">
              <span className="inline-flex items-center justify-center px-4 py-2 bg-muted/50 rounded text-sm font-medium text-foreground min-w-[80px]">
                1.000
              </span>
            </div>
            <div className="px-2 py-4 text-center text-muted-foreground">=</div>
            <div className="px-4 py-4 text-center">
              <span className="inline-flex items-center justify-center px-4 py-2 bg-muted/50 rounded text-sm font-medium text-foreground min-w-[80px]">
                0
              </span>
            </div>
            <div className="px-4 py-4 text-center">
              <span className="text-sm font-semibold text-foreground">0</span>
            </div>
          </div>

          {/* Row 3 - eAP 30h */}
          <div className="grid grid-cols-[1fr_1fr_auto_1.2fr_auto_1fr_1fr] border-t border-border items-center">
            <div className="px-4 py-4 text-center">
              <span className="text-sm text-foreground">eAP 30h</span>
            </div>
            <div className="px-4 py-4 text-center">
              <span className="inline-flex items-center justify-center px-4 py-2 bg-muted/50 rounded text-sm font-medium text-foreground min-w-[60px]">
                1
              </span>
            </div>
            <div className="px-2 py-4 text-center text-muted-foreground">×</div>
            <div className="px-4 py-4 text-center">
              <span className="inline-flex items-center justify-center px-4 py-2 bg-muted/50 rounded text-sm font-medium text-foreground min-w-[80px]">
                1.500
              </span>
            </div>
            <div className="px-2 py-4 text-center text-muted-foreground">=</div>
            <div className="px-4 py-4 text-center">
              <span className="inline-flex items-center justify-center px-4 py-2 bg-muted/50 rounded text-sm font-medium text-foreground min-w-[80px]">
                1.500
              </span>
            </div>
            <div className="px-4 py-4 text-center">
              <span className="text-sm font-semibold text-foreground">2.250</span>
            </div>
          </div>
        </div>

        {/* Footer totals */}
        <div className="mt-4 space-y-1 text-right">
          <p className="text-sm text-foreground">
            Valor total de população de parâmetro (por tipo de equipe) no município: <span className="font-semibold">19.500</span>
          </p>
          <p className="text-sm text-foreground">
            Valor limite máximo de população vinculada do município: <span className="font-semibold">29.250</span>
          </p>
        </div>
      </div>
    </div>;
};
export default CadastroResumo;