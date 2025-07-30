import express from "express";
import dotenv from "dotenv";
import { startConsumer } from "./utils/rabbitmq";

dotenv.config();

(async () => {
  try {
    await startConsumer();
  } catch (e) {
    console.log(`Error initialising the consumer`, e);
  }
})();

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => res.send("User service is healthy"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
