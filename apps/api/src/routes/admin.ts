import express from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../middleware/auth';
import admin from '../middleware/admin';

const router = express.Router();
const prisma = new PrismaClient();

// Get Admin Dashboard Stats
router.get('/stats', auth, admin, async (req, res) => {
    try {
        const totalUsers = await prisma.user.count();
        const totalTransactions = await prisma.transaction.count();
        const totalRecurring = await prisma.recurringTransaction.count({
            where: { status: 'ACTIVE' }
        });

        // Calculate total volume (simple sum of all transactions)
        const volumeResult = await prisma.transaction.aggregate({
            _sum: {
                amount: true
            }
        });
        const totalVolume = volumeResult._sum.amount || 0;

        // Recent Signups (last 5)
        const recentUsers = await prisma.user.findMany({
            take: 5,
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }
        });

        res.json({
            stats: {
                totalUsers,
                totalTransactions,
                totalRecurring,
                totalVolume
            },
            recentUsers
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch admin stats' });
    }
});

export default router;
