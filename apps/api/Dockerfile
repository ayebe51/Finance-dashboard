# Use Node.js LTS (Alpine)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files (if any) and app package.json
# Adjusting for monorepo structure: assuming we run docker build from root
# Copy root package files
COPY package.json ./

# Copy app package files
COPY apps/api/package*.json ./apps/api/

# Install dependencies
RUN npm install

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Copy source code
COPY apps/api ./apps/api

# Generate Prisma Client
WORKDIR /app/apps/api
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# --- Production Stage ---
FROM node:20-alpine AS runner

WORKDIR /app

# Install OpenSSL for Prisma (Required for runner)
RUN apk add --no-cache openssl

# Copy necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

# Set Environment Variables
ENV NODE_ENV=production
ENV PORT=3001

# Expose API Port
EXPOSE 3001

# Start the server
WORKDIR /app/apps/api
CMD ["node", "dist/index.js"]
