import React from 'react';
import { Table, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface VinculoData {
  key: string;
  equipeSaude: string;
  unidade: string;
  ine: string;
  cnes: string;
  dimensaoCadastro: Classification;
  dimensaoAcompanhamento: Classification;
  notaFinal: number;
  classificacaoFinal: Classification;
}

const classificationConfig: Record<Classification, { label: string; color: string }> = {
  otimo: { label: 'ÓTIMO', color: '#3C8DBC' },
  bom: { label: 'BOM', color: '#00A65A' },
  suficiente: { label: 'SUFICIENTE', color: '#F0AD4E' },
  regular: { label: 'REGULAR', color: '#DD4B39' },
};

const StatusBadge: React.FC<{ classification: Classification }> = ({ classification }) => {
  const config = classificationConfig[classification];
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border"
      style={{
        color: config.color,
        borderColor: config.color,
        backgroundColor: 'transparent',
      }}
    >
      {config.label}
    </span>
  );
};

const ResultadoBadge: React.FC<{ nota: number; classification: Classification }> = ({ nota, classification }) => {
  const config = classificationConfig[classification];
  return (
    <div className="flex items-center justify-end gap-2">
      <span className="text-sm text-muted-foreground">{nota}</span>
      <span
        className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium text-white"
        style={{ backgroundColor: config.color }}
      >
        {config.label}
      </span>
    </div>
  );
};

const sampleData: VinculoData[] = [
  { key: '1', equipeSaude: 'Equipe 001 - ESF', unidade: 'Uaps Anisio Teixeira', ine: '0000123456', cnes: '2529181', dimensaoCadastro: 'bom', dimensaoAcompanhamento: 'regular', notaFinal: 4, classificacaoFinal: 'regular' },
  { key: '2', equipeSaude: 'Equipe 002 - ESF', unidade: 'Uaps Vicentina Campos', ine: '0000234567', cnes: '2529203', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'regular', notaFinal: 4.75, classificacaoFinal: 'regular' },
  { key: '3', equipeSaude: 'Equipe 003 - eAP', unidade: 'Uaps Gutemberg Braun', ine: '0000345678', cnes: '2482282', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'regular', notaFinal: 4.75, classificacaoFinal: 'regular' },
  { key: '4', equipeSaude: 'Equipe 004 - ESF', unidade: 'Uaps Fausto Freire', ine: '0000456789', cnes: '9686479', dimensaoCadastro: 'bom', dimensaoAcompanhamento: 'regular', notaFinal: 4, classificacaoFinal: 'regular' },
  { key: '5', equipeSaude: 'Equipe 005 - ESF', unidade: 'Uaps Helio Goes', ine: '0000567890', cnes: '2529211', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'suficiente', notaFinal: 6.5, classificacaoFinal: 'suficiente' },
  { key: '6', equipeSaude: 'Equipe 006 - eAP', unidade: 'Uaps Licinio Nunes de Miranda', ine: '0000678901', cnes: '9129553', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'suficiente', notaFinal: 6.5, classificacaoFinal: 'suficiente' },
  { key: '7', equipeSaude: 'Equipe 007 - ESF', unidade: 'Uaps Pontes Neto', ine: '0000789012', cnes: '9006052', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'suficiente', notaFinal: 6.5, classificacaoFinal: 'suficiente' },
  { key: '8', equipeSaude: 'Equipe 008 - ESF', unidade: 'Uaps Fernandes Tavora', ine: '0000890123', cnes: '2528819', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'bom', notaFinal: 8.25, classificacaoFinal: 'bom' },
  { key: '9', equipeSaude: 'Equipe 009 - eAP', unidade: 'Uaps Virgilio Tavora', ine: '0000901234', cnes: '2415585', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'suficiente', notaFinal: 6.5, classificacaoFinal: 'suficiente' },
  { key: '10', equipeSaude: 'Equipe 010 - ESF', unidade: 'Uaps Cdfam Gilmario Teixeira', ine: '0001012345', cnes: '0407836', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'suficiente', notaFinal: 6.5, classificacaoFinal: 'suficiente' },
];

const columns: ColumnsType<VinculoData> = [
  {
    title: 'Equipe de Saúde',
    dataIndex: 'equipeSaude',
    key: 'equipeSaude',
    sorter: (a, b) => a.equipeSaude.localeCompare(b.equipeSaude),
  },
  {
    title: 'Unidade',
    dataIndex: 'unidade',
    key: 'unidade',
    sorter: (a, b) => a.unidade.localeCompare(b.unidade),
  },
  {
    title: 'INE',
    dataIndex: 'ine',
    key: 'ine',
    width: 120,
    sorter: (a, b) => a.ine.localeCompare(b.ine),
  },
  {
    title: 'CNES',
    dataIndex: 'cnes',
    key: 'cnes',
    width: 100,
    sorter: (a, b) => a.cnes.localeCompare(b.cnes),
  },
  {
    title: 'Dimensão Cadastro',
    dataIndex: 'dimensaoCadastro',
    key: 'dimensaoCadastro',
    width: 160,
    align: 'center',
    filters: [
      { text: 'Ótimo', value: 'otimo' },
      { text: 'Bom', value: 'bom' },
      { text: 'Suficiente', value: 'suficiente' },
      { text: 'Regular', value: 'regular' },
    ],
    onFilter: (value, record) => record.dimensaoCadastro === value,
    sorter: (a, b) => a.dimensaoCadastro.localeCompare(b.dimensaoCadastro),
    render: (classification: Classification) => <StatusBadge classification={classification} />,
  },
  {
    title: 'Dimensão Acompanhamento',
    dataIndex: 'dimensaoAcompanhamento',
    key: 'dimensaoAcompanhamento',
    width: 200,
    align: 'center',
    filters: [
      { text: 'Ótimo', value: 'otimo' },
      { text: 'Bom', value: 'bom' },
      { text: 'Suficiente', value: 'suficiente' },
      { text: 'Regular', value: 'regular' },
    ],
    onFilter: (value, record) => record.dimensaoAcompanhamento === value,
    sorter: (a, b) => a.dimensaoAcompanhamento.localeCompare(b.dimensaoAcompanhamento),
    render: (classification: Classification) => <StatusBadge classification={classification} />,
  },
  {
    title: 'Nota Final',
    dataIndex: 'notaFinal',
    key: 'notaFinal',
    width: 160,
    align: 'right',
    filters: [
      { text: 'Ótimo', value: 'otimo' },
      { text: 'Bom', value: 'bom' },
      { text: 'Suficiente', value: 'suficiente' },
      { text: 'Regular', value: 'regular' },
    ],
    onFilter: (value, record) => record.classificacaoFinal === value,
    sorter: (a, b) => a.notaFinal - b.notaFinal,
    render: (nota: number, record: VinculoData) => (
      <ResultadoBadge nota={nota} classification={record.classificacaoFinal} />
    ),
  },
];

export const VinculoAcompanhamentoTable: React.FC = () => {
  return (
    <Table
      columns={columns}
      dataSource={sampleData}
      pagination={{
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} equipes`,
        pageSizeOptions: ['10', '20', '50'],
        defaultPageSize: 10,
      }}
      size="middle"
      className="bg-card rounded-lg shadow-sm"
    />
  );
};
