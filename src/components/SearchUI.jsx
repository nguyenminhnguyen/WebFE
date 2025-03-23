import React, { useState } from "react";

function SearchUI() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("talent"); // "talent" hoặc "jobs"

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý tìm kiếm ở đây
    console.log("Tìm kiếm:", searchTerm);
  };

  const handleJobSearch = () => {
    // Điều hướng đến trang công việc
    window.location.href = "/jobs"; // Thay đổi đường dẫn theo yêu cầu
  };

  return (
    <div className="relative bg-[url('/SSearch.jpg')] bg-cover bg-center w-full h-140 max-w-7xl rounded-3xl shadow-lg mt-5">
      <div className="absolute top-0 left-0 p-10 text-white max-w-[60%] break-words">
        <h2 className="text-6xl font-bold text-shadow">
          Kết nối doanh nghiệp với các freelancer chất lượng
        </h2>
        <div className="mt-8">
          <div className="bg-black bg-opacity-60 p-6 rounded-lg shadow-lg">
            <div className="flex space-x-4 mb-8">
              <button
                onClick={() => setSelectedOption("talent")}
                className={`flex-1 p-4 rounded-full font-medium ${
                  selectedOption === "talent"
                    ? "bg-green-600 text-white"
                    : "bg-gray-300"
                }`}
              >
                Tìm kiếm chuyên gia
              </button>
              <button
                onClick={() => setSelectedOption("jobs")}
                className={`flex-1 p-4 rounded-full font-medium ${
                  selectedOption === "jobs"
                    ? "bg-green-600 text-white"
                    : "bg-gray-300"
                }`}
              >
                Tìm kiếm công việc
              </button>
            </div>

            {selectedOption === "talent" && (
              <form onSubmit={handleSubmit} className="flex items-center">
                <div className="flex items-center w-full text-black">
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo vai trò, kĩ năng, từ khóa"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="basis-3/4 p-2 border border-gray-300 rounded-l-full focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="basis-1/4 p-2 bg-green-600 text-white rounded-r-full hover:bg-green-500 flex items-center"
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488.4 488.4"
                      className="ml-3"
                    >
                      <g>
                        <path
                          d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6
                                                    s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2
                                                    S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7
                                                    S381.9,104.65,381.9,203.25z"
                        />
                      </g>
                    </svg>
                    <span className="flex-1 text-center font-medium">
                      Tìm kiếm
                    </span>
                  </button>
                </div>
              </form>
            )}

            {selectedOption === "jobs" && (
              <div className="text-center">
                <p className="text-lg break-words w-3/4 mx-auto">
                  Xây dựng sự nghiệp freelancer của bạn với Freelancer AI. Với
                  hàng nghìn công việc được đăng lên mỗi ngày.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={handleJobSearch}
                    className="mt-4 p-2 bg-green-600 text-white rounded-lg hover:bg-green-500 font-medium"
                  >
                    Khám phá các công việc mới nhất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchUI;
