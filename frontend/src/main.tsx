import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import Header from "./components/Header.tsx";
import App from './App'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Header />
        <App />
    </StrictMode>,
)