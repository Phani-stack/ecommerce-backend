import pool from "../config/connectDB.js";

export const createOrder = async (req, res) => {
    const { address_id, items } = req.body;
    const user_id = req.user.id; // from auth middleware

    try {
        // await connection.beginTransaction();

        let totalAmount = 0;

        for (const item of items) {
            totalAmount += item.price * item.quantity;
        }

        const [orderResult] = await connection.query(
            `
            INSERT INTO orders
            (user_id, address_id, total_amount, status)
            VALUES (?, ?, ?, ?)
            `,
            [user_id, address_id, totalAmount, "PENDING"]
        );

        const orderId = orderResult.insertId;

        for (const item of items) {
            await pool.query(
                `
                INSERT INTO order_items
                (order_id, product_id, quantity, price)
                VALUES (?, ?, ?, ?)
                `,
                [
                    orderId,
                    item.product_id,
                    item.quantity,
                    item.price,
                ]
            );
        }

        // await connection.commit();

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order_id: orderId,
        });
    } catch (error) {
        // await connection.rollback();

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const [orders] = await pool.query(
            `
            SELECT *
            FROM orders
            WHERE user_id = ?
            ORDER BY created_at DESC
            `,
            [req.user.id]
        );

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const [order] = await pool.query(
            `
            SELECT *
            FROM orders
            WHERE id = ?
            `,
            [id]
        );

        if (order.length === 0) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        const [items] = await pool.query(
            `
            SELECT *
            FROM order_items
            WHERE order_id = ?
            `,
            [id]
        );

        res.status(200).json({
            order: order[0],
            items,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
