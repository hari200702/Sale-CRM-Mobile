
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContex.jsx'
import { EmployeeProvider } from './context/EmployeeContext.jsx'

createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <EmployeeProvider>
      <App />
    </EmployeeProvider>
  </AuthProvider>

  
)
