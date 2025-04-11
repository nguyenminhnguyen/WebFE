import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AnimatedPage from "../components/animation/animated_pages"; // dùng bản chuẩn đã style
import NavBarWrapper from "../components/layout/NavBarWrapper";
import ProtectedRoute from "../routes/ProtectedRoutes";

// Pages
import HomePage from "../pages/HomePage/HomePage";
import RegisterHandle from "../services/auth/register/RegisterHandle";
import LoginHandle from "../services/auth/login/LoginHandle";
import FreelancerLists from "../components/afterLogin_employer/FreelancerLists";
import ProjectsList from "../components/afterLogin_freelancer/ProjectsList";
import ClientRegister from "../services/auth/register/EmployerRegister";
import FreelancerRegister from "../services/auth/register/FreelancerRegister";
import Freelancer from "../pages/afterLogin_freelancer/freelancer";
import Employer from "../pages/afterLogin_employer/employer";
import JobPostForm from "../pages/afterLogin_employer/JobPost";
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
                <FreelancerLists />
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
            <AnimatedPage>
              <NavBarWrapper />
              <div className="mx-[10vw]">
                <Freelancer />
              </div>
            </AnimatedPage>
          }
        />

        <Route
          path="/employer/dashboard"
          element={
            <AnimatedPage>
              <NavBarWrapper />
              <div className="mx-[10vw]">
                <Employer />
              </div>
            </AnimatedPage>
          }
        />
        <Route
          path="/employer/jobpost"
          element={
            <AnimatedPage>
              <NavBarWrapper />
              <JobPostForm />
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
