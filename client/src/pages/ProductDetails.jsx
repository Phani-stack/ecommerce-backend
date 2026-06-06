import React from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../api/product.api.js';

const ProductDetails = () => {
  const [product, setProduct] = React.useState(null);
  const [images, setImages] = React.useState([]);

  const { id } = useParams();

  React.useEffect(() => {
    async function fetchProduct() {
      const response = await getProductDetails(id);

      setProduct(response.product[0]);
      setImages(response.images);
    }

    fetchProduct();
  });

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>

      {images.map(image => (
        <img
          key={image.id}
          src={image.image_url}
          alt={product.name}
          width="200"
        />
      ))}
    </div>
  );
};

export default ProductDetails;
