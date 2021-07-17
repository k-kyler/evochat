import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { RoomsProvider } from "./contexts/RoomsContext";

ReactDOM.render(
  <AuthProvider>
    <RoomsProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RoomsProvider>
  </AuthProvider>,
  document.getElementById("root")
);
