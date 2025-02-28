import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import 'normalize.css';
import App from './App.jsx';
import SuspenseWithDelay from './components/common/SuspenseWithDelay/SuspenseWithDelay.jsx';
import { AuthProvider } from './context/AuthContextProvider';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ToastProvider } from './context/ToastContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <SuspenseWithDelay delay={250}>
        <ThemeProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ThemeProvider>
      </SuspenseWithDelay>
    </StrictMode>
  </AuthProvider>
);
