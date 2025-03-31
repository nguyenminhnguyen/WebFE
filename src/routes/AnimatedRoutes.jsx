import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AnimatedPage from "../components/animated_pages"; // dùng bản chuẩn đã style
import NavBarWrapper from "../components/NavBarWrapper";
import ProtectedRoute from "./ProtectedRoutes";

// Pages
import HomePage from "../services/pages/HomePage/HomePage";
import RegisterHandle from "../services/auth/register/RegisterHandle";
import LoginHandle from "../services/auth/login/LoginHandle";
import ProjectsPage from "../services/pages/HomePage/FreelancerLists";
import ProjectsList from "../services/pages/afterLogin_freelancer/ProjectsList";
import ClientRegister from "../services/auth/register/EmployerRegister";
import FreelancerRegister from "../services/auth/register/FreelancerRegister";
import Freelancer from "../services/pages/afterLogin_freelancer/freelancer";

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
                <RegisterHandle />
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
                <LoginHandle />
              </div>
            </AnimatedPage>
          }
        />
        <Route
          path="/employer"
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
          path="/freelancer/dashboard"
          element={
            <ProtectedRoute>
              <AnimatedPage>
                <NavBarWrapper />
                <div className="mx-[10vw]">
                  <Freelancer />
                </div>
              </AnimatedPage>
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/dashboard"
          element={
            <ProtectedRoute>
              <AnimatedPage>
                <NavBarWrapper />
                <div className="mx-[10vw]">
                  <Freelancer />
                </div>
              </AnimatedPage>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
