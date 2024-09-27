import { createContext, PropsWithChildren } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { login, register } from "../server/api/calls";

import { toast } from "sonner";

import { useNavigate } from "react-router-dom";
import { Toast } from "react-bootstrap";

import { User } from "../server/api/types";

type AuthContext = {
  authToken: string | null;
  loggedUser: User | null;
  handleLogin: (
    email: User["email"],
    password: User["password"]
  ) => Promise<void>;
  handleRegister: (
    name: User["name"],
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
      const [, data] = await login(email, password);

      const { authToken, user } = data;

      toast.custom(() => (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Welcome {user.email}.</Toast.Body>
        </Toast>
      ));

      setAuthToken(authToken);
      setLoggedUser(user);

      navigate("/", { replace: true });
    } catch {
      toast.custom(() => (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>Invalid credentials.</Toast.Body>
        </Toast>
      ));

      setAuthToken(null);
      setLoggedUser(null);
    }
  }

  async function handleRegister(
    name: User["name"],
    email: User["email"],
    password: User["password"],
    role: User["role"]
  ) {
    try {
      await register(name, email, password, role);

      toast.custom(() => (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            Account has been created successfully.{" "}
          </Toast.Body>
        </Toast>
      ));

      navigate("/sign-in");
    } catch {
      toast.custom(() => (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>
            Account could not be created, please try again.
          </Toast.Body>
        </Toast>
      ));
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
