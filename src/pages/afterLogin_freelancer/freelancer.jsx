import React from "react";
import ProjectsList from "../../components/afterLogin_freelancer/ProjectsList";
import Footer from "../../components/layout/footer";

export default function Freelancer() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <ProjectsList />
      </div>
      <Footer />
    </>
  );
}
