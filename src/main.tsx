import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const client = createRoot(document.getElementById('root')!);
client.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
