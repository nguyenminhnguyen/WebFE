// JobStep2.jsx
import React, { useState } from "react";

const JobStep2 = ({ formData, setFormData }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      inputValue.trim() !== "" &&
      formData.skills.length < 10
    ) {
      const newSkill = inputValue.trim();
      const updatedSkills = [...formData.skills, newSkill];
      setFormData({
        ...formData,
        skills: updatedSkills,
      });
      console.log("Kỹ năng đã thêm:", newSkill);
      console.log("Danh sách kỹ năng sau khi thêm:", updatedSkills);
      setInputValue(""); // Reset input sau khi thêm kỹ năng
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updatedSkills });
  };

  return (
    <>
      <div className="w-2/5">
        <h2 className="block text-3xl font-medium">
          Những kỹ năng cần thiết cho công việc của bạn là gì
        </h2>
        <p className="mt-4 text-gray-700">
          Việc liệt kê các kỹ năng quan trọng sẽ giúp bạn thu hút những
          ứng viên có năng lực phù hợp. Hãy chọn những kỹ năng quan trọng
          nhất để đảm bảo ứng viên hiểu rõ yêu cầu công việc!
        </p>
      </div>
      <div className="mb-4 ml-5 w-3/5 ml-6">
        <h3 className="font-medium">Tìm kiếm hoặc tự thêm tối đa 10 kỹ năng</h3>
        <input
          type="text"
          name="skills"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="mt-2 p-2 w-full border border-gray-500 rounded-md"
          placeholder="Nhập kỹ năng công việc yêu cầu"
        />
        <p className="mt-2">Để có kết quả tốt nhất, hãy thêm 3-5 kỹ năng</p>
        <div className="mt-4">
          <h3 className="font-medium mt-1">Các kỹ năng đã chọn</h3>
          <div className="flex flex-wrap gap-2 mt-2 w-4/5">
            {Array.isArray(formData.skills) &&
              formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-700 text-white rounded-full flex items-center"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(index)}
                    className="ml-2 text-white font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobStep2;
