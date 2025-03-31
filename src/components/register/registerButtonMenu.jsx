import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Register()
{
  const navigate = useNavigate();

  const handleGoRegister = () => {
    console.log('redirecting...');
    navigate('/register');
  };
    return(
        <>
        <button onClick={handleGoRegister} className="text-white bg-green-700 px-4 py-2 rounded-xl hover:bg-green-600" >
          Đăng ký
        </button>

      </>
    );

}