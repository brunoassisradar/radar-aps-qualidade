import React from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download, ChevronDown, ChevronRight, ChevronRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge } from './StatusBadge';

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
    name: 'C1 - Mais acesso',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c2',
    name: 'C2 - Cuidado Infantil',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c3',
    name: 'C3 - Gestante e Puérpera',
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
  otimo: 'bg-status-otimo',
  bom: 'bg-status-bom',
  suficiente: 'bg-status-suficiente',
  regular: 'bg-status-regular',
};

const statusLabels: Record<Classification, string> = {
  otimo: 'Ótimo',
  bom: 'Bom',
  suficiente: 'Suficiente',
  regular: 'Regular',
};

const StatusCell: React.FC<{ data: MonthData; showLink?: boolean }> = ({ data, showLink = true }) => (
  <div className="flex items-center gap-2">
    <span className={`w-2 h-2 rounded-full ${statusColors[data.status]}`} />
    <span className="text-sm">
      {statusLabels[data.status]} | {data.value}
    </span>
    {showLink && (
      <ChevronRightIcon className="h-3 w-3 text-muted-foreground" />
    )}
  </div>
);

const columns: ColumnsType<TeamData> = [
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
  {
    title: 'Tipo de equipe',
    dataIndex: 'tipoEquipe',
    key: 'tipoEquipe',
    width: 120,
  },
  {
    title: 'Resultado quadrimestre',
    dataIndex: 'consolidado',
    key: 'consolidado',
    width: 180,
    render: (data: MonthData) => <StatusCell data={data} showLink={false} />,
  },
];

const ExpandedRow: React.FC<{ record: TeamData }> = ({ record }) => {
  return (
    <div className="bg-muted/20 border-t border-border">
      {/* Action buttons */}
      <div className="flex justify-end gap-2 p-4 border-b border-border">
        <Link to={`/financiamento-aps/qualidade-esf-eap/relatorio?equipe=${record.key}`}>
          <Button size="small">Ver relatório</Button>
        </Link>
        <Link to={`/financiamento-aps/qualidade-esf-eap/relatorio?equipe=${record.key}&view=individualizado`}>
          <Button size="small">Ver individualizado</Button>
        </Link>
      </div>

      {/* Indicators table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground w-[180px]">Indicador</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Janeiro</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fevereiro</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Março</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Abril</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Resultado do quadrimestre</th>
            </tr>
          </thead>
          <tbody>
            {record.indicadores.map((indicador) => (
              <tr key={indicador.id} className="border-b border-border last:border-b-0 hover:bg-muted/30">
                <td className="py-3 px-4 font-medium">{indicador.name}</td>
                <td className="py-3 px-4">
                  <StatusCell data={indicador.janeiro} />
                </td>
                <td className="py-3 px-4">
                  <StatusCell data={indicador.fevereiro} />
                </td>
                <td className="py-3 px-4">
                  <StatusCell data={indicador.marco} />
                </td>
                <td className="py-3 px-4">
                  <StatusCell data={indicador.abril} />
                </td>
                <td className="py-3 px-4">
                  <StatusCell data={indicador.consolidado} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
