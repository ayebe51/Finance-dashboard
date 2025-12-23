import prisma from '../prisma';
import cron from 'node-cron';

export const processDueTransactions = async () => {
  console.log('Checking for due recurring transactions...');
  const now = new Date();

  const dueTransactions = await prisma.recurringTransaction.findMany({
    where: {
      nextRun: {
        lte: now,
      },
      status: 'ACTIVE',
    },
  });

  for (const recurring of dueTransactions) {
    try {
      // Create the actual transaction
      await prisma.transaction.create({
        data: {
          amount: recurring.amount,
          type: recurring.type,
          date: now,
          description: recurring.description || `Recurring: ${recurring.interval}`,
          merchant: recurring.merchant,
          status: 'COMPLETED',
          categoryId: recurring.categoryId,
          userId: recurring.userId,
        },
      });

      // Calculate next run date
      const nextRun = calculateNextRun(new Date(recurring.nextRun), recurring.interval);

      // Update the recurring transaction record
      await prisma.recurringTransaction.update({
        where: { id: recurring.id },
        data: {
          nextRun: nextRun,
        },
      });
      
      console.log(`Processed recurring transaction ${recurring.id}`);
    } catch (error) {
      console.error(`Failed to process recurring transaction ${recurring.id}:`, error);
    }
  }
};

const calculateNextRun = (currentRun: Date, interval: string): Date => {
  const nextDate = new Date(currentRun);
  switch (interval) {
    case 'DAILY':
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    case 'WEEKLY':
      nextDate.setDate(nextDate.getDate() + 7);
      break;
    case 'MONTHLY':
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case 'YEARLY':
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      break;
  }
  return nextDate;
};

// Initialize Cron Job (Runs every hour)
export const initRecurringScheduler = () => {
  cron.schedule('0 * * * *', () => {
    processDueTransactions();
  });
  console.log('Recurring transaction scheduler initialized.');
};
