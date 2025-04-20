import React from "react";
import ProjectsList from "../../components/afterLogin_freelancer/ProjectsList";
import Footer from "../../components/layout/footer";
import NavBar from "../../components/layout/navbar";

export default function Freelancer() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50">
        <ProjectsList />
      </div>
      <Footer />
    </>
  );
}
