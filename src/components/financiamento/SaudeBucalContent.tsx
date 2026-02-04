import React, { useState } from 'react';
import { Segmented, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download, ChevronDown, ChevronRight, Smile, HeartPulse, Scissors, Activity, SprayCan, Wrench } from 'lucide-react';
import { Button } from 'antd';
import { cn } from '@/lib/utils';
import { FilterBar } from './FilterBar';
import { useIsMobile } from '@/hooks/use-mobile';

const periods = ['Consolidado', 'Janeiro', 'Fevereiro', 'Março', 'Abril'];

const indicadores = [
  {
    value: 'b1',
    label: 'Primeira consulta',
    shortLabel: 'B1',
    icon: Smile
  },
  {
    value: 'b2',
    label: 'Tratamento concluído',
    shortLabel: 'B2',
    icon: HeartPulse
  },
  {
    value: 'b3',
    label: 'Taxa de exodontias',
    shortLabel: 'B3',
    icon: Scissors
  },
  {
    value: 'b4',
    label: 'Procedimentos',
    shortLabel: 'B4',
    icon: Activity
  },
  {
    value: 'b5',
    label: 'Escovação',
    shortLabel: 'B5',
    icon: SprayCan
  },
  {
    value: 'b6',
    label: 'Tratamento restaurador',
    shortLabel: 'B6',
    icon: Wrench
  }
];

// Dados agregados para os indicadores
const indicadoresAgregados = {
  tratamentoConcluido: 1879, // Total de pessoas com tratamento odontológico concluído
  primeiraConsulta: 2456,    // Total de pessoas com primeira consulta odontológica programada
};

// Dados da tabela
type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface TeamData {
  key: string;
  equipe: string;
  unidade: string;
  numerador: number;
  denominador: number;
  pontuacao: string;
  classificacao: Classification;
  pessoasVinculadas: number;
}

const sampleTableData: TeamData[] = [
  { key: '1', equipe: 'eSB Vila Nova', unidade: 'UBS Centro', numerador: 245, denominador: 350, pontuacao: '70%', classificacao: 'otimo', pessoasVinculadas: 3500 },
  { key: '2', equipe: 'eSB Jardim América', unidade: 'UBS Norte', numerador: 189, denominador: 400, pontuacao: '47%', classificacao: 'bom', pessoasVinculadas: 4200 },
  { key: '3', equipe: 'eSB Centro', unidade: 'UBS Sul', numerador: 312, denominador: 380, pontuacao: '82%', classificacao: 'otimo', pessoasVinculadas: 3800 },
  { key: '4', equipe: 'eSB Parque Industrial', unidade: 'UBS Centro', numerador: 167, denominador: 450, pontuacao: '37%', classificacao: 'bom', pessoasVinculadas: 4500 },
  { key: '5', equipe: 'eSB Bela Vista', unidade: 'UBS Norte', numerador: 98, denominador: 320, pontuacao: '30%', classificacao: 'suficiente', pessoasVinculadas: 3200 },
  { key: '6', equipe: 'eSB Industrial', unidade: 'UBS Leste', numerador: 56, denominador: 280, pontuacao: '20%', classificacao: 'suficiente', pessoasVinculadas: 2800 },
  { key: '7', equipe: 'eSB Rural', unidade: 'UBS Oeste', numerador: 34, denominador: 200, pontuacao: '17%', classificacao: 'regular', pessoasVinculadas: 2000 },
];

const statusColors: Record<Classification, string> = {
  otimo: 'bg-[#3C8DBC]',
  bom: 'bg-[#00A65A]',
  suficiente: 'bg-[#F0AD4E]',
  regular: 'bg-[#DD4B39]',
};

const statusLabels: Record<Classification, string> = {
  otimo: 'Ótimo',
  bom: 'Bom',
  suficiente: 'Suficiente',
  regular: 'Regular',
};

// Contagem de equipes por classificação
const classificationCounts = {
  otimo: sampleTableData.filter(t => t.classificacao === 'otimo').length,
  bom: sampleTableData.filter(t => t.classificacao === 'bom').length,
  suficiente: sampleTableData.filter(t => t.classificacao === 'suficiente').length,
  regular: sampleTableData.filter(t => t.classificacao === 'regular').length,
};

// Classification Card Component
interface ClassificationCardProps {
  classification: Classification;
  count: number;
  description: string;
}

const classificationConfig = {
  otimo: {
    label: 'Ótimo',
    borderColor: 'border-l-[#3C8DBC]',
    textColor: 'text-[#3C8DBC]',
  },
  bom: {
    label: 'Bom',
    borderColor: 'border-l-[#00A65A]',
    textColor: 'text-[#00A65A]',
  },
  suficiente: {
    label: 'Suficiente',
    borderColor: 'border-l-[#F0AD4E]',
    textColor: 'text-[#F0AD4E]',
  },
  regular: {
    label: 'Regular',
    borderColor: 'border-l-[#DD4B39]',
    textColor: 'text-[#DD4B39]',
  },
};

const ClassificationCard: React.FC<ClassificationCardProps> = ({ classification, count, description }) => {
  const config = classificationConfig[classification];
  
  return (
    <div className={cn('rounded-lg p-3 sm:p-4 shadow-sm bg-card border-l-4', config.borderColor)}>
      <p className="text-xs sm:text-sm text-muted-foreground">{config.label}</p>
      <p className="text-lg sm:text-xl font-semibold text-foreground">
        {count} <span className="text-sm font-normal">Equipes</span>
      </p>
      <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  );
};

// Cards de indicadores agregados
const IndicadoresAgregadosCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Card Tratamento Concluído */}
      <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary text-primary-foreground">
            <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground">
              Tratamento Odontológico Concluído
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1">
              {indicadoresAgregados.tratamentoConcluido.toLocaleString('pt-BR')}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Quantitativo de pessoas com tratamento odontológico concluído por eSB na APS
            </p>
          </div>
        </div>
      </div>

      {/* Card Primeira Consulta */}
      <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-accent to-accent/50 p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary text-primary-foreground">
            <Smile className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground">
              Primeira Consulta Programada
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1">
              {indicadoresAgregados.primeiraConsulta.toLocaleString('pt-BR')}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Quantitativo de pessoas com primeira consulta odontológica programada na APS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Table Component
const SaudeBucalTable: React.FC = () => {
  const isMobile = useIsMobile();

  const columns: ColumnsType<TeamData> = [
    {
      title: 'Equipe de saúde',
      dataIndex: 'equipe',
      key: 'equipe',
      render: (text: string) => <span className="font-medium text-sm">{text}</span>,
    },
    {
      title: 'Unidade',
      dataIndex: 'unidade',
      key: 'unidade',
      responsive: ['md'],
    },
    {
      title: 'Numerador',
      dataIndex: 'numerador',
      key: 'numerador',
      align: 'right',
      render: (value: number) => value.toLocaleString('pt-BR'),
    },
    {
      title: 'Denominador',
      dataIndex: 'denominador',
      key: 'denominador',
      align: 'right',
      responsive: ['sm'],
      render: (value: number) => value.toLocaleString('pt-BR'),
    },
    {
      title: 'Pontuação',
      dataIndex: 'pontuacao',
      key: 'pontuacao',
      align: 'center',
    },
    {
      title: 'Classificação',
      dataIndex: 'classificacao',
      key: 'classificacao',
      render: (classification: Classification) => (
        <div className="flex items-center gap-1.5">
          <span className={cn('w-2 h-2 rounded-full', statusColors[classification])} />
          <span className="text-sm">{statusLabels[classification]}</span>
        </div>
      ),
    },
    {
      title: 'Pessoas vinculadas',
      dataIndex: 'pessoasVinculadas',
      key: 'pessoasVinculadas',
      align: 'right',
      responsive: ['lg'],
      render: (value: number) => value.toLocaleString('pt-BR'),
    },
  ];

  // Mobile card view
  if (isMobile) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Total: <strong className="text-foreground">{sampleTableData.length}</strong> equipes
          </span>
          <Button icon={<Download className="h-4 w-4" />} size="small">Exportar</Button>
        </div>
        <div className="space-y-3">
          {sampleTableData.map((record) => (
            <div key={record.key} className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-sm text-foreground">{record.equipe}</h3>
                  <p className="text-xs text-muted-foreground">{record.unidade}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={cn('w-2 h-2 rounded-full', statusColors[record.classificacao])} />
                  <span className="text-xs font-medium">{statusLabels[record.classificacao]}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Numerador:</span>
                  <span className="ml-1 font-medium">{record.numerador.toLocaleString('pt-BR')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Denominador:</span>
                  <span className="ml-1 font-medium">{record.denominador.toLocaleString('pt-BR')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Pontuação:</span>
                  <span className="ml-1 font-medium">{record.pontuacao}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Vinculadas:</span>
                  <span className="ml-1 font-medium">{record.pessoasVinculadas.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-card p-3 sm:p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs sm:text-sm text-muted-foreground">
          Total de equipes: <strong className="text-foreground">{sampleTableData.length}</strong>
        </span>
        <Button icon={<Download className="h-4 w-4" />}>Exportar equipes</Button>
      </div>
      <Table
        columns={columns}
        dataSource={sampleTableData}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
          size: 'small',
        }}
        size="small"
        scroll={{ x: 700 }}
      />
    </div>
  );
};

// Main Component
interface SaudeBucalContentProps {
  onPeriodChange?: (period: string) => void;
  onIndicadorChange?: (indicador: string) => void;
}

export const SaudeBucalContent: React.FC<SaudeBucalContentProps> = ({
  onPeriodChange,
  onIndicadorChange,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Consolidado');
  const [selectedIndicador, setSelectedIndicador] = useState('b1');

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
    onPeriodChange?.(value);
  };

  const handleIndicadorChange = (value: string) => {
    setSelectedIndicador(value);
    onIndicadorChange?.(value);
  };

  const selectedIndicadorData = indicadores.find(i => i.value === selectedIndicador);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Filtros */}
      <FilterBar periods={periods} selectedPeriod={selectedPeriod} onPeriodChange={handlePeriodChange} />

      {/* Seletor de período */}
      <div className="rounded-lg bg-card p-1 shadow-sm overflow-x-auto">
        <Segmented 
          block 
          value={selectedPeriod} 
          onChange={value => handlePeriodChange(value as string)} 
          options={periods} 
          className="!bg-transparent min-w-[400px]" 
        />
      </div>

      {/* Layout principal com navegação de indicadores */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Sidebar de indicadores */}
        <nav className="shrink-0 lg:w-64">
          <div className="rounded-lg bg-card shadow-sm p-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">
              Indicadores
            </p>
            {/* Mobile: horizontal scroll, Desktop: vertical list */}
            <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {indicadores.map(ind => {
                const Icon = ind.icon;
                const isSelected = selectedIndicador === ind.value;
                return (
                  <button 
                    key={ind.value} 
                    onClick={() => handleIndicadorChange(ind.value)} 
                    className={cn(
                      "flex items-center gap-2 lg:gap-3 px-3 py-2 lg:py-2.5 rounded-md text-left transition-all duration-150 shrink-0",
                      "hover:bg-muted/50",
                      isSelected 
                        ? "bg-primary/8 border-l-0 lg:border-l-[3px] border-primary shadow-sm" 
                        : "text-muted-foreground hover:text-foreground border-l-0 lg:border-l-[3px] border-transparent"
                    )}
                  >
                    <span className={cn(
                      "flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 rounded-md text-xs lg:text-sm font-semibold shrink-0 transition-colors",
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      {ind.shortLabel}
                    </span>
                    <div className="min-w-0 flex-1 hidden lg:block">
                      <p className={cn("text-sm font-medium truncate", isSelected ? "text-foreground" : "")}>
                        {ind.label}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Conteúdo principal */}
        <div className="flex-1 min-w-0 space-y-4 sm:space-y-6">
          {/* Card do indicador selecionado */}
          <div className="rounded-lg bg-card shadow-sm overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center gap-3">
                {selectedIndicadorData && (
                  <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary text-primary-foreground">
                    <selectedIndicadorData.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                )}
                <div>
                  <p className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Indicador de Saúde Bucal
                  </p>
                  <h2 className="text-base sm:text-lg font-semibold text-foreground">
                    {selectedIndicadorData?.label}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Cards de indicadores agregados */}
          <IndicadoresAgregadosCards />

          {/* Cards de classificação */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <ClassificationCard
              classification="otimo"
              count={classificationCounts.otimo}
              description="Ótimo: > 50 e ≤ 70"
            />
            <ClassificationCard
              classification="bom"
              count={classificationCounts.bom}
              description="Bom: > 30 e ≤ 50"
            />
            <ClassificationCard
              classification="suficiente"
              count={classificationCounts.suficiente}
              description="Suficiente: > 10 e ≤ 30"
            />
            <ClassificationCard
              classification="regular"
              count={classificationCounts.regular}
              description="Regular: ≤ 10 ou > 70"
            />
          </div>

          {/* Tabela */}
          <SaudeBucalTable />
        </div>
      </div>
    </div>
  );
};
