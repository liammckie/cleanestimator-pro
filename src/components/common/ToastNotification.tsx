
import React from 'react';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationOptions {
  title: string;
  description?: string;
  duration?: number;
}

const iconMap = {
  success: <CheckCircle className="h-4 w-4 text-green-500" />,
  error: <AlertCircle className="h-4 w-4 text-red-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  info: <Info className="h-4 w-4 text-blue-500" />
};

export const showNotification = (type: NotificationType, options: NotificationOptions) => {
  const { title, description, duration = 5000 } = options;
  
  toast({
    title,
    description,
    variant: type === 'error' ? 'destructive' : 'default',
    duration,
    icon: iconMap[type],
  });
};

export const ToastNotification = {
  success: (options: NotificationOptions) => showNotification('success', options),
  error: (options: NotificationOptions) => showNotification('error', options),
  warning: (options: NotificationOptions) => showNotification('warning', options),
  info: (options: NotificationOptions) => showNotification('info', options),
};
