import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import connection from './config/dbconfig.js';
import authRouter from './router/auth.js';
const app = express();
dotenv.config();
connection();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.use('/api/v1/auth', authRouter);
app.use((req, res) => {
    res.send('invalid request');
});
const port = 8080 || Number(process.env.port);
app.listen(port, () => {
    console.log(` server started on http://localhost:8080 `);
});
//# sourceMappingURL=index.js.map