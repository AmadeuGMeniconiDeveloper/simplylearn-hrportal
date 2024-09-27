import { useState } from "react";

import { Button, Card, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

// import { User } from "../server/api/types";
import { AddEmployeeModal } from "../components/AddEmployeeModal";
import { useEmployees } from "../hooks/useEmployees";

export function EmployerDashboard() {
  const [showModal, setShowModal] = useState(false);

  const { selectedEmployees, handleRemoveEmployee, isLoading } = useEmployees();

  const renderEmplayeeList = selectedEmployees.map(employee => (
    <Card key={employee.id}>
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "9rem",
        }}
      >
        <div>
          <Card.Title
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {employee.name}{" "}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRemoveEmployee(employee)}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <span>Remove</span>
              )}
            </Button>
          </Card.Title>
          <Card.Text style={{ fontSize: "14px" }}>
            Click bellow to expand on user details.
          </Card.Text>
        </div>
        <Button variant="dark">View profile</Button>
      </Card.Body>
    </Card>
  ));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ marginBottom: "1.5rem" }}>Employer Dashboard</h1>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          alignItems: "start",
          gridTemplateColumns: "repeat(3, 1fr)",
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
              <Card.Title>Add new employee</Card.Title>
              <Card.Text style={{ fontSize: "14px" }}>
                Click bellow to add new employee.
              </Card.Text>
            </div>
            <Button variant="dark" onClick={() => setShowModal(true)}>
              Add employee
            </Button>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <AddEmployeeModal setShowModal={setShowModal} />
        </Modal>
      </div>

      <hr style={{ width: "100%", border: "1px solid #e2e2e2" }} />

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {renderEmplayeeList}
      </div>
    </div>
  );
}
