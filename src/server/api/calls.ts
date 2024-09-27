import { generateToken } from "./utils/tokenGenerator";
import { generateUid } from "./utils/uidGenerator";

import { Session, User } from "./types";

export async function login(email: User["email"], password: User["password"]) {
  // Check if user exists  and password is correct
  const usersResponse = await fetch("http://localhost:3000/users", {
    method: "GET",
  });
  const users: User[] = await usersResponse.json();

  const registeredUser = users.find(user => user.email === email);

  if (!registeredUser) {
    throw new Error("Email not registered");
  } else if (password !== registeredUser.password) {
    throw new Error("Unauthorized");
  }

  // Check if session token exists
  const sessionsResponse = await fetch("http://localhost:3000/sessions", {
    method: "GET",
  });
  const sessions: Session[] = await sessionsResponse.json();

  const registeredSession = sessions.find(
    session => session.user === registeredUser.id
  );

  if (registeredSession) {
    return [
      200,
      { authToken: registeredSession.token, user: registeredUser },
    ] as const;
  }

  // Create new session
  const newSession = {
    id: await generateUid("sessions"),
    user: registeredUser.id,
    token: await generateToken(),
  };
  await fetch("http://localhost:3000/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSession),
  });

  return [200, { authToken: newSession.token, user: registeredUser }] as const;
}

export async function register(
  name: User["name"],
  email: User["email"],
  password: User["password"],
  role: User["role"]
) {
  const res = await fetch("http://localhost:3000/users", { method: "GET" });
  const users: User[] = await res.json();

  let newUser: User;

  const registeredUser = users.find(user => user.email === email);

  if (registeredUser) {
    throw new Error("Email already in use");
  } else {
    newUser = {
      id: await generateUid("users"),
      role,
      name,
      email,
      password,
      selected: false,
    };

    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
  }

  return [201, newUser] as const;
}

export async function addEmployee(user: User) {
  await fetch(`http://localhost:3000/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      selected: true,
    }),
  });
}

export async function removeEmployee(user: User) {
  await fetch(`http://localhost:3000/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      selected: false,
    }),
  });
}

export async function getNonSelectedEmployees() {
  const usersResponse = await fetch("http://localhost:3000/users", {
    method: "GET",
  });
  const users: User[] = await usersResponse.json();

  const employees: User[] = users.filter(
    user => user.role === "employee" && !user.selected
  );

  return [200, employees] as const;
}

export async function getSelectedEmployees() {
  const usersResponse = await fetch("http://localhost:3000/users", {
    method: "GET",
  });
  const users: User[] = await usersResponse.json();

  const addedEmployees: User[] = users.filter(
    user => user.role === "employee" && user.selected
  );

  return [200, addedEmployees] as const;
}
