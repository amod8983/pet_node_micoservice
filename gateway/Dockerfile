FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD ["npx", "ts-node-dev", "src/index.ts"]