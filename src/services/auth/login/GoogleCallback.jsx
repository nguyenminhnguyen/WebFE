import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connectSocket } from "../../../services/socket";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const userData = params.get("user");

        if (!token || !userData) {
          throw new Error("Không tìm thấy token hoặc thông tin người dùng");
        }

        // Giải mã token để lấy thông tin role và user
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        const userRole = tokenPayload.role;
        const userId = tokenPayload.user_id;
        console.log("Token payload:", tokenPayload);

        // Parse user data
        const user = JSON.parse(decodeURIComponent(userData));
        console.log("User data:", user);

        // Lưu thông tin vào localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        localStorage.setItem("user", JSON.stringify(user));

        // Kết nối socket
        connectSocket();

        // Chuyển hướng dựa vào role
        if (userRole === "freelancer") {
          navigate("/freelancer/dashboard");
        } else if (userRole === "employer") {
          navigate("/employer/dashboard");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Google callback error:", error);
        console.log("Đăng nhập thất bại. Vui lòng thử lại.");
        navigate("/login");
      }
    };

    handleGoogleCallback();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
}
