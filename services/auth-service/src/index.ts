import express from "express";
import dotenv from "dotenv";
import { connectRabbitMQ } from "./utils/rabbitmq";

import authRoutes from "./routes/auth-routes";

(async () => {
  try {
    await connectRabbitMQ();
  } catch (e) {
    console.log(`Error initialising`, e);
  }
})();

dotenv.config();
const app = express();
app.use(express.json());

app.get("/health", (_req, res) => res.send("Auth service is healthy"));

app.use(authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
