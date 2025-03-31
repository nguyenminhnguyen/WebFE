import React, { useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa";

const freelancers = [
  {
    id: 1,
    name: "Nguyen Van A",
    title: "Frontend Developer",
    avatar: "/avatar1.png",
    skills: ["React", "Tailwind", "JavaScript"],
    rating: 4.8,
    description: "Chuyên phát triển UI/UX mượt mà với React và Tailwind CSS.",
  },
  {
    id: 2,
    name: "Tran Thi B",
    title: "AI Engineer",
    avatar: "/avatar2.png",
    skills: ["Python", "Machine Learning", "TensorFlow"],
    rating: 4.9,
    description: "Xây dựng hệ thống đề xuất thông minh và chatbot AI.",
  },
  // Thêm freelancer khác nếu cần
];

export default function FreelancerLists() {
  const [search, setSearch] = useState("");

  const filtered = freelancers.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.skills.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Danh sách Freelancer
      </h2>

      {/* Search bar */}
      <div className="relative mb-6 max-w-md">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm kiếm freelancer theo kỹ năng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-400 focus:outline-none text-sm"
        />
      </div>

      {/* List freelancers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((f) => (
          <div
            key={f.id}
            className="p-4 bg-white rounded-xl shadow hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-4">
              <img
                src={f.avatar}
                alt={f.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {f.name}
                </h3>
                <p className="text-sm text-gray-500">{f.title}</p>
                <div className="flex items-center text-yellow-500 text-sm mt-1">
                  <FaStar className="mr-1" />
                  {f.rating}
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-700">{f.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {f.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
