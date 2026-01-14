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
    <div className="rounded-lg bg-card p-4 shadow-sm">
      <div className="flex items-center gap-8 mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Total de gestantes</p>
          <p className="text-2xl font-semibold text-foreground">{totalGestantes}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total de puérperas</p>
          <p className="text-2xl font-semibold text-foreground">{totalPuerperas}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#3182CE]" />
          <span className="text-sm text-muted-foreground">Cumpriu e contabiliza para o financiamento</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#90CDF4]" />
          <span className="text-sm text-muted-foreground">Cumpriu boa prática de saúde</span>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveBar
          data={data}
          keys={['financiamento', 'boasPraticas']}
          indexBy="equipe"
          margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
          padding={0.3}
          groupMode="stacked"
          colors={['#3182CE', '#90CDF4']}
          borderRadius={4}
          axisBottom={{
            tickSize: 0,
            tickPadding: 8,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 8,
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
                  fill: '#64748b',
                },
              },
            },
            grid: {
              line: {
                stroke: '#e2e8f0',
                strokeWidth: 1,
              },
            },
          }}
          tooltip={({ id, value, color }) => (
            <div className="bg-card border border-border rounded px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
                <span className="text-sm">
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
