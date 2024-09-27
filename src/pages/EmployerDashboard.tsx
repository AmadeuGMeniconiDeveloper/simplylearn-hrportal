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
      <Card.Body style={cardBodyStyles}>
        <div>
          <Card.Title>{employee.name}</Card.Title>

          <Card.Text style={{ fontSize: "14px" }}>
            Click bellow to expand on user details.
          </Card.Text>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRemoveEmployee(employee)}
            disabled={isLoading}
            style={{ minWidth: "4.5rem" }}
          >
            {isLoading ? (
              <Spinner
                animation="border"
                size="sm"
                style={{ verticalAlign: "middle" }}
              />
            ) : (
              <span>Remove</span>
            )}
          </Button>
          <Button
            variant="dark"
            onClick={() => handleManageLeave(employee)}
            style={{ alignSelf: "flex-end", minWidth: "8rem" }}
          >
            Manage leave
          </Button>
        </div>
      </Card.Body>
    </Card>
  ));

  return (
    <div style={containerStyles}>
      <h1 style={{ marginBottom: "1.5rem" }}>Employer Dashboard</h1>

      <div style={gridContainerStyles}>
        <Card>
          <Card.Body style={cardBodyStyles}>
            <div>
              <Card.Title>Add new employee</Card.Title>
              <Card.Text style={{ fontSize: "14px" }}>
                Click bellow to add new employee.
              </Card.Text>
            </div>

            <Button
              variant="dark"
              onClick={() => setShowAddEmployeeModal(true)}
              style={{ alignSelf: "flex-end", minWidth: "8rem" }}
            >
              Add employee
            </Button>
          </Card.Body>
        </Card>
      </div>

      <hr style={{ border: "1px solid #d2d2d2" }} />

      <div style={gridContainerStyles}>{renderEmplayeeList}</div>

      <Modal
        show={showAddEmployeeModal}
        onHide={() => setShowAddEmployeeModal(false)}
        centered
        size="lg"
      >
        <AddEmployeeModal setShowModal={setShowAddEmployeeModal} />
      </Modal>

      <Modal
        show={showLeaveProcessModal}
        onHide={() => setShowLeaveProcessModal(false)}
        centered
        size="lg"
      >
        <LeaveProcessModal
          setShowModal={setShowLeaveProcessModal}
          employee={managedEmploye}
        />
      </Modal>
    </div>
  );
}

const containerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const gridContainerStyles: React.CSSProperties = {
  display: "grid",
  gap: "1.5rem",
  gridTemplateColumns: "repeat(4, 1fr)",
};

const cardBodyStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "1.5rem",
};
