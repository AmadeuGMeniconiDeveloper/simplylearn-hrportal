import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../server/api/@types";
import { useAuth } from "../hooks/useAuth";

export function SignUp() {
  const [email, setEmail] = useState<User["email"]>("");
  const [password, setPassword] = useState<User["password"]>("");
  const [role, setRole] = useState<User["role"]>("employer");

  const [isLoading, setIsLoading] = useState(false);

  const { handleRegister } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsLoading(true);
    await handleRegister(email, password, role);
    setIsLoading(false);

    setEmail("");
    setPassword("");
    setRole("employer");
  }

  return (
    <div style={containerStyles}>
      <form onSubmit={handleSubmit} style={formStyles}>
        <h1>Register</h1>
        <div style={inputContainerStyles}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div style={inputContainerStyles}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <div style={inputContainerStyles}>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            onChange={e => setRole(e.target.value as User["role"])}
            value={role}
            required
          >
            <option value="employer">Employer</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoading ? <span>Loading...</span> : <span>Sign up</span>}
        </button>
        <div style={{ fontSize: "12px" }}>
          Got an account? <Link to="/sign-in">Sign in</Link>
        </div>
      </form>
    </div>
  );
}

const containerStyles: React.CSSProperties = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
};

const formStyles: React.CSSProperties = {
  display: "flex",
  gap: "0.75rem",
  height: "fit-content",
  flexDirection: "column",
  marginInline: "auto",
  backgroundColor: "#FFF",
  boxShadow: "2px 2px 6px 0 rgba(0,0,0,0.1)",
  padding: "1.25rem",
  borderRadius: "1rem",
};

const inputContainerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};
