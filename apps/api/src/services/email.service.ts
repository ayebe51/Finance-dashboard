
interface EmailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

export class EmailService {
    private static instance: EmailService;

    // In a real app, you would inject API keys here
    private constructor() {
        console.log('EmailService initialized');
    }

    public static getInstance(): EmailService {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }

    async sendEmail(options: EmailOptions): Promise<void> {
        // Mock implementation
        // In release, use: await resend.emails.send({ ...options, from: 'onboarding@resend.dev' });
        
        console.log(`
        [EMAIL SENT]
        To: ${options.to}
        Subject: ${options.subject}
        Body: ${options.text}
        `);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    async sendWelcomeEmail(to: string, name: string): Promise<void> {
        await this.sendEmail({
            to,
            subject: 'Welcome to FinTrack!',
            text: `Hi ${name}, welcome to FinTrack! We're excited to have you on board.`,
            html: `<h1>Hi ${name}!</h1><p>Welcome to FinTrack. We're excited to have you on board.</p>`
        });
    }
}
