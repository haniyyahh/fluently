// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import RealtimeUI from "./RealtimeUI";
import "./style.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RealtimeUI />
    </React.StrictMode>
  );
}
