import React from 'react';
import { Table, Button, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge } from './StatusBadge';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface TeamData {
  key: string;
  equipe: string;
  unidade: string;
  tipoEquipe: string;
  indicador: string;
  janeiro: { status: Classification; value: string };
  fevereiro: { status: Classification; value: string };
  marco: { status: Classification; value: string };
  abril: { status: Classification; value: string };
  consolidado: { status: Classification; value: string };
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
    fixed: 'left',
    width: 180,
    render: (text: string) => <span className="font-medium">{text}</span>,
  },
  {
    title: 'Unidade',
    dataIndex: 'unidade',
    key: 'unidade',
    width: 140,
  },
  {
    title: 'Indicador',
    dataIndex: 'indicador',
    key: 'indicador',
    width: 200,
  },
  {
    title: 'Janeiro',
    dataIndex: 'janeiro',
    key: 'janeiro',
    width: 140,
    render: (value: { status: Classification; value: string }) => (
      <StatusBadge status={value.status} value={value.value.split('|')[1]?.trim()} />
    ),
  },
  {
    title: 'Fevereiro',
    dataIndex: 'fevereiro',
    key: 'fevereiro',
    width: 140,
    render: (value: { status: Classification; value: string }) => (
      <StatusBadge status={value.status} value={value.value.split('|')[1]?.trim()} />
    ),
  },
  {
    title: 'Março',
    dataIndex: 'marco',
    key: 'marco',
    width: 140,
    render: (value: { status: Classification; value: string }) => (
      <StatusBadge status={value.status} value={value.value.split('|')[1]?.trim()} />
    ),
  },
  {
    title: 'Abril',
    dataIndex: 'abril',
    key: 'abril',
    width: 140,
    render: (value: { status: Classification; value: string }) => (
      <StatusBadge status={value.status} value={value.value.split('|')[1]?.trim()} />
    ),
  },
  {
    title: 'Resultado do quadrimestre',
    dataIndex: 'consolidado',
    key: 'consolidado',
    width: 180,
    render: (value: { status: Classification; value: string }) => (
      <StatusBadge status={value.status} value={value.value.split('|')[1]?.trim()} />
    ),
  },
  {
    title: '',
    key: 'actions',
    fixed: 'right',
    width: 140,
    render: (_, record) => (
      <div className="flex gap-2">
        <Link to={`/financiamento-aps/qualidade-esf-eap/relatorio?equipe=${record.key}`}>
          <Button size="small" icon={<Eye className="h-3 w-3" />}>
            Ver relatório
          </Button>
        </Link>
      </div>
    ),
  },
];

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
        scroll={{ x: 1400 }}
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
