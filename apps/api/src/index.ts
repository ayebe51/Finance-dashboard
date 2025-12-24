import app from './app';

const PORT = process.env.PORT || 3001;

// Only listen if not running in Vercel (Vercel exports the app)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
