import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/cart')}>view cart</button>
      <button onClick={() => navigate('/products')}>view products</button>
    </div>
  )
}

export default Home
