import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/health", (_req, res) => res.send("Auth service is healthy"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
