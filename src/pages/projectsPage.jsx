import React from "react";

const projects = [
  {
    id: 1,
    title: "Thiết kế website landing page cho công ty AI",
    description: "Cần một freelancer thiết kế giao diện hiện đại, responsive. Ưu tiên biết TailwindCSS.",
    budget: "$300 - $500",
    duration: "2 tuần",
    skills: ["UI/UX", "React", "Tailwind"],
    postedAt: "2 ngày trước",
  },
  {
    id: 2,
    title: "Viết nội dung blog về An toàn thông tin",
    description: "Tìm người có kiến thức cơ bản về cybersecurity để viết 5 bài blog, mỗi bài 800 từ.",
    budget: "$100 - $200",
    duration: "1 tuần",
    skills: ["Writing", "Cybersecurity"],
    postedAt: "5 ngày trước",
  },
  {
    id: 3,
    title: "Phát triển API cho ứng dụng mobile",
    description: "Back-end dev sử dụng Node.js và MongoDB. Dự án 1 tháng.",
    budget: "$800 - $1200",
    duration: "4 tuần",
    skills: ["Node.js", "MongoDB", "API"],
    postedAt: "1 ngày trước",
  },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dự án đang tuyển freelancer</h1>

      <div className="space-y-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold text-green-600">{project.title}</h2>
              <span className="text-sm text-gray-400">{project.postedAt}</span>
            </div>

            <p className="text-gray-700 mt-2">{project.description}</p>

            <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-500">
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                Ngân sách: {project.budget}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                Thời gian: {project.duration}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition text-sm font-medium">
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
