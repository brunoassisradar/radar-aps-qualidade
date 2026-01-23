import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList, Legend, Tooltip } from 'recharts';

interface TempoData {
  periodo: string;
  individual: number;
  domiciliar: number;
}

interface CadastrosTempoChartProps {
  data?: TempoData[];
  ultimoEnvioIndividual?: string;
  ultimoEnvioDomiciliar?: string;
}

const defaultData: TempoData[] = [
  { periodo: 'Há menos que 6 meses', individual: 7387, domiciliar: 9996 },
  { periodo: 'Entre 6 meses e 1 ano', individual: 3766, domiciliar: 2100 },
  { periodo: 'Entre 1 ano e 2 anos', individual: 2205, domiciliar: 2205 },
];

export const CadastrosTempoChart: React.FC<CadastrosTempoChartProps> = ({
  data = defaultData,
  ultimoEnvioIndividual = '15/01/2026',
  ultimoEnvioDomiciliar = '15/01/2026',
}) => {
  const maxValue = Math.max(...data.flatMap(d => [d.individual, d.domiciliar]));
  const yAxisMax = Math.ceil(maxValue / 5000) * 5000 + 2000;

  return (
    <div className="rounded-lg bg-card p-6 shadow-sm">
      <h3 className="text-base font-semibold text-foreground mb-6">
        Quantitativo de cadastros (individual e domiciliar) de acordo com o tempo desde a última atualização
      </h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barGap={4}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="periodo" 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
            />
            <YAxis 
              domain={[0, yAxisMax]}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
              tickFormatter={(value) => value.toLocaleString('pt-BR')}
            />
            <Tooltip 
              formatter={(value: number) => value.toLocaleString('pt-BR')}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
              }}
            />
            <Legend 
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ paddingTop: 20 }}
            />
            <Bar 
              dataKey="individual" 
              name="Individual" 
              fill="#6B7280" 
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            >
              <LabelList 
                dataKey="individual" 
                position="top" 
                fill="hsl(var(--muted-foreground))"
                fontSize={11}
                formatter={(value: number) => value.toLocaleString('pt-BR')}
              />
            </Bar>
            <Bar 
              dataKey="domiciliar" 
              name="Domiciliar" 
              fill="#3C8DBC" 
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            >
              <LabelList 
                dataKey="domiciliar" 
                position="top" 
                fill="hsl(var(--muted-foreground))"
                fontSize={11}
                formatter={(value: number) => value.toLocaleString('pt-BR')}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer info */}
      <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground">
        <div className="space-y-1">
          <p>Último envio de Cadastros Individuais do município foi em <strong className="text-foreground">{ultimoEnvioIndividual}</strong>.</p>
          <p>Último envio de Cadastros Domiciliares e territoriais do município foi em <strong className="text-foreground">{ultimoEnvioDomiciliar}</strong>.</p>
        </div>
        <Button type="default" size="small" className="self-start sm:self-auto">
          Ir para Recebimento de dados
        </Button>
      </div>
    </div>
  );
};

// Small internal button component to avoid importing
const Button: React.FC<{ type?: string; size?: string; className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => (
  <button className={`px-3 py-1.5 text-xs font-medium border border-border rounded-md hover:bg-muted transition-colors ${className}`}>
    {children}
  </button>
);
