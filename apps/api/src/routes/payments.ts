import express from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../middleware/auth';
import { paymentService } from '../services/payment.service';

const router = express.Router();
const prisma = new PrismaClient();

// Generate QRIS code
router.post('/qris/generate', auth, async (req, res) => {
    try {
        const { transactionId } = req.body;
        const transaction = await prisma.transaction.findUnique({
            where: { id: transactionId }
        });

        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        if (transaction.status === 'COMPLETED') return res.status(400).json({ error: 'Already paid' });

        const qrisData = await paymentService.generateQRIS(transaction.amount, transaction.id);
        res.json(qrisData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate QRIS' });
    }
});

// Check QRIS Status
router.post('/qris/check', auth, async (req, res) => {
    try {
        const { transactionId } = req.body;
        const status: any = await paymentService.checkPaymentStatus(transactionId);

        if (status.success && status.status === 'PAID') {
            const updated = await prisma.transaction.update({
                where: { id: transactionId },
                data: { status: 'COMPLETED', updatedAt: new Date() }
            });
            return res.json({ success: true, transaction: updated });
        }

        res.json({ success: false, status: 'PENDING' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to check status' });
    }
});

export default router;
