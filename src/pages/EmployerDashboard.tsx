import { useState } from "react";

import { useEmployer } from "../hooks/useEmployer";

import { AddEmployeeModal } from "../components/AddEmployeeModal";
import { LeaveProcessModal } from "../components/LeaveProcessModal ";

import { Button, Card, Spinner, Toast } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import { User } from "../server/api/types";
import { toast } from "sonner";

export function EmployerDashboard() {
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showLeaveProcessModal, setShowLeaveProcessModal] = useState(false);

  const [managedEmploye, setManagedEmploye] = useState<User>();

  const { selectedEmployees, isLoading, onRemoveEmployee } = useEmployer();

  function handleManageLeave(employee: User) {
    setManagedEmploye(employee);
    setShowLeaveProcessModal(true);
  }

  async function handleRemoveEmployee(employee: User) {
    const { code, body } = await onRemoveEmployee(employee);

    if (code !== "OK") {
      toast.custom(() => (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{body}</Toast.Body>
        </Toast>
      ));
    } else {
      toast.custom(() => (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{body}</Toast.Body>
        </Toast>
      ));
    }
  }

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
            {employee.name}

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

        <Button variant="dark" onClick={() => handleManageLeave(employee)}>
          Manage leave
        </Button>
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

            <Button
              variant="dark"
              onClick={() => setShowAddEmployeeModal(true)}
            >
              Add employee
            </Button>
          </Card.Body>
        </Card>

        <Modal
          show={showAddEmployeeModal}
          onHide={() => setShowAddEmployeeModal(false)}
          centered
        >
          <AddEmployeeModal setShowModal={setShowAddEmployeeModal} />
        </Modal>

        <Modal
          show={showLeaveProcessModal}
          onHide={() => setShowLeaveProcessModal(false)}
          centered
        >
          <LeaveProcessModal
            setShowModal={setShowLeaveProcessModal}
            employee={managedEmploye}
          />
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
