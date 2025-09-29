import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './contexts/CartContext.jsx'
import { ProductProvider } from './contexts/ProductContext.jsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import "./css/index.css"
import App from './App.jsx'
import NavBar from './components/NavBar.jsx'
import Cart from './components/Cart.jsx'
import Checkout from './pages/Checkout.jsx'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <ProductProvider>
      <CartProvider>
        <main className='main'>
          <NavBar/>
          <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
          </Routes>
        </main>
      </CartProvider>
    </ProductProvider>
  </BrowserRouter>
)
