import React, { useState } from 'react'
function Search(){
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState('talent'); // "talent" hoặc "jobs"

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý tìm kiếm ở đây
        console.log('Tìm kiếm:', searchTerm);
    };

    const handleJobSearch = () => {
        // Điều hướng đến trang công việc
        window.location.href = '/jobs'; // Thay đổi đường dẫn theo yêu cầu
    };
    return(
<div className="relative bg-[url('/SSearch.jpg')] bg-cover bg-center w-full h-140 max-w-7xl mx-auto rounded-lg shadow-lg">
    
    <div className="absolute top-0 left-0 p-10 text-white max-w-[60%] break-words">
        <h2 className="text-6xl font-bold text-shadow">Kết nối doanh nghiệp với các freelancer chất lượng</h2>
        <div className="mt-8">
                    <div className="bg-black bg-opacity-60 p-6 rounded-lg shadow-lg">
                        <div className="flex space-x-4 mb-8">
                            <button 
                                onClick={() => setSelectedOption('talent')} 
                                className={`flex-1 p-4 rounded-full ${selectedOption === 'talent' ? 'bg-green-600 text-white ' : 'bg-gray-300'}`}
                            >
                                Tìm kiếm chuyên gia
                            </button>

                            <button 
                                onClick={() => setSelectedOption('jobs')} 
                                className={`flex-1 p-4 rounded-full ${selectedOption === 'jobs' ? 'bg-green-600 text-white' : 'bg-gray-300'}`}
                            >
                                Tìm kiếm công việc
                            </button>
                        </div>

                        {selectedOption === 'talent' && (
                            <form onSubmit={handleSubmit} className="flex items-center">
                                <div className="flex items-center w-full">
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm theo vai trò, kĩ năng, từ khóa" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="basis-3/4 p-2 border border-gray-300 rounded-l-full focus:outline-none"
                            />
                            <button 
                                type="submit" 
                                className="basis-1/4 p-2 bg-green-600 text-white rounded-r-full hover:bg-green-500"
                            >
                                Tìm kiếm
                            </button>
                        </div>
                            </form>
                        )}

                        {selectedOption === 'jobs' && (
                            <div className='text-center'>
                            <p className=" text-lg break-words w-3/4 mx-auto">
                            Xây dựng sự nghiệp freelancer của bạn với Freelancer AI. Với hàng nghìn công việc được đăng lên mỗi ngày.
                        </p>
                            <div className='flex justify-center'>
                            <button 
                                onClick={handleJobSearch} 
                                className="mt-4 p-2 bg-green-600 text-white rounded-lg hover:bg-green-500 "
                            >
                                Khám phá các công việc mới nhất
                            </button>
                            </div>
                            </div>
                        )}
                    </div>
                </div>
    </div>
</div>
    )
}
export default Search;
