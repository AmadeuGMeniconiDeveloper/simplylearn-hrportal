export interface User {
  id: string;
  email: string;
  password: string;
  role: "employer" | "employee";
}
