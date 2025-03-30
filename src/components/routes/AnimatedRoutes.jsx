import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import NavBarWrapper from "../content-box/navbarWrapper";
import Home from "../../pages/HomePage_AuthPage/HomePage";
import AuthRegister from "../auth/AuthRegister";
import AuthLogin from "../auth/AuthLogin";
import ProjectsPage from "../../pages/HomePage_AuthPage/ProjectsPage";
import Freelancer from "../../pages/afterLogin_freelancer/freelancer";

import AnimatedPage from "../animated_pages";
import ProjectsList from "../freelancer/ProjectsList";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <NavBarWrapper />
              <div className="mx-[10vw]">
                <Home />
              </div>
            </AnimatedPage>
          }
        />
        <Route
          path="/register"
          element={
            <AnimatedPage>
              <NavBarWrapper />
              <div className="mx-[10vw]">
                <AuthRegister />
              </div>
            </AnimatedPage>
          }
        />
        <Route
          path="/login"
          element={
            <AnimatedPage>
              <NavBarWrapper />
              <div className="mx-[10vw]">
                <AuthLogin />
              </div>
            </AnimatedPage>
          }
        />
        <Route
          path="/projects"
          element={
            <AnimatedPage>
              <NavBarWrapper />
              <div className="mx-[10vw]">
                <ProjectsPage />
              </div>
            </AnimatedPage>
          }
        />
        <Route
          path="/freelancer"
          element={
            <AnimatedPage>
              <NavBarWrapper />
              <div className="mx-[10vw]">
                <ProjectsList />
              </div>
            </AnimatedPage>
          }
        />
        <Route
          path="/login/freelancer"
          element={
            <AnimatedPage>
              <NavBarWrapper />
              <div className="mx-[10vw]">
                <Freelancer />
              </div>
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
