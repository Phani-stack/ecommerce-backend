import express from "express";
import {
    createPayment,
    getPaymentByOrderId,
    getAllPayments
} from "../controllers/payment.controller.js";

import { authenticate, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authenticate, createPayment);

router.get("/order/:orderId", authenticate, getPaymentByOrderId);

router.get("/all-payments", authenticate, getAllPayments);

export default router;
