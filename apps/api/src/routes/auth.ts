import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import auth from '../middleware/auth';
import { EmailService } from '../services/email.service';

const router = Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });

        // Send Welcome Email
        try {
            await EmailService.getInstance().sendWelcomeEmail(email, name);
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
            // Non-blocking: registration still succeeds
        }

        // Generate Token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '24h' }
        );

        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        // Generate Token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string);

        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ error: 'Login failed' });
    }
});

// Get Current User (Me)
router.get('/me', auth, async (req: any, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });
        res.json(user);
    } catch (error) {
        res.status(500).send();
    }
});

export default router;
