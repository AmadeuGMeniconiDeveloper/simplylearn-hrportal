import { useContext } from "react";
import { EmployerContext } from "../contexts/EmployerProvider";

export function useEmployer() {
  const context = useContext(EmployerContext);

  if (context === undefined) {
    throw new Error("useAuth hook must be used inside of a AuthProvider");
  }

  return context;
}
