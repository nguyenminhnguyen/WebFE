import React from "react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaUserFriends,
  FaBuilding,
} from "react-icons/fa";

const JobCard = ({ job, index, currentPage, jobsPerPage, onViewDetails }) => {
  const getJobNumber = (index) => {
    return (currentPage - 1) * jobsPerPage + index + 1;
  };

  return (
    <div
      onClick={() => onViewDetails(job)}
      className="bg-white rounded-lg border border-gray-200 hover:border-[#14a800] hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center">
              <span className="text-gray-500 mr-2"></span>
              <h2 className="text-xl font-semibold text-gray-900 hover:text-[#14a800]">
                {job.title}
              </h2>
            </div>
            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                {job.location}
              </span>
              <span className="flex items-center">
                <FaClock className="w-4 h-4 mr-1" />
                {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-[#14a800] bg-[#14a800]/10 rounded-full">
              ${job.minSalary?.toLocaleString()} - $
              {job.maxSalary?.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-600 line-clamp-2">{job.description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm text-[#14a800] bg-[#14a800]/10 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <FaUserFriends className="w-4 h-4 mr-1" />
              {job.appliedCount || 0} ứng viên
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <FaBuilding className="w-4 h-4 mr-1" />
              {job.employer.companyName}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(job);
            }}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-[#14a800] text-white hover:bg-[#108a00]"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
