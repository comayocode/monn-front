import { useState } from 'react';
import PropTypes from 'prop-types';
import ToastContainer from '@/components/ui/Toast/ToastContainer';
import { ToastContext } from './ToastContext';

// const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 10000) => {
    const id = Date.now();
    setToasts((prev) => [{ id, message, type }, ...prev]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
};
ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
