import React from 'react'
import ReactDOM from 'react-dom/client'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import App from './App.tsx'
import './index.css'

const manifestUrl = 'https://raw.githubusercontent.com/CodeRunne/ton-counter/main/public/manifest.json';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TonConnectUIProvider>,
)
