import type { Meta, StoryObj } from '@storybook/react';
import { ConfigProvider } from 'antd';
import { FAQAccordion } from './FAQAccordion';
import ptBR from '@/lib/antd-locale-pt-BR';

const meta: Meta<typeof FAQAccordion> = {
  title: 'Molecules/FAQAccordion',
  component: FAQAccordion,
  decorators: [
    (Story) => (
      <ConfigProvider locale={ptBR}>
        <Story />
      </ConfigProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
O **FAQAccordion** é um accordion especializado para seções de perguntas frequentes.
Baseado no Ant Design v4 Collapse, exibe perguntas e respostas em formato expansível.

### Uso básico
\`\`\`tsx
import { FAQAccordion } from '@/components/molecules/FAQAccordion';

<FAQAccordion 
  items={[
    { question: 'Pergunta 1', answer: 'Resposta 1' },
    { question: 'Pergunta 2', answer: 'Resposta 2' },
  ]} 
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array de perguntas e respostas',
    },
    title: {
      control: 'text',
      description: 'Título da seção de FAQ',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        question: 'O que é o Financiamento APS?',
        answer: 'O Financiamento da Atenção Primária à Saúde (APS) é um modelo de custeio baseado em resultados, que vincula parte do repasse financeiro federal ao desempenho das equipes de saúde.',
      },
      {
        question: 'Como são calculados os indicadores?',
        answer: 'Os indicadores são calculados com base nos dados enviados pelas equipes de saúde através do SISAB, considerando o período do quadrimestre vigente.',
      },
      {
        question: 'Quando os dados são atualizados?',
        answer: 'Os dados são atualizados mensalmente, após o fechamento do período de envio das informações pelas equipes de saúde.',
      },
    ],
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Dúvidas Frequentes',
    items: [
      {
        question: 'Como acessar o relatório detalhado?',
        answer: 'Clique no menu lateral e selecione "Relatório" para acessar as informações detalhadas de cada equipe.',
      },
      {
        question: 'Posso exportar os dados?',
        answer: 'Sim, todos os relatórios podem ser exportados em formato PDF ou Excel através do botão "Exportar" disponível em cada tela.',
      },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      {
        question: 'O que fazer em caso de divergência nos dados?',
        answer: 'Em caso de divergência, entre em contato com o suporte técnico através do e-mail suporte@saude.gov.br informando o código da equipe e o período afetado.',
      },
    ],
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      {
        question: 'O que é o Previne Brasil?',
        answer: 'O Previne Brasil é o novo modelo de financiamento da APS que estabelece um modelo de custeio baseado em resultados e indicadores de qualidade.',
      },
      {
        question: 'Quais são os componentes do financiamento?',
        answer: 'O financiamento é dividido em: Capitação Ponderada, Pagamento por Desempenho, Incentivo para Ações Estratégicas e Incentivo Financeiro com Base em Critério Populacional.',
      },
      {
        question: 'O que é capitação ponderada?',
        answer: 'É o valor per capita transferido mensalmente ao município com base no número de pessoas cadastradas nas equipes de Saúde da Família.',
      },
      {
        question: 'Como funciona o pagamento por desempenho?',
        answer: 'O pagamento por desempenho está vinculado ao alcance de metas em indicadores de saúde definidos pelo Ministério da Saúde.',
      },
      {
        question: 'Quais indicadores são avaliados?',
        answer: 'São avaliados 7 indicadores relacionados à saúde da mulher, saúde da criança, doenças crônicas e saúde mental.',
      },
    ],
  },
};
