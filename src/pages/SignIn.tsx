import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import Form from "react-bootstrap/Form";
import { Button, Card, Spinner, Toast } from "react-bootstrap";
import { toast } from "sonner";
import { Message } from "../server/api/types";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { onLogin } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsLoading(true);
    const { code, body }: Message = await onLogin(email, password);

    if (code === "OK") {
      toast.custom(() => (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{body}</Toast.Body>
        </Toast>
      ));

      navigate("/", { replace: true });
    } else {
      toast.custom(() => (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{body}</Toast.Body>
        </Toast>
      ));
    }

    setIsLoading(false);
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
