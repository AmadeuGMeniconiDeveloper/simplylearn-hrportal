import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { handleLogin } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsLoading(true);
    await handleLogin(email, password);
    setIsLoading(false);

    setEmail("");
    setPassword("");
  }

  return (
    <div style={containerStyles}>
      <form onSubmit={handleSubmit} style={formStyles}>
        <h1>Login</h1>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? <span>Loading...</span> : <span>Sign in</span>}
        </button>
        <div style={{ fontSize: "12px" }}>
          Or create your <Link to="/sign-up">account</Link>
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
