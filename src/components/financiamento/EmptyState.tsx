import React from 'react';
import { Empty, Alert } from 'antd';
import { FileQuestion, AlertCircle, Database, Clock } from 'lucide-react';

export type EmptyStateReason = 
  | 'no-data' 
  | 'no-period-data' 
  | 'processing' 
  | 'no-teams';

interface EmptyStateConfig {
  icon: React.ReactNode;
  title: string;
  description: string;
  alertType: 'info' | 'warning';
}

const emptyStateConfigs: Record<EmptyStateReason, EmptyStateConfig> = {
  'no-data': {
    icon: <Database className="w-12 h-12 text-muted-foreground" />,
    title: 'Nenhum dado disponível',
    description: 'Não há dados cadastrados para este indicador. Verifique se os dados foram enviados corretamente pelo sistema e-SUS APS.',
    alertType: 'info',
  },
  'no-period-data': {
    icon: <FileQuestion className="w-12 h-12 text-muted-foreground" />,
    title: 'Dados não disponíveis para este período',
    description: 'O período selecionado ainda não possui dados processados. Os dados podem levar até 48 horas após o fechamento da competência para serem disponibilizados.',
    alertType: 'warning',
  },
  'processing': {
    icon: <Clock className="w-12 h-12 text-muted-foreground" />,
    title: 'Dados em processamento',
    description: 'Os dados estão sendo processados e estarão disponíveis em breve. Por favor, tente novamente mais tarde.',
    alertType: 'info',
  },
  'no-teams': {
    icon: <AlertCircle className="w-12 h-12 text-muted-foreground" />,
    title: 'Nenhuma equipe vinculada',
    description: 'Não foram encontradas equipes vinculadas para este município. Verifique o cadastro de equipes no CNES.',
    alertType: 'warning',
  },
};

export interface EmptyStateProps {
  reason?: EmptyStateReason;
  customTitle?: string;
  customDescription?: string;
  showAlert?: boolean;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  reason = 'no-data',
  customTitle,
  customDescription,
  showAlert = true,
  className = '',
}) => {
  const config = emptyStateConfigs[reason];
  const title = customTitle || config.title;
  const description = customDescription || config.description;

  return (
    <div className={`py-8 ${className}`}>
      <Empty
        image={config.icon}
        imageStyle={{ height: 'auto', display: 'flex', justifyContent: 'center', marginBottom: 16 }}
        description={
          <div className="space-y-2">
            <p className="text-base font-medium text-foreground">{title}</p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">{description}</p>
          </div>
        }
      >
        {showAlert && (
          <Alert
            type={config.alertType}
            message={
              config.alertType === 'warning' 
                ? 'Ação necessária' 
                : 'Informação'
            }
            description={
              reason === 'no-data' || reason === 'no-teams'
                ? 'Entre em contato com o suporte técnico caso o problema persista.'
                : 'Os dados serão atualizados automaticamente quando disponíveis.'
            }
            showIcon
            className="max-w-lg mx-auto mt-4 text-left"
          />
        )}
      </Empty>
    </div>
  );
};
