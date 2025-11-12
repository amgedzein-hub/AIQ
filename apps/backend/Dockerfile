FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY packages ./packages
COPY apps/backend/package.json apps/backend/package-lock.json ./apps/backend/
COPY apps/backend/src ./apps/backend/src
COPY apps/backend/tsconfig.json ./apps/backend/

# Install dependencies
RUN npm ci

# Build the backend
RUN npm run build --prefix=apps/backend

EXPOSE 3001

CMD ["npm", "start", "--prefix=apps/backend"]
