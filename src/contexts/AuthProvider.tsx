import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { User } from '../api/@types';
import { login } from '../api/auth';

type AuthContext = {
  authToken?: string | null;
  loggedUser?: User | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>();
  const [loggedUser, setLoggedUser] = useState<User | null>();

  async function handleLogin(email: string, password: string) {
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

  function handleLogout() {
    setAuthToken(null);
    setLoggedUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ authToken, loggedUser, handleLogin, handleLogout }}
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
