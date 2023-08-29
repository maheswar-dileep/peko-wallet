import express, { Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connection from './config/dbconfig.js';
import authRouter from './router/auth.js';

const app: Express = express();
dotenv.config();
connection();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/', authRouter);

app.use((req, res) => {
  res.send('invalid request');
});

const port: number = 8080 || Number(process.env.port);

app.listen(port, () => {
  console.log(` server started on http://localhost:8080 `);
});
