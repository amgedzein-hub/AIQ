FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY packages ./packages
COPY apps/frontend ./apps/frontend

RUN npm install

RUN npm run build -w @iq-test/frontend

FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g next

COPY --from=builder /app/apps/frontend/.next /app/.next
COPY --from=builder /app/apps/frontend/package.json /app/package.json
COPY --from=builder /app/apps/frontend/public /app/public

EXPOSE 3000

CMD ["next", "start"]
