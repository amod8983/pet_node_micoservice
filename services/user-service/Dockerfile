# Stage 1: Build
FROM node:18-slim as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
RUN npm install --only=production
EXPOSE 3001
CMD [ "node", "dist/index.js" ]
