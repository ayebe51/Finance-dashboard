import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 8);

  // Create Demo User
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {
        password: hashedPassword,
    },
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: hashedPassword,
    },
  });

  console.log({ user });

  // Create Default Categories
  const categories = [
    { name: 'Salary', type: 'INCOME', icon: 'payments', color: 'green' },
    { name: 'Freelance', type: 'INCOME', icon: 'work', color: 'blue' },
    { name: 'Food', type: 'EXPENSE', icon: 'restaurant', color: 'orange' },
    { name: 'Rent', type: 'EXPENSE', icon: 'home', color: 'red' },
    { name: 'Utilities', type: 'EXPENSE', icon: 'bolt', color: 'yellow' },
    { name: 'Entertainment', type: 'EXPENSE', icon: 'movie', color: 'purple' },
  ];

  for (const cat of categories) {
    await prisma.category.create({
      data: {
        ...cat,
        userId: user.id,
      },
    });
  }

  // Create some sample transactions
  const rentCategory = await prisma.category.findFirst({ where: { name: 'Rent' } });
  
  if (rentCategory) {
    await prisma.transaction.create({
      data: {
        amount: 1200,
        type: 'EXPENSE',
        date: new Date(),
        description: 'Monthly Rent',
        merchant: 'Landlord',
        categoryId: rentCategory.id,
        userId: user.id,
      }
    });
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
