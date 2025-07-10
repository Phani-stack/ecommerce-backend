import express from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config'
import cookieParser from 'cookie-parser';

import connectDB from './config/connectDB.js';

import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import authRouter from './routes/authRoutes.js';

const app = express();

app.use(cors({origin: process.env.CLIENT_URL, credentials: true, }));
app.use(bodyParser.json());
app.use(express.json());

connectDB();

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/auth', authRouter);

const port = process.env.PORT;

app.listen(port, () => {
   console.log(`server running`);
})