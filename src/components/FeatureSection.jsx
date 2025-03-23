import React, { useState } from "react";

function DualButton({ onClickLeft, onClickRight, isLeftActive }) {
  return (
    <div className="flex border rounded-full overflow-hidden border-black">
      <button
        onClick={onClickLeft}
        className="flex-1 bg-green-700 text-white p-2 hover:bg-green-500 transition-opacity duration-300"
        style={{ opacity: isLeftActive ? 1 : 0.4 }}
      >
        Khách hàng
      </button>
      <button
        onClick={onClickRight}
        className="flex-1 bg-green-700 text-white p-2 hover:bg-green-500 transition-opacity duration-300"
        style={{ opacity: isLeftActive ? 0.4 : 1 }}
      >
        Freelancer
      </button>
    </div>
  );
}

function FeatureSection() {
  const [showLeftDiv, setShowLeftDiv] = useState(true);
  const [showRightDiv, setShowRightDiv] = useState(false);

  const handleLeftClick = () => {
    setShowLeftDiv(true);
    setShowRightDiv(false);
  };

  const handleRightClick = () => {
    setShowRightDiv(true);
    setShowLeftDiv(false);
  };

  return (
    <div className="relative bg-[url('/Ai3.jpg')] bg-cover bg-center w-full h-140 max-w-7xl rounded-3xl shadow-lg mt-5 flex justify-start">
      <div className="absolute top-5 left-5">
        <DualButton
          onClickLeft={handleLeftClick}
          onClickRight={handleRightClick}
          isLeftActive={showLeftDiv}
        />
      </div>
      <div
        className={`absolute p-4 h-80 w-2/3 top-20 rounded text-white shadow flex flex-col ml-5  `}
      >
        {" "}
        {/* Đặt vị trí ở dưới */}
        {showLeftDiv && (
          <>
            <h3 className="mb-2 font-semibold text-3xl">
              1. AI đề xuất các freelancer phù hợp với dự án của bạn.
            </h3>
            <div className="flex flex-wrap justify-start rounded-full gap-x-10 gap-y-4 mt-3">
              <p className="bg-gray-700 p-2 rounded-3xl">Phân Tích Kỹ Năng và Kinh Nghiệm</p>
              <p className="bg-gray-700 p-2 rounded-3xl">Matching Thông Minh</p>
              <p className="bg-gray-700 p-2 rounded-3xl">Đề Xuất Tùy Chỉnh</p>
              <p className="bg-gray-700 p-2 rounded-3xl">Giao Diện Thân Thiện</p>
              <p className="bg-gray-700 p-2 rounded-3xl">Khả Năng Cập Nhật Liên Tục</p>
            </div>
            <p className="mt-3 font-medium text-1xl">Freelancer AI sử dụng công nghệ trí tuệ nhân tạo để kết nối các dự án với những freelancer có kỹ năng và kinh nghiệm phù hợp nhất, giúp dự án của bạn đạt được hiệu quả cao nhất.</p>
            <h3 className="mb-2 font-semibold text-3xl mt-5">
              2. AI gợi ý mức lương hợp lý cho nhà tuyển dụng.
            </h3>
            <div className="flex flex-wrap justify-start rounded-full gap-x-10 gap-y-4 mt-3 ">
              <p className="bg-gray-700 p-2 rounded-3xl">Phân tích dữ liệu thị trường</p>
              <p className="bg-gray-700 p-2 rounded-3xl">Gợi Ý Mức Lương Tùy Chỉnh</p>
              <p className="bg-gray-700 p-2 rounded-3xl">Dễ sử dụng</p>
              <p className="bg-gray-700 p-2 rounded-3xl">Tối ưu hóa ngân sách</p>
              <p className="bg-gray-700 p-2 rounded-3xl">Tích hợp công nghệ mới</p>
            </div>
            <p className="mt-3 font-medium text-1xl">Freelancer AI giúp tối ưu hóa quy trình tuyển dụng và nâng cao tính cạnh tranh của các công ty trong việc thu hút và giữ chân nhân tài, đóng góp lớn vào thành công của tổ chức trong môi trường kinh doanh hiện đại.</p>
          </>
        )}
        {showRightDiv && (
          <>
          <h3 className="mb-2 font-semibold text-3xl">
            1. AI kiểm tra và đánh giá chất lượng CV của bạn.
          </h3>
          <div className="flex flex-wrap justify-start rounded-full gap-x-10 gap-y-4 mt-3">
            <p className="bg-gray-700 p-2 rounded-3xl">Gợi Ý Cải Thiện</p>
            <p className="bg-gray-700 p-2 rounded-3xl">Đánh Giá Nội Dung</p>
            <p className="bg-gray-700 p-2 rounded-3xl">So Sánh Với Mẫu CV Thành Công</p>
            <p className="bg-gray-700 p-2 rounded-3xl">Phân Tích Từ Khóa</p>
            <p className="bg-gray-700 p-2 rounded-3xl">Đánh Giá Độ Mới Mẻ</p>
          </div>
          <p className="mt-3 font-medium text-1xl">Freelancer AI không chỉ giúp bạn cải thiện CV của mình mà còn nâng cao khả năng cạnh tranh trong thị trường lao động. Bằng cách cung cấp phản hồi chính xác và kịp thời, chức năng này đóng góp vào sự thành công của bạn trong việc tìm kiếm cơ hội nghề nghiệp</p>
          <h3 className="mb-2 font-semibold text-3xl mt-5">
            2. ChatBot AI hỗ trợ tìm việc.
          </h3>
          <div className="flex flex-wrap justify-start rounded-full gap-x-10 gap-y-4 mt-3 ">
            <p className="bg-gray-700 p-2 rounded-3xl">Tương Tác Thông Minh</p>
            <p className="bg-gray-700 p-2 rounded-3xl">Cập Nhật Tin Tức Ngành Nghề</p>
            <p className="bg-gray-700 p-2 rounded-3xl">Tư Vấn Về Hồ Sơ Xin Việc</p>
            <p className="bg-gray-700 p-2 rounded-3xl">Tìm Kiếm Cơ Hội Việc Làm</p>
            <p className="bg-gray-700 p-2 rounded-3xl">Hỗ Trợ Kỹ Năng và Phát Triển Nghề Nghiệp</p>
          </div>
          <p className="mt-3 font-medium text-1xl">Bằng cách cá nhân hóa thông tin và hỗ trợ về kỹ năng, chatbot giúp người dùng tiếp cận các công việc phù hợp và tự tin hơn trong quá trình ứng tuyển. Đây là một công cụ hữu ích, hỗ trợ freelancer phát triển nghề nghiệp trong thị trường cạnh tranh.</p>
        </>
        )}
      </div>
    </div>
  );
}

export default FeatureSection;
