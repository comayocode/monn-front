import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import ToastContainer from '@/components/ui/Toast/ToastContainer';
import { ToastContext } from './ToastContext';

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // useCallback para memoizar la función y evitar recreaciones
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // useMemo para memoizar el valor del contexto
  const contextValue = useMemo(() => ({
    addToast: (message, type = 'info', duration = 10000) => {
      const id = Date.now();
      setToasts((prev) => [{ id, message, type, duration }, ...prev]);
      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    removeToast
  }), [removeToast]);


  return (
    <ToastContext.Provider value={contextValue }>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
};
ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
