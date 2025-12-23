import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get all transactions for a user
router.get('/', auth, async (req: any, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.user.id },
      include: { category: true },
      orderBy: { date: 'desc' }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Create a transaction
router.post('/', auth, async (req: any, res) => {
  try {
    const { amount, type, date, description, merchant, categoryId } = req.body;

    const result = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        type,
        date: new Date(date),
        description,
        merchant,
        categoryId,
        userId: req.user.id,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

// Delete a transaction
router.delete('/:id', auth, async (req: any, res) => {
  const { id } = req.params;
  try {
    // Ensure user owns the transaction
    const transaction = await prisma.transaction.findFirst({
        where: { id, userId: req.user.id }
    });

    if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
    }

    await prisma.transaction.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});

export default router;
