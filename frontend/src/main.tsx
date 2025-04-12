import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./_Global.scss";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { EmissionsProvider } from "./context/EmissionsContext";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}


createRoot(root).render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <AuthProvider>
        <EmissionsProvider>
          <App />
        </EmissionsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

