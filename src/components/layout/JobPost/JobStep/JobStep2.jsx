// JobStep2.jsx
import React from "react";
import CreatableSelect from 'react-select/creatable';
import { FaTimes } from 'react-icons/fa';

const JobStep2 = ({ formData, setFormData }) => {
  const MAX_SKILLS = 10;

  const handleSkillChange = (newValue) => {
    if (newValue && newValue.length > MAX_SKILLS) {
      return; // Không cho phép thêm nếu đã đạt giới hạn
    }
    setFormData((prev) => ({
      ...prev,
      skills: newValue ? newValue.map(option => option.value) : []
    }));
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // Chuyển đổi danh sách kỹ năng thành định dạng cho react-select
  const suggestedSkillsOptions = formData.suggestedSkills?.map(skill => ({
    value: skill,
    label: skill
  })) || [];

  // Chuyển đổi kỹ năng đã chọn thành định dạng cho react-select
  const selectedSkillsOptions = formData.skills?.map(skill => ({
    value: skill,
    label: skill
  })) || [];

  return (
    <>
      <div className="w-2/5">
        <h2 className="block text-3xl font-medium">
          Kỹ năng cần thiết cho công việc
        </h2>
        <p className="mt-4 text-gray-700">
          Chọn các kỹ năng cần thiết cho công việc của bạn. Điều này sẽ giúp
          thu hút các freelancer phù hợp và giúp AI đề xuất mức lương chính xác hơn.
        </p>
      </div>

      <div className="mb-4 ml-5 w-3/5 ml-6">
        <div className="mb-4">
          <h3 className="font-medium mb-2">Danh mục đã chọn: {formData.categoryName}</h3>
          <p className="text-sm text-gray-500 mb-4">
            Chọn hoặc nhập các kỹ năng phù hợp với công việc của bạn (tối đa {MAX_SKILLS} kỹ năng)
          </p>
          
          <div className="mb-4">
            <CreatableSelect
              isMulti
              value={selectedSkillsOptions}
              onChange={handleSkillChange}
              options={suggestedSkillsOptions}
              placeholder="Chọn hoặc nhập kỹ năng..."
              className="text-sm"
              classNamePrefix="select"
              formatCreateLabel={(inputValue) => `Tạo kỹ năng "${inputValue}"`}
              noOptionsMessage={() => "Không tìm thấy kỹ năng phù hợp"}
              isClearable
              isDisabled={formData.skills?.length >= MAX_SKILLS}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: '#e5e7eb',
                  '&:hover': {
                    borderColor: '#14a800'
                  }
                }),
                multiValue: (base) => ({
                  ...base,
                  display: 'none' // Ẩn các kỹ năng đã chọn trong dropdown
                })
              }}
            />
            {formData.skills?.length >= MAX_SKILLS && (
              <p className="text-sm text-red-500 mt-2">
                Bạn đã đạt đến giới hạn {MAX_SKILLS} kỹ năng. Vui lòng xóa một số kỹ năng để thêm kỹ năng mới.
              </p>
            )}
          </div>

          {formData.skills?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">
                Kỹ năng đã chọn ({formData.skills.length}/{MAX_SKILLS}):
              </h4>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-[#14a800]/10 text-[#14a800] rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <FaTimes className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default JobStep2;
