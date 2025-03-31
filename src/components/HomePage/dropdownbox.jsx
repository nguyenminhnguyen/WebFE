import React, { useState } from 'react';
import { FaUserTie, FaBriefcase } from 'react-icons/fa';

const options = [
  {
    label: 'Freelancer',
    icon: <FaUserTie className="text-green-600 text-lg mr-2" />,
    description: 'Tìm chuyên gia phù hợp cho dự án của bạn',
  },
  {
    label: 'Công việc',
    icon: <FaBriefcase className="text-green-600 text-lg mr-2" />,
    description: 'Tìm kiếm các công việc đang tuyển',
  },
];

export default function SearchDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center bg-white border border-gray-300 px-3 py-1 rounded-full shadow-sm text-sm hover:bg-gray-100 transition"
      >
        {selected.icon}
        {selected.label}
      </button>

      {open && (
        <div className="absolute top-full mt-2 w-60 right-0 bg-white rounded-lg shadow-lg z-50 border border-gray-200 overflow-hidden">
          {options.map((option) => (
            <div
              key={option.label}
              className="flex items-start px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
            >
              {option.icon}
              <div>
                <div className="font-medium">{option.label}</div>
                <p className="text-xs text-gray-500">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
