import React, { useEffect, useState } from "react";
import { getSalarySuggestion } from "../../../../api/salarySuggestion";
import { FaRobot } from "react-icons/fa";

const JobStep5 = ({ formData, setFormData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetSuggestion = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await getSalarySuggestion({
        title: formData.title,
        skills: formData.skills,
        experienceLevel: formData.experienceLevel,
        timeEstimation: formData.timeEstimation,
      });
      
      if (response.success) {
        setFormData((prev) => ({
          ...prev,
          minSalary: response.data.minSalary,
          maxSalary: response.data.maxSalary,
        }));
      } else {
        setError("Không thể lấy đề xuất mức lương. Vui lòng thử lại sau.");
      }
    } catch (err) {
      setError("Không thể lấy đề xuất mức lương. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-2/5">
        <h2 className="block text-3xl font-medium">
          Hãy cho chúng tôi biết về ngân sách của bạn
        </h2>
        <p className="mt-4 text-gray-700">
          Ngân sách của bạn sẽ ảnh hưởng đến chất lượng và phạm vi của dự án.
          Hãy đặt ngân sách hợp lý để thu hút các freelancer có kỹ năng phù hợp
          và đảm bảo dự án được hoàn thành đúng mong đợi!
        </p>
      </div>

      <div className="mb-4 ml-5 w-3/5 ml-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Xác định mức lương hợp lý</h3>
          <button
            onClick={handleGetSuggestion}
            disabled={isLoading || !formData.skills?.length || !formData.experienceLevel || !formData.timeEstimation}
            className="flex items-center gap-2 px-4 py-2 bg-[#14a800] text-white rounded-lg hover:bg-[#14a800]/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaRobot className="w-4 h-4" />
            {isLoading ? "Đang xử lý..." : "Đề xuất mức lương"}
          </button>
        </div>
        
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Từ</label>
            <input
              type="number"
              name="minSalary"
              value={formData.minSalary || ""}
              onChange={handleRangeChange}
              className="border rounded-lg p-2 w-32"
              placeholder="USD"
              min="0"
            />
          </div>

          <div className="flex flex-col ml-5">
            <label className="text-sm font-medium text-gray-700">Đến</label>
            <input
              type="number"
              name="maxSalary"
              value={formData.maxSalary || ""}
              onChange={handleRangeChange}
              className="border rounded-lg p-2 w-32"
              placeholder="USD"
              min="0"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobStep5;
