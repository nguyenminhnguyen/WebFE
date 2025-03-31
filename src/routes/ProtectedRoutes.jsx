import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Giả lập kiểm tra đăng nhập (thay bằng context hoặc redux thật sau này)
// const isAuthenticated = () => {
//   return !localStorage.getItem('token'); // hoặc check auth state
// };

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    // Chưa đăng nhập → redirect đến login kèm ?dest
    return <Navigate to={`/login?dest=${location.pathname}`} replace />;
  }

  // Đã đăng nhập → cho hiển thị nội dung
  return children;
}
