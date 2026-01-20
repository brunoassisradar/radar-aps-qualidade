import React from 'react';
import { ResponsiveBar, BarDatum } from '@nivo/bar';
import { Info } from 'lucide-react';
import { Tooltip } from 'antd';

interface IndicatorChartData {
  equipe: string;
  equipeName: string;
  tooltipText: string;
  // Grupo 1: Boa prática
  cumprioBoaPratica: number;
  naoCumpriuBoaPratica: number;
  // Grupo 2: Cadastro
  cumprioECadastroOk: number;
  cumprioComPendencia: number;
  [key: string]: string | number;
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
  { equipe: 'A', equipeName: 'Equipe A', tooltipText: 'Equipe A - UBS Centro', cumprioBoaPratica: 45, naoCumpriuBoaPratica: 55, cumprioECadastroOk: 60, cumprioComPendencia: 40 },
  { equipe: 'B', equipeName: 'Equipe B', tooltipText: 'Equipe B - UBS Norte', cumprioBoaPratica: 50, naoCumpriuBoaPratica: 50, cumprioECadastroOk: 70, cumprioComPendencia: 30 },
  { equipe: 'C', equipeName: 'Equipe C', tooltipText: 'Equipe C - UBS Sul', cumprioBoaPratica: 40, naoCumpriuBoaPratica: 60, cumprioECadastroOk: 55, cumprioComPendencia: 45 },
  { equipe: 'D', equipeName: 'Equipe D', tooltipText: 'Equipe D - UBS Leste', cumprioBoaPratica: 55, naoCumpriuBoaPratica: 45, cumprioECadastroOk: 65, cumprioComPendencia: 35 },
  { equipe: 'E', equipeName: 'Equipe E', tooltipText: 'Equipe E - UBS Oeste', cumprioBoaPratica: 35, naoCumpriuBoaPratica: 65, cumprioECadastroOk: 50, cumprioComPendencia: 50 },
  { equipe: 'F', equipeName: 'Equipe F', tooltipText: 'Equipe F - UBS Central', cumprioBoaPratica: 60, naoCumpriuBoaPratica: 40, cumprioECadastroOk: 75, cumprioComPendencia: 25 },
  { equipe: 'G', equipeName: 'Equipe G', tooltipText: 'Equipe G - UBS Vila Nova', cumprioBoaPratica: 48, naoCumpriuBoaPratica: 52, cumprioECadastroOk: 62, cumprioComPendencia: 38 },
  { equipe: 'H', equipeName: 'Equipe H', tooltipText: 'Equipe H - UBS Jardim', cumprioBoaPratica: 52, naoCumpriuBoaPratica: 48, cumprioECadastroOk: 68, cumprioComPendencia: 32 },
  { equipe: 'I', equipeName: 'Equipe I', tooltipText: 'Equipe I - UBS Parque', cumprioBoaPratica: 42, naoCumpriuBoaPratica: 58, cumprioECadastroOk: 58, cumprioComPendencia: 42 },
  { equipe: 'J', equipeName: 'Equipe J', tooltipText: 'Equipe J - UBS Industrial', cumprioBoaPratica: 30, naoCumpriuBoaPratica: 70, cumprioECadastroOk: 45, cumprioComPendencia: 55 },
  { equipe: 'K', equipeName: 'Equipe K', tooltipText: 'Equipe K - UBS Rural', cumprioBoaPratica: 38, naoCumpriuBoaPratica: 62, cumprioECadastroOk: 52, cumprioComPendencia: 48 },
];

// Cores para os 4 segmentos (seguindo as cores semânticas do projeto)
const chartColors = {
  // Grupo Boa Prática
  cumprioBoaPratica: '#00A65A',      // Verde - Bom
  naoCumpriuBoaPratica: '#DD4B39',   // Vermelho - Regular
  // Grupo Cadastro
  cumprioECadastroOk: '#3C8DBC',     // Azul - Ótimo
  cumprioComPendencia: '#F0AD4E',    // Amarelo - Suficiente
};

const legendLabels: Record<string, string> = {
  cumprioBoaPratica: 'Cumpriu boa prática',
  naoCumpriuBoaPratica: 'Não cumpriu',
  cumprioECadastroOk: 'Cumpriu e cadastro ok',
  cumprioComPendencia: 'Cumpriu mas com pendência de cadastro',
};

// Transforma dados para formato de barras agrupadas (2 barras por equipe)
interface GroupedBarData extends BarDatum {
  id: string;
  equipe: string;
  equipeName: string;
  tooltipText: string;
  groupType: 'boaPratica' | 'cadastro';
  stack1: number;
  stack2: number;
  [key: string]: string | number;
}

const transformDataForGroupedBars = (data: IndicatorChartData[]): GroupedBarData[] => {
  const result: GroupedBarData[] = [];
  
  data.forEach((item) => {
    // Barra 1: Boa Prática
    result.push({
      id: `${item.equipe}-bp`,
      equipe: item.equipe,
      equipeName: item.equipeName,
      tooltipText: item.tooltipText,
      groupType: 'boaPratica',
      stack1: item.cumprioBoaPratica,
      stack2: item.naoCumpriuBoaPratica,
    });
    // Barra 2: Cadastro
    result.push({
      id: `${item.equipe}-cad`,
      equipe: item.equipe,
      equipeName: item.equipeName,
      tooltipText: item.tooltipText,
      groupType: 'cadastro',
      stack1: item.cumprioECadastroOk,
      stack2: item.cumprioComPendencia,
    });
  });
  
  return result;
};

export const IndicatorChart: React.FC<IndicatorChartProps> = ({
  data = defaultData,
  selectedIndicador = 'c3',
  kpiValues = { primary: 50, secondary: 40 },
}) => {
  const kpis = getKpiConfig(selectedIndicador, kpiValues);
  const groupedData = transformDataForGroupedBars(data);

  // Custom tick que mostra a letra da equipe + ícone info apenas uma vez por grupo
  const CustomAxisTick = ({ x, y, value }: { x: number; y: number; value: string }) => {
    // value será algo como "A-bp" ou "A-cad"
    const equipeId = value.split('-')[0];
    const barType = value.split('-')[1];
    const item = data.find(d => d.equipe === equipeId);
    
    // Só mostra o label na primeira barra do grupo (bp)
    if (barType !== 'bp') {
      return null;
    }
    
    return (
      <g transform={`translate(${x + 15},${y})`}>
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
          {equipeId}
        </text>
        <foreignObject x={-8} y={24} width={16} height={16}>
          <Tooltip title={item?.tooltipText || `Equipe ${equipeId}`} placement="bottom">
            <div className="flex items-center justify-center cursor-pointer">
              <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-primary transition-colors" />
            </div>
          </Tooltip>
        </foreignObject>
      </g>
    );
  };

  // Função para obter cor baseado no tipo de barra e stack
  const getBarColor = (bar: { id: string; data: GroupedBarData }) => {
    const { groupType } = bar.data;
    const stackKey = bar.id as string;
    
    if (groupType === 'boaPratica') {
      return stackKey === 'stack1' ? chartColors.cumprioBoaPratica : chartColors.naoCumpriuBoaPratica;
    } else {
      return stackKey === 'stack1' ? chartColors.cumprioECadastroOk : chartColors.cumprioComPendencia;
    }
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

      {/* Legenda do gráfico - dividida em dois grupos */}
      <div className="space-y-3 px-1">
        <div className="flex flex-wrap items-center gap-6">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Boa Prática:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.cumprioBoaPratica }} />
            <span className="text-sm text-muted-foreground">{legendLabels.cumprioBoaPratica}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.naoCumpriuBoaPratica }} />
            <span className="text-sm text-muted-foreground">{legendLabels.naoCumpriuBoaPratica}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cadastro:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.cumprioECadastroOk }} />
            <span className="text-sm text-muted-foreground">{legendLabels.cumprioECadastroOk}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.cumprioComPendencia }} />
            <span className="text-sm text-muted-foreground">{legendLabels.cumprioComPendencia}</span>
          </div>
        </div>
      </div>

      {/* Gráfico de barras agrupadas e empilhadas */}
      <div className="h-[360px] rounded-lg bg-muted/30 p-4">
        <ResponsiveBar
          data={groupedData}
          keys={['stack1', 'stack2']}
          indexBy="id"
          margin={{ top: 20, right: 20, bottom: 60, left: 50 }}
          padding={0.1}
          innerPadding={2}
          groupMode="stacked"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={(bar) => getBarColor(bar as { id: string; data: GroupedBarData })}
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
          tooltip={({ id, value, color, data: barData }) => {
            const typedData = barData as GroupedBarData;
            const isBoaPratica = typedData.groupType === 'boaPratica';
            const stackLabel = id === 'stack1' 
              ? (isBoaPratica ? legendLabels.cumprioBoaPratica : legendLabels.cumprioECadastroOk)
              : (isBoaPratica ? legendLabels.naoCumpriuBoaPratica : legendLabels.cumprioComPendencia);
            const groupLabel = isBoaPratica ? 'Boa Prática' : 'Cadastro';
            
            return (
              <div className="bg-card border border-border rounded-lg px-4 py-3 shadow-xl">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  {typedData.equipeName} • {groupLabel}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-sm font-medium text-foreground">
                    {stackLabel}: {value}%
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
