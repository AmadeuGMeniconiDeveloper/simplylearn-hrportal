import { PropsWithChildren, useEffect } from "react";
import { User } from "./api/@types";
import { useAuth } from "./contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren & {
    roles?: User["role"][]
}

export function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
    const { loggedUser } = useAuth();

    const navigate = useNavigate()


    if (loggedUser === undefined) {
        return <div>Loading...</div>
    }

    if (loggedUser === null) {
        navigate('/sign-in')
    }

    if (loggedUser && (roles && !roles.includes(loggedUser.role))) {
        return <div>User cannot access this content</div>
    }


    return children;
}