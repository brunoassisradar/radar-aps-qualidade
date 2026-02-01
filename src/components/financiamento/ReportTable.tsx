import React from 'react';
import { Table, Button, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download, ChevronRightIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface ReportData {
  key: string;
  equipe: string;
  unidade: string;
  classificacao: Classification;
  numerador: number;
  denominador: number;
  pontuacao: number;
  fichasDesatualizadas: number;
}

interface ReportTableProps {
  data?: ReportData[];
  totalEquipes?: number;
  selectedPeriod?: string;
  onViewIndividual?: (key: string) => void;
}

const classificationStatus: Record<Classification, 'success' | 'warning' | 'error' | 'processing'> = {
  otimo: 'success',
  bom: 'processing',
  suficiente: 'warning',
  regular: 'error',
};

const classificationLabels: Record<Classification, string> = {
  otimo: 'Ótimo',
  bom: 'Bom',
  suficiente: 'Suficiente',
  regular: 'Regular',
};

const statusColors: Record<Classification, string> = {
  otimo: 'bg-[#3C8DBC]',
  bom: 'bg-[#00A65A]',
  suficiente: 'bg-[#F0AD4E]',
  regular: 'bg-[#DD4B39]',
};

const sampleData: ReportData[] = [
  { key: '1', equipe: 'ESF Vila Nova', unidade: 'UBS Centro', classificacao: 'regular', numerador: 2.29, denominador: 4, pontuacao: 57.25, fichasDesatualizadas: 12 },
  { key: '2', equipe: 'ESF Jardim América', unidade: 'UBS Norte', classificacao: 'regular', numerador: 2.29, denominador: 4, pontuacao: 57.25, fichasDesatualizadas: 5 },
  { key: '3', equipe: 'ESF Centro', unidade: 'UBS Sul', classificacao: 'regular', numerador: 2.64, denominador: 4, pontuacao: 52.8, fichasDesatualizadas: 0 },
  { key: '4', equipe: 'ESF Parque Industrial', unidade: 'UBS Centro', classificacao: 'suficiente', numerador: 2.29, denominador: 4, pontuacao: 57.25, fichasDesatualizadas: 3 },
  { key: '5', equipe: 'ESF Bela Vista', unidade: 'UBS Norte', classificacao: 'bom', numerador: 2.29, denominador: 4, pontuacao: 57.25, fichasDesatualizadas: 8 },
  { key: '6', equipe: 'ESF Santa Maria', unidade: 'UBS Sul', classificacao: 'regular', numerador: 2.29, denominador: 4, pontuacao: 57.25, fichasDesatualizadas: 0 },
  { key: '7', equipe: 'ESF Nova Esperança', unidade: 'UBS Centro', classificacao: 'otimo', numerador: 2.64, denominador: 4, pontuacao: 52.8, fichasDesatualizadas: 2 },
  { key: '8', equipe: 'ESF São João', unidade: 'UBS Norte', classificacao: 'regular', numerador: 2.29, denominador: 4, pontuacao: 57.25, fichasDesatualizadas: 15 },
  { key: '9', equipe: 'ESF Boa Vista', unidade: 'UBS Sul', classificacao: 'regular', numerador: 2.64, denominador: 4, pontuacao: 52.8, fichasDesatualizadas: 0 },
  { key: '10', equipe: 'ESF Primavera', unidade: 'UBS Centro', classificacao: 'regular', numerador: 2.64, denominador: 4, pontuacao: 52.8, fichasDesatualizadas: 7 },
];

// Mobile list item component - shows ALL information
const MobileReportListItem: React.FC<{ 
  record: ReportData; 
  isConsolidado: boolean;
  onViewIndividual?: (key: string) => void;
}> = ({ record, isConsolidado, onViewIndividual }) => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-foreground">{record.equipe}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{record.unidade}</p>
          </div>
          <div className="shrink-0 flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${statusColors[record.classificacao]}`} />
            <span className="text-xs font-medium">{classificationLabels[record.classificacao]}</span>
          </div>
        </div>
      </div>
      
      {/* Data rows - Always visible */}
      <div className="p-4 space-y-3 bg-muted/10">
        {/* Pontuação */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Pontuação:</span>
          <span className="text-sm font-semibold text-foreground">{record.pontuacao}</span>
        </div>
        
        {/* Numerador/Denominador - only if not consolidated */}
        {!isConsolidado && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Numerador:</span>
              <span className="text-sm font-medium text-foreground">{record.numerador}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Denominador:</span>
              <span className="text-sm font-medium text-foreground">{record.denominador}</span>
            </div>
          </>
        )}
        
        {/* Fichas desatualizadas */}
        <div 
          className="flex items-center justify-between cursor-pointer hover:bg-muted/50 -mx-4 px-4 py-2 transition-colors"
          onClick={() => onViewIndividual?.(record.key)}
        >
          <span className="text-xs text-muted-foreground">Fichas desatualizadas:</span>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${record.fichasDesatualizadas === 0 ? 'bg-[#00A65A]' : 'bg-[#DD4B39]'}`} />
            <span className="text-sm font-medium text-foreground">{record.fichasDesatualizadas}</span>
            <ChevronRightIcon className="h-3 w-3 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReportTable: React.FC<ReportTableProps> = ({
  data = sampleData,
  totalEquipes = 398,
  selectedPeriod = 'Consolidado',
  onViewIndividual,
}) => {
  const isMobile = useIsMobile();
  const isConsolidado = selectedPeriod === 'Consolidado';
  
  // Mobile view
  if (isMobile) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Total: <strong className="text-foreground">{totalEquipes}</strong> equipes
          </span>
          {!isConsolidado && (
            <Button icon={<Download className="h-4 w-4" />} size="small">Exportar</Button>
          )}
        </div>
        <div className="space-y-3">
          {data.map((record) => (
            <MobileReportListItem 
              key={record.key} 
              record={record} 
              isConsolidado={isConsolidado}
              onViewIndividual={onViewIndividual}
            />
          ))}
        </div>
      </div>
    );
  }
  
  const columns: ColumnsType<ReportData> = [
    {
      title: 'Equipe de saúde',
      dataIndex: 'equipe',
      key: 'equipe',
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Unidade',
      dataIndex: 'unidade',
      key: 'unidade',
    },
    ...(!isConsolidado ? [{
      title: 'Numerador',
      dataIndex: 'numerador',
      key: 'numerador',
      align: 'center' as const,
    },
    {
      title: 'Denominador',
      dataIndex: 'denominador',
      key: 'denominador',
      align: 'center' as const,
    }] : []),
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
        <Badge status={classificationStatus[classification]} text={classificationLabels[classification]} />
      ),
    },
    {
      title: 'Fichas desatualizadas',
      dataIndex: 'fichasDesatualizadas',
      key: 'fichasDesatualizadas',
      render: (count: number, record) => (
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onViewIndividual?.(record.key)}
        >
          <span className={`w-2 h-2 rounded-full ${count === 0 ? 'bg-status-otimo' : 'bg-status-regular'}`} />
          <span className="text-sm">
            {count} fichas desatualizadas
          </span>
          <ChevronRightIcon className="h-3 w-3 text-muted-foreground" />
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-lg bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Total de equipes: <strong className="text-foreground">{totalEquipes}</strong>
        </span>
        {!isConsolidado && (
          <Button icon={<Download className="h-4 w-4" />}>Exportar equipes</Button>
        )}
      </div>
      <Table
        columns={columns}
        dataSource={data}
        tableLayout="fixed"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} itens`,
        }}
        size="middle"
      />
    </div>
  );
};
