import { Routes, Route } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { ProtectedRoute } from "./ProtectedRoute";
import { NotFound } from "../pages/404";
import { Home } from "../pages/Home";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
