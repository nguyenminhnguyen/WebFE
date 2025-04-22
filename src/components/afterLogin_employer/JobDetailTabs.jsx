import React from "react";

const JobDetailTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b mb-6">
      <button
        className={`px-4 py-2 font-medium ${
          activeTab === "view"
            ? "text-green-600 border-b-2 border-green-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("view")}
      >
        Chi tiết công việc
      </button>
      <button
        className={`px-4 py-2 font-medium ${
          activeTab === "invite"
            ? "text-green-600 border-b-2 border-green-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("invite")}
      >
        Mời Freelancer
      </button>
      <button
        className={`px-4 py-2 font-medium ${
          activeTab === "proposals"
            ? "text-green-600 border-b-2 border-green-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("proposals")}
      >
        Yêu cầu ứng tuyển
      </button>
      <button
        className={`px-4 py-2 font-medium ${
          activeTab === "hired"
            ? "text-green-600 border-b-2 border-green-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("hired")}
      >
        Freelancer đã thuê
      </button>
    </div>
  );
};

export default JobDetailTabs; 