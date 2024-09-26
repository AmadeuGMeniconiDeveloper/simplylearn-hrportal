import { PropsWithChildren } from "react";
import { User } from "../server/api/@types";
import { Navigate } from "react-router-dom";
import { NotAuthorized } from "../pages/401";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = PropsWithChildren & {
  roles?: User["role"][];
};

export function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
  const { loggedUser } = useAuth();

  if (!loggedUser) {
    return <Navigate to="/sign-in" replace />;
  }

  if (loggedUser && roles && !roles.includes(loggedUser.role)) {
    return <NotAuthorized />;
  }

  return children;
}
