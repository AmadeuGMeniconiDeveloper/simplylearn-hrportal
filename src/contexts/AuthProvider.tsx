import { createContext, PropsWithChildren } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { login, register } from "../server/api/auth";

import { toast } from "sonner";

import { User } from "../server/api/@types";
import { useNavigate } from "react-router-dom";

type AuthContext = {
  authToken: string | null;
  loggedUser: User | null;
  handleLogin: (
    email: User["email"],
    password: User["password"]
  ) => Promise<void>;
  handleRegister: (
    email: User["email"],
    password: User["password"],
    role: User["role"]
  ) => Promise<void>;
  handleLogout: () => void;
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

  const navigate = useNavigate();

  async function handleLogin(email: User["email"], password: User["password"]) {
    try {
      const [_, data] = await login(email, password);

      const { authToken, user } = data;

      toast.success(`Welcome ${user.email}`);

      setAuthToken(authToken);
      setLoggedUser(user);

      navigate("/", { replace: true });
    } catch {
      toast.error("Invalid credentials");

      setAuthToken(null);
      setLoggedUser(null);
    }
  }

  async function handleRegister(
    email: User["email"],
    password: User["password"],
    role: User["role"]
  ) {
    try {
      const [_, data] = await register(email, password, role);

      toast.success("Account has been created successfully.", {
        action: {
          label: "Sign in",
          onClick: () => navigate("/sign-in"),
        },
      });
    } catch {
      toast.error("Account could not be created, please try again.");
    }
  }

  function handleLogout() {
    setAuthToken(null);
    setLoggedUser(null);

    navigate("/sign-in");
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        loggedUser,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
