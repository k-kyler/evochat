import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { RoomsProvider } from "./contexts/RoomsContext";
import { UsersProvider } from "./contexts/UsersContext";

ReactDOM.render(
  <AuthProvider>
    <RoomsProvider>
      <UsersProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UsersProvider>
    </RoomsProvider>
  </AuthProvider>,
  document.getElementById("root")
);
