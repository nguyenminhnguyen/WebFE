import React from "react";

const JobStep1 = ({ formData, handleInputChange }) => {
  return (
    <>
      <div className="w-2/5 ">
        <h2 className="block text-3xl font-medium">
          Hãy bắt đầu với một tiêu đề ấn tượng
        </h2>
        <p className="mt-4 text-gray-700">
          Điều này giúp bài đăng tuyển dụng của bạn nổi bật với những ứng
          viên phù hợp. Đây là điều đầu tiên họ nhìn thấy, vì vậy hãy tạo
          ấn tượng thật tốt!
        </p>
      </div>
      <div className="mb-4 ml-5 w-3/5 ml-6">
        <h3 className="font-medium">
          Viết tiêu đề cho bài đăng tuyển dụng của bạn
        </h3>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="mt-2 p-2 w-full border border-gray-500 rounded-md"
          placeholder="Nhập tiêu đề công việc"
        />
        <div className="mt-5 p-1 ml-4">
          <h4 className="font-medium mt-1">Ví dụ cho tiêu đề</h4>
          <p className="mt-1">
            • Chuyên viên Marketing số để quản lý chiến dịch quảng cáo
            trực tuyến
          </p>
          <p>• Lập trình viên Frontend để phát triển ứng dụng web</p>
          <p>
            • Nhân viên PR để xây dựng thương hiệu và quan hệ công chúng
          </p>
        </div>
      </div>
    </>
  );
};

export default JobStep1;