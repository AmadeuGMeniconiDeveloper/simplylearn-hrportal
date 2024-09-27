import { createContext, PropsWithChildren } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

import { login, register } from "../server/api/calls";

import { Message, User } from "../server/api/types";

type AuthContext = {
  authToken: string | null;
  loggedUser: User | null;
  onLogin: (
    email: User["email"],
    password: User["password"]
  ) => Promise<Message>;
  onRegister: (
    name: User["name"],
    email: User["email"],
    password: User["password"],
    role: User["role"]
  ) => Promise<Message>;
  onLogout: () => void;
};

export const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthToken] = useLocalStorage<string | null>(
    "@hr-portal:token",
    null
  );
  const [loggedUser, setLoggedUser] = useLocalStorage<User | null>(
    "@hr-portal:user",
    null
  );

  async function onLogin(
    email: User["email"],
    password: User["password"]
  ): Promise<Message> {
    try {
      const [, data] = await login(email, password);

      const { authToken, user } = data;

      setAuthToken(authToken);
      setLoggedUser(user);

      return { code: "OK", body: `Welcome ${user.email}` };
    } catch {
      setAuthToken(null);
      setLoggedUser(null);

      return { code: "FAIL", body: "Invalid credentials" };
    }
  }

  async function onRegister(
    name: User["name"],
    email: User["email"],
    password: User["password"],
    role: User["role"]
  ): Promise<Message> {
    try {
      await register(name, email, password, role);

      return { code: "OK", body: "Account has been created successfully" };
    } catch {
      return {
        code: "FAIL",
        body: "Account could not be created, please try again",
      };
    }
  }

  function onLogout() {
    setAuthToken(null);
    setLoggedUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        loggedUser,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
