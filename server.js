import 'express-async-errors'
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
// import cloudinary from 'cloudinary'
import cloudinary from 'cloudinary';

//PUBLIC
import { dirname } from 'path'
import { fileURLToPath } from 'url';
import path from 'path';

//CUSTOM IMPORTS
import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'

// CUSTOM MIDDLEWARE
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
import { authenticateUser } from './middlewares/authMiddleware.js';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './public')))

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

app.get('/api/v1/test', (req, res) => { res.json({ msg: 'Test route' }) })

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", authenticateUser, userRouter);

app.use("*", (req, res) => {
    res.status(404).json({
        status: 404,
        message: `Not found`,
    });
});

app.use(errorHandlerMiddleware)

const port = process.env.DB_PORT ?? 5000;

try {
    await mongoose.connect(process.env.DB_URL)
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
} catch (err) {
    console.log(err)
    process.exit(1)
}
