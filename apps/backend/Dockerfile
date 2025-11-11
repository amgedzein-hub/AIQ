FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY packages ./packages
COPY apps/backend ./apps/backend

RUN npm install --production

# Build the application
RUN npm run build

EXPOSE 3001

CMD ["npm", "start", "-w", "@iq-test/backend"]
