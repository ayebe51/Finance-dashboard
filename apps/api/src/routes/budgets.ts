import { Router, Request } from 'express';
import prisma from '../prisma';
import auth from '../middleware/auth';

const router = Router();

interface AuthRequest extends Request {
  user: {
    id: string;
  };
}

// Get all budgets for a user
router.get('/', auth, async (req: any, res) => {
  try {
    const { period } = req.query;
    const whereClause: any = { userId: req.user.id };
    
    if (period) {
        whereClause.period = period as string;
    }

    const budgets = await prisma.budget.findMany({
      where: whereClause,
      include: {
        category: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch budgets' });
  }
});

// Create or update a budget
router.post('/', auth, async (req: any, res) => {
  try {
    const { amount, period, categoryId } = req.body;

    if (!amount || !period || !categoryId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if budget already exists for this category and period
    const existingBudget = await prisma.budget.findFirst({
        where: {
            userId: req.user.id,
            categoryId,
            period
        }
    });

    if (existingBudget) {
        // Update existing
        const updated = await prisma.budget.update({
            where: { id: existingBudget.id },
            data: { amount }
        });
        return res.json(updated);
    }

    // Create new
    const result = await prisma.budget.create({
      data: {
        amount,
        period,
        categoryId,
        userId: req.user.id,
      },
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save budget' });
  }
});

// Delete a budget
router.delete('/:id', auth, async (req: any, res) => {
    try {
        const { id } = req.params;
        await prisma.budget.delete({
            where: {
                id,
                userId: req.user.id 
            }
        });
        res.json({ message: 'Budget deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete budget' });
    }
});

export default router;
