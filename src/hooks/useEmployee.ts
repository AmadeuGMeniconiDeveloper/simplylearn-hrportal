import { useContext } from "react";
import { EmployeeContext } from "../contexts/EmployeeProvider";

export function useEmployee() {
  const context = useContext(EmployeeContext);

  if (context === undefined) {
    throw new Error("useAuth hook must be used inside of a AuthProvider");
  }

  return context;
}
