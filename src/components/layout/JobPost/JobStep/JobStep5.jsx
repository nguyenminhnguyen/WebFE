import React, { useEffect } from "react";

const JobStep5 = ({ formData, setFormData }) => {
  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      // Gộp lại thành salary nếu có đủ cả 2 giá trị
      if (updated.salaryFrom && updated.salaryTo) {
        updated.salary = `${updated.salaryFrom} - ${updated.salaryTo}`;
      } else {
        updated.salary = "";
      }

      return updated;
    });
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
        <h3 className="font-medium mb-2">Xác định mức lương hợp lý</h3>
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Từ</label>
            <input
              type="number"
              name="salaryFrom"
              value={formData.salaryFrom || ""}
              onChange={handleRangeChange}
              className="border rounded-lg p-2 w-32"
              placeholder="USD"
            />
            <span className="text-sm text-gray-500 mt-1">/USD</span>
          </div>

          <div className="flex flex-col ml-5">
            <label className="text-sm font-medium text-gray-700">Đến</label>
            <input
              type="number"
              name="salaryTo"
              value={formData.salaryTo || ""}
              onChange={handleRangeChange}
              className="border rounded-lg p-2 w-32"
              placeholder="USD"
            />
            <span className="text-sm text-gray-500 mt-1">/USD</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobStep5;
