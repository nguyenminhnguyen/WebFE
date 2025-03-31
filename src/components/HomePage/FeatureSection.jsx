import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FaBriefcase, FaUserTie } from 'react-icons/fa';

function DualButton({ onClickLeft, onClickRight, isLeftActive }) {
  return (
    <div className="relative flex w-full md:w-fit rounded-full bg-white/10 backdrop-blur-md p-1 border border-white/20">
      {/* Animated indicator */}
      <div
        className={`absolute top-1 bottom-1 left-1 w-1/2 bg-green-500 rounded-full transition-all duration-300 ease-in-out z-0 ${
          !isLeftActive ? 'translate-x-full' : ''
        }`}
      ></div>

      {/* Khách hàng */}
      <button
        onClick={onClickLeft}
        className={`relative z-10 flex items-center justify-center gap-2 w-1/2 px-4 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-300
          ${isLeftActive ? 'text-white' : 'text-white/70'}`}
      >
        <FaBriefcase className="text-base" />
        <span className="hidden sm:inline">Khách hàng</span>
      </button>

      {/* Freelancer */}
      <button
        onClick={onClickRight}
        className={`relative z-10 flex items-center justify-center gap-2 w-1/2 px-4 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-300
          ${!isLeftActive ? 'text-white' : 'text-white/70'}`}
      >
        <FaUserTie className="text-base" />
        <span className="hidden sm:inline">Freelancer</span>
      </button>
    </div>
  );
}



const cardClasses = 'bg-gray-800 bg-opacity-60 text-white p-2 rounded-3xl text-sm';

function FeatureSection() {
  const [showLeftDiv, setShowLeftDiv] = useState(true);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="relative bg-[url('/Ai3.jpg')] bg-cover bg-center w-full max-w-7xl rounded-3xl shadow-lg mt-5 h-[580px] sm:h-[640px] lg:h-[700px] flex justify-start overflow-hidden">
      {/* Dual Button */}
      <div className="absolute top-5 left-5 z-10">
        <DualButton
          onClickLeft={() => setShowLeftDiv(true)}
          onClickRight={() => setShowLeftDiv(false)}
          isLeftActive={showLeftDiv}
        />
      </div>

      {/* Animated Content */}
      <div className="absolute p-6 sm:p-8 top-24 sm:top-28 left-5 right-5 md:right-auto md:w-2/3 rounded-2xl bg-black/40 text-white shadow-lg backdrop-blur-lg">
        <AnimatePresence mode="wait">
          {showLeftDiv ? (
            <motion.div
              key="left"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={contentVariants}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <h3 className="font-bold text-2xl md:text-3xl">1. AI chọn freelancer phù hợp.</h3>
              <div className="flex flex-wrap gap-2">
                <p className={cardClasses}>Phân tích kỹ năng</p>
                <p className={cardClasses}>Matching thông minh</p>
                <p className={cardClasses}>Tùy chỉnh đề xuất</p>
                <p className={cardClasses}>Giao diện dễ dùng</p>
                <p className={cardClasses}>Cập nhật liên tục</p>
              </div>
              <p className="text-white/90">
                Freelancer AI kết nối dự án với người phù hợp, tối ưu hiệu suất công việc.
              </p>

              <h3 className="font-bold text-2xl md:text-3xl mt-6">2. Gợi ý mức lương hợp lý.</h3>
              <div className="flex flex-wrap gap-2">
                <p className={cardClasses}>Phân tích thị trường</p>
                <p className={cardClasses}>Gợi ý mức lương</p>
                <p className={cardClasses}>Tối ưu ngân sách</p>
                <p className={cardClasses}>Dễ dùng</p>
                <p className={cardClasses}>Tích hợp AI mới</p>
              </div>
              <p className="text-white/90">
                Hỗ trợ doanh nghiệp ra quyết định hiệu quả hơn trong tuyển dụng.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="right"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={contentVariants}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <h3 className="font-bold text-2xl md:text-3xl">1. AI đánh giá CV của bạn.</h3>
              <div className="flex flex-wrap gap-2">
                <p className={cardClasses}>Gợi ý cải thiện</p>
                <p className={cardClasses}>So sánh với CV thành công</p>
                <p className={cardClasses}>Phân tích từ khóa</p>
                <p className={cardClasses}>Đánh giá nội dung</p>
                <p className={cardClasses}>Độ mới mẻ</p>
              </div>
              <p className="text-white/90">
                AI giúp bạn nâng cấp CV và tăng cơ hội trúng tuyển.
              </p>

              <h3 className="font-bold text-2xl md:text-3xl mt-6">2. ChatBot AI hỗ trợ tìm việc.</h3>
              <div className="flex flex-wrap gap-2">
                <p className={cardClasses}>Tư vấn nghề nghiệp</p>
                <p className={cardClasses}>Tìm kiếm việc làm</p>
                <p className={cardClasses}>Tương tác thông minh</p>
                <p className={cardClasses}>Hỗ trợ phát triển kỹ năng</p>
              </div>
              <p className="text-white/90">
                Chatbot AI đồng hành cùng bạn trong hành trình nghề nghiệp.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default FeatureSection;
