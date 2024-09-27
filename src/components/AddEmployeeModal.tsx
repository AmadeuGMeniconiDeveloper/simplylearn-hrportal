import { Dispatch, SetStateAction } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useEmployees } from "../hooks/useEmployees";

interface AddEmployeeModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}
export function AddEmployeeModal({ setShowModal }: AddEmployeeModalProps) {
  const { nonSelectedEmployees, handleAddEmployee, isLoading } = useEmployees();

  return (
    <>
      <Modal.Header
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Modal.Title>Add employee</Modal.Title>
        Register new employees to your organization
      </Modal.Header>
      <Modal.Body
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          height: "30rem",
          overflowY: "auto",
        }}
      >
        <div>
          {nonSelectedEmployees.map(employee => (
            <div
              key={employee.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #dee2e6",
                paddingBlock: "0.5rem",
              }}
            >
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <span>
                  <span>Name: </span> <strong>{employee.name}</strong>
                </span>
                <span>
                  <span>ID: </span> <strong>{employee.id}</strong>
                </span>
              </div>
              <Button
                size="sm"
                variant="dark"
                onClick={() => handleAddEmployee(employee)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <span>Add</span>
                )}
              </Button>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </>
  );
}
