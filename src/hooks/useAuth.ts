import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth hook must be used inside of a AuthProvider");
  }

  return context;
}
