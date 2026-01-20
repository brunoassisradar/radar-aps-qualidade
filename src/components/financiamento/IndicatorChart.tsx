import React from 'react';
import { ResponsiveBar, BarDatum } from '@nivo/bar';
import { Info } from 'lucide-react';
import { Tooltip } from 'antd';

interface IndicatorChartData extends BarDatum {
  equipe: string;
  equipeName: string;
  tooltipText: string;
  cumprioFinanciamento: number;
  cumprioBoaPratica: number;
  naoCumpriu: number;
}

interface KpiConfig {
  label: string;
  value: number;
}

interface IndicatorChartProps {
  data?: IndicatorChartData[];
  selectedIndicador?: string;
  kpiValues?: {
    primary?: number;
    secondary?: number;
  };
}

const getKpiConfig = (indicador: string, values: { primary?: number; secondary?: number }): KpiConfig[] => {
  const primary = values.primary ?? 0;
  const secondary = values.secondary ?? 0;

  switch (indicador) {
    case 'c1':
      return [
        { label: 'Demandas programadas', value: primary },
        { label: 'Demandas espontâneas', value: secondary },
      ];
    case 'c2':
      return [{ label: 'Total de crianças', value: primary }];
    case 'c3':
      return [
        { label: 'Total de gestantes', value: primary },
        { label: 'Total de puérperas', value: secondary },
      ];
    case 'c4':
      return [{ label: 'Total de pessoas com Diabetes', value: primary }];
    case 'c5':
      return [{ label: 'Total de pessoas com Hipertensão', value: primary }];
    case 'c6':
      return [{ label: 'Total de pessoas idosas', value: primary }];
    case 'c7':
      return [{ label: 'Total de mulheres', value: primary }];
    default:
      return [{ label: 'Total', value: primary }];
  }
};

const defaultData: IndicatorChartData[] = [
  { equipe: 'A', equipeName: 'Equipe A', tooltipText: 'Equipe A - UBS Centro', cumprioFinanciamento: 45, cumprioBoaPratica: 30, naoCumpriu: 25 },
  { equipe: 'B', equipeName: 'Equipe B', tooltipText: 'Equipe B - UBS Norte', cumprioFinanciamento: 50, cumprioBoaPratica: 25, naoCumpriu: 25 },
  { equipe: 'C', equipeName: 'Equipe C', tooltipText: 'Equipe C - UBS Sul', cumprioFinanciamento: 40, cumprioBoaPratica: 35, naoCumpriu: 25 },
  { equipe: 'D', equipeName: 'Equipe D', tooltipText: 'Equipe D - UBS Leste', cumprioFinanciamento: 55, cumprioBoaPratica: 25, naoCumpriu: 20 },
  { equipe: 'E', equipeName: 'Equipe E', tooltipText: 'Equipe E - UBS Oeste', cumprioFinanciamento: 35, cumprioBoaPratica: 30, naoCumpriu: 35 },
  { equipe: 'F', equipeName: 'Equipe F', tooltipText: 'Equipe F - UBS Central', cumprioFinanciamento: 60, cumprioBoaPratica: 20, naoCumpriu: 20 },
  { equipe: 'G', equipeName: 'Equipe G', tooltipText: 'Equipe G - UBS Vila Nova', cumprioFinanciamento: 48, cumprioBoaPratica: 32, naoCumpriu: 20 },
  { equipe: 'H', equipeName: 'Equipe H', tooltipText: 'Equipe H - UBS Jardim', cumprioFinanciamento: 52, cumprioBoaPratica: 28, naoCumpriu: 20 },
  { equipe: 'I', equipeName: 'Equipe I', tooltipText: 'Equipe I - UBS Parque', cumprioFinanciamento: 42, cumprioBoaPratica: 33, naoCumpriu: 25 },
  { equipe: 'J', equipeName: 'Equipe J', tooltipText: 'Equipe J - UBS Industrial', cumprioFinanciamento: 30, cumprioBoaPratica: 25, naoCumpriu: 45 },
];

const chartColors = {
  cumprioFinanciamento: '#3C8DBC',
  cumprioBoaPratica: '#F0AD4E',
  naoCumpriu: '#DD4B39',
};

const legendLabels: Record<string, string> = {
  cumprioFinanciamento: 'Cumpriu e contabiliza para o financiamento',
  cumprioBoaPratica: 'Cumpriu boa prática',
  naoCumpriu: 'Não cumpriu boa prática',
};

export const IndicatorChart: React.FC<IndicatorChartProps> = ({
  data = defaultData,
  selectedIndicador = 'c3',
  kpiValues = { primary: 50, secondary: 40 },
}) => {
  const kpis = getKpiConfig(selectedIndicador, kpiValues);

  const CustomAxisTick = ({ x, y, value }: { x: number; y: number; value: string }) => {
    const item = data.find(d => d.equipe === value);
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={16}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: 12,
            fill: 'hsl(220, 9%, 46%)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {value}
        </text>
        <foreignObject x={-8} y={24} width={16} height={16}>
          <Tooltip title={item?.tooltipText || `Equipe ${value}`} placement="bottom">
            <div className="flex items-center justify-center cursor-pointer">
              <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-primary transition-colors" />
            </div>
          </Tooltip>
        </foreignObject>
      </g>
    );
  };

  return (
    <div className="space-y-6">
      {/* KPIs dinâmicos baseados no indicador */}
      <div className={`grid gap-4 ${kpis.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-1 max-w-xs'}`}>
        {kpis.map((kpi, index) => (
          <div 
            key={kpi.label}
            className={`rounded-xl border border-primary/20 p-4 ${
              index === 0 
                ? 'bg-gradient-to-br from-primary/10 to-primary/5' 
                : 'bg-gradient-to-br from-accent to-accent/50'
            }`}
          >
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Legenda do gráfico */}
      <div className="flex flex-wrap items-center gap-6 px-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.cumprioFinanciamento }} />
          <span className="text-sm text-muted-foreground">{legendLabels.cumprioFinanciamento}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.cumprioBoaPratica }} />
          <span className="text-sm text-muted-foreground">{legendLabels.cumprioBoaPratica}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.naoCumpriu }} />
          <span className="text-sm text-muted-foreground">{legendLabels.naoCumpriu}</span>
        </div>
      </div>

      {/* Gráfico 100% empilhado */}
      <div className="h-[360px] rounded-lg bg-muted/30 p-4">
        <ResponsiveBar
          data={data}
          keys={['cumprioFinanciamento', 'cumprioBoaPratica', 'naoCumpriu']}
          indexBy="equipe"
          margin={{ top: 20, right: 20, bottom: 60, left: 50 }}
          padding={0.35}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={[chartColors.cumprioFinanciamento, chartColors.cumprioBoaPratica, chartColors.naoCumpriu]}
          borderRadius={0}
          axisBottom={{
            tickSize: 0,
            tickPadding: 12,
            tickRotation: 0,
            renderTick: CustomAxisTick,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 12,
            tickValues: [0, 20, 40, 60, 80, 100],
            format: (v) => `${v}%`,
          }}
          gridYValues={[0, 20, 40, 60, 80, 100]}
          enableLabel={true}
          label={({ value }) => `${value}`}
          labelSkipWidth={20}
          labelSkipHeight={12}
          labelTextColor="#ffffff"
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
          tooltip={({ id, value, color, indexValue }) => {
            const item = data.find(d => d.equipe === indexValue);
            return (
              <div className="bg-card border border-border rounded-lg px-4 py-3 shadow-xl">
                <p className="text-xs font-medium text-muted-foreground mb-1">{item?.equipeName || `Equipe ${indexValue}`}</p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-sm font-medium text-foreground">
                    {legendLabels[id as string]}: {value}%
                  </span>
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};
