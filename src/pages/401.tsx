import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function NotAuthorized() {
  const navigate = useNavigate();

  return (
    <div style={containerStyles}>
      <Card>
        <Card.Body style={cardBodyStyles}>
          <div>
            <Card.Title>401</Card.Title>
            <Card.Text>You cannot access this page...</Card.Text>
          </div>
          <Button
            variant="outline-dark"
            type="button"
            onClick={() => navigate("/", { replace: true })}
          >
            Go home
          </Button>
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

const cardBodyStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "15rem",
  gap: "1.5rem",
};
