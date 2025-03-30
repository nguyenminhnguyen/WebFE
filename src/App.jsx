import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/content-box/NavBar";
import AnimatedRoutes from "./routes/AnimatedRoutes";

function App() {
  const bodyStyle = {
    marginLeft: "10vw",
    marginRight: "10vw",
  };

  return (
    <Router>
      <NavBar />
      <div style={bodyStyle}>
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
