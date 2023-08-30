import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import connection from './config/dbconfig.js';
import authRouter from './router/auth.js';
import paymentRouter from './router/payment.js';
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
app.use('/api/v1/payment', paymentRouter);
app.use((req, res) => {
    res.send('invalid request');
});
const PORT = 8080 || Number(process.env.PORT);
app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT} `);
});
//# sourceMappingURL=index.js.map