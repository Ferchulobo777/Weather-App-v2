import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importa Bootstrap CSS aquí
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa Bootstrap Icons aquí
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
