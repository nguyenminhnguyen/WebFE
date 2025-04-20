import React, { useState } from "react";

const JobStep6 = ({ formData, setFormData, handleInputChange }) => {
  return (
    <>
      <div className="w-2/5">
        <h2 className="block text-3xl font-medium">
          Giúp freelancer hiểu rõ dự án của bạn
        </h2>
        <p className="mt-4 text-gray-700">
          Mô tả chi tiết yêu cầu công việc sẽ giúp freelancer hiểu rõ nhiệm vụ
          và đáp ứng mong đợi của bạn. Hãy liệt kê cụ thể các kỹ năng, công
          nghệ, và mục tiêu của dự án để thu hút ứng viên phù hợp nhất!
        </p>
      </div>
      <div className="mb-4 ml-5 w-3/5 ml-6">
        <h3 className="font-medium mb-2">Mô tả yêu cầu của bạn</h3>
        <textarea
          className="mt-4 w-full border rounded-lg p-3 text-gray-800"
          rows={15}
          placeholder="Nhập mô tả chi tiết về công việc bạn cần freelancer thực hiện..."
          name="jobDescription"
          value={formData.description || ""}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>
    </>
  );
};

export default JobStep6;
