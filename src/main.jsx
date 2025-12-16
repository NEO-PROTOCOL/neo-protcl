import React from 'react';
import ReactDOM from 'react-dom/client';
import { Buffer } from 'buffer';
import App from './App';
import './index.css';

// Polyfill para buffer no browser (necessário para ethers.js e outras libs blockchain)
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
  window.global = window.globalThis;
}
globalThis.Buffer = Buffer;
globalThis.global = globalThis;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

