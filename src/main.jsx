import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'normalize.css';
import App from './App.jsx';
import SuspenseWithDelay from './components/common/SuspenseWithDelay/SuspenseWithDelay.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SuspenseWithDelay delay={500}>
      <App />
    </SuspenseWithDelay>
  </StrictMode>
);
