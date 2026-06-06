import pool from "../config/connectDB.js";


// database calls
async function addProductToCartDb(cartId, productId, quantity) {
    const [response] = await pool.query("INSERT INTO cart_items(cart_id, product_id, quantity) VALUES(?, ?, ?)", [cartId, productId, quantity]);
    return response;
}

async function createCartDb(userId) {
    const [reponse] = await pool.query("INSERT INTO cart(user_id) VALUES(?)", [userId]);
}

async function cartProductsByUserIdDb(userId) {
    const [products] = pool.query("SELECT * FROM cart c JOIN cart_items ci ON c.id = cart_items.cart_id WHERE c.userId = ?", [userId]);
    return products;
}

async function removeProductFromCartDb(userId, productId) {
    const [cartId] = await pool.query("SELECT id FROM cart WHERE user_id = ?", [userId]);
    const [resp] = await pool.query("DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?", [cartId, productId]);
    return resp;
}

async function updateStockOfProductDb(userId, productId, quantity) {
    const [cartId] = await pool.query("SELECT id FROM cart WHERE user_id = ?", [userId]);
    const [resp] = await pool.query("UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?", [quantity, cartId, productId]);
    return resp;
}

async function cartIdByUserIdDb(userId) {
    const [id] = await pool.query("SELECT id FROM cart WHERE user_id = ?", [userId]);
    return id;
}



// API calls

export async function createCart(request, response) {
    const userId = request.user.id;
    const resp = createCartDb(userId);
    return response.status(200).json(response);
}

export async function addProductToCart(request, response) {
    const cartId = await cartIdByUserIdDb(request.user.id);
    console.log(cartId);
    const productId = request.body;
    const quantity = request.body;
    const resp = await addProductToCartDb(cartId, productId, quantity);
    return response.status(200).json({response});
}

export async function cartProductsByUserId(request, response) {
    const userId = 1;
    const products = await cartProductsByUserIdDb(userId);
    return response.status(200).json(products);
}

export async function removeProductFromCart(request, response) {
    const userId = 1;
    const productId = request.body;
    const resp = await removeProductFromCartDb(userId, productId);
    return response.status(200).json(resp);
}

export async function updateStockOfProduct(request, response) {
    const userId = 3;
    const { productId, quantity } = request.body;
    const resp = await updateStockOfProductDb(userId, productId, quantity);
    return response.status(200).json(resp);
}
