import { Dispatch, SetStateAction } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useEmployee } from "../hooks/useEmployee";

interface LeaveStatusProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export function LeaveStatusModal({ setShowModal }: LeaveStatusProps) {
  const { leave } = useEmployee();

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
        <Modal.Title>Leave Status</Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "20rem",
          overflowY: "auto",
        }}
      >
        {leave ? (
          <Table borderless>
            <thead>
              <tr>
                <th>Reason</th>
                <th style={{ inlineSize: "10rem", textAlign: "center" }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ verticalAlign: "middle" }}>
                <td>
                  <p
                    style={{
                      overflow: "hidden",
                      wordBreak: "break-word",
                      textAlign: "justify",
                    }}
                  >
                    {leave.body}
                  </p>
                </td>
                <td
                  style={{
                    textTransform: "capitalize",
                    textAlign: "center",
                    color:
                      leave.status === "approved"
                        ? "green"
                        : leave.status === "denied"
                        ? "red"
                        : "gray",
                  }}
                >
                  {leave.status}
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <div style={{ textAlign: "center" }}>No leave submited</div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </>
  );
}
