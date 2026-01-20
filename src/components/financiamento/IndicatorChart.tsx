import React from 'react';
import { ResponsiveBar, BarDatum } from '@nivo/bar';

interface IndicatorChartData extends BarDatum {
  equipe: string;
  financiamento: number;
  boasPraticas: number;
}

interface IndicatorChartProps {
  data?: IndicatorChartData[];
  totalGestantes?: number;
  totalPuerperas?: number;
}

const defaultData: IndicatorChartData[] = [
  { equipe: 'A ☺', financiamento: 30, boasPraticas: 80 },
  { equipe: 'B ☺', financiamento: 25, boasPraticas: 80 },
  { equipe: 'C ☺', financiamento: 22, boasPraticas: 80 },
  { equipe: 'D ☺', financiamento: 28, boasPraticas: 80 },
  { equipe: 'E ☺', financiamento: 20, boasPraticas: 80 },
  { equipe: 'F ☺', financiamento: 26, boasPraticas: 80 },
  { equipe: 'G ☺', financiamento: 24, boasPraticas: 80 },
  { equipe: 'H ☺', financiamento: 27, boasPraticas: 80 },
  { equipe: 'I ☺', financiamento: 23, boasPraticas: 80 },
  { equipe: 'J ☺', financiamento: 21, boasPraticas: 8 },
];

export const IndicatorChart: React.FC<IndicatorChartProps> = ({
  data = defaultData,
  totalGestantes = 50,
  totalPuerperas = 40,
}) => {
  return (
    <div className="space-y-6">
      {/* KPIs em cards destacados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total de gestantes</p>
            <p className="text-2xl font-bold text-foreground">{totalGestantes}</p>
          </div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-accent to-accent/50 border border-primary/20 p-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total de puérperas</p>
            <p className="text-2xl font-bold text-foreground">{totalPuerperas}</p>
          </div>
        </div>
      </div>

      {/* Legenda do gráfico */}
      <div className="flex flex-wrap items-center gap-6 px-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-primary))]" />
          <span className="text-sm text-muted-foreground">Cumpriu e contabiliza para o financiamento</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-secondary))]" />
          <span className="text-sm text-muted-foreground">Cumpriu boa prática de saúde</span>
        </div>
      </div>

      {/* Gráfico */}
      <div className="h-[320px] rounded-lg bg-muted/30 p-4">
        <ResponsiveBar
          data={data}
          keys={['financiamento', 'boasPraticas']}
          indexBy="equipe"
          margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
          padding={0.35}
          groupMode="stacked"
          colors={['hsl(214, 100%, 50%)', 'hsl(214, 60%, 70%)']}
          borderRadius={6}
          axisBottom={{
            tickSize: 0,
            tickPadding: 12,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 12,
            tickValues: [0, 20, 40, 60, 80, 100],
            format: (v) => `${v}%`,
          }}
          gridYValues={[0, 20, 40, 60, 80, 100]}
          enableLabel={false}
          theme={{
            axis: {
              ticks: {
                text: {
                  fontSize: 12,
                  fill: 'hsl(220, 9%, 46%)',
                  fontFamily: 'Inter, sans-serif',
                },
              },
            },
            grid: {
              line: {
                stroke: 'hsl(220, 13%, 91%)',
                strokeWidth: 1,
                strokeDasharray: '4 4',
              },
            },
          }}
          tooltip={({ id, value, color, indexValue }) => (
            <div className="bg-card border border-border rounded-lg px-4 py-3 shadow-xl">
              <p className="text-xs font-medium text-muted-foreground mb-1">Equipe {indexValue}</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-sm font-medium text-foreground">
                  {id === 'financiamento' ? 'Financiamento' : 'Boas práticas'}: {value}%
                </span>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};
