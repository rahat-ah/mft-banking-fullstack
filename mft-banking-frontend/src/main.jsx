import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./contextApi/userContext.jsx";
import { AuthProvider } from "./contextApi/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
);
