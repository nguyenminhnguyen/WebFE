import React from "react";
import {
  FaBriefcase,
  FaMoneyBillWave,
  FaGlobe,
  FaUserFriends,
} from "react-icons/fa";

export default function FreelancerInfo() {
  const features = [
    {
      icon: <FaBriefcase className="w-8 h-8 text-green-600" />,
      title: "Nhiều Cơ Hội Việc Làm",
      description: "Tiếp cận với hàng ngàn dự án từ các nhà tuyển dụng uy tín.",
    },
    {
      icon: <FaMoneyBillWave className="w-8 h-8 text-green-600" />,
      title: "Thu Nhập Hấp Dẫn",
      description:
        "Kiếm thu nhập tốt với mức giá cạnh tranh và thanh toán nhanh chóng.",
    },
    {
      icon: <FaGlobe className="w-8 h-8 text-green-600" />,
      title: "Làm Việc Từ Xa",
      description:
        "Làm việc linh hoạt từ bất cứ đâu, quản lý thời gian theo ý muốn.",
    },
    {
      icon: <FaUserFriends className="w-8 h-8 text-green-600" />,
      title: "Xây Dựng Mối Quan Hệ",
      description:
        "Kết nối và xây dựng mạng lưới với các nhà tuyển dụng tiềm năng.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Dành Cho Freelancer
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Tìm kiếm cơ hội việc làm tự do và phát triển sự nghiệp của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-green-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Lợi Ích Khi Tham Gia
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Tự do lựa chọn dự án phù hợp với kỹ năng và sở thích</li>
          <li>Xây dựng portfolio và kinh nghiệm làm việc đa dạng</li>
          <li>Phát triển kỹ năng chuyên môn và mở rộng mạng lưới quan hệ</li>
          <li>Nhận thanh toán nhanh chóng và an toàn</li>
        </ul>
      </div>

      <div className="text-center">
        <button
          onClick={() => (window.location.href = "/register/freelancer")}
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Đăng Ký Ngay
        </button>
      </div>
    </div>
  );
}
