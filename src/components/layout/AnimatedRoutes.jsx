import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Freelancer from "../../pages/afterLogin_freelancer/freelancer";
import NavBar from "./navbar";
import Footer from "./footer";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <NavBar />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <NavBar />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/freelancer/dashboard"
          element={
            <>
              <NavBar />
              <Freelancer />
              <Footer />
            </>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
