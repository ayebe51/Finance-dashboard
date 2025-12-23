export class WhatsAppService {
    static async sendNotification(to: string, message: string): Promise<boolean> {
        console.log(`[WhatsApp Mock] Sending to ${to}: ${message}`);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return true;
    }
}
