import React from 'react';
import { Table, Button, Descriptions } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download, ChevronDown, ChevronRight, ChevronRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface MonthData {
  status: Classification;
  value: string;
}

interface IndicatorData {
  id: string;
  name: string;
  janeiro: MonthData;
  fevereiro: MonthData;
  marco: MonthData;
  abril: MonthData;
  consolidado: MonthData;
}

interface TeamData {
  key: string;
  equipe: string;
  unidade: string;
  tipoEquipe: string;
  consolidado: MonthData;
  indicadores: IndicatorData[];
}

interface OverviewTableProps {
  data?: TeamData[];
  totalEquipes?: number;
}

const sampleIndicators: IndicatorData[] = [
  {
    id: 'c1',
    name: 'C1 - Mais acesso (peso 1)',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c2',
    name: 'C2 - Cuidado Infantil (peso 2)',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c3',
    name: 'C3 - Gestante e Puérpera (peso 2)',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c4',
    name: 'C4 - Pessoa com Diabetes',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c5',
    name: 'C5 - Pessoa com Hipertensão',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c6',
    name: 'C6 - Pessoa Idosa',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c7',
    name: 'C7 - Cuidado da mulher',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
];

const sampleData: TeamData[] = [
  {
    key: '1',
    equipe: 'ESF Vila Nova',
    unidade: 'UBS Centro',
    tipoEquipe: 'eSF',
    consolidado: { status: 'otimo', value: 'X%' },
    indicadores: sampleIndicators,
  },
  {
    key: '2',
    equipe: 'ESF Jardim América',
    unidade: 'UBS Norte',
    tipoEquipe: 'eSF',
    consolidado: { status: 'otimo', value: 'X%' },
    indicadores: sampleIndicators,
  },
  {
    key: '3',
    equipe: 'ESF Centro',
    unidade: 'UBS Sul',
    tipoEquipe: 'eAP',
    consolidado: { status: 'bom', value: 'X%' },
    indicadores: sampleIndicators,
  },
  {
    key: '4',
    equipe: 'ESF Parque Industrial',
    unidade: 'UBS Centro',
    tipoEquipe: 'eSF',
    consolidado: { status: 'suficiente', value: 'X%' },
    indicadores: sampleIndicators,
  },
  {
    key: '5',
    equipe: 'ESF Bela Vista',
    unidade: 'UBS Norte',
    tipoEquipe: 'eSF',
    consolidado: { status: 'otimo', value: 'X%' },
    indicadores: sampleIndicators,
  },
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

interface StatusCellProps {
  data: MonthData;
  showLink?: boolean;
  indicador?: string;
  month?: string;
  equipeKey?: string;
}

const monthToParam: Record<string, string> = {
  janeiro: 'Janeiro',
  fevereiro: 'Fevereiro',
  marco: 'Março',
  abril: 'Abril',
  consolidado: 'Consolidado',
};

const indicatorToParam: Record<string, string> = {
  c1: 'c1',
  c2: 'c2',
  c3: 'c3',
  c4: 'c4',
  c5: 'c5',
  c6: 'c6',
  c7: 'c7',
};

const StatusCell: React.FC<StatusCellProps> = ({ data, showLink = true, indicador, month, equipeKey }) => {
  const content = (
    <div className={`flex items-center gap-2 ${showLink ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}>
      <span className={`w-2 h-2 rounded-full ${statusColors[data.status]}`} />
      <span className="text-sm">
        {statusLabels[data.status]} | {data.value}
      </span>
      {showLink && (
        <ChevronRightIcon className="h-3 w-3 text-muted-foreground" />
      )}
    </div>
  );

  if (showLink && indicador && month) {
    const params = new URLSearchParams({
      indicador: indicatorToParam[indicador] || indicador,
      periodo: monthToParam[month] || month,
    });
    if (equipeKey) {
      params.set('equipe', equipeKey);
    }
    return (
      <Link to={`/financiamento-aps/qualidade-esf-eap/relatorio?${params.toString()}`}>
        {content}
      </Link>
    );
  }

  return content;
};

const columns: ColumnsType<TeamData> = [
  {
    title: 'Equipe de saúde',
    dataIndex: 'equipe',
    key: 'equipe',
    width: '25%',
    render: (text: string) => <span className="font-medium">{text}</span>,
  },
  {
    title: 'Unidade',
    dataIndex: 'unidade',
    key: 'unidade',
    width: '20%',
  },
  {
    title: 'Tipo de equipe',
    dataIndex: 'tipoEquipe',
    key: 'tipoEquipe',
    width: '15%',
  },
  {
    title: 'Conceito geral obtido',
    dataIndex: 'consolidado',
    key: 'consolidado',
    width: '25%',
    render: (data: MonthData) => <StatusCell data={data} showLink={false} />,
  },
  {
    title: 'Ação',
    key: 'acao',
    width: '20%',
    render: (_: unknown, record: TeamData) => (
      <div className="flex gap-2">
        <Link to={`/financiamento-aps/qualidade-esf-eap/relatorio?equipe=${record.key}`}>
          <Button type="default" size="small">Ver relatório</Button>
        </Link>
        <Link to={`/financiamento-aps/qualidade-esf-eap/relatorio?equipe=${record.key}&view=individualizado`}>
          <Button type="default" size="small">Individualizado</Button>
        </Link>
      </div>
    ),
  },
];

const ExpandedRow: React.FC<{ record: TeamData }> = ({ record }) => {
  const months = ['consolidado', 'janeiro', 'fevereiro', 'marco', 'abril'] as const;
  const monthLabels: Record<string, string> = {
    consolidado: 'Conceito obtido no quadrimestre',
    janeiro: 'Janeiro',
    fevereiro: 'Fevereiro',
    marco: 'Março',
    abril: 'Abril',
  };

  return (
    <div className="bg-muted/20 border-t border-border">
      {/* Indicators table-like grid */}
      <div className="overflow-x-auto border border-border rounded-md">
        <div className="indicator-grid min-w-[800px]">
          {/* Header row */}
          <div className="indicator-grid-header">
            <div className="indicator-grid-cell font-medium text-muted-foreground">Indicador</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Conceito obtido no quadrimestre</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Janeiro</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Fevereiro</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Março</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Abril</div>
          </div>

          {/* Data rows */}
          {record.indicadores.map((indicador) => (
            <div 
              key={indicador.id} 
              className="indicator-grid-row bg-card"
            >
              <div className="indicator-grid-cell font-medium">{indicador.name}</div>
              <div className="indicator-grid-cell">
                <StatusCell data={indicador.consolidado} indicador={indicador.id} month="consolidado" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <StatusCell data={indicador.janeiro} indicador={indicador.id} month="janeiro" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <StatusCell data={indicador.fevereiro} indicador={indicador.id} month="fevereiro" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <StatusCell data={indicador.marco} indicador={indicador.id} month="marco" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <StatusCell data={indicador.abril} indicador={indicador.id} month="abril" equipeKey={record.key} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const OverviewTable: React.FC<OverviewTableProps> = ({
  data = sampleData,
  totalEquipes = 398,
}) => {
  return (
    <div className="rounded-lg bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Total de equipes: <strong className="text-foreground">{totalEquipes}</strong>
        </span>
        <Button icon={<Download className="h-4 w-4" />}>Exportar equipes</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender: (record) => <ExpandedRow record={record} />,
          expandIcon: ({ expanded, onExpand, record }) => (
            <span 
              className="inline-flex cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => onExpand(record, e as React.MouseEvent<HTMLElement>)}
            >
              {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </span>
          ),
        }}
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
