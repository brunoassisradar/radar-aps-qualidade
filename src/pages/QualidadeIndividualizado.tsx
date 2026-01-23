import React, { useState, useEffect } from 'react';
import { Table, Button, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download, ChevronDown, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { FilterBar } from '@/components/financiamento/FilterBar';

interface PessoaData {
  key: string;
  nome: string;
  cpfCns: string;
  equipe: string;
  unidade: string;
  microarea: string;
  indicadores: string[];
}

const sampleData: PessoaData[] = [
  {
    key: '1',
    nome: 'Maria da Silva Santos',
    cpfCns: '123.456.789-00',
    equipe: 'Equipe 001 - ESF',
    unidade: 'UBS Centro',
    microarea: '01',
    indicadores: ['C2', 'C3'],
  },
  {
    key: '2',
    nome: 'João Pedro Oliveira',
    cpfCns: '987.654.321-00',
    equipe: 'Equipe 002 - ESF',
    unidade: 'UBS Norte',
    microarea: '02',
    indicadores: ['C4'],
  },
  {
    key: '3',
    nome: 'Ana Carolina Ferreira',
    cpfCns: '456.789.123-00',
    equipe: 'Equipe 001 - ESF',
    unidade: 'UBS Centro',
    microarea: '01',
    indicadores: ['C2', 'C5', 'C6'],
  },
  {
    key: '4',
    nome: 'Carlos Eduardo Lima',
    cpfCns: '789.123.456-00',
    equipe: 'Equipe 003 - eAP',
    unidade: 'UBS Sul',
    microarea: '03',
    indicadores: ['C5', 'C6'],
  },
  {
    key: '5',
    nome: 'Fernanda Costa Ribeiro',
    cpfCns: '321.654.987-00',
    equipe: 'Equipe 002 - ESF',
    unidade: 'UBS Norte',
    microarea: '02',
    indicadores: ['C2'],
  },
  {
    key: '6',
    nome: 'Roberto Alves Mendes',
    cpfCns: '654.987.321-00',
    equipe: 'Equipe 001 - ESF',
    unidade: 'UBS Centro',
    microarea: '04',
    indicadores: ['C5'],
  },
  {
    key: '7',
    nome: 'Patrícia Souza Gomes',
    cpfCns: '147.258.369-00',
    equipe: 'Equipe 003 - eAP',
    unidade: 'UBS Sul',
    microarea: '03',
    indicadores: ['C6', 'C7'],
  },
  {
    key: '8',
    nome: 'Marcos Vinícius Pereira',
    cpfCns: '258.369.147-00',
    equipe: 'Equipe 002 - ESF',
    unidade: 'UBS Norte',
    microarea: '05',
    indicadores: ['C3', 'C4', 'C7'],
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
    dataIndex: 'indicadores',
    key: 'indicadores',
    width: '20%',
    filters: [
      { text: 'C2', value: 'C2' },
      { text: 'C3', value: 'C3' },
      { text: 'C4', value: 'C4' },
      { text: 'C5', value: 'C5' },
      { text: 'C6', value: 'C6' },
      { text: 'C7', value: 'C7' },
    ],
    onFilter: (value, record) => record.indicadores.includes(value as string),
    render: (indicadores: string[]) => (
      <div className="flex flex-wrap gap-1">
        {indicadores.map((ind) => (
          <span
            key={ind}
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground"
          >
            {ind}
          </span>
        ))}
      </div>
    ),
  },
];

// Reusable table content component
const IndividualizadoTableContent: React.FC<{
  expandedRowKeys: string[];
  onExpand: (expanded: boolean, record: PessoaData) => void;
}> = ({ expandedRowKeys, onExpand }) => (
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
        onExpand,
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
);

const QualidadeIndividualizado: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  
  // Get initial tab from URL params
  const initialTab = searchParams.get('tab') || 'qualidade';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Update state when URL params change
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['vinculo', 'qualidade'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleExpand = (expanded: boolean, record: PessoaData) => {
    if (expanded) {
      setExpandedRowKeys([...expandedRowKeys, record.key]);
    } else {
      setExpandedRowKeys(expandedRowKeys.filter(key => key !== record.key));
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', key);
    setSearchParams(newParams, { replace: true });
  };

  const renderQualidadeContent = () => (
    <div className="space-y-6">
      <FilterBar />
      <IndividualizadoTableContent 
        expandedRowKeys={expandedRowKeys} 
        onExpand={handleExpand} 
      />
    </div>
  );

  const renderVinculoContent = () => (
    <div className="space-y-6">
      <FilterBar />
      <IndividualizadoTableContent 
        expandedRowKeys={expandedRowKeys} 
        onExpand={handleExpand} 
      />
    </div>
  );

  const tabItems = [
    {
      key: 'vinculo',
      label: 'Vínculo e Acompanhamento',
      children: <div className="pt-4">{renderVinculoContent()}</div>,
    },
    {
      key: 'qualidade',
      label: 'Qualidade eSF/eAP',
      children: <div className="pt-4">{renderQualidadeContent()}</div>,
    },
  ];

  const breadcrumbLabel = activeTab === 'vinculo' ? 'Vínculo e Acompanhamento' : 'Qualidade eSF/eAP';
  const breadcrumbPath = activeTab === 'vinculo' 
    ? '/financiamento-aps/qualidade-esf-eap?tab=vinculo' 
    : '/financiamento-aps/qualidade-esf-eap?tab=qualidade';
  const relatorioPath = activeTab === 'vinculo'
    ? '/financiamento-aps/qualidade-esf-eap/relatorio?tab=vinculo'
    : '/financiamento-aps/qualidade-esf-eap/relatorio?tab=qualidade';

  return (
    <div>
      <PageHeader
        title="Individualizado do Financiamento APS"
        breadcrumbs={[
          { label: 'Financiamento APS', path: '/financiamento-aps' },
          { label: breadcrumbLabel, path: breadcrumbPath },
          { label: 'Relatório', path: relatorioPath },
          { label: 'Individualizado' },
        ]}
      />

      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={tabItems}
        size="large"
        className="financiamento-tabs"
      />
    </div>
  );
};

export default QualidadeIndividualizado;
