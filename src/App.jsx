import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Favorites from './pages/Favorites'
import OrdersHistory from './pages/OrdersHistory'
import Checkout from './pages/Checkout'
import OrderSuccess  from './pages/OrderSucess'
import OrderTracking from './pages/OrderTracking'
import ForgotPassword from './pages/ForgotPassword'

export default function App() {
  return (
    <Routes>
      {/*Rotas Publicas*/}

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/produto/:id" element={<ProductDetail/>} />
      <Route path="/carrinho" element={<Cart/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/favorites" element={<Favorites/>}/>
      <Route path="/ordershistory" element={<OrdersHistory/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/pedido-concluido" element={<OrderSuccess/>}/>
      <Route path="/acompanhar-pedido" element={<OrderTracking/>}/>
      <Route path="/esqueci-senha" element={<ForgotPassword/>}/>

      {/*Rotas com menu inferior fixo*/}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home/>} />
      </Route>
    
      {/*Rota para URLs não encontradas*/}
      <Route path="*" element={<Navigate to="/login" replace/>} />
    </Routes>
  );
}