import React from 'react';

interface CriterioItem {
  prioridade: number;
  situacao: string;
  destaque?: string;
}

const criterios: CriterioItem[] = [
  {
    prioridade: 1,
    situacao: 'Equipe em que o usuário apresentar o ',
    destaque: 'maior número de atendimentos no período de um ano;',
  },
  {
    prioridade: 2,
    situacao: 'Equipe responsável pelo ',
    destaque: 'atendimento mais recente do usuário;',
  },
  {
    prioridade: 3,
    situacao: 'Equipe em que usuário possuir o ',
    destaque: 'cadastro mais atualizado, considerando as últimas informações registrada no sistema.',
  },
];

export const CriteriosVinculacao: React.FC = () => {
  return (
    <div className="bg-card rounded-lg shadow-sm p-4 sm:p-6">
      <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3 sm:mb-4">
        Critérios de vinculação
      </h3>
      
      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
        De acordo com a{' '}
        <a 
          href="https://www.in.gov.br/web/dou/-/portaria-saps/ms-n-161-de-10-de-dezembro-de-2024-600772573" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Portaria SAPS/MS Nº 161
        </a>
        ,{' '}
        <strong className="text-foreground">
          o vínculo será definido com base nos cadastros individuais realizados.
        </strong>{' '}
        <span className="hidden sm:inline">
          Caso o cidadão possua mais de um cadastro, serão observados os seguintes critérios de desempate:
        </span>
      </p>

      {/* Mobile: Cards view */}
      <div className="sm:hidden space-y-3">
        {criterios.map((criterio) => (
          <div 
            key={criterio.prioridade}
            className="flex gap-3 p-3 bg-muted/30 rounded-lg"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0">
              {criterio.prioridade}
            </div>
            <p className="text-xs text-muted-foreground flex-1">
              {criterio.situacao}
              {criterio.destaque && (
                <span className="text-primary">{criterio.destaque}</span>
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop: Table view */}
      <div className="hidden sm:block border border-border rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/30 border-b border-border">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground w-24">
                Prioridade
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Situação
              </th>
            </tr>
          </thead>
          <tbody>
            {criterios.map((criterio, index) => (
              <tr 
                key={criterio.prioridade}
                className={index < criterios.length - 1 ? 'border-b border-border' : ''}
              >
                <td className="px-4 py-3 text-sm text-muted-foreground text-center">
                  {criterio.prioridade}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {criterio.situacao}
                  {criterio.destaque && (
                    <span className="text-primary">{criterio.destaque}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
