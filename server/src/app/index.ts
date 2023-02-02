import 'module-alias/register';
import express, { RequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import indexRouter from '@/routes/indexRouter';
import healthCheckRouter from '@/routes/healthcheck';
import { gatewaysRouter } from '@/routes/gatewayRouter';
import '../utils/dbConnector';

const app = express();

// Middlewares...
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression() as RequestHandler);

// Routes...
app.use('/healthcheck', healthCheckRouter);
app.use('/gateways', gatewaysRouter);
app.use('/', indexRouter);

export { app };
