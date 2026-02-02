import * as React from "react";
import { Skeleton as AntSkeleton } from "antd";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Se deve mostrar animação */
  active?: boolean;
}

/**
 * Componente Skeleton usando Ant Design
 * Mantém compatibilidade com a API anterior (usa className para dimensões)
 */
function Skeleton({ className, active = true, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "ant-skeleton-custom",
        active && "animate-pulse",
        "rounded-md bg-gray-200",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
