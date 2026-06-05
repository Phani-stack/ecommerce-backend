import express from 'express';

import cors from 'cors';
import 'dotenv/config';

import pool from './config/connectDB.js';

import productRoutes from './routes/product.routes.js';
import cartRoutes from "./routes/cart.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { authenticate } from './middlewares/auth.middleware.js';


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
   response.status(200).send("Application running");
});

app.use("/api/product", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);


const port = process.env.PORT || 8000;


app.listen(port, () => {
   console.log(`server running`);
   pool.query("SELECT * FROM users").then(console.log("db connected")).catch((err) => console.log("error while connecting db"));
});
