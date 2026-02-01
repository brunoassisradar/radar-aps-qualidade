import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';
import { cn } from '@/lib/utils';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

export interface ClassificationCardProps {
  classification: Classification;
  count: number;
  description: string;
}

const classificationConfig = {
  otimo: {
    label: 'Classificadas como Ótimo',
    shortLabel: 'Ótimo',
    icon: Smile,
    bgClass: 'bg-card border-l-4 border-l-status-otimo',
    iconClass: 'text-status-otimo',
  },
  bom: {
    label: 'Classificadas como Bom',
    shortLabel: 'Bom',
    icon: Meh,
    bgClass: 'bg-card border-l-4 border-l-status-bom',
    iconClass: 'text-status-bom',
  },
  suficiente: {
    label: 'Classificadas como Suficiente',
    shortLabel: 'Suficiente',
    icon: Meh,
    bgClass: 'bg-card border-l-4 border-l-status-suficiente',
    iconClass: 'text-status-suficiente',
  },
  regular: {
    label: 'Classificadas como Regular',
    shortLabel: 'Regular',
    icon: Frown,
    bgClass: 'bg-card border-l-4 border-l-status-regular',
    iconClass: 'text-status-regular',
  },
};

export const ClassificationCard: React.FC<ClassificationCardProps> = ({
  classification,
  count,
  description,
}) => {
  const config = classificationConfig[classification];
  const Icon = config.icon;

  return (
    <div className={cn('rounded-lg p-3 sm:p-4 shadow-sm', config.bgClass)}>
      <div className="flex items-start gap-2 sm:gap-3">
        <Icon className={cn('h-5 w-5 sm:h-6 sm:w-6 mt-0.5 shrink-0', config.iconClass)} />
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground truncate">
            <span className="sm:hidden">{config.shortLabel}</span>
            <span className="hidden sm:inline">{config.label}</span>
          </p>
          <p className="text-lg sm:text-xl font-semibold text-foreground">
            {count} <span className="text-sm sm:text-base font-normal">Equipes</span>
          </p>
          <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-border">
            <p className="text-[10px] sm:text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
