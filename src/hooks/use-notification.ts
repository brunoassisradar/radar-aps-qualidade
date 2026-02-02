/**
 * Hook de notificação usando Ant Design v4
 * Substitui o useToast do shadcn/ui
 */
import { message, notification } from 'antd';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  title?: string;
  description?: string;
  type?: NotificationType;
  duration?: number;
}

/**
 * Hook para exibir notificações usando Ant Design
 */
export function useNotification() {
  const showToast = ({
    title,
    description,
    type = 'info',
    duration = 3,
  }: ToastOptions) => {
    if (description) {
      notification[type]({
        message: title || getDefaultTitle(type),
        description,
        duration,
      });
    } else {
      message[type](title || getDefaultTitle(type), duration);
    }
  };

  const success = (content: string, duration?: number) => {
    message.success(content, duration);
  };

  const error = (content: string, duration?: number) => {
    message.error(content, duration);
  };

  const info = (content: string, duration?: number) => {
    message.info(content, duration);
  };

  const warning = (content: string, duration?: number) => {
    message.warning(content, duration);
  };

  return {
    toast: showToast,
    success,
    error,
    info,
    warning,
    message,
    notification,
  };
}

function getDefaultTitle(type: NotificationType): string {
  const titles: Record<NotificationType, string> = {
    success: 'Sucesso',
    error: 'Erro',
    info: 'Informação',
    warning: 'Atenção',
  };
  return titles[type];
}

// Re-exportar para uso direto
export { message, notification };
