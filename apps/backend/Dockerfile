FROM node:20-alpine AS builder
WORKDIR /app
# Enable corepack for pnpm/yarn if needed, but we use npm
# Copy entire monorepo content
COPY . .
# Install dependencies for all workspaces
RUN npm ci
# Build the backend and its dependencies
RUN npm run build --prefix=apps/backend --workspace=@iq-test/backend...

# Production runner
FROM node:20-alpine AS runner
WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/backend ./apps/backend

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "start", "--prefix=apps/backend"]
