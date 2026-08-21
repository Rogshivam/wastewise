import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import type { NotificationToast as ToastType } from '../types';

interface NotificationToastProps {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
}

export const NotificationToastContainer: React.FC<NotificationToastProps> = ({
  toasts,
  onDismiss
}) => {
  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      maxWidth: '380px',
      width: '100%'
    }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="glass-card-static"
          style={{
            padding: '1rem',
            background: 'rgba(15, 23, 42, 0.95)',
            borderLeft: toast.type === 'success' ? '4px solid #10b981' : toast.type === 'warning' ? '4px solid #f59e0b' : '4px solid #06b6d4',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            animation: 'float 0.3s ease-out'
          }}
        >
          <div style={{ flexShrink: 0, marginTop: '2px' }}>
            {toast.type === 'success' && <CheckCircle2 size={18} color="#10b981" />}
            {toast.type === 'warning' && <AlertCircle size={18} color="#f59e0b" />}
            {toast.type === 'info' && <Info size={18} color="#06b6d4" />}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
              {toast.title}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.15rem' }}>
              {toast.message}
            </div>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex'
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
