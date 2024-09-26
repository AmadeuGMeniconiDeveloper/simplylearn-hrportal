import { Card } from "../components/ActionCard";
import { useAuth } from "../hooks/useAuth";

export function EmployerDashboard() {
  const { loggedUser } = useAuth();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <h1>Employer Dashboard</h1>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(3, 1fr)",
          marginBottom: "0.5rem",
        }}
      >
        <Card title="Add new employee">
          <button>Add employee</button>
        </Card>
      </div>

      <hr style={{ width: "100%", border: "1px solid #e2e2e2" }} />

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        <Card title="Leave details" subtitle="View your leave details">
          <button type="submit">View details</button>
        </Card>{" "}
        <Card title="Leave details" subtitle="View your leave details">
          <button type="submit">View details</button>
        </Card>{" "}
        <Card title="Leave details" subtitle="View your leave details">
          <button type="submit">View details</button>
        </Card>
      </div>
    </div>
  );
}
