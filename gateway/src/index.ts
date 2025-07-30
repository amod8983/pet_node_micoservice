import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();
const app = express();

app.get("/health", (_req, res) => res.send("Gateway is healthy"));

app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://auth-service:3001",
    changeOrigin: true,
    pathRewrite: { "^/auth": "" },
  })
);

app.use(
  "/user",
  createProxyMiddleware({
    target: "http://user-service:3002",
    changeOrigin: true,
    pathRewrite: { "^/path": "" },
  })
);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Gateway running on port ${PORT}`));
