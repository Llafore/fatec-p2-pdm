import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import 'primeflex/primeflex.min.css'
import 'primeflex/themes/primeone-light.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/saga-orange/theme.css'

createRoot(document.getElementById('root')).render(
  <App />
)
