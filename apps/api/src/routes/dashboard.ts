import { Router } from 'express';
import prisma from '../prisma';
import auth from '../middleware/auth';

const router = Router();

// Get Dashboard Stats
router.get('/', auth, async (req: any, res) => {
    try {
        const userId = req.user.id;

        // --- 1. Total Balance, Income, Expense ---
        // We will calculate this based on ALL transactions for now
        // Ideally, this should be filtered by date range (e.g., this month)
        
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        // Current Month Data
        const currentMonthTransactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: startOfMonth
                }
            }
        });

        // Last Month Data (for comparison)
        const lastMonthTransactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: startOfLastMonth,
                    lte: endOfLastMonth
                }
            }
        });

        // Calculate Totals function
        const calculateTotals = (txs: typeof currentMonthTransactions) => {
            const income = txs
                .filter(t => t.type === 'INCOME')
                .reduce((sum, t) => sum + t.amount, 0);
            const expense = txs
                .filter(t => t.type === 'EXPENSE')
                .reduce((sum, t) => sum + t.amount, 0);
            return { income, expense, balance: income - expense };
        };

        const current = calculateTotals(currentMonthTransactions);
        const last = calculateTotals(lastMonthTransactions);

        // Helper for percentage diff
        const getPercentDiff = (curr: number, prev: number) => {
             if (prev === 0) return curr === 0 ? 0 : 100;
             return ((curr - prev) / prev) * 100;
        };

        // --- 2. Recent Transactions (Last 5) ---
        const recentTransactions = await prisma.transaction.findMany({
            where: { userId },
            take: 5,
            orderBy: { date: 'desc' },
            include: { category: true } // Include category name
        });

        // --- 3. Expense Breakdown (by Category) ---
        // Get all expenses for current month
        const expenses = currentMonthTransactions.filter(t => t.type === 'EXPENSE');
        // Group by category manually since Prisma doesn't support complex groupBy with relations nicely in all versions/adapters yet easily
        const expenseByCategory: Record<string, number> = {};
        
        // We need category names, so simpler to re-fetch with include or map IDs
        // Optimization: Fetch all categories for this user once or map from transaction list if we included category
        // Let's do a designated query for accurate breakdown
        const expenseBreakdownRaw = await prisma.transaction.findMany({
            where: {
                userId,
                type: 'EXPENSE',
                date: { gte: startOfMonth }
            },
            include: { category: true }
        });

        expenseBreakdownRaw.forEach(t => {
            const catName = t.category?.name || 'Uncategorized';
            expenseByCategory[catName] = (expenseByCategory[catName] || 0) + t.amount;
        });

        const expenseBreakdown = Object.entries(expenseByCategory)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5); // Top 5 categories

        const totalExpense = current.expense;
        const finalBreakdown = expenseBreakdown.map(item => ({
            ...item,
            percentage: totalExpense > 0 ? Math.round((item.value / totalExpense) * 100) : 0
        }));

        // --- 4. Monthly Stats (Last 6 Months) for Charts ---
        const monthlyStats = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const startStr = new Date(date.getFullYear(), date.getMonth(), 1);
            const endStr = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            
            const monthTransactions = await prisma.transaction.findMany({
                where: {
                    userId,
                    date: {
                        gte: startStr,
                        lte: endStr
                    }
                }
            });
            
            const income = monthTransactions
                .filter(t => t.type === 'INCOME')
                .reduce((sum, t) => sum + t.amount, 0);
            const expense = monthTransactions
                .filter(t => t.type === 'EXPENSE')
                .reduce((sum, t) => sum + t.amount, 0);
            
            const monthName = date.toLocaleString('id-ID', { month: 'short' });
            monthlyStats.push({ name: monthName, income, expense });
        }

        res.json({
            stats: {
                income: current.income,
                expense: current.expense,
                balance: current.balance,
                incomeDiff: getPercentDiff(current.income, last.income),
                expenseDiff: getPercentDiff(current.expense, last.expense),
                balanceDiff: getPercentDiff(current.balance, last.balance)
            },
            recentTransactions,
            expenseBreakdown: finalBreakdown,
            monthlyStats
        });

    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
});

export default router;
