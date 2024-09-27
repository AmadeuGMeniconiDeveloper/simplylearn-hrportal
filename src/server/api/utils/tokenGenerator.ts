import { Session } from "../types";

export async function generateToken() {
  const newToken = Math.random().toString(36).substring(2);

  const res = await fetch("http://localhost:3000/users", { method: "GET" });
  const session: Session[] = await res.json();

  if (session.find(session => session.token === newToken)) {
    generateToken();
  }

  return newToken;
}
