type Session = {
  id: string;
  valid: boolean;
  email: string;
};

const sessions: Record<string, Session> = {};

export const getSession = (id: string) => {
  const session = sessions[id];
  return session && session.valid ? session : null;
};

export const inValidateSession = (id: string) => {
  const session = getSession(id);
  if (session) {
    session.valid = false;
  }
};

export const createSession = (email: string) => {
  const id = (Object.keys(sessions)?.length + 1).toString();
  const session = { id, email, valid: true };
  sessions[id] = session;

  return session;
};
