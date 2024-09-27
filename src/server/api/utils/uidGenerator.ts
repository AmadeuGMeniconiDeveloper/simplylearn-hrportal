import { User } from "../types";

export async function generateUid(table: string) {
  const newUid = Math.random().toString(36).substring(2);

  const res = await fetch(`http://localhost:3000/${table}`, { method: "GET" });
  const users: User[] = await res.json();

  if (users.find(user => user.id === newUid)) {
    generateUid(table);
  }

  return newUid;
}
