import pool from "../config/connectDB.js";
import { productByIdFromDb } from "./product.controller.js";

// database calls
async function addProductToCartDb(cartId, productId, quantity) {
    const [response] = await pool.query("INSERT INTO cart_items(cart_id, product_id, quantity) VALUES(?, ?, ?)", [cartId, productId, quantity]);
    return response;
}

async function createCartDb(userId) {
    const [result] = await pool.query("INSERT INTO cart(user_id) VALUES(?)", [userId]);
    return result.insertId;
}

async function cartProductsByUserIdDb(userId) {
    const [products] = await pool.query(
        `SELECT
            p.*,
            ci.quantity
         FROM cart c
         JOIN cart_items ci ON c.id = ci.cart_id
         JOIN products p ON p.id = ci.product_id
         WHERE c.user_id = ?`,
        [userId]
    );

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
    const [rows] = await pool.query("SELECT id FROM cart WHERE user_id = ?", [userId]);
    return rows.length ? rows[0].id : null;
}



// API calls

export async function createCart(request, response) {
    const userId = request.user.id;
    const resp = createCartDb(userId);
    return response.status(200).json(response);
}

export async function addProductToCart(request, response) {
    try {
        const userId = request.user.id;
        let cartId = await cartIdByUserIdDb(userId);
        if (!cartId) {
            cartId = await createCartDb(userId);
        }
        let { productId, quantity } = request.body;
        productId = parseInt(productId);
        quantity = parseInt(quantity);
        const resp = await addProductToCartDb(
            cartId,
            productId,
            quantity
        );
        return response.status(200).json({
            message: "Product added to cart",
            data: resp
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export async function cartProductsByUserId(request, response) {
    const userId = request.user.id;
    const products = await cartProductsByUserIdDb(userId);
    return response.status(200).json(products);
}

export async function removeProductFromCart(request, response) {
    const userId = request.user.id;
    const productId = request.body;
    const resp = await removeProductFromCartDb(userId, productId);
    return response.status(200).json(resp);
}

export async function updateStockOfProduct(request, response) {
    const userId = request.user.id;
    const { productId, quantity } = request.body;
    const resp = await updateStockOfProductDb(userId, productId, quantity);
    return response.status(200).json(resp);
}
