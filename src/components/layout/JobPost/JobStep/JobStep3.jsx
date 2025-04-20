// JobStep3.js
import React from "react";

const JobStep3 = ({ formData, handleInputChange }) => {
  return (
    <>
      <div className="w-2/5 ">
        <h2 className="block text-3xl font-medium">
          Ước tính phạm vi công việc của bạn
        </h2>
        <p className="mt-4 text-gray-700">
          Việc mô tả rõ ràng phạm vi công việc sẽ giúp ứng viên hiểu rõ hơn về yêu cầu và nhiệm vụ cần thực hiện. Điều này sẽ giúp bạn thu hút những ứng viên phù hợp và đảm bảo họ có thể đáp ứng được yêu cầu công việc!
        </p>
      </div>
      <div className="mb-4 ml-5 w-3/5 ml-6">
        <h3 className="font-medium">
          Bạn dự đoán công việc này sẽ mất bao lâu để hoàn thành?
        </h3>
        <div className="mt-2 space-y-2 font-medium">
          <label className="flex items-center">
            <input
              type="radio"
              name="timeEstimation"
              value="1-2 tuần"
              checked={formData.timeEstimation === "1-2 tuần"}
              onChange={handleInputChange}
              className="mr-2 w-4 h-4 text-green-500 border-green-500 focus:ring-green-500"
            />
            1-2 tuần
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="timeEstimation"
              value="2-4 tuần"
              checked={formData.timeEstimation === "2-4 tuần"}
              onChange={handleInputChange}
              className="mr-2 w-4 h-4 text-green-500 border-green-500 focus:ring-green-500"
            />
            2-4 tuần
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="timeEstimation"
              value="1-3 tháng"
              checked={formData.timeEstimation === "1-3 tháng"}
              onChange={handleInputChange}
              className="mr-2 w-4 h-4 text-green-500 border-green-500 focus:ring-green-500"
            />
            1-3 tháng
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="timeEstimation"
              value="3-6 tháng"
              checked={formData.timeEstimation === "3-6 tháng"}
              onChange={handleInputChange}
              className="mr-2 w-4 h-4 text-green-500 border-green-500 focus:ring-green-500"
            />
            3-6 tháng
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="timeEstimation"
              value="trên 6 tháng"
              checked={formData.timeEstimation === "trên 6 tháng"}
              onChange={handleInputChange}
              className="mr-2 w-4 h-4 text-green-500 border-green-500 focus:ring-green-500"
            />
            Trên 6 tháng
          </label>
        </div>
        <h3 className="font-medium mt-5">
          Yêu cầu mức độ kinh nghiệm như thế nào cho công việc này?
        </h3>
        <div className="mt-2 space-y-2 font-medium">
          <label className="flex items-center">
            <input
              type="radio"
              name="experienceLevel"
              value="Cơ bản"
              checked={formData.experienceLevel === "Cơ bản"}
              onChange={handleInputChange}
              className="mr-2 w-4 h-4 text-green-500 border-green-500 focus:ring-green-500"
            />
            Cơ bản
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="experienceLevel"
              value="Khá"
              checked={formData.experienceLevel === "Khá"}
              onChange={handleInputChange}
              className="mr-2 w-4 h-4 text-green-500 border-green-500 focus:ring-green-500"
            />
            Khá
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="experienceLevel"
              value="Chuyên gia"
              checked={formData.experienceLevel === "Chuyên gia"}
              onChange={handleInputChange}
              className="mr-2 w-4 h-4 text-green-500 border-green-500 focus:ring-green-500"
            />
            Chuyên gia
          </label>
        </div>
      </div>
    </>
  );
};

export default JobStep3;
