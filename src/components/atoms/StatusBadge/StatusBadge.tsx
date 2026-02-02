import React from 'react';
import { Tag } from 'antd';
import { cn } from '@/lib/utils';

export type Status = 'otimo' | 'bom' | 'suficiente' | 'regular';

export interface StatusBadgeProps {
  status: Status;
  value?: string;
  showLabel?: boolean;
  className?: string;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  otimo: {
    label: 'Ótimo',
    className: 'status-badge-otimo',
  },
  bom: {
    label: 'Bom',
    className: 'status-badge-bom',
  },
  suficiente: {
    label: 'Suficiente',
    className: 'status-badge-suficiente',
  },
  regular: {
    label: 'Regular',
    className: 'status-badge-regular',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  value,
  showLabel = true,
  className,
}) => {
  const config = statusConfig[status];

  return (
    <Tag className={cn(config.className, className)}>
      {showLabel && <span>{config.label}</span>}
      {showLabel && value && ' '}
      {value && <span>{value}</span>}
    </Tag>
  );
};
