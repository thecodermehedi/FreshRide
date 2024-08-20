import cors from 'cors';
import morgan from 'morgan';
import http, { Server } from 'http'
import cookieParser from "cookie-parser";
import express, { type Application } from 'express';


export const app: Application = express()
export const server: Server = http.createServer(app)

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'));
app.use(cors({ origin: ['http://localhost:5173'] }));

