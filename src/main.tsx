import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // PASTIKAN INI DI-IMPORT
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* BrowserRouter HARUS membungkus App */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
