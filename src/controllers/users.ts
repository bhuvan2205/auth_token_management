import { Context } from "hono";
import { generateJwt, verifyJwt } from "../utils/jwt";
import { getCookie, setCookie } from "hono/cookie";
import { createSession, getSession, inValidateSession } from "../utils/session";
import { getUser, users } from "../db/users";

export const registerHandler = async (c: Context) => {
  const { email, password, username } = await c.req.json();

  if (!email || !password || !username) {
    return c.json({ message: "Bad request" }, 400);
  }

  const user = { email, password, username };

  users.push(user);
  return c.json({ email, username, id: users?.length });
};

export const getSessionHandler = (c: Context) => {
  const sessionId = c.get("sessionId");

  let session = getSession(sessionId as string);
  return c.json({ sessionId, email: session?.email }, 200);
};

export const createSessionHandler = async (c: Context) => {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ message: "Bad request" }, 400);
  }

  const user = getUser(email);

  if (!user || user.password !== password) {
    return c.json({ message: "Invalid credentials" }, 401);
  }

  const session = createSession(email);

  const refreshToken = await generateJwt({
    email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
    sessionId: session.id,
  });

  const accessToken = await generateJwt({
    email,
    role: "user",
    exp: Math.floor(Date.now() / 1000) + 60 * 5, // 5 minutes
    sessionId: session.id,
  });

  setCookie(c, "refreshToken", refreshToken, {
    secure: true,
    maxAge: 1000,
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });

  return c.json({
    sessionId: session?.id,
    email: session?.email,
    accessToken,
    refreshToken,
  });
};

export const deleteSessionHandler = (c: Context) => {
  const sessionId = c.get("sessionId");
  const session = getSession(sessionId as string);

  if (!session) {
    return c.json({ message: "Session expired" }, 403);
  }

  inValidateSession(sessionId as string);
  setCookie(c, "refreshToken", "");
  return c.json({ message: "Logged out" }, 200);
};

export const refreshTokenHandler = async (c: Context) => {
  let token: string | undefined = "";
  token = getCookie(c, "refreshToken");

  if (!token) {
    const { refreshToken } = await c.req.json();
    token = refreshToken;
  }

  if (!token) {
    return c.json({ message: "Auth required" }, 401);
  }

  const { isValidToken, payload } = await verifyJwt(token);

  if (!isValidToken) {
    return c.json({ message: "Token expires" }, 403);
  }

  const { email } = payload || {};
  const session = createSession(email as string);

  const newAccessToken = await generateJwt({
    email: email as string,
    role: "user",
    exp: Math.floor(Date.now() / 1000) + 60 * 5, // 5 minutes
    sessionId: session?.id,
  });

  return c.json({ sessionId: session?.id, accessToken: newAccessToken }, 200);
};
