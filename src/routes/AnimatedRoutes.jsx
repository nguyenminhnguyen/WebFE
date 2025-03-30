import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AnimatedPage from "../components/animated_pages"; // dùng bản chuẩn đã style
import NavBarWrapper from "../components/content-box/navbarWrapper";

// Pages
import HomePage from "../pages/HomePage_AuthPage/HomePage";
import AuthRegister from "../components/auth/AuthRegister";
import AuthLogin from "../components/auth/AuthLogin";
import ProjectsPage from "../pages/HomePage_AuthPage/ProjectsPage";
import ProjectsList from "../components/freelancer/ProjectsList";
import ClientRegister from "../components/auth/register/EmployerRegister";
import FreelancerRegister from "../components/auth/register/FreelancerRegister";
import Freelancer from "../pages/afterLogin_freelancer/freelancer";

export default function AnimatedRoutes() {
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
                <HomePage />
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
          path="/register/freelancer"
          element={
            <AnimatedPage>
              <NavBarWrapper />
              <div className="mx-[10vw]">
                <FreelancerRegister />
              </div>
            </AnimatedPage>
          }
        />
        <Route
          path="/register/employer"
          element={
            <AnimatedPage>
              <NavBarWrapper />
              <div className="mx-[10vw]">
                <ClientRegister />
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
          path="/freelancer/projects"
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
