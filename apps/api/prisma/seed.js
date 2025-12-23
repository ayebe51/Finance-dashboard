const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  const hashedPassword = await bcrypt.hash('demo123', 10);

  // Upsert Demo User
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: hashedPassword,
      role: 'USER' // Ensure role is set
    },
  });

  console.log({ user });

  // Create Categories
  const categories = [
    { name: 'Salary', type: 'INCOME', icon: 'payments', color: 'green' },
    { name: 'Rent', type: 'EXPENSE', icon: 'home', color: 'red' },
  ];

  for (const cat of categories) {
    await prisma.category.create({
      data: { ...cat, userId: user.id },
    });
  }

  // Create Pending Transaction for Payment Test
  const rentCat = await prisma.category.findFirst({ where: { name: 'Rent' } });
  if (rentCat) {
      await prisma.transaction.create({
          data: {
              amount: 500000,
              type: 'EXPENSE',
              date: new Date(),
              description: 'Pending Bill',
              merchant: 'PLN',
              status: 'PENDING',
              categoryId: rentCat.id,
              userId: user.id
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
