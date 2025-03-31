import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectDetailModal({ project, onClose }) {
  const [tab, setTab] = useState('details');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false); // bắt đầu animation exit
  };

  const handleExitComplete = () => {
    onClose(); // sau khi animation exit xong, gọi onClose
  };

  const tabs = [
    { key: 'details', label: 'Chi tiết' },
    { key: 'requirements', label: 'Yêu cầu' },
    { key: 'reviews', label: 'Đánh giá' },
  ];

  const renderTabContent = () => {
    switch (tab) {
      case 'details':
        return (
          <div className="space-y-4 text-sm text-gray-600">
            <p>{project.description}</p>
            <p>
              Dự án yêu cầu sự sáng tạo cao và phối hợp tốt với team. Freelancer
              cần chủ động cập nhật tiến độ công việc qua hệ thống.
            </p>
            <p>
              Ưu tiên các bạn có kinh nghiệm làm việc từ xa, giao tiếp rõ ràng
              và sử dụng Git thành thạo.
            </p>
          </div>
        );
      case 'requirements':
        return (
          <div className="space-y-2 text-sm text-gray-600">
            <ul className="list-disc list-inside">
              <li>Thành thạo {project.skills.join(', ')}</li>
              <li>Kỹ năng giao tiếp và làm việc nhóm</li>
              <li>Đảm bảo đúng deadline và chất lượng</li>
              <li>Portfolio dự án liên quan</li>
            </ul>
          </div>
        );
      case 'reviews':
        return (
          <div className="space-y-3 text-sm text-gray-600">
            <p>⭐ 4.9/5 - 124 lượt đánh giá</p>
            <p>"Freelancer làm việc rất chuyên nghiệp, đúng deadline."</p>
            <p>"Sản phẩm hoàn thiện vượt mong đợi, sẽ hợp tác tiếp."</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (!project) return null; // fallback an toàn, nhưng modal sẽ không dùng project === null để tắt

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed top-0 right-0 w-full sm:w-[540px] md:w-[600px] lg:w-[700px] h-full bg-white border-l border-gray-200 shadow-xl z-50 overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-sm mb-4"
            >
              Đóng
            </button>

            <h2 className="text-2xl font-bold text-green-600">{project.title}</h2>

            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p><strong>Ngân sách:</strong> {project.budget}</p>
              <p><strong>Thời gian:</strong> {project.duration}</p>
              <p><strong>Kỹ năng:</strong> {project.skills.join(', ')}</p>
              <p className="text-sm text-gray-400">Đăng {project.postedAt}</p>
            </div>

            {/* Tabs */}
            <div className="mt-6 border-b border-gray-200 flex gap-6">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`pb-2 text-sm font-medium ${
                    tab === t.key
                      ? 'border-b-2 border-green-500 text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Nội dung tab */}
            <div className="mt-6">{renderTabContent()}</div>

            {/* Nút ứng tuyển */}
            <button className="mt-10 w-full py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-xl shadow-lg hover:shadow-emerald-400/50 hover:scale-105 transition-transform duration-300 text-base font-semibold">
              Ứng tuyển ngay
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
