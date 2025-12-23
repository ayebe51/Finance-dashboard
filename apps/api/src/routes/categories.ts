import { Router } from 'express';
import prisma from '../prisma';
import auth from '../middleware/auth';

const router = Router();

// Get all categories for a user (hierarchical)
router.get('/', auth, async (req: any, res) => {
  try {
    // Fetch only parent categories with their children
    const categories = await prisma.category.findMany({
      where: { 
          userId: req.user.id,
          parentId: null // Only get top-level categories
      },
      include: {
          children: true // Include sub-categories
      },
      orderBy: { name: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Create a category
router.post('/', auth, async (req: any, res) => {
  try {
    const { name, type, icon, color, parentId } = req.body;

    const result = await prisma.category.create({
      data: {
        name,
        type,
        icon,
        color,
        parentId,
        userId: req.user.id,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

export default router;
