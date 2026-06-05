import pool from "../config/connectDB.js";

async function productsFromDb() {
    console.log("hitted")
    const [products] = await pool.query("SELECT id, name, description, price, stock FROM products");
    return products;
}

async function productByIdFromDb(productId) {
    const [product] = await pool.query("select * from products p join categories c on p.category_id = c.id where p.id = ?", [productId]);
    const [images] = await pool.query("select image_url from products p join product_images i on p.id = i.product_id where p.id = ?", [productId]);
    return { product, images };
}

async function deleteProductDb(productId) {
    const [response] = pool.query("DELETE FROM products WHERE id = ?", [productId]);
    return response;
}


// api calls
export async function products(request, response) {
    const products = await productsFromDb();
    return response.status(200).json(products);
}

export async function product(request, response) {
    const productId = request.params.id;
    const { product, images } = await productByIdFromDb(productId);
    return response.status(200).json({product, images});
}

export async function deleteProduct(request, response) {
    const productId = parseInt(request.params.id);
    const resp = await deleteProductDb(productId);
    return response.status(200).json(response);
}
