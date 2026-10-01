import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { ToastNotification, type Toast } from '../components/ui/ToastNotification';

interface ToastValue {
  notify: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastValue | null>(null);

export function ToastProvider({ children }: {children: React.ReactNode;}) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: number) => setToasts((prev) => prev.filter((t) => t.id !== id)), []);

  const notify = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      counter.current += 1;
      const id = counter.current;
      setToasts((prev) => [...prev.slice(-2), { ...toast, id }]);
      window.setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastNotification toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>);

}

export function useToast(): ToastValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}