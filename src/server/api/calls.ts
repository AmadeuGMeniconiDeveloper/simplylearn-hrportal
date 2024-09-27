import { generateToken } from "./utils/tokenGenerator";
import { generateUid } from "./utils/uidGenerator";

import { Leave, Session, User } from "./types";

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

  let registeredUser: User;

  const foundUser = users.find(user => user.email === email);

  if (foundUser) {
    throw new Error("Email already in use");
  } else {
    registeredUser = {
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
      body: JSON.stringify(registeredUser),
    });
  }

  return [201, { registeredUser: registeredUser }] as const;
}

export async function addEmployee(user: User) {
  const employeeResponse = await fetch(
    `http://localhost:3000/users/${user.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selected: true,
      }),
    }
  );

  const addedEmployee: User = await employeeResponse.json();

  return [201, { addedEmployee: addedEmployee }] as const;
}

export async function removeEmployee(user: User) {
  const employeeResponse = await fetch(
    `http://localhost:3000/users/${user.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selected: false,
      }),
    }
  );

  const removedEmployee: User = await employeeResponse.json();

  return [200, { removedEmployee: removedEmployee }] as const;
}

export async function getEmployees() {
  const usersResponse = await fetch("http://localhost:3000/users", {
    method: "GET",
  });
  const users: User[] = await usersResponse.json();

  const employees: User[] = users.filter(user => user.role === "employee");

  return [200, { employees: employees }] as const;
}

export async function processLeave(user: User, judgment: Leave["status"]) {
  if (!user.leave) {
    throw new Error("No leave to approve");
  }

  if (judgment === "pending") {
    throw new Error("No process chosen");
  }

  const leaveResponse = await fetch(`http://localhost:3000/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      leave: {
        status: judgment,
        body: user.leave.body,
      },
    }),
  });

  const processedLeave: Leave = await leaveResponse.json();

  return [200, { processedLeave: processedLeave }] as const;
}

export async function createLeave(user: User, leaveReason: string) {
  const leaveResponse = await fetch(`http://localhost:3000/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      leave: {
        status: "pending",
        body: leaveReason,
      },
    }),
  });

  const employeeLeave: Leave = await leaveResponse.json();

  return [201, { employeeLeave: employeeLeave }] as const;
}

export async function getLeave(user: User) {
  const usersResponse = await fetch(`http://localhost:3000/users/${user.id}`, {
    method: "GET",
  });
  const foundUser: User = await usersResponse.json();

  if (!foundUser.leave) {
    throw new Error("No leave submitted");
  }

  return [200, { leave: foundUser.leave }] as const;
}
