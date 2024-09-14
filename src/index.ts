import morgan from 'morgan';
import http, {Server} from 'http';
import cookieParser from 'cookie-parser';
import express, {type Application} from 'express';
import config from './config';
import mongoose from 'mongoose';
import router from './routes';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorHandler';

export const {dbUri, dbHost, dbName, nodeEnv, port} = config;
export const app: Application = express();
export const server: Server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  const serverInfo = {
    name: 'Car Washing Booking System',
    version: '1.0.0',
    description: 'Welcome to the Car Washing Booking System API!',
    author: 'Mehedi Hasan',
    contact: 'thecodermehedi@gmail.com',
  };

  res.status(200).json(serverInfo);
});

app.use('/api', router);
app.use(notFound);
app.use(globalErrorHandler);

(async () => {
  let dbStringUri: string = dbUri
    .replace('<hostname>', dbHost)
    .replace('<database>', dbName);

  if (nodeEnv === 'production') {
    dbStringUri = dbUri
      .replace('<username>', config.dbUser || 'notFound')
      .replace('<password>', config.dbPass || 'notFound')
      .replace('<hostname>', dbHost)
      .replace('<database>', dbName)
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
