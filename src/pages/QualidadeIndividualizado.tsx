import React, { useState } from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download, ChevronDown, ChevronRight } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { FilterBar } from '@/components/financiamento/FilterBar';

interface PessoaData {
  key: string;
  nome: string;
  cpfCns: string;
  equipe: string;
  unidade: string;
  microarea: string;
  indicador: string;
}

const sampleData: PessoaData[] = [
  {
    key: '1',
    nome: 'Maria da Silva Santos',
    cpfCns: '123.456.789-00',
    equipe: 'Equipe 001 - ESF',
    unidade: 'UBS Centro',
    microarea: '01',
    indicador: 'C1 - Pré-Natal',
  },
  {
    key: '2',
    nome: 'João Pedro Oliveira',
    cpfCns: '987.654.321-00',
    equipe: 'Equipe 002 - ESF',
    unidade: 'UBS Norte',
    microarea: '02',
    indicador: 'C2 - Saúde da Criança',
  },
  {
    key: '3',
    nome: 'Ana Carolina Ferreira',
    cpfCns: '456.789.123-00',
    equipe: 'Equipe 001 - ESF',
    unidade: 'UBS Centro',
    microarea: '01',
    indicador: 'C3 - Puerpério',
  },
  {
    key: '4',
    nome: 'Carlos Eduardo Lima',
    cpfCns: '789.123.456-00',
    equipe: 'Equipe 003 - eAP',
    unidade: 'UBS Sul',
    microarea: '03',
    indicador: 'C4 - Doenças Crônicas',
  },
  {
    key: '5',
    nome: 'Fernanda Costa Ribeiro',
    cpfCns: '321.654.987-00',
    equipe: 'Equipe 002 - ESF',
    unidade: 'UBS Norte',
    microarea: '02',
    indicador: 'C1 - Pré-Natal',
  },
  {
    key: '6',
    nome: 'Roberto Alves Mendes',
    cpfCns: '654.987.321-00',
    equipe: 'Equipe 001 - ESF',
    unidade: 'UBS Centro',
    microarea: '04',
    indicador: 'C5 - Hipertensão',
  },
  {
    key: '7',
    nome: 'Patrícia Souza Gomes',
    cpfCns: '147.258.369-00',
    equipe: 'Equipe 003 - eAP',
    unidade: 'UBS Sul',
    microarea: '03',
    indicador: 'C6 - Diabetes',
  },
  {
    key: '8',
    nome: 'Marcos Vinícius Pereira',
    cpfCns: '258.369.147-00',
    equipe: 'Equipe 002 - ESF',
    unidade: 'UBS Norte',
    microarea: '05',
    indicador: 'C7 - Saúde Mental',
  },
];

const columns: ColumnsType<PessoaData> = [
  {
    title: 'Nome',
    dataIndex: 'nome',
    key: 'nome',
    width: '22%',
    sorter: (a, b) => a.nome.localeCompare(b.nome),
  },
  {
    title: 'CPF/CNS',
    dataIndex: 'cpfCns',
    key: 'cpfCns',
    width: '15%',
  },
  {
    title: 'Equipe de saúde',
    dataIndex: 'equipe',
    key: 'equipe',
    width: '18%',
    filters: [
      { text: 'Equipe 001 - ESF', value: 'Equipe 001 - ESF' },
      { text: 'Equipe 002 - ESF', value: 'Equipe 002 - ESF' },
      { text: 'Equipe 003 - eAP', value: 'Equipe 003 - eAP' },
    ],
    onFilter: (value, record) => record.equipe === value,
  },
  {
    title: 'Unidade',
    dataIndex: 'unidade',
    key: 'unidade',
    width: '15%',
    filters: [
      { text: 'UBS Centro', value: 'UBS Centro' },
      { text: 'UBS Norte', value: 'UBS Norte' },
      { text: 'UBS Sul', value: 'UBS Sul' },
    ],
    onFilter: (value, record) => record.unidade === value,
  },
  {
    title: 'Microárea',
    dataIndex: 'microarea',
    key: 'microarea',
    width: '10%',
    align: 'center',
    sorter: (a, b) => a.microarea.localeCompare(b.microarea),
  },
  {
    title: 'Indicador',
    dataIndex: 'indicador',
    key: 'indicador',
    width: '20%',
    filters: [
      { text: 'C1 - Pré-Natal', value: 'C1 - Pré-Natal' },
      { text: 'C2 - Saúde da Criança', value: 'C2 - Saúde da Criança' },
      { text: 'C3 - Puerpério', value: 'C3 - Puerpério' },
      { text: 'C4 - Doenças Crônicas', value: 'C4 - Doenças Crônicas' },
      { text: 'C5 - Hipertensão', value: 'C5 - Hipertensão' },
      { text: 'C6 - Diabetes', value: 'C6 - Diabetes' },
      { text: 'C7 - Saúde Mental', value: 'C7 - Saúde Mental' },
    ],
    onFilter: (value, record) => record.indicador === value,
  },
];

const QualidadeIndividualizado: React.FC = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const breadcrumbItems = [
    { label: 'Financiamento APS', path: '/financiamento-aps' },
    { label: 'Qualidade eSF/eAP', path: '/financiamento-aps/qualidade-esf-eap' },
    { label: 'Relatório', path: '/financiamento-aps/qualidade-esf-eap/relatorio' },
    { label: 'Individualizado' },
  ];

  const handleExpand = (expanded: boolean, record: PessoaData) => {
    if (expanded) {
      setExpandedRowKeys([...expandedRowKeys, record.key]);
    } else {
      setExpandedRowKeys(expandedRowKeys.filter(key => key !== record.key));
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Individualizado de Qualidade eSF/eAP"
        breadcrumbs={breadcrumbItems}
      />

      <FilterBar />

      <div className="rounded-lg bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">
            Total de registros: <strong className="text-foreground">{sampleData.length}</strong>
          </span>
          <Button icon={<Download className="h-4 w-4" />}>
            Exportar
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={sampleData}
          expandable={{
            expandedRowKeys,
            onExpand: handleExpand,
            expandedRowRender: () => (
              <div className="p-4 bg-muted/30 rounded-md">
                <span className="text-sm text-muted-foreground italic">
                  Detalhes do cadastro individual (em desenvolvimento)
                </span>
              </div>
            ),
            expandIcon: ({ expanded, onExpand, record }) => (
              <button
                onClick={(e) => onExpand(record, e)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                {expanded ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            ),
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} registros`,
          }}
          size="middle"
        />
      </div>
    </div>
  );
};

export default QualidadeIndividualizado;
