import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from "./contexts/AuthProvider.tsx";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./routes/Router.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <Router />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
