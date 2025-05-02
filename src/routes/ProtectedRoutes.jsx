import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // đúng nghĩa: có token thì mới là đã login
};

const getUserRole = () => {
  return localStorage.getItem("role");
};

const isFreelancerRoute = (path) => {
  return path.startsWith("/freelancer/");
};

const isEmployerRoute = (path) => {
  return path.startsWith("/employer/");
};

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const userRole = getUserRole();

  if (!isAuthenticated()) {
    // Chưa đăng nhập → redirect đến login kèm ?dest
    return <Navigate to={`/login?dest=${location.pathname}`} replace />;
  }

  // Kiểm tra quyền truy cập dựa trên role
  if (isFreelancerRoute(location.pathname) && userRole !== "freelancer") {
    // Nếu là route của freelancer nhưng user không phải freelancer
    return <Navigate to="/" replace />;
  }

  if (isEmployerRoute(location.pathname) && userRole !== "employer") {
    // Nếu là route của employer nhưng user không phải employer
    return <Navigate to="/" replace />;
  }

  // Đã đăng nhập và có quyền truy cập → cho hiển thị nội dung
  return children;
}
