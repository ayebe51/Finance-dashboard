import { Router, Request } from 'express';
import prisma from '../prisma';
import { startOfMonth, subMonths, endOfMonth, format } from 'date-fns';

import auth from '../middleware/auth';

const router = Router();

// Helper interface for extended request
interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

router.get('/dashboard', auth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 1. Calculate Totals (All time for now, or could be current month)
    // Let's do current month for the cards
    const now = new Date();
    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);

    const currentMonthTransactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
    });

      const income = currentMonthTransactions
      .filter((t: { type: string; amount: number }) => t.type === 'INCOME')
      .reduce((sum: number, t: { amount: number }) => sum + t.amount, 0);

    const expenses = currentMonthTransactions
      .filter((t: { type: string; amount: number }) => t.type === 'EXPENSE')
      .reduce((sum: number, t: { amount: number }) => sum + t.amount, 0);

    const netBalance = income - expenses;

    // 2. Monthly Trends (Last 6 months)
    const trends = [];
    for (let i = 5; i >= 0; i--) {
      const start = startOfMonth(subMonths(now, i));
      const end = endOfMonth(subMonths(now, i));
      const label = format(start, 'MMM yyyy');

      const monthTransactions = await prisma.transaction.findMany({
        where: {
          userId,
          date: { gte: start, lte: end },
        },
      });

      const monthIncome = monthTransactions
        .filter((t: { type: string; amount: number }) => t.type === 'INCOME')
        .reduce((sum: number, t: { amount: number }) => sum + t.amount, 0);

      const monthExpense = monthTransactions
        .filter((t: { type: string; amount: number }) => t.type === 'EXPENSE')
        .reduce((sum: number, t: { amount: number }) => sum + t.amount, 0);

      trends.push({
        label,
        income: monthIncome,
        expense: monthExpense,
      });
    }

    // 3. Category Breakdown (Expenses only, all time or current month? Let's do current month)
    // Actually, "Top Categories" usually looks at a broader range or current month. Let's do current month.
    const expensesByCategory = await prisma.transaction.groupBy({
      by: ['categoryId'],
      where: {
        userId,
        type: 'EXPENSE',
        date: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: 'desc',
        },
      },
      take: 5, // Top 5
    });

    // Need to fetch category names
    const categoryBreakdown = await Promise.all(
      expensesByCategory.map(async (item: { categoryId: string | null; _sum: { amount: number | null } }) => {
        const category = await prisma.category.findUnique({
          where: { id: item.categoryId || '' }, // Handle null categoryId if necessary
        });
        return {
          name: category?.name || 'Uncategorized',
          amount: item._sum.amount || 0,
          color: category?.color || '#cccccc',
        };
      })
    );

    res.json({
      summary: {
        income,
        expenses,
        netBalance,
      },
      trends,
      categories: categoryBreakdown,
    });
  } catch (error) {
    console.error('Error in reports/dashboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const reportsRouter = router;
