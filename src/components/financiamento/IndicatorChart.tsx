import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, TooltipProps } from 'recharts';
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

// Interface para dados normalizados (100%)
interface NormalizedChartData extends IndicatorChartData {
  // Grupo 1 normalizado
  cumprioECadastroOk_pct: number;
  cumprioBoaPratica_pct: number;
  // Grupo 2 normalizado
  naoCumpriuBoaPratica_pct: number;
  cumprioComPendencia_pct: number;
}

// Normaliza os dados para 100%
const normalizeData = (data: IndicatorChartData[]): NormalizedChartData[] => {
  return data.map(item => {
    // Grupo 1: Azul + Verde
    const totalGrupo1 = item.cumprioECadastroOk + item.cumprioBoaPratica;
    // Grupo 2: Amarelo + Vermelho
    const totalGrupo2 = item.naoCumpriuBoaPratica + item.cumprioComPendencia;
    
    return {
      ...item,
      cumprioECadastroOk_pct: totalGrupo1 > 0 ? (item.cumprioECadastroOk / totalGrupo1) * 100 : 0,
      cumprioBoaPratica_pct: totalGrupo1 > 0 ? (item.cumprioBoaPratica / totalGrupo1) * 100 : 0,
      naoCumpriuBoaPratica_pct: totalGrupo2 > 0 ? (item.naoCumpriuBoaPratica / totalGrupo2) * 100 : 0,
      cumprioComPendencia_pct: totalGrupo2 > 0 ? (item.cumprioComPendencia / totalGrupo2) * 100 : 0,
    };
  });
};

// Cores para os 4 segmentos (seguindo as cores semânticas do projeto)
const chartColors = {
  cumprioContabiliza: '#3C8DBC',     // Azul - Ótimo
  cumprioNaoContabiliza: '#00A65A',  // Verde - Bom
  naoCumpriuCadastroOk: '#F0AD4E',   // Amarelo - Suficiente
  naoCumpriuPendencia: '#DD4B39',    // Vermelho - Regular
};

const legendLabels: Record<string, string> = {
  cumprioContabiliza: 'Cumpriu boa prática e contabiliza para o financiamento',
  cumprioNaoContabiliza: 'Cumpriu boa prática mas NÃO contabiliza por pendência de cadastro',
  naoCumpriuCadastroOk: 'Não cumpriu e cadastro ok',
  naoCumpriuPendencia: 'Não cumpriu e com pendência de cadastro',
};

// Tipo do tooltip do Recharts
interface CustomTooltipPayload {
  dataKey: string;
  value: number;
  color: string;
  payload: IndicatorChartData;
}

// Tooltip customizado
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;
  
  const data = payload[0]?.payload as NormalizedChartData;
  
  const getLabel = (dataKey: string): string => {
    switch (dataKey) {
      case 'cumprioECadastroOk_pct': return legendLabels.cumprioContabiliza;
      case 'cumprioBoaPratica_pct': return legendLabels.cumprioNaoContabiliza;
      case 'naoCumpriuBoaPratica_pct': return legendLabels.naoCumpriuCadastroOk;
      case 'cumprioComPendencia_pct': return legendLabels.naoCumpriuPendencia;
      default: return dataKey;
    }
  };
  
  return (
    <div className="bg-card border border-border rounded-lg px-4 py-3 shadow-xl">
      <p className="text-xs font-medium text-muted-foreground mb-2">
        {data?.equipeName}
      </p>
      {payload.map((entry, index) => {
        const typedEntry = entry as unknown as CustomTooltipPayload;
        return (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: typedEntry.color }} />
            <span className="text-sm text-foreground">
              {getLabel(typedEntry.dataKey)}: {typedEntry.value}%
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Custom tick para o eixo X com letra da equipe + ícone info
interface CustomTickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
  data: IndicatorChartData[];
}

const CustomXAxisTick: React.FC<CustomTickProps> = ({ x = 0, y = 0, payload, data }) => {
  const equipe = payload?.value || '';
  const item = data.find(d => d.equipe === equipe);
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={16}
        textAnchor="middle"
        fill="hsl(220, 9%, 46%)"
        style={{ fontSize: 12, fontFamily: 'Inter, sans-serif' }}
      >
        {equipe}
      </text>
      <foreignObject x={-8} y={22} width={16} height={16}>
        <Tooltip title={item?.tooltipText || `Equipe ${equipe}`} placement="bottom">
          <div className="flex items-center justify-center cursor-pointer">
            <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-primary transition-colors" />
          </div>
        </Tooltip>
      </foreignObject>
    </g>
  );
};

// Label customizado para exibir valores nas barras
interface CustomLabelProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  value?: number;
}

const CustomLabel: React.FC<CustomLabelProps> = ({ x = 0, y = 0, width = 0, height = 0, value = 0 }) => {
  if (height < 14 || value === 0) return null;
  
  return (
    <text
      x={x + width / 2}
      y={y + height / 2}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="middle"
      style={{ fontSize: 11, fontWeight: 500, fontFamily: 'Inter, sans-serif' }}
    >
      {value}
    </text>
  );
};

export const IndicatorChart: React.FC<IndicatorChartProps> = ({
  data = defaultData,
  selectedIndicador = 'c3',
  kpiValues = { primary: 50, secondary: 40 },
}) => {
  const kpis = getKpiConfig(selectedIndicador, kpiValues);
  const normalizedData = normalizeData(data);

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

      {/* Gráfico de barras agrupadas + empilhadas 100% com Recharts */}
      <div className="h-[360px] rounded-lg bg-muted/30 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={normalizedData}
            margin={{ top: 20, right: 20, bottom: 50, left: 40 }}
            barGap={2}
            barCategoryGap="25%"
          >
            <CartesianGrid 
              strokeDasharray="4 4" 
              stroke="hsl(220, 13%, 91%)" 
              vertical={false}
            />
            <XAxis 
              dataKey="equipe" 
              axisLine={false}
              tickLine={false}
              tick={(props) => <CustomXAxisTick {...props} data={data} />}
              interval={0}
            />
            <YAxis 
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(220, 9%, 46%)' }}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
            
            {/* Grupo 1: Barras empilhadas 100% - Azul (base) + Verde (topo) */}
            <Bar 
              dataKey="cumprioECadastroOk_pct" 
              stackId="grupo1" 
              fill={chartColors.cumprioContabiliza}
              label={<CustomLabel />}
            />
            <Bar 
              dataKey="cumprioBoaPratica_pct" 
              stackId="grupo1" 
              fill={chartColors.cumprioNaoContabiliza}
              label={<CustomLabel />}
            />
            
            {/* Grupo 2: Barras empilhadas 100% - Amarelo (base) + Vermelho (topo) */}
            <Bar 
              dataKey="naoCumpriuBoaPratica_pct" 
              stackId="grupo2" 
              fill={chartColors.naoCumpriuCadastroOk}
              label={<CustomLabel />}
            />
            <Bar 
              dataKey="cumprioComPendencia_pct" 
              stackId="grupo2" 
              fill={chartColors.naoCumpriuPendencia}
              label={<CustomLabel />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
