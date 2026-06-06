import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Products />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  )
}

export default App
