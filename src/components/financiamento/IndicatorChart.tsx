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
// Ordem: 1º Azul, 2º Verde, 3º Amarelo, 4º Vermelho
const chartColors = {
  cumprioContabiliza: '#3C8DBC',     // Azul - Ótimo (1º)
  cumprioNaoContabiliza: '#00A65A',  // Verde - Bom (2º)
  naoCumpriuCadastroOk: '#F0AD4E',   // Amarelo - Suficiente (3º)
  naoCumpriuPendencia: '#DD4B39',    // Vermelho - Regular (4º)
};

const legendLabels: Record<string, string> = {
  cumprioContabiliza: 'Cumpriu boa prática e contabiliza para o financiamento',
  cumprioNaoContabiliza: 'Cumpriu boa prática mas NÃO contabiliza por pendência de cadastro',
  naoCumpriuCadastroOk: 'Não cumpriu e cadastro ok',
  naoCumpriuPendencia: 'Não cumpriu e com pendência de cadastro',
};

// Estrutura para barras agrupadas + empilhadas
// Cada equipe terá 2 barras: uma para "Boa Prática" e outra para "Não Cumpriu"
interface GroupedStackedData extends BarDatum {
  id: string;
  equipe: string;
  equipeName: string;
  tooltipText: string;
  groupType: 'boaPratica' | 'naoCumpriu';
  stack1: number; // Azul ou Amarelo (base)
  stack2: number; // Verde ou Vermelho (topo)
  [key: string]: string | number;
}

// Transforma dados para o formato de 2 barras empilhadas por equipe
const transformDataForGroupedStacked = (data: IndicatorChartData[]): GroupedStackedData[] => {
  const result: GroupedStackedData[] = [];
  
  data.forEach((item) => {
    // Barra 1: Azul (base) + Verde (topo) - "Cumpriu boa prática"
    result.push({
      id: `${item.equipe}-bp`,
      equipe: item.equipe,
      equipeName: item.equipeName,
      tooltipText: item.tooltipText,
      groupType: 'boaPratica',
      stack1: item.cumprioECadastroOk, // Azul - contabiliza
      stack2: item.cumprioBoaPratica,   // Verde - não contabiliza
    });
    
    // Barra 2: Amarelo (base) + Vermelho (topo) - "Não cumpriu"
    result.push({
      id: `${item.equipe}-nc`,
      equipe: item.equipe,
      equipeName: item.equipeName,
      tooltipText: item.tooltipText,
      groupType: 'naoCumpriu',
      stack1: item.naoCumpriuBoaPratica, // Amarelo - cadastro ok
      stack2: item.cumprioComPendencia,   // Vermelho - pendência
    });
  });
  
  return result;
};

// Mapeamento de cores para cada stack por tipo de grupo
const getStackColor = (groupType: string, stackKey: string): string => {
  if (groupType === 'boaPratica') {
    return stackKey === 'stack1' ? chartColors.cumprioContabiliza : chartColors.cumprioNaoContabiliza;
  } else {
    return stackKey === 'stack1' ? chartColors.naoCumpriuCadastroOk : chartColors.naoCumpriuPendencia;
  }
};

// Mapeamento de labels para cada stack por tipo de grupo
const getStackLabel = (groupType: string, stackKey: string): string => {
  if (groupType === 'boaPratica') {
    return stackKey === 'stack1' ? legendLabels.cumprioContabiliza : legendLabels.cumprioNaoContabiliza;
  } else {
    return stackKey === 'stack1' ? legendLabels.naoCumpriuCadastroOk : legendLabels.naoCumpriuPendencia;
  }
};

export const IndicatorChart: React.FC<IndicatorChartProps> = ({
  data = defaultData,
  selectedIndicador = 'c3',
  kpiValues = { primary: 50, secondary: 40 },
}) => {
  const kpis = getKpiConfig(selectedIndicador, kpiValues);
  const transformedData = transformDataForGroupedStacked(data);

  // Custom tick que mostra a letra da equipe + ícone info
  // Centralizado entre as duas barras do grupo
  const CustomAxisTick = ({ x, y, value }: { x: number; y: number; value: string }) => {
    // Extrai a letra da equipe do id (ex: "A-bp" -> "A")
    const equipe = value.split('-')[0];
    const isFirstBar = value.endsWith('-bp');
    
    // Só renderiza o tick na segunda barra para centralizar entre as duas
    if (!isFirstBar) return null;
    
    const item = data.find(d => d.equipe === equipe);
    
    return (
      <g transform={`translate(${x + 20},${y})`}>
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
          {equipe}
        </text>
        <foreignObject x={-8} y={24} width={16} height={16}>
          <Tooltip title={item?.tooltipText || `Equipe ${equipe}`} placement="bottom">
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

      {/* Legenda do gráfico - lista simples na ordem correta */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.cumprioContabiliza }} />
          <span className="text-sm text-muted-foreground">{legendLabels.cumprioContabiliza}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.cumprioNaoContabiliza }} />
          <span className="text-sm text-muted-foreground">{legendLabels.cumprioNaoContabiliza}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.naoCumpriuCadastroOk }} />
          <span className="text-sm text-muted-foreground">{legendLabels.naoCumpriuCadastroOk}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.naoCumpriuPendencia }} />
          <span className="text-sm text-muted-foreground">{legendLabels.naoCumpriuPendencia}</span>
        </div>
      </div>

      {/* Gráfico de barras agrupadas + empilhadas */}
      <div className="h-[360px] rounded-lg bg-muted/30 p-4">
        <ResponsiveBar
          data={transformedData}
          keys={['stack1', 'stack2']}
          indexBy="id"
          margin={{ top: 20, right: 20, bottom: 60, left: 50 }}
          padding={0.5}
          innerPadding={1}
          groupMode="stacked"
          valueScale={{ type: 'linear', max: 100 }}
          indexScale={{ type: 'band', round: true }}
          colors={(bar) => {
            const barData = bar.data as GroupedStackedData;
            return getStackColor(barData.groupType, bar.id as string);
          }}
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
          labelSkipWidth={16}
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
            const typedData = barData as GroupedStackedData;
            const label = getStackLabel(typedData.groupType, id as string);
            
            return (
              <div className="bg-card border border-border rounded-lg px-4 py-3 shadow-xl">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  {typedData.equipeName}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-sm font-medium text-foreground">
                    {label}: {value}%
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
