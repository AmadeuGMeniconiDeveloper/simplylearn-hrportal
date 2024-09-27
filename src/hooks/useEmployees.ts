import { useContext } from "react";
import { EmployerContext } from "../contexts/EmployeesProvider";

export function useEmployees() {
  const context = useContext(EmployerContext);

  if (context === undefined) {
    throw new Error("useAuth hook must be used inside of a AuthProvider");
  }

  return context;
}
