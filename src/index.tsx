import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { OptionProvider } from "./contexts/OptionContext";
import { RoomsProvider } from "./contexts/RoomsContext";

ReactDOM.render(
  <AuthProvider>
    <OptionProvider>
      <RoomsProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </RoomsProvider>
    </OptionProvider>
  </AuthProvider>,
  document.getElementById("root")
);
