import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import { UserProvider } from './context/userContext'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
    <Toaster />
  </UserProvider>
)