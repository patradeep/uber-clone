import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import UserContext from "./context/UserContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import CaptainContext from "./context/CaptionContext.jsx";
import SocketProvider from "./context/socketContext.jsx";

createRoot(document.getElementById("root")).render(
  <CaptainContext>
    <UserContext>
      <SocketProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </SocketProvider>
    </UserContext>
  </CaptainContext>
);
