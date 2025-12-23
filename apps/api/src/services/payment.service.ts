export const paymentService = {
    // Generate a mock QRIS string/data
    generateQRIS: async (amount: number, transactionId: string) => {
        // In reality, this would call a payment gateway API (e.g., Midtrans, Xendit) to get a dynamic QRIS string
        // We will return a mock data object
        return {
            qrString: `00020101021226590014ID.CO.QRIS.WWW0118936005200200200200200200200${transactionId}5144ID.CO.QRIS.WWW0303UMI5204481453033605802ID5916MOCAFINDO MERCHANT6006JAKARTA61051234562500505${amount}63041234`,
            expirationTime: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes exp
        };
    },

    // Simulate checking payment status
    checkPaymentStatus: async (transactionId: string) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate success for demo purposes
                // In a real app, we might check an external API or look up a webhook callback record
                resolve({
                    success: true,
                    status: 'PAID', // or PENDING, EXPIRED
                    paidAt: new Date()
                });
            }, 1000); 
        });
    }
};
