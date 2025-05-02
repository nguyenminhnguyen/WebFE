import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log("Auth Check - Token:", token);
  console.log("Auth Check - Role:", role);
  return !!token && !!role;
};

const getUserRole = () => {
  const role = localStorage.getItem("role");
  console.log("Get User Role:", role);
  return role;
};

const isFreelancerRoute = (path) => {
  const isFreelancer = path.startsWith("/freelancer/");
  console.log("Is Freelancer Route:", isFreelancer, "Path:", path);
  return isFreelancer;
};

const isEmployerRoute = (path) => {
  const isEmployer = path.startsWith("/employer/");
  console.log("Is Employer Route:", isEmployer, "Path:", path);
  return isEmployer;
};

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const userRole = getUserRole();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsValidating(false);
        setIsValid(false);
        return;
      }

      try {
        // Gọi API để validate token
        await axios.get("http://localhost:3000/api/auth/validate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsValid(true);
      } catch (error) {
        console.error("Token validation failed:", error);
        // Xóa token không hợp lệ
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, []);

  console.log("Protected Route - Current Path:", location.pathname);
  console.log("Protected Route - User Role:", userRole);
  console.log("Protected Route - Is Validating:", isValidating);
  console.log("Protected Route - Is Valid:", isValid);

  if (isValidating) {
    return <div>Đang kiểm tra đăng nhập...</div>;
  }

  if (!isValid || !isAuthenticated()) {
    console.log("Not authenticated or token invalid, redirecting to login");
    return <Navigate to={`/login?dest=${location.pathname}`} replace />;
  }

  if (isFreelancerRoute(location.pathname) && userRole !== "freelancer") {
    console.log("Freelancer route but not freelancer role, redirecting to home");
    return <Navigate to="/" replace />;
  }

  if (isEmployerRoute(location.pathname) && userRole !== "employer") {
    console.log("Employer route but not employer role, redirecting to home");
    return <Navigate to="/" replace />;
  }

  console.log("Access granted to route:", location.pathname);
  return children;
}
