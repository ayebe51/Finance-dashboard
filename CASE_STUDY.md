# 💼 Project Case Study: FinancePro

## 1. Project Overview
**FinancePro** is a full-stack web application designed to solve the common problem of fragmented personal finance tracking. Unlike simple expense trackers, this application provides a holistic view of financial health by integrating budgeting, categorization, and vendor management into a single, cohesive platform.

**Role:** Full Stack Developer
**Timeline:** 4 Weeks
**Status:** Completed v1.0

## 2. The Problem
Many existing finance apps are either too simple (lacking hierarchical categorization) or too complex (enterprise ERPs). Users often struggle to answer simple questions like *"How much did I spend on 'Dining Out' specifically within 'Food' this month vs last month?"* due to flat data structures and poor visualization.

## 3. The Solution
I built a solution centered around **relational data integrity** and **user-centric design**:

*   **Hierarchical Categories:** implemented a self-referencing `Category` model in PostgreSQL to allow infinite depth (e.g., Living > Utilities > Electric).
*   **Real-time Budget Tracking:** Budgets are linked to categories and aggregated in real-time to show percentage utilization.
*   **Performance:** Utilized Prisma's efficient querying to handle complex joins between Transactions, Categories, and budgets without N+1 query issues.

## 4. Technical Deep Dive

### 🏗 Architecture
The application follows a **Monorepo** structure (though separated in folders here for simplicity) to share types and configurations.

*   **Backend:** detailed REST API built with Express. I chose **Prisma** as the ORM because of its type safety features which mirror the TypeScript frontend, heavily reducing runtime errors.
*   **Database:** Switched from SQLite to **PostgreSQL** for production readiness, better concurrency, and robust data types.
*   **Frontend:** React with **Vite** for near-instant HMR (Hot Module Replacement). State management is handled via React Context and Custom Hooks to keep dependencies minimal.

### 💡 Key Challenges & Solutions

**Challenge 1: Handling Recursive Categories**
*   *Problem:* Displaying a tree structure of categories in the UI and calculating total expenses for a parent category including all its children.
*   *Solution:* Implemented a recursive component in React for the UI. On the backend, used raw SQL (via Prisma) for efficient recursive queries (CTEs) when generating aggregate reports.

**Challenge 2: Docker Networking**
*   *Problem:* The API container couldn't initially talk to the Postgres container due to race conditions (API starting before DB was ready).
*   *Solution:* Implemented `depends_on` with health checks in `docker-compose.yml` to ensure the database is fully ready to accept connections before the API starts.

## 5. Future Improvements
*   **CI/CD Pipeline:** Implement GitHub Actions to run tests on push.
*   **Receipt Scanning:** Integrate OCR API to auto-create transactions from images.
*   **Mobile App:** Build a React Native version reusing the existing API.
