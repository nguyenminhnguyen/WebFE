import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const ViewJobContent = ({ job, id }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedJobData, setEditedJobData] = useState(job);

  // Update editedJobData when job prop changes (e.g., after saving)
  useEffect(() => {
    setEditedJobData(job);
  }, [job]);

  const handleEditClick = () => {
    setIsEditing(true);
    // Copy current job data to editedJobData state
    setEditedJobData(job);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Discard changes by resetting editedJobData to original job data
    setEditedJobData(job);
  };

  const handleSaveEdit = async () => {
    // TODO: Implement API call to save updated job data
    console.log("Saving job data:", editedJobData);
    // Example API call placeholder:
    // try {
    //   const response = await fetch(`http://localhost:3000/api/jobs/${id}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`
    //     },
    //     body: JSON.stringify(editedJobData)
    //   });
    //   if (!response.ok) {
    //     throw new Error('Failed to save job');
    //   }
    //   const result = await response.json();
    //   toast.success('Cập nhật công việc thành công!');
    //   setIsEditing(false);
    //   // You might need to call a function from parent component to update the job state with result.data
    // } catch (error) {
    //   console.error("Error saving job:", error);
    //   toast.error('Lỗi khi cập nhật công việc.');
    // }

    // For now, just simulate save and toggle view mode
    toast.info("Chức năng lưu đang được phát triển"); // Temporary message
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedJobData({
      ...editedJobData,
      [name]: value
    });
  };

  // Helper function to render input or text
  const renderField = (label, name, type = 'text') => (
    <div>
      <p className="text-gray-600">{label}:</p>
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={editedJobData[name] || ''}
          onChange={handleInputChange}
          className="font-semibold w-full px-2 py-1 border rounded"
        />
      ) : (
        <p className="font-semibold">
          {name === 'minSalary' || name === 'maxSalary' ? 
            (job[name] ? job[name].toLocaleString() + ' VNĐ' : '') 
            : job[name] || ''}
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        {isEditing ? (
           <input
             type="text"
             name="title"
             value={editedJobData.title || ''}
             onChange={handleInputChange}
             className="text-2xl font-bold w-full px-2 py-1 border rounded"
           />
        ) : (
           <h1 className="text-2xl font-bold">{job.title}</h1>
        )}

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            job.status === "Open"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {job.status === "Open" ? "Đang mở" : "Đã đóng"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {renderField('Mức lương tối thiểu', 'minSalary', 'number')}
        {renderField('Mức lương tối đa', 'maxSalary', 'number')}
        {renderField('Địa điểm ưu tiên', 'location')}
        {renderField('Thời gian ước tính', 'timeEstimation')}
        {renderField('Trình độ kinh nghiệm', 'experienceLevel')}
        {renderField('Danh mục', 'category')}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Mô tả công việc</h2>
        {isEditing ? (
           <textarea
             name="description"
             value={editedJobData.description || ''}
             onChange={handleInputChange}
             className="text-gray-700 w-full px-2 py-1 border rounded whitespace-pre-line h-32"
           />
        ) : (
           <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Kỹ năng yêu cầu</h2>
        {/* TODO: Implement editable skills using a component like react-select/creatable */}
        {isEditing ? (
           <p className="text-gray-500">Chức năng chỉnh sửa kỹ năng đang được phát triển.</p>
        ) : (
           <div className="flex flex-wrap gap-2">
             {job.skills.map((skill, index) => (
               <span
                 key={index}
                 className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
               >
                 {skill}
               </span>
             ))}
           </div>
        )}
      </div>

      <div className="text-sm text-gray-500 mb-6">
        <p>Ngày tạo: {new Date(job.createdAt).toLocaleDateString("vi-VN")}</p>
        <p>
          Ngày cập nhật: {new Date(job.updatedAt).toLocaleDateString("vi-VN")}
        </p>
      </div>

      <div className="flex justify-end space-x-4">
        {isEditing ? (
           <>
             <button
               onClick={handleCancelEdit}
               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
             >
               Hủy bỏ
             </button>
             <button
               onClick={handleSaveEdit}
               className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl"
             >
               Lưu
             </button>
           </>
        ) : (
           <>
             <button
               onClick={() => navigate(-1)}
               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
             >
               Quay lại
             </button>
             <button
               onClick={handleEditClick}
               className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl"
             >
               Chỉnh sửa
             </button>
           </>
        )}
      </div>
    </div>
  );
};

export default ViewJobContent; 