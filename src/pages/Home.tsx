import { EmployerProvider } from "../contexts/EmployeesProvider";
import { useAuth } from "../hooks/useAuth";
import { EmployeeDashboard } from "./EmployeeDashboard";
import { EmployerDashboard } from "./EmployerDashboard";

export function Home() {
  const { loggedUser } = useAuth();

  if (loggedUser) {
    switch (loggedUser.role) {
      case "employee": {
        return <EmployeeDashboard />;
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
