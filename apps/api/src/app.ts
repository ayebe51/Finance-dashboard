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

app.get('/api/health-db', async (req, res) => {
    try {
        // Import dynamically to avoid circular dependency issues if any, 
        // or better yet, just use the import from where it should be.
        // But app.ts doesn't import prisma yet. Let's rely on a fresh import or passed instance.
        // Actually, let's just use the shared instance.
        // We need to import it at top of file, but tool instruction is for this block.
        // I will trust the user to add the import or I will do it in a separate block if needed.
        // Wait, I cannot add import at top with this tool call if I target lines 29-31.
        // I will assume I can edit the top separately or just use valid code here.
        // Let's modify the top first to import prisma? No, safer to just try/catch here.
        const { default: prisma } = await import('./prisma');
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: 'connected', timestamp: new Date() });
    } catch (error: any) {
        console.error('DB Connection Failed:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
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
