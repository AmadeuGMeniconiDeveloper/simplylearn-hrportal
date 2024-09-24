import { useAuth } from "../contexts/AuthProvider"

export function Home() {
    const { loggedUser } = useAuth()


    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            Home
            <span>{loggedUser?.id}</span>
            <span>{loggedUser?.email}</span>
            <span>{loggedUser?.password}</span>
        </div>
    )
}