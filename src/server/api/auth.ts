import { generateToken } from "./utils/tokenGenerator";
import { User } from "./@types";
import { generateUid } from "./utils/uidGenerator";

export const accounts: User[] = [
  {
    id: "1",
    email: "email@example.com",
    password: "123",
    role: "employer",
  },
];

export async function login(email: User["email"], password: User["password"]) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const registeredUser = accounts.find(user => user.email === email);

  if (!registeredUser) {
    throw new Error("Email not registered");
  } else if (password !== registeredUser.password) {
    throw new Error("Unauthorized");
  }

  const authToken = generateToken();

  return [200, { authToken, user: registeredUser }] as const;
}

export async function register(
  email: User["email"],
  password: User["password"],
  role: User["role"]
) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  let newUser: User;

  const registeredUser = accounts.find(user => user.email === email);

  if (registeredUser) {
    throw new Error("Email already in use");
  } else {
    newUser = {
      id: generateUid(),
      email,
      password,
      role,
    };

    accounts.push(newUser);
  }

  return [201, { user: newUser }] as const;
}
