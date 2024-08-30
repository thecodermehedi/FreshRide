import cors from 'cors';
import morgan from 'morgan';
import http, { Server } from 'http'
import cookieParser from "cookie-parser";
import express, { type Application } from 'express';
import config from './config';
import mongoose from 'mongoose';


export const {dbUri,dbHost,dbName,nodeEnv,port} = config;
export const app: Application = express()
export const server: Server = http.createServer(app)


app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'));
app.use(cors({ origin: ['http://localhost:5173'] }));

(async () => {
  let dbStringUri: string = dbUri
    .replace('<hostname>', dbHost)
    .replace('<database>', dbName);

  if (nodeEnv === 'production') {
    dbStringUri = dbUri
      .replace('<username>', config.dbUser || 'notFound')
      .replace('<password>', config.dbPass || 'notFound')
      .replace('<boolean>', 'true')
      .replace('<string>', 'majority');
  }

  try {
    if (dbStringUri) {
      console.log('🟡 Connecting...');
      await mongoose.connect(dbStringUri);
      console.log(
        nodeEnv !== 'production'
          ? '🟢 Connected to MongoDB Compass (dev)'
          : '🟢 Connected to MongoDB Atlas (prod)',
      );
    }

    server.listen(port, () => {
      console.log(`🗄️ Server is running on ${port} (${nodeEnv} mode)`);
    });
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    throw new Error('😈 Error connecting to the database');
  }
})();

