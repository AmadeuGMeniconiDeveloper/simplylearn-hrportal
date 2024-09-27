import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import Form from "react-bootstrap/Form";
import { Button, Card, Spinner } from "react-bootstrap";

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
      <Card>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form onSubmit={handleSubmit} style={formStyles}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                id="email"
                type="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                required
              />
            </Form.Group>

            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <span>Sign in</span>
              )}
            </Button>
            <div style={{ fontSize: "12px" }}>
              Or create your <Link to="/sign-up">account</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

const containerStyles: React.CSSProperties = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const formStyles: React.CSSProperties = {
  display: "flex",
  gap: "0.75rem",
  flexDirection: "column",
};
