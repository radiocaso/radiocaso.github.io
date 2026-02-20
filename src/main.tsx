import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@/context/theme/ThemeProvider";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
