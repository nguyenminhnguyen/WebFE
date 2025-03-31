import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleGoLogin = () => {
    console.log('redirecting...');
    navigate('/login');
  };
  return (
    <>
    <button
      onClick={handleGoLogin}
      className="text-black py-2 hover:text-green-700"
    >
      Đăng nhập
    </button>
  </>
  );
}