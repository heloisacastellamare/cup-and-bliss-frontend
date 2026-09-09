import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { FavoriteProvider } from './contexts/FavoriteContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <FavoriteProvider>
          <App />
        </FavoriteProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
)