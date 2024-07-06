import { Context, Next } from "hono";
import { verifyJwt } from "../utils/jwt";

export const verifyUser = async (c: Context, next: Next) => {
  const token = c.req.header("authorization")?.split(" ")?.at(1);

  if (!token) {
    return c.json({ message: "Auth required" }, 401);
  }

  const { isValidToken, payload } = await verifyJwt(token as string);

  if (!isValidToken) {
    return c.json({ message: "Token expires" }, 403);
  }

  c.set("sessionId", payload?.sessionId as string);
  await next();
};
