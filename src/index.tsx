import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { RoomsProvider } from "./contexts/RoomsContext";
import { SelectedRoomIdProvider } from "./contexts/SelectedRoomIdContext";

ReactDOM.render(
  <AuthProvider>
    <RoomsProvider>
      <SelectedRoomIdProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </SelectedRoomIdProvider>
    </RoomsProvider>
  </AuthProvider>,
  document.getElementById("root")
);
