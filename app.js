import express from "express";
import userRoute from "./routes/userRoutes.js"
import taskRoute from "./routes/taskRoutes.js"
import {config} from 'dotenv';
import { connectDb } from "./config/database.js";
import cookieParser from "cookie-parser";
import { errormiddleware } from "./middlewares/error.js";
import cors from 'cors'


export const app = express();

config({path:"./config/config.env"})

connectDb();
//middlewares
app.use(express.json());
app.use(cookieParser())






app.use(cors())
//Routes
app.use('/api/v1',userRoute)
app.use('/api/v1',taskRoute)

//error middlewares

app.use(errormiddleware)
