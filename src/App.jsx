import React from "react";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./routes/AnimatedRoutes";
import { AuthProvider } from "./context/AuthContext";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AnimatedRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
