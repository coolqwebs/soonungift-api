import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';

import swaggerOutput from './swagger_output.json';
import authRouter from './routes/auth';
import userRouter from './routes/user';

const PORT: number = parseInt(process.env.PORT as string, 10) || 1448;
const app: Express = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
// app.use(cors());

app.use(express.static('public'));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
