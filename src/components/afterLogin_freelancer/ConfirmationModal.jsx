import React from "react";
import { FaCheckCircle, FaTimesCircle, FaTimes } from "react-icons/fa";

const ConfirmationModal = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-[#14a800] text-4xl" />;
      case "error":
        return <FaTimesCircle className="text-red-500 text-4xl" />;
      case "warning":
        return <FaTimesCircle className="text-yellow-500 text-4xl" />;
      default:
        return null;
    }
  };

  const getButtonClass = () => {
    switch (type) {
      case "success":
        return "bg-[#14a800] hover:bg-[#108a00]";
      case "error":
        return "bg-red-500 hover:bg-red-600";
      case "warning":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-[#14a800] hover:bg-[#108a00]";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6 shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            {getIcon()}
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Đóng
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-lg text-white ${getButtonClass()}`}
            >
              Xác nhận
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
