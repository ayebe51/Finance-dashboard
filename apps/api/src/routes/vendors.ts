import { Router, Request } from 'express';
import prisma from '../prisma';
import auth from '../middleware/auth';

const router = Router();

interface AuthRequest extends Request {
  user: {
    id: string;
  };
}

// Get all vendors for the authenticated user
router.get('/', auth, async (req: any, res) => {
  try {
    const vendors = await prisma.vendor.findMany({
      where: { userId: req.user.id },
      orderBy: { name: 'asc' }
    });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
});

// Create a new vendor
router.post('/', auth, async (req: any, res) => {
  try {
    const { name, email, phone, type, status } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const vendor = await prisma.vendor.create({
      data: {
        name,
        email,
        phone,
        type: type || 'VENDOR',
        status: status || 'ACTIVE',
        userId: req.user.id
      }
    });

    res.json(vendor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create vendor' });
  }
});

// Delete a vendor
router.delete('/:id', auth, async (req: any, res) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const vendor = await prisma.vendor.findUnique({
      where: { id }
    });

    if (!vendor || vendor.userId !== req.user.id) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    await prisma.vendor.delete({
      where: { id }
    });

    res.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete vendor' });
  }
});

export default router;
