# 🚀 Deployment Guide

This project is designed to be deployed using modern cloud platforms. We recommend **Render** for the Backend & Database, and **Vercel** for the Frontend.

## 1. Backend & Database (Render)

We will use [Render.com](https://render.com) because it offers a free tier for both Node.js web services and PostgreSQL databases.

### Step 1: Create PostgreSQL Database
1.  Sign up/Log in to Render.
2.  Click **New +** -> **PostgreSQL**.
3.  Name: `finance-dashboard-db`.
4.  Region: Closest to you (e.g., Singapore).
5.  Plan: **Free**.
6.  Click **Create Database**.
7.  **IMPORTANT:** Copy the `Internal Database URL` (for internal use) and `External Database URL` (for local access if needed).

### Step 2: Deploy API
1.  Click **New +** -> **Web Service**.
2.  Connect your GitHub repository.
3.  **Root Directory:** `apps/api`.
4.  **Environment:** `Node`.
5.  **Build Command:** `npm install && npx prisma generate && npm run build`.
6.  **Start Command:** `npm run start`.
7.  **Environment Variables:**
    *   `DATABASE_URL`: Paste the `Internal Database URL` from Step 1.
    *   `JWT_SECRET`: Generate a random string (e.g., ranompassword123).
    *   `PORT`: `10000` (Render's default).
8.  Click **Create Web Service**.

## 2. Frontend (Vercel)

1.  Sign up/Log in to [Vercel](https://vercel.com).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Root Directory:** Edit and select `apps/web`.
5.  **Build Settings:** Vercel usually detects Vite automatically.
    *   Build Command: `npm run build`
    *   Output Directory: `dist`
6.  **Environment Variables:**
    *   `VITE_API_URL`: The URL of your Render Backend (e.g., `https://finance-dashboard-api.onrender.com`).
7.  Click **Deploy**.

## 3. Final Polish

Once both are live:
1.  Update the `VITE_API_URL` in Vercel if you didn't have the backend URL ready during setup.
2.  Test the full flow: Register -> Login -> Create Transaction.
