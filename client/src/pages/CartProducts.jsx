import React, { useEffect, useState } from 'react';
import { cartProductsById } from '../../api/cart.api.js';
import { useNavigate } from 'react-router-dom';

const CartProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCartProducts();
  }, []);

  async function fetchCartProducts() {
    try {
      const response = await cartProductsById();
      setProducts(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Cart Products</h2>

      {products.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <button onClick={() => navigate(`../product/${product.id}`)}>view product</button>
            <button>order product</button>
          </div>
        ))
      )}

      <button>buy all products in cart</button>

    </div>
  );
};

export default CartProducts;
