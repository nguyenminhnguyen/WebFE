import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('talent');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tìm kiếm:', searchTerm);
  };

  const handleJobSearch = () => {
    window.location.href = '/projects';
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-xl shadow-lg overflow-hidden bg-cover bg-center h-[36rem] sm:h-[42rem] md:h-[48rem] lg:h-[52rem] xl:h-[56rem] bg-[url('/SSearch.jpg')]">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

      {/* Nội dung chính */}
      <div className="relative z-10 h-full flex items-center px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-10">
        <div className="w-full max-w-3xl text-white">

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-bold mb-6 text-shadow"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', lineHeight: '1.2' }}
          >
            Kết nối doanh nghiệp với các freelancer chất lượng
          </motion.h2>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-black bg-opacity-60 p-5 sm:p-6 rounded-lg shadow-lg w-full"
          >
            {/* Tabs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5">
              <button
                onClick={() => setSelectedOption('talent')}
                className={`flex-1 p-3 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
                  selectedOption === 'talent'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Tìm kiếm chuyên gia
              </button>
              <button
                onClick={() => setSelectedOption('jobs')}
                className={`flex-1 p-3 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
                  selectedOption === 'jobs'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Tìm kiếm công việc
              </button>
            </div>

            {/* Nội dung theo tab */}
            {selectedOption === 'talent' ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="text"
                  placeholder="Tìm kiếm theo vai trò, kĩ năng, từ khóa"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none text-black"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-500 transition-all"
                >
                  Tìm kiếm
                </button>
              </form>
            ) : (
              <div className="text-center px-2">
                <p className="text-sm sm:text-base md:text-lg max-w-lg mx-auto">
                  Xây dựng sự nghiệp freelancer của bạn với Freelancer AI. Với hàng nghìn công việc được đăng lên mỗi ngày.
                </p>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleJobSearch}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-all"
                  >
                    Khám phá các công việc mới nhất
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Search;
