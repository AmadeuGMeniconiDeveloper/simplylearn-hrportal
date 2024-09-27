import { Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

export function EmployeeDashboard() {
  const { loggedUser } = useAuth();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Employee Dashboard</h1>

      {loggedUser && (
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            alignItems: "start",
            gridTemplateColumns: "repeat(3, 1fr)",
            marginTop: "1rem",
          }}
        >
          <Card>
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "9rem",
              }}
            >
              <div>
                <Card.Title>Welcome</Card.Title>
                <Card.Text style={{ fontSize: "14px" }}>
                  {loggedUser.email}
                </Card.Text>
              </div>
              <Button variant="dark">View details</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "9rem",
              }}
            >
              <Card.Title>View your leave details</Card.Title>

              <Button variant="dark">View leave details</Button>
            </Card.Body>
          </Card>{" "}
          <Card>
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div>
                <Card.Title>Apply for leave</Card.Title>
                <Card.Text style={{ fontSize: "14px" }}>
                  Fill wth reason for leave
                </Card.Text>
              </div>
              <Form id="add-employee-form">
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    required
                    style={{
                      resize: "vertical",
                      maxHeight: "550px",
                      minHeight: "100px",
                    }}
                  ></Form.Control>
                </Form.Group>
              </Form>
              <Button variant="dark" type="submit" form="add-employee-form">
                Apply leave
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}
