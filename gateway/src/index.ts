import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/health", (_req, res) => res.send("Gateway is healthy"));

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Gateway running on port ${PORT}`));
