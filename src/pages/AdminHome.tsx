import { useAuth } from "../contexts/AuthProvider"

export function AdminHome() {
    const { loggedUser } = useAuth()

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            Admin Home
            <span>{loggedUser?.id}</span>
            <span>{loggedUser?.email}</span>
            <span>{loggedUser?.password}</span>
        </div>
    )
}