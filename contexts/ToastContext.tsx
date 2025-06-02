import React, { createContext, useContext, useState, ReactNode } from 'react';
import { View } from 'react-native';
import Toast, { ToastData, ToastType } from '../components/Toast';

interface ToastContextType {
  showToast: (toast: Omit<ToastData, 'id'>) => void;
  showSuccess: (title: string, message?: string, duration?: number) => void;
  showError: (title: string, message?: string, duration?: number) => void;
  showWarning: (title: string, message?: string, duration?: number) => void;
  showInfo: (title: string, message?: string, duration?: number) => void;
  hideToast: (id: string) => void;
  hideAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = (toast: Omit<ToastData, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newToast: ToastData = { ...toast, id };
    
    setToasts(prevToasts => [...prevToasts, newToast]);
  };

  const showSuccess = (title: string, message?: string, duration?: number) => {
    showToast({
      type: 'success',
      title,
      message,
      duration,
    });
  };

  const showError = (title: string, message?: string, duration?: number) => {
    showToast({
      type: 'error',
      title,
      message,
      duration,
    });
  };

  const showWarning = (title: string, message?: string, duration?: number) => {
    showToast({
      type: 'warning',
      title,
      message,
      duration,
    });
  };

  const showInfo = (title: string, message?: string, duration?: number) => {
    showToast({
      type: 'info',
      title,
      message,
      duration,
    });
  };

  const hideToast = (id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  const hideAllToasts = () => {
    setToasts([]);
  };

  const value: ToastContextType = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideToast,
    hideAllToasts,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Container */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 9999 }}>
        {toasts.map((toast, index) => (
          <View key={toast.id} style={{ marginTop: index * 80 }}>
            <Toast toast={toast} onDismiss={hideToast} />
          </View>
        ))}
      </View>
    </ToastContext.Provider>
  );
};

// Hook for using toast
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext; 