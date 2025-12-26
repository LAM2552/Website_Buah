import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { FruitQueueProvider } from './context/FruitQueueContext'
import { OrderQueueProvider } from './context/OrderQueueContext'

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FruitQueueProvider>
      <OrderQueueProvider>
        <App />
      </OrderQueueProvider>
    </FruitQueueProvider>
  </React.StrictMode>
);
