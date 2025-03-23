import React from 'react';
import Login_Modal from './modal/login';
import Register_Modal from './modal/register';

function NavBar(){
    return (
        <nav className="bg-white p-4 flex justify-between sticky top-0 z-50 ">
            <div className="flex space-x-4">
            <h1 className="text-2xl font-bold" >Freelancer AI</h1>
            <ul className="flex space-x-4">
                <li>
                    <a href="/" className="text-black hover:text-green-700">Trang chủ</a>
                </li>
                <li>
                    <a href="/project" className="text-black hover:text-green-700">Dự án</a>
                </li>
                <li>
                    <a href="/freelancer" className="text-black hover:text-green-700">Freelancer</a>
                </li>
            </ul>
            </div>
            <div className="flex space-x-4">                    
                    <Login_Modal/>
                    <Register_Modal/>
            </div>
        </nav>
    )
}
export default NavBar