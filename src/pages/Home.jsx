import React from "react";
import SearchUI from "../components/SearchUI";
import FeatureSection from "../components/FeatureSection";
function Home() {
  return (
    <>
      <SearchUI />
      <h2 className="mt-9 mb-0 font-semibold text-4xl">
        Tìm kiếm chuyên gia theo danh mục
      </h2>
      <br></br>
      <p className="text-gray-500 text-1xl font-medium mt-0 ">
        Bạn đang tìm kiếm công việc? <span> </span>
        <a href="https://example.com" target="_blank"></a>
        <span className="text-green-700 font-bold hover:text-green-500 hover:cursor-pointer">
          Nhấn vào đây
        </span>
      </p>
      <div className="grid grid-cols-4 gap-8 mt-5">
        <a
          href="https://www.youtube.com/"
          target="_blank"
          className="bg-gray-100 h-32 flex flex-col items-start justify-between p-2 hover:bg-gray-200 hover:cursor-pointer"
        >
          <h3 className="font-semibold mt-1 ml-1 text-2xl">Designer</h3>
          <div className="flex-grow flex items-center justify-center mt-2">
            <span className="text-green-500">0★</span>
            <span className="ml-2">(0 freelancer)</span>
          </div>
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          className="bg-gray-100 h-32 flex flex-col items-start justify-between p-2 hover:bg-gray-200 hover:cursor-pointer"
        >
          <h3 className="font-semibold mt-1 ml-1 text-2xl">Tiếp thị số</h3>
          <div className="flex-grow flex items-center justify-center mt-2">
            <span className="text-green-500">0★</span>
            <span className="ml-2">(0 freelancer)</span>
          </div>
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          className="bg-gray-100 h-32 flex flex-col items-start justify-between p-2 hover:bg-gray-200 hover:cursor-pointer"
        >
          <h3 className="font-semibold mt-1 ml-1 text-2xl">Content Writer</h3>
          <div className="flex-grow flex items-center justify-center mt-2">
            <span className="text-green-500">0★</span>
            <span className="ml-2">(0 freelancer)</span>
          </div>
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          className="bg-gray-100 h-32 flex flex-col items-start justify-between p-2 hover:bg-gray-200 hover:cursor-pointer"
        >
          <h3 className="font-semibold mt-1 ml-1 text-2xl">Dịch thuật</h3>
          <div className="flex-grow flex items-center justify-center mt-2">
            <span className="text-green-500">0★</span>
            <span className="ml-2">(0 freelancer)</span>
          </div>
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          className="bg-gray-100 h-32 flex flex-col items-start justify-between p-2 hover:bg-gray-200 hover:cursor-pointer"
        >
          <h3 className="font-semibold mt-1 ml-1 text-2xl">
            Tư vấn kinh doanh
          </h3>
          <div className="flex-grow flex items-center justify-center mt-2">
            <span className="text-green-500">0★</span>
            <span className="ml-2">(0 freelancer)</span>
          </div>
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          className="bg-gray-100 h-32 flex flex-col items-start justify-between p-2 hover:bg-gray-200 hover:cursor-pointer"
        >
          <h3 className="font-semibold mt-1 ml-1 text-2xl">
            Phát triển ứng dụng
          </h3>
          <div className="flex-grow flex items-center justify-center mt-2">
            <span className="text-green-500">0★</span>
            <span className="ml-2">(0 freelancer)</span>
          </div>
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          className="bg-gray-100 h-32 flex flex-col items-start justify-between p-2 hover:bg-gray-200 hover:cursor-pointer"
        >
          <h3 className="font-semibold mt-1 ml-1 text-2xl">Nhiếp ảnh</h3>
          <div className="flex-grow flex items-center justify-center mt-2">
            <span className="text-green-500">0★</span>
            <span className="ml-2">(0 freelancer)</span>
          </div>
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          className="bg-gray-100 h-32 flex flex-col items-start justify-between p-2 hover:bg-gray-200 hover:cursor-pointer"
        >
          <h3 className="font-semibold mt-1 ml-1 text-2xl">Biên tập video</h3>
          <div className="flex-grow flex items-center justify-center mt-2">
            <span className="text-green-500">0★</span>
            <span className="ml-2">(0 freelancer)</span>
          </div>
        </a>
      </div>
      <h2 className="mt-5 font-semibold text-4xl">Các tính năng nổi bật sử dụng AI</h2>
      <FeatureSection/>
    </>
  );
}
export default Home;
