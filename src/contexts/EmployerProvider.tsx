import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {
  addEmployee,
  removeEmployee,
  processLeave,
  getEmployees,
} from "../server/api/calls";

import { Leave, Message, User } from "../server/api/types";

type EmployerContext = {
  selectedEmployees: User[];
  nonSelectedEmployees: User[];
  isLoading: boolean;
  onAddEmployee: (user: User) => Promise<Message>;
  onRemoveEmployee: (user: User) => Promise<Message>;
  onGetEmployees: () => Promise<Message>;
  onProcessLeave: (user: User, judgment: Leave["status"]) => Promise<Message>;
};

export const EmployerContext = createContext<EmployerContext | undefined>(
  undefined
);

type EmployerProviderProps = PropsWithChildren;

export function EmployerProvider({ children }: EmployerProviderProps) {
  const [selectedEmployees, setSelectedEmployees] = useState<User[]>([]);
  const [nonSelectedEmployees, setNonSelectedEmployees] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function onAddEmployee(user: User): Promise<Message> {
    setIsLoading(true);
    try {
      const [, data] = await addEmployee(user);

      const { addedEmployee } = data;

      setSelectedEmployees([...selectedEmployees, addedEmployee]);

      const filteredNonSelectedEmployees = nonSelectedEmployees.filter(
        employee => employee.id !== addedEmployee.id
      );

      setNonSelectedEmployees(filteredNonSelectedEmployees);

      setIsLoading(false);

      return { code: "OK", body: "Employee added to organization" };
    } catch {
      setIsLoading(false);

      return { code: "FAIL", body: "Could not add employee" };
    }
  }

  async function onRemoveEmployee(user: User): Promise<Message> {
    setIsLoading(true);
    try {
      const [, data] = await removeEmployee(user);

      const { removedEmployee } = data;

      setNonSelectedEmployees([...nonSelectedEmployees, removedEmployee]);

      const filteredSelectedEmployees = selectedEmployees.filter(
        employee => employee.id !== removedEmployee.id
      );

      setSelectedEmployees(filteredSelectedEmployees);

      setIsLoading(false);

      return { code: "OK", body: "Employee removed from organization" };
    } catch {
      setIsLoading(false);
      return { code: "FAIL", body: "Could not remove employee" };
    }
  }

  async function onGetEmployees(): Promise<Message> {
    try {
      const [, { employees }] = await getEmployees();

      const selectedEmployees = employees.filter(employee => employee.selected);

      const nonSelectedEmployees = employees.filter(
        employee => !employee.selected
      );

      setSelectedEmployees(selectedEmployees);
      setNonSelectedEmployees(nonSelectedEmployees);

      return { code: "OK", body: "Employees fetched" };
    } catch {
      return { code: "FAIL", body: "Failed to fetch employees" };
    }
  }

  async function onProcessLeave(
    user: User,
    judgment: Leave["status"]
  ): Promise<Message> {
    setIsLoading(true);
    try {
      await processLeave(user, judgment);

      await onGetEmployees();

      setIsLoading(false);
      return { code: "OK", body: "Leave processed" };
    } catch {
      setIsLoading(false);

      return { code: "FAIL", body: "Leave could not be processed" };
    }
  }

  useEffect(() => {
    onGetEmployees();
  }, []);

  return (
    <EmployerContext.Provider
      value={{
        selectedEmployees,
        nonSelectedEmployees,
        isLoading,
        onAddEmployee,
        onRemoveEmployee,
        onGetEmployees,
        onProcessLeave,
      }}
    >
      {children}
    </EmployerContext.Provider>
  );
}
