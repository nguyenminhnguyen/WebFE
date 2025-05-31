import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectsList from "../../components/afterLogin_freelancer/ProjectsList";
import Footer from "../../components/layout/footer";

export default function RecommendedJobsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "freelancer") {
      console.warn("Không tìm thấy token hoặc role không hợp lệ");
      navigate("/login");
      return;
    }
  }, [navigate]);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <ProjectsList isRecommended={true} />
      </div>
      <Footer />
    </>
  );
}
