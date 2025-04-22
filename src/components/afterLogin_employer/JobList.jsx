// src/components/JobListSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function JobListSection({ loading, jobList }) {
  const navigate = useNavigate();
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <>
      <h2 className="text-2xl font-semibold mt-8">Bài đăng của bạn</h2>

      {loading ? (
        <p className="mt-4">Đang tải dữ liệu...</p>
      ) : jobList.length === 0 ? (
        <div className="flex flex-col items-center w-full h-[300px] mt-8 border rounded-xl border-gray-400">
          <div className="bg-black">
            <img
              src="/img/briefcase.jpg"
              alt="Briefcase picture"
              className="w-[140px] h-auto"
            />
          </div>
          <p className="mb-5">Bạn chưa có bài đăng công việc nào.</p>
          <button
            onClick={() => navigate("/employer/JobPost")}
            className="bg-white hover:bg-gray-100 border border-green-700 rounded-xl p-2 text-green-700"
          >
            Đăng công việc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8">
          {jobList.map((job) => (
            <div
              key={job._id}
              className="border border-gray-300 rounded-xl p-4 shadow hover:shadow-md transition hover:bg-gray-100"
            >
              <h3 className="text-xl font-semibold">
                {truncateText(job.title, 70)}
              </h3>
              <div className="flex justify-around mt-2">
                <div className="flex flex-col items-center">
                  <p className="text-gray-500 ">Mức lương</p>
                  <p>
                    {job.minSalary} - {job.maxSalary} USD
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-gray-500">Kinh nghiệm </p>
                  <p> {job.experienceLevel}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-gray-500">Thời gian </p>
                  <p> {job.timeEstimation}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-gray-500">Địa điểm ưu tiên</p>
                  <p> {job.location}</p>
                </div>
              </div>
              <p className=" mt-2">{truncateText(job.description, 150)}</p>
              <div className="mt-4 mb-4 flex flex-wrap gap-1">
                {job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full "
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <button
                onClick={() => navigate(`/employer/job/${job._id}`)}
                className="bg-green-600 hover:bg-green-500 rounded-xl p-2 text-white mt-2"
              >
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}