import { Hono } from "hono";
import {
  createSessionHandler,
  deleteSessionHandler,
  registerHandler,
  refreshTokenHandler,
  getSessionHandler,
} from "../controllers/users";
import { verifyUser } from "../middlewares/users";

const user = new Hono().basePath("/api/users");

user.post("/register", registerHandler);
user.post("/login", createSessionHandler);
user.get("/session", verifyUser, getSessionHandler);
user.post("/accessToken", refreshTokenHandler);
user.delete("/logout", verifyUser, deleteSessionHandler);

export default user;
