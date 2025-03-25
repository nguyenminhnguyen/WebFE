import React from "react";
import { FaGoogle, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default function SocialButtons({ onClick }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <button
        onClick={() => onClick("google")}
        className="flex items-center justify-center w-full gap-3 border border-gray-300 rounded-lg py-2 px-4 hover:shadow-md hover:bg-red-50 transition text-sm font-medium"
      >
        <FaGoogle className="text-red-500 text-lg" />
        <span className="text-gray-700">Google</span>
      </button>
      <button
        onClick={() => onClick("facebook")}
        className="flex items-center justify-center w-full gap-3 border border-gray-300 rounded-lg py-2 px-4 hover:shadow-md hover:bg-blue-50 transition text-sm font-medium"
      >
        <FaFacebookF className="text-blue-600 text-lg" />
        <span className="text-gray-700">Facebook</span>
      </button>
      <button
        onClick={() => onClick("linkedin")}
        className="flex items-center justify-center w-full gap-3 border border-gray-300 rounded-lg py-2 px-4 hover:shadow-md hover:bg-blue-100 transition text-sm font-medium"
      >
        <FaLinkedinIn className="text-sky-700 text-lg" />
        <span className="text-gray-700">LinkedIn</span>
      </button>
    </div>
  );
}
