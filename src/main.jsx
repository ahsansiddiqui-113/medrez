import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ScheduleProvider } from "./component/context/ScheduleContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScheduleProvider>
      <App />
    </ScheduleProvider>
  </StrictMode>
);
