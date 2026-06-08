import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addProductToCart } from '../../api/cart.api.js';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  async function addProduct(productId) {
    try {
      const response = await addProductToCart(productId);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <p>name: {product.name}</p>
      <p>description: {product.description}</p>
      <p>price: {product.price}</p>
      <p>stock: {product.stock}</p>

      <button onClick={() => navigate(`product/${product.id}`)}>
        view
      </button>

      <button onClick={() => addProduct(product.id)}>
        add to cart
      </button>

      <hr />
    </div>
  );
};

export default ProductCard;
