import { sign, verify } from "hono/jwt";

export const generateJwt = async (payload: {
  email?: string;
  role?: string;
  exp: number;
  sessionId: string;
}) => {
  const token = await sign({ ...payload }, process.env.JWT_SECRET!);
  return token;
};

export const verifyJwt = async (token?: string) => {
  if (!token) {
    return { payload: null, isValidToken: false };
  }
  try {
    const payload = await verify(token, process.env.JWT_SECRET!);
    return { payload, isValidToken: true };
  } catch {
    return { payload: null, isValidToken: false };
  }
};
