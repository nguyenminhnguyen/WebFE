import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "../components/Animated_Pages";
import Home from "../pages/Home";
import AuthRegister from "../components/auth/AuthRegister";
import AuthLogin from "../components/auth/AuthLogin";
import ProjectsPage from "../pages/ProjectsPage";
import FreelancerPage from "../pages/FreelancerPage";
import ClientRegister from "../components/auth/register/EmployerRegister";
import FreelancerRegister from "../components/auth/register/FreelancerRegister";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/register" element={<AnimatedPage><AuthRegister /></AnimatedPage>} />
        <Route path="/register/freelancer" element={<AnimatedPage><FreelancerRegister /></AnimatedPage>} />
        <Route path="/register/employer" element={<AnimatedPage><ClientRegister /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><AuthLogin /></AnimatedPage>} />
        <Route path="/projects" element={<AnimatedPage><ProjectsPage /></AnimatedPage>} />
        <Route path="/freelancer" element={<AnimatedPage><FreelancerPage /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}
