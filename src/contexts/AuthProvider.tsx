import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { User } from '../api/@types';
import { login, register } from '../api/auth';

type AuthContext = {
  authToken?: string | null;
  loggedUser?: User | null;
  handleLogin: (email: User["email"], password: User["password"]) => Promise<void>;
  handleRegister: (email: User["email"], password: User["password"], role: User["role"]) => Promise<void>;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>();
  const [loggedUser, setLoggedUser] = useState<User | null>();

  async function handleLogin(email: User["email"], password: User["password"]) {
    try {
      const [_, data] = await login(email, password);

      const { authToken, user } = data;

      setAuthToken(authToken);
      setLoggedUser(user);
    } catch {
      setAuthToken(null);
      setLoggedUser(null);
    }
  }

  async function handleRegister(email: User["email"], password: User["password"], role: User["role"]) {
    try {
      const [_] = await register(email, password, role);

    } catch (error) {
      alert(error)
    }
  }

  function handleLogout() {
    setAuthToken(null);
    setLoggedUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ authToken, loggedUser, handleLogin, handleRegister, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth hook must be used inside of a AuthProvider');
  }

  return context;
}
