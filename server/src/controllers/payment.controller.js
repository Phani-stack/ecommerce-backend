import pool from "../config/connectDB.js";

export const createPayment = async (req, res) => {
    try {
        const {
            order_id,
            payment_method,
            transaction_id
        } = req.body;

        const [order] = await pool.query(
            "SELECT * FROM orders WHERE id = ?",
            [order_id]
        );

        if (order.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        const [result] = await pool.query(
            `
            INSERT INTO payments
            (order_id, payment_method, payment_status, transaction_id)
            VALUES (?, ?, ?, ?)
            `,
            [
                order_id,
                payment_method,
                "SUCCESS",
                transaction_id
            ]
        );

        await pool.query(
            `
            UPDATE orders
            SET status = ?
            WHERE id = ?
            `,
            ["PAID", order_id]
        );

        res.status(201).json({
            success: true,
            message: "Payment successful",
            payment_id: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getPaymentByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;

        const [payment] = await pool.query(
            `
            SELECT *
            FROM payments
            WHERE order_id = ?
            `,
            [orderId]
        );

        if (payment.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });
        }

        res.status(200).json(payment[0]);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllPayments = async (req, res) => {
    try {
        const [payments] = await pool.query(
            `
            SELECT p.*, o.user_id
            FROM payments p
            JOIN orders o
            ON p.order_id = o.id
            ORDER BY p.id DESC
            `
        );

        res.status(200).json(payments);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

