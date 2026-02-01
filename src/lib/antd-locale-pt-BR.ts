// Locale pt-BR para Ant Design v4
// Arquivo local para evitar problemas de cache/importação no Vite

const ptBR = {
  locale: 'pt-br',
  global: {
    placeholder: 'Por favor, selecione',
  },
  Table: {
    filterTitle: 'Filtro',
    filterConfirm: 'OK',
    filterReset: 'Limpar',
    filterEmptyText: 'Sem filtros',
    emptyText: 'Sem dados',
    selectAll: 'Selecionar página atual',
    selectInvert: 'Inverter seleção',
    selectNone: 'Limpar todos os dados',
    selectionAll: 'Selecionar todos os dados',
    sortTitle: 'Ordenar',
    expand: 'Expandir linha',
    collapse: 'Colapsar linha',
    triggerDesc: 'Clique para ordenar decrescente',
    triggerAsc: 'Clique para ordenar crescente',
    cancelSort: 'Clique para cancelar ordenação',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Cancelar',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Cancelar',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Pesquisar',
    itemUnit: 'item',
    itemsUnit: 'itens',
    remove: 'Remover',
    selectCurrent: 'Selecionar página atual',
    removeCurrent: 'Remover página atual',
    selectAll: 'Selecionar todos os dados',
    removeAll: 'Remover todos os dados',
    selectInvert: 'Inverter seleção',
  },
  Upload: {
    uploading: 'Enviando...',
    removeFile: 'Remover arquivo',
    uploadError: 'Erro de upload',
    previewFile: 'Pré-visualizar arquivo',
    downloadFile: 'Baixar arquivo',
  },
  Empty: {
    description: 'Não há dados',
  },
  Icon: {
    icon: 'ícone',
  },
  Text: {
    edit: 'Editar',
    copy: 'Copiar',
    copied: 'Copiado',
    expand: 'Expandir',
  },
  PageHeader: {
    back: 'Voltar',
  },
  Form: {
    optional: '(opcional)',
    defaultValidateMessages: {
      default: 'Erro de validação no campo ${label}',
      required: 'Por favor, insira ${label}',
      enum: '${label} deve ser um dos seguintes: [${enum}]',
      whitespace: '${label} não pode ser um caractere em branco',
      date: {
        format: '${label} tem formato de data inválido',
        parse: '${label} não pode ser convertido para uma data',
        invalid: '${label} é uma data inválida',
      },
      types: {
        string: '${label} não é um ${type} válido',
        method: '${label} não é um ${type} válido',
        array: '${label} não é um ${type} válido',
        object: '${label} não é um ${type} válido',
        number: '${label} não é um ${type} válido',
        date: '${label} não é um ${type} válido',
        boolean: '${label} não é um ${type} válido',
        integer: '${label} não é um ${type} válido',
        float: '${label} não é um ${type} válido',
        regexp: '${label} não é um ${type} válido',
        email: '${label} não é um ${type} válido',
        url: '${label} não é um ${type} válido',
        hex: '${label} não é um ${type} válido',
      },
      string: {
        len: '${label} deve ter ${len} caracteres',
        min: '${label} deve ter no mínimo ${min} caracteres',
        max: '${label} deve ter no máximo ${max} caracteres',
        range: '${label} deve ter entre ${min} e ${max} caracteres',
      },
      number: {
        len: '${label} deve ser igual a ${len}',
        min: '${label} deve ser no mínimo ${min}',
        max: '${label} deve ser no máximo ${max}',
        range: '${label} deve estar entre ${min} e ${max}',
      },
      array: {
        len: '${label} deve ter ${len} itens',
        min: '${label} deve ter no mínimo ${min} itens',
        max: '${label} deve ter no máximo ${max} itens',
        range: '${label} deve ter entre ${min} e ${max} itens',
      },
      pattern: {
        mismatch: '${label} não corresponde ao padrão ${pattern}',
      },
    },
  },
  Image: {
    preview: 'Pré-visualizar',
  },
};

export default ptBR;
