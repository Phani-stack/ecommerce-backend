import React from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { getAllProducts } from '../../api/product.api.js';

const Products = () => {
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await getAllProducts();
                setProducts(response);
            } catch (error) {
                console.error(error);
            }
        }

        fetchProducts();
    }, []);

    

    return (
        <>
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </>
    );
};

export default Products;
