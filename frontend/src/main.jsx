import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { StudioProvider } from './context/StudioContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StudioProvider>
        <App />
        <Toaster
          position="bottom-left"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#292824',
              color: '#F7F5F0',
              borderRadius: '0px',
              border: '1px solid #777C61',
              fontSize: '14px',
            },
          }}
        />
      </StudioProvider>
    </BrowserRouter>
  </React.StrictMode>
);
