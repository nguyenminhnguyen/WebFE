import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AnimatedPage from "../components/animation/animated_pages"; // dùng bản chuẩn đã style
import NavBarWrapper from "../components/layout/NavBarWrapper";
import ProtectedRoute from "../routes/ProtectedRoutes";
import NavBar from "../components/layout/navbar";
// Pages
import HomePage from "../pages/HomePage/HomePage";
import RegisterHandle from "../services/auth/register/RegisterHandle";
import LoginHandle from "../services/auth/login/LoginHandle";
import FreelancerLists from "../components/afterLogin_employer/FreelancerLists";
import ProjectsList from "../components/afterLogin_freelancer/ProjectsList";
import ClientRegister from "../services/auth/register/EmployerRegister";
import FreelancerRegister from "../services/auth/register/FreelancerRegister";
import Freelancer from "../pages/afterLogin_freelancer/freelancer";
import Profile from "../components/afterLogin_freelancer/Profile";
import Employer from "../pages/afterLogin_employer/employer";
import JobPostForm from "../pages/afterLogin_employer/JobPost";
import PaymentReturn from "../pages/PaymentReturn";
import EmployerInfo from "../pages/info/EmployerInfo";
import FreelancerInfo from "../pages/info/FreelancerInfo";
import JobDetail from "../pages/afterLogin_employer/JobDetail";
import GoogleCallback from "../services/auth/login/GoogleCallback";

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
            <ProtectedRoute>
              <AnimatedPage>
                <NavBar />
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
                  <Employer />
                </div>
              </AnimatedPage>
            </ProtectedRoute>
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
        <Route
          path="/employer/job/:id"
          element={
            <AnimatedPage>
              <NavBarWrapper />
              <JobDetail />
            </AnimatedPage>
          }
        />
        <Route
          path="/payment/return"
          element={
            <AnimatedPage>
              <NavBarWrapper />
              <PaymentReturn />
            </AnimatedPage>
          }
        />

        <Route
          path="/freelancer/profile"
          element={
            <ProtectedRoute>
              <AnimatedPage>
                <NavBar />
                <div className="mx-[10vw]">
                  <Profile />
                </div>
              </AnimatedPage>
            </ProtectedRoute>
          }
        />

        <Route
          path="/info/employer"
          element={
            <AnimatedPage>
              <NavBarWrapper />
              <EmployerInfo />
            </AnimatedPage>
          }
        />

        <Route
          path="/info/freelancer"
          element={
            <AnimatedPage>
              <NavBarWrapper />
              <FreelancerInfo />
            </AnimatedPage>
          }
        />
         <Route path="/freelancer/callback" element={<GoogleCallback />} />
        <Route path="/employer/callback" element={<GoogleCallback />} />
        
      </Routes>
    </AnimatePresence>
  );
}
