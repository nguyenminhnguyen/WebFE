import React from "react";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./routes/AnimatedRoutes";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
