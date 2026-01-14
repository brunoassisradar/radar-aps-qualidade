import React from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download, Eye, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge } from './StatusBadge';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface MonthData {
  status: Classification;
  value: string;
}

interface TeamData {
  key: string;
  equipe: string;
  unidade: string;
  tipoEquipe: string;
  indicador: string;
  janeiro: MonthData;
  fevereiro: MonthData;
  marco: MonthData;
  abril: MonthData;
  consolidado: MonthData;
}

interface OverviewTableProps {
  data?: TeamData[];
  totalEquipes?: number;
}

const sampleData: TeamData[] = [
  {
    key: '1',
    equipe: 'ESF Vila Nova',
    unidade: 'UBS Centro',
    tipoEquipe: 'eSF',
    indicador: 'C1 - Mais acesso',
    janeiro: { status: 'regular', value: 'Regular | x%' },
    fevereiro: { status: 'suficiente', value: 'Suficiente | x%' },
    marco: { status: 'bom', value: 'Bom | x%' },
    abril: { status: 'otimo', value: 'Ótimo | x%' },
    consolidado: { status: 'otimo', value: 'Ótimo | x%' },
  },
  {
    key: '2',
    equipe: 'ESF Jardim América',
    unidade: 'UBS Norte',
    tipoEquipe: 'eSF',
    indicador: 'C2 - Cuidado Infantil',
    janeiro: { status: 'regular', value: 'Regular | x%' },
    fevereiro: { status: 'suficiente', value: 'Suficiente | x%' },
    marco: { status: 'bom', value: 'Bom | x%' },
    abril: { status: 'otimo', value: 'Ótimo | x%' },
    consolidado: { status: 'otimo', value: 'Ótimo | x%' },
  },
  {
    key: '3',
    equipe: 'ESF Centro',
    unidade: 'UBS Sul',
    tipoEquipe: 'eAP',
    indicador: 'C3 - Gestante e Puérpera',
    janeiro: { status: 'regular', value: 'Regular | x%' },
    fevereiro: { status: 'suficiente', value: 'Suficiente | x%' },
    marco: { status: 'bom', value: 'Bom | x%' },
    abril: { status: 'otimo', value: 'Ótimo | x%' },
    consolidado: { status: 'bom', value: 'Bom | x%' },
  },
  {
    key: '4',
    equipe: 'ESF Parque Industrial',
    unidade: 'UBS Centro',
    tipoEquipe: 'eSF',
    indicador: 'C4 - Pessoa com Diabetes',
    janeiro: { status: 'regular', value: 'Regular | x%' },
    fevereiro: { status: 'regular', value: 'Regular | x%' },
    marco: { status: 'suficiente', value: 'Suficiente | x%' },
    abril: { status: 'bom', value: 'Bom | x%' },
    consolidado: { status: 'suficiente', value: 'Suficiente | x%' },
  },
  {
    key: '5',
    equipe: 'ESF Bela Vista',
    unidade: 'UBS Norte',
    tipoEquipe: 'eSF',
    indicador: 'C5 - Pessoa com Hipertensão',
    janeiro: { status: 'regular', value: 'Regular | x%' },
    fevereiro: { status: 'suficiente', value: 'Suficiente | x%' },
    marco: { status: 'bom', value: 'Bom | x%' },
    abril: { status: 'otimo', value: 'Ótimo | x%' },
    consolidado: { status: 'otimo', value: 'Ótimo | x%' },
  },
  {
    key: '6',
    equipe: 'ESF Santa Maria',
    unidade: 'UBS Sul',
    tipoEquipe: 'eAP',
    indicador: 'C6 - Pessoa Idosa',
    janeiro: { status: 'regular', value: 'Regular | x%' },
    fevereiro: { status: 'regular', value: 'Regular | x%' },
    marco: { status: 'regular', value: 'Regular | x%' },
    abril: { status: 'suficiente', value: 'Suficiente | x%' },
    consolidado: { status: 'regular', value: 'Regular | x%' },
  },
  {
    key: '7',
    equipe: 'ESF Nova Esperança',
    unidade: 'UBS Centro',
    tipoEquipe: 'eSF',
    indicador: 'C7 - Cuidado da mulher',
    janeiro: { status: 'suficiente', value: 'Suficiente | x%' },
    fevereiro: { status: 'bom', value: 'Bom | x%' },
    marco: { status: 'bom', value: 'Bom | x%' },
    abril: { status: 'otimo', value: 'Ótimo | x%' },
    consolidado: { status: 'bom', value: 'Bom | x%' },
  },
];

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
    title: 'Tipo',
    dataIndex: 'tipoEquipe',
    key: 'tipoEquipe',
    width: 80,
  },
  {
    title: '',
    key: 'actions',
    width: 120,
    render: (_, record) => (
      <Link to={`/financiamento-aps/qualidade-esf-eap/relatorio?equipe=${record.key}`}>
        <Button size="small" icon={<Eye className="h-3 w-3" />}>
          Ver relatório
        </Button>
      </Link>
    ),
  },
];

const ExpandedRow: React.FC<{ record: TeamData }> = ({ record }) => {
  const months = [
    { label: 'Janeiro', data: record.janeiro },
    { label: 'Fevereiro', data: record.fevereiro },
    { label: 'Março', data: record.marco },
    { label: 'Abril', data: record.abril },
  ];

  return (
    <div className="py-3 px-4 bg-muted/30">
      <div className="mb-3">
        <span className="text-sm text-muted-foreground">Indicador: </span>
        <span className="font-medium">{record.indicador}</span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {months.map((month) => (
          <div key={month.label} className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">{month.label}</span>
            <StatusBadge 
              status={month.data.status} 
              value={month.data.value.split('|')[1]?.trim()} 
            />
          </div>
        ))}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground font-medium">Resultado do Quadrimestre</span>
          <StatusBadge 
            status={record.consolidado.status} 
            value={record.consolidado.value.split('|')[1]?.trim()} 
          />
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
