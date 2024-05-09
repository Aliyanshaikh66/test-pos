import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ContextProvider from './Context/context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>

    </ContextProvider>

  </React.StrictMode>,
)
