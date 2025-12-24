# 🚀 Deployment Guide (Vercel & Supabase)

This project is deployed using a **Serverless Architecture**.
*   **Database:** Supabase (PostgreSQL)
*   **Backend & Frontend:** Vercel (Monorepo hosting)

---

## 1. Database Setup (Supabase)

1.  **Create Project:**
    *   Go to [supabase.com](https://supabase.com) and create a **New Project**.
    *   Set a strong **Database Password**.

2.  **Get Connection String:**
    *   Click **Connect** (top right) -> **ORMs** -> **Prisma**.
    *   **Copy the URI**.
    *   *Tip:* Use the "Direct Connection" (Port 5432) string for `DATABASE_URL`.
        `postgresql://postgres.xxxx:[YOUR-PASSWORD]@aws-0-region.db.supabase.com:5432/postgres`

---

## 2. Deploying (Vercel)

We will deploy both the Frontend and Backend to Vercel.

### Step 1: Import Project
1.  Go to [vercel.com](https://vercel.com) -> **Add New...** -> **Project**.
2.  Import your GitHub repository.

### Step 2: Configure Backend (API)
Since this is a monorepo, you can deploy the `apps/api` folder as a separate project or configure the root project.
**Recommended:** Deploy `apps/api` as a standalone Vercel project first.

1.  **Root Directory:** Select `apps/api`.
2.  **Environment Variables:**
    *   `DATABASE_URL`: Your Supabase URI.
    *   `JWT_SECRET`: Random string.
    *   `CRON_SECRET`: Random string (for securing the scheduled tasks).
3.  **Deploy**.
4.  **Copy the Domain:** e.g., `https://finance-dashboard-api.vercel.app`.

### Step 3: Configure Frontend (Web)

1.  Go back to Dashboard, import the repo **again** (or add new project).
2.  **Root Directory:** Select `apps/web`.
3.  **Environment Variables:**
    *   `VITE_API_URL`: Paste the **Backend URL** from Step 2.
4.  **Deploy**.

---

## 3. Updating / Redeploying

Since Vercel is connected to your Git repository, **deploying updates is as simple as pushing your code**.

1.  **Commit your changes** locally:
    ```bash
    git add .
    git commit -m "Fix: Add postinstall script and export app for Vercel"
    ```
2.  **Push to GitHub**:
    ```bash
    git push origin main
    ```
3.  Vercel will detect the new commit and **automatically start a new deployment**.
4.  You can monitor the build status in your Vercel Dashboard.

---

## 3. Configuring Cron Jobs (Recurring Transactions)

To ensure recurring transactions work (e.g., monthly subscriptions):

1.  Go to your **Backend Project** in Vercel.
2.  Go to **Settings** -> **Cron Jobs**.
3.  You should see `/api/recurring/trigger` scheduled.
4.  **Important:** For the Cron Job to authorize correctly, Vercel automatically handles trusted requests for internal cron jobs if configured, or you can invoke it manually.
5.  *Self-Correction:* Our code checks for `Authorization: Bearer [CRON_SECRET]`.
    *   In Vercel **Settings** -> **Cron Jobs**, you might need to ensure the request headers include valid auth if you enforced it strictly.
    *   *Alternative:* If using Vercel's native Cron, you can relax the `CRON_SECRET` check to also allow requests where `req.headers['user-agent']` contains `vercel-cron`.

---

## Troubleshooting

### "Prisma Client could not be generated"
*   Ensure in `apps/api/package.json`, the `postinstall` script runs `prisma generate`.
    *   Command: `npm install && npx prisma generate`

### "Function Timeout"
*   Serverless functions have a timeout (usually 10s-60s). Ensure your database is in the same region as your Vercel deployment (e.g., api in `us-east-1` -> Supabase in `us-east-1`).
