import { EmployeeProvider } from "../contexts/EmployeeProvider";
import { EmployerProvider } from "../contexts/EmployerProvider";
import { useAuth } from "../hooks/useAuth";
import { EmployeeDashboard } from "./EmployeeDashboard";
import { EmployerDashboard } from "./EmployerDashboard";

export function Home() {
  const { loggedUser } = useAuth();

  if (loggedUser) {
    switch (loggedUser.role) {
      case "employee": {
        return (
          <EmployeeProvider>
            <EmployeeDashboard />
          </EmployeeProvider>
        );
      }
      case "employer": {
        return (
          <EmployerProvider>
            <EmployerDashboard />
          </EmployerProvider>
        );
      }
    }
  }
}
