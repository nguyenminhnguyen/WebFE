import React from "react";
import { FaBuilding, FaUsers, FaChartLine, FaHandshake } from "react-icons/fa";

export default function EmployerInfo() {
  const features = [
    {
      icon: <FaBuilding className="w-8 h-8 text-green-600" />,
      title: "Đăng Tuyển Dễ Dàng",
      description: "Tạo và quản lý các dự án một cách nhanh chóng và hiệu quả.",
    },
    {
      icon: <FaUsers className="w-8 h-8 text-green-600" />,
      title: "Tìm Kiếm Freelancer",
      description:
        "Kết nối với hàng ngàn freelancer tài năng trên khắp Việt Nam.",
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-green-600" />,
      title: "Quản Lý Dự Án",
      description: "Theo dõi tiến độ và quản lý dự án một cách chuyên nghiệp.",
    },
    {
      icon: <FaHandshake className="w-8 h-8 text-green-600" />,
      title: "Thanh Toán An Toàn",
      description:
        "Hệ thống thanh toán bảo mật và minh bạch cho mọi giao dịch.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Dành Cho Nhà Tuyển Dụng
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Tìm kiếm và kết nối với những freelancer tài năng nhất để hoàn thành
          dự án của bạn
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
          Lợi Ích Khi Sử Dụng
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Tiết kiệm chi phí tuyển dụng và quản lý nhân sự</li>
          <li>Truy cập vào mạng lưới freelancer chất lượng cao</li>
          <li>Linh hoạt trong việc mở rộng và thu hẹp quy mô dự án</li>
          <li>Giảm thiểu rủi ro với hệ thống thanh toán an toàn</li>
        </ul>
      </div>

      <div className="text-center">
        <button
          onClick={() => (window.location.href = "/register/employer")}
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Đăng Ký Ngay
        </button>
      </div>
    </div>
  );
}
