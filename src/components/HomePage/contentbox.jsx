import React from 'react';
import { FaStar } from 'react-icons/fa';

export default function ContentBox({ title, subtitle, badge }) {
  const handleRipple = (e) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');

    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={handleRipple}
        className="relative bg-white min-h-[9rem] w-full rounded-2xl border border-gray-200 
                   flex flex-col justify-between p-4 
                   shadow-sm transition-all duration-300 ease-in-out 
                   hover:shadow-md hover:border-green-400 hover:-translate-y-1 
                   active:scale-95 group overflow-hidden"
      >

        {/* Border hover effect */}
        <span
          className="absolute inset-0 z-0 rounded-2xl border-2 border-transparent 
                     group-hover:border-transparent group-hover:bg-gradient-to-r 
                     group-hover:from-green-400 group-hover:to-emerald-500 
                     group-hover:blur-sm group-hover:opacity-20 
                     transition-all duration-300 pointer-events-none"
        />

        {/* Badge (đặt trong button nhưng trên nội dung) */}
        {badge && (
          <span className="absolute top-2 right-2 z-20 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow pointer-events-none">
            {badge}
          </span>
        )}

        {/* Nội dung */}
        <div className="relative z-10 flex flex-col h-full pt-6">
          <h3 className="font-semibold text-lg sm:text-xl text-left text-gray-800 group-hover:text-green-600 transition">
            {title}
          </h3>
          <div className="flex items-center text-sm text-gray-600 mt-auto group-hover:text-green-500 transition-all duration-300">
            <FaStar className="text-green-500" />
            <span className="ml-2">{subtitle}</span>
          </div>
        </div>
      </button>
    </div>
  );
}
