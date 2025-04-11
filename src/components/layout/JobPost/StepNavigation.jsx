import React from "react";

const StepNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isNextDisabled,
  handleSubmit,
}) => {
  const progress = (currentStep / totalSteps) * 100;
  const handleNextClick = () => {
    if (currentStep === totalSteps) {
      handleSubmit(); // gọi submit nếu đang ở bước cuối
    } else {
      onNext();
    }
  };
  return (
    <div className="relative p-2">
      {/* Viền tiến độ */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded-t-md"></div>
      <div
        className="absolute top-0 left-0 h-1 bg-green-700  rounded-t-md"
        style={{ width: `${progress}%` }}
      ></div>

      {/* Khung chứa các nút */}
      <div className="mt-6 flex justify-between px-5">
        {/* Nút Quay lại */}
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl text-green-700 border border-gray-400 hover:bg-gray-100"
        >
          Quay lại
        </button>

        {/* Nút Tiếp theo hoặc Hoàn tất */}
        <button
          onClick={handleNextClick}
          disabled={isNextDisabled}
          className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-xl disabled:bg-gray-400"
        >
          {currentStep < totalSteps ? "Tiếp theo" : "Hoàn tất"}
        </button>
      </div>
    </div>
  );
};

export default StepNavigation;
