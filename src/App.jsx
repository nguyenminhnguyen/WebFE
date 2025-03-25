import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/content-box/navbar";
import Home from "./pages/Home";
import AuthRegister from "./components/auth/AuthRegister";
import AuthLogin from "./components/auth/AuthLogin";
import "./styles/App.css";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "./components/animated_pages";
import ProjectsPage from "./pages/projectsPage";
import FreelancerPage from "./pages/freelancerPage";

// 👇 Bọc AnimatePresence ở component con dùng location
function AnimatedRoutes() {
  const location = useLocation();
  console.log(location);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <Home />
            </AnimatedPage>
          }
        />
        <Route
          path="/register"
          element={
            <AnimatedPage>
              <AuthRegister />
            </AnimatedPage>
          }
        />
        <Route
          path="/login"
          element={
            <AnimatedPage>
              <AuthLogin />
            </AnimatedPage>
          }
        />
        <Route
          path="/projects"
          element={
            <AnimatedPage>
              <ProjectsPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/freelancer"
          element={
            <AnimatedPage>
              <FreelancerPage />
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

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
