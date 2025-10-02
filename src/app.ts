import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.routes.js';
import equipmentRoutes from './routes/equipments.routes.js';
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/equipments', equipmentRoutes);

app.use(errorHandler);

export default app;