import express from "express";
import {
    createOrder,
    getMyOrders,
    getOrderById,
} from "../controllers/order.controller.js";

import { authenticate, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authenticate, createOrder);
router.get("/orders", authenticate, isAdmin, getMyOrders);
router.get("/orders/:id", authenticate, getOrderById);

export default router;
