import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Message, User } from "../server/api/types";
import { useAuth } from "../hooks/useAuth";
import {
  Button,
  Card,
  Form,
  FormSelect,
  Spinner,
  Toast,
} from "react-bootstrap";
import { toast } from "sonner";

export function SignUp() {
  const [name, setName] = useState<User["name"]>("");
  const [email, setEmail] = useState<User["email"]>("");
  const [password, setPassword] = useState<User["password"]>("");
  const [role, setRole] = useState<User["role"]>("employee");
  const [isLoading, setIsLoading] = useState(false);

  const { onRegister } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsLoading(true);
    const { code, body }: Message = await onRegister(
      name,
      email,
      password,
      role
    );

    if (code === "OK") {
      toast.custom(() => (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {body}
          </Toast.Body>
        </Toast>
      ));

      navigate("/sign-in", { replace: true });
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
          <Card.Title>Register</Card.Title>
          <Form onSubmit={handleSubmit} style={formStyles}>
            <Form.Group>
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                id="name"
                type="name"
                onChange={e => setName(e.target.value)}
                value={name}
                required
              />
            </Form.Group>
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
            <Form.Group>
              <Form.Label htmlFor="role">Role</Form.Label>
              <FormSelect
                id="role"
                defaultValue={role}
                onChange={e => setRole(e.target.value as User["role"])}
                required
              >
                <option value="employee">Employee</option>
                <option value="employer">Employer</option>
              </FormSelect>
            </Form.Group>

            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <span>Sign up</span>
              )}
            </Button>
            <div style={{ fontSize: "12px" }}>
              Have an account? <Link to="/sign-in">Sign in</Link>
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
