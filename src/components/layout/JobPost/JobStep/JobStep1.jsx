import React from "react";
import { categories } from "../../../../data/jobCategories";

const JobStep1 = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(cat => cat.id === e.target.value);
    setFormData((prev) => ({
      ...prev,
      category: selectedCategory.id,
      categoryName: selectedCategory.nameVi,
      suggestedSkills: selectedCategory.suggestedSkills,
      skills: [] // Reset skills when category changes
    }));
  };

  return (
    <>
      <div className="w-2/5">
        <h2 className="block text-3xl font-medium">
          Tiêu đề công việc
        </h2>
        <p className="mt-4 text-gray-700">
          Đặt tiêu đề công việc rõ ràng và hấp dẫn để thu hút các freelancer phù hợp.
        </p>
      </div>

      <div className="mb-4 ml-5 w-3/5 ml-6">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tiêu đề công việc
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14a800] focus:border-transparent"
            placeholder="Ví dụ: Cần thiết kế logo cho công ty công nghệ"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Danh mục công việc
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14a800] focus:border-transparent"
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nameVi} ({category.name})
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default JobStep1;