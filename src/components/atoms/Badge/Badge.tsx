import * as React from "react";
import { Tag } from "antd";
import { cn } from "@/lib/utils";

type BadgeVariant = 
  | "default" 
  | "secondary" 
  | "destructive" 
  | "outline" 
  | "otimo" 
  | "bom" 
  | "suficiente" 
  | "regular";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

/**
 * Mapeia variantes para cores do Ant Design Tag
 */
function getTagColor(variant: BadgeVariant = "default"): string | undefined {
  const colorMap: Record<BadgeVariant, string | undefined> = {
    default: "blue",
    secondary: "default",
    destructive: "error",
    outline: undefined,
    otimo: "blue",
    bom: "success",
    suficiente: "warning",
    regular: "error",
  };
  return colorMap[variant];
}

function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const color = getTagColor(variant);
  
  // Para variantes de status, aplicar classes CSS customizadas
  const statusClasses = {
    otimo: "status-badge-otimo",
    bom: "status-badge-bom",
    suficiente: "status-badge-suficiente",
    regular: "status-badge-regular",
  };

  const isStatusVariant = variant in statusClasses;
  
  return (
    <Tag
      color={isStatusVariant ? undefined : color}
      className={cn(
        isStatusVariant && statusClasses[variant as keyof typeof statusClasses],
        className
      )}
      {...(props as React.ComponentProps<typeof Tag>)}
    >
      {children}
    </Tag>
  );
}

// Manter compatibilidade com badgeVariants para código legado
const badgeVariants = (props: { variant?: BadgeVariant }) => {
  return { color: getTagColor(props.variant) };
};

export { Badge, badgeVariants };
