import React from 'react';
import { Table, Button, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download, Eye } from 'lucide-react';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface ReportData {
  key: string;
  equipe: string;
  unidade: string;
  classificacao: Classification;
  numerador: number;
  denominador: number;
  pontuacao: number;
  tipoRegistro: string;
}

interface ReportTableProps {
  data?: ReportData[];
  totalEquipes?: number;
  onViewIndividual?: (key: string) => void;
}

const classificationColors: Record<Classification, string> = {
  otimo: 'green',
  bom: 'gold',
  suficiente: 'orange',
  regular: 'red',
};

const classificationLabels: Record<Classification, string> = {
  otimo: 'Ótimo',
  bom: 'Bom',
  suficiente: 'Suficiente',
  regular: 'Regular',
};

const sampleData: ReportData[] = [
  { key: '1', equipe: 'ESF Vila Nova', unidade: 'UBS Centro', classificacao: 'regular', numerador: 2.29, denominador: 4, pontuacao: 57.25, tipoRegistro: 'Individualizado' },
  { key: '2', equipe: 'ESF Jardim América', unidade: 'UBS Norte', classificacao: 'regular', numerador: 2.29, denominador: 4, pontuacao: 57.25, tipoRegistro: 'Individualizado' },
  { key: '3', equipe: 'ESF Centro', unidade: 'UBS Sul', classificacao: 'regular', numerador: 2.64, denominador: 4, pontuacao: 52.8, tipoRegistro: 'Individualizado' },
  { key: '4', equipe: 'ESF Parque Industrial', unidade: 'UBS Centro', classificacao: 'suficiente', numerador: 2.29, denominador: 4, pontuacao: 57.25, tipoRegistro: 'Individualizado' },
  { key: '5', equipe: 'ESF Bela Vista', unidade: 'UBS Norte', classificacao: 'bom', numerador: 2.29, denominador: 4, pontuacao: 57.25, tipoRegistro: 'Individualizado' },
  { key: '6', equipe: 'ESF Santa Maria', unidade: 'UBS Sul', classificacao: 'regular', numerador: 2.29, denominador: 4, pontuacao: 57.25, tipoRegistro: 'Individualizado' },
  { key: '7', equipe: 'ESF Nova Esperança', unidade: 'UBS Centro', classificacao: 'otimo', numerador: 2.64, denominador: 4, pontuacao: 52.8, tipoRegistro: 'Individualizado' },
  { key: '8', equipe: 'ESF São João', unidade: 'UBS Norte', classificacao: 'regular', numerador: 2.29, denominador: 4, pontuacao: 57.25, tipoRegistro: 'Individualizado' },
  { key: '9', equipe: 'ESF Boa Vista', unidade: 'UBS Sul', classificacao: 'regular', numerador: 2.64, denominador: 4, pontuacao: 52.8, tipoRegistro: 'Individualizado' },
  { key: '10', equipe: 'ESF Primavera', unidade: 'UBS Centro', classificacao: 'regular', numerador: 2.64, denominador: 4, pontuacao: 52.8, tipoRegistro: 'Individualizado' },
];

export const ReportTable: React.FC<ReportTableProps> = ({
  data = sampleData,
  totalEquipes = 398,
  onViewIndividual,
}) => {
  const columns: ColumnsType<ReportData> = [
    {
      title: 'Equipe de saúde',
      dataIndex: 'equipe',
      key: 'equipe',
      fixed: 'left',
      width: 200,
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Unidade',
      dataIndex: 'unidade',
      key: 'unidade',
      width: 150,
    },
    {
      title: 'Classificação',
      dataIndex: 'classificacao',
      key: 'classificacao',
      width: 120,
      render: (classification: Classification) => (
        <Tag color={classificationColors[classification]}>
          {classificationLabels[classification]}
        </Tag>
      ),
    },
    {
      title: 'Numerador',
      dataIndex: 'numerador',
      key: 'numerador',
      width: 100,
      align: 'right',
    },
    {
      title: 'Denominador',
      dataIndex: 'denominador',
      key: 'denominador',
      width: 110,
      align: 'right',
    },
    {
      title: 'Pontuação',
      dataIndex: 'pontuacao',
      key: 'pontuacao',
      width: 100,
      align: 'right',
    },
    {
      title: 'Ação',
      key: 'actions',
      fixed: 'right',
      width: 140,
      render: (_, record) => (
        <Button
          size="small"
          onClick={() => onViewIndividual?.(record.key)}
        >
          {record.tipoRegistro}
        </Button>
      ),
    },
  ];

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
        scroll={{ x: 1000 }}
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
