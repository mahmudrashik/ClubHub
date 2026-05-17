import { useState } from 'react';
import type { Toast, ToastType } from '../components/Toast';

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: ToastType, message: string, duration?: number) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess: (message: string, duration?: number) => addToast('success', message, duration),
    showError: (message: string, duration?: number) => addToast('error', message, duration),
    showInfo: (message: string, duration?: number) => addToast('info', message, duration),
    showWarning: (message: string, duration?: number) => addToast('warning', message, duration),
  };
}
