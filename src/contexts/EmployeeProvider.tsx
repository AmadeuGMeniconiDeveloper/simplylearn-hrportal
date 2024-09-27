import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { createLeave, getLeave } from "../server/api/calls";

import { Message, User } from "../server/api/types";
import { useAuth } from "../hooks/useAuth";

type EmployeeContext = {
  leave: User["leave"] | undefined;
  isLoading: boolean;
  onCreateLeave: (user: User, leaveReason: string) => Promise<Message>;
  onGetLeave: () => Promise<Message>;
};

export const EmployeeContext = createContext<EmployeeContext | undefined>(
  undefined
);

type EmployeeProviderProps = PropsWithChildren;

export function EmployeeProvider({ children }: EmployeeProviderProps) {
  const [leave, setLeave] = useState<User["leave"] | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const { loggedUser } = useAuth();

  async function onCreateLeave(
    user: User,
    leaveReason: string
  ): Promise<Message> {
    setIsLoading(true);
    try {
      await createLeave(user, leaveReason);

      await onGetLeave();

      setIsLoading(false);

      return { code: "OK", body: "Leave submited successfully." };
    } catch {
      setIsLoading(false);

      return { code: "FAIL", body: "Could not submit leave." };
    }
  }

  async function onGetLeave(): Promise<Message> {
    setIsLoading(true);
    try {
      const [, { leave }] = await getLeave(loggedUser!);

      setLeave(leave);

      setIsLoading(false);

      return { code: "OK", body: "Leave retreived successfully." };
    } catch {
      setIsLoading(false);

      return { code: "FAIL", body: "Could not get user's leave." };
    }
  }

  useEffect(() => {
    onGetLeave();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        leave,
        isLoading,
        onCreateLeave,
        onGetLeave,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}
