import { Router } from "express";
import {
  signupUser,
  loginUser,
  getCurrentUser,
} from "../controllers/auth-controller";

const route: Router = Router();

route.post("/signup", signupUser);

route.post("/login", loginUser);

route.get("/current-user", getCurrentUser);

export default route;
