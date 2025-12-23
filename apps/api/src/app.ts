import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import transactionRouter from './routes/transactions';
import categoryRouter from './routes/categories';
import dashboardRouter from './routes/dashboard';
import authRouter from './routes/auth';
import categoriesRouter from './routes/categories';
import budgetsRouter from './routes/budgets';
import vendorsRouter from './routes/vendors';
import { reportsRouter } from './routes/reports';
import recurringRouter from './routes/recurring';
import adminRouter from './routes/admin';
import paymentRouter from './routes/payments';
import { initRecurringScheduler } from './services/recurring.service';

dotenv.config();

const app = express();

// Initialize Scheduler
initRecurringScheduler();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/budgets', budgetsRouter);
app.use('/api/vendors', vendorsRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/recurring', recurringRouter);
app.use('/api/admin', adminRouter);
app.use('/api/payments', paymentRouter);

export default app;
