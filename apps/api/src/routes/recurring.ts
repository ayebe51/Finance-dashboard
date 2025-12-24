import express from 'express';
import prisma from '../prisma';
import { processDueTransactions } from '../services/recurring.service';

const router = express.Router();

// Get all recurring transactions for the logged-in user
router.get('/', async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const recurring = await prisma.recurringTransaction.findMany({
      where: { userId },
      include: { category: true },
    });
    res.json(recurring);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recurring transactions' });
  }
});

// Create a new recurring transaction
router.post('/', async (req, res) => {
  try {
    const { amount, type, interval, nextRun, description, merchant, categoryId } = req.body;
    const userId = (req as any).user.userId;

    const recurring = await prisma.recurringTransaction.create({
      data: {
        amount: parseFloat(amount),
        type,
        interval,
        nextRun: new Date(nextRun),
        description,
        merchant,
        categoryId,
        userId,
      },
    });

    res.status(201).json(recurring);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create recurring transaction' });
  }
});

// Delete (Stop) a recurring transaction
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.recurringTransaction.delete({
      where: { id },
    });
    res.json({ message: 'Recurring transaction deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete recurring transaction' });
  }
});

// Manual Trigger (For testing purposes)
router.post('/trigger', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await processDueTransactions();
    res.json({ message: 'Recurring transactions processed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to trigger processing' });
  }
});

export default router;
