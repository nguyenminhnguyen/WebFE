import React from "react";

const ApplyModal = ({
  isOpen,
  onClose,
  onSubmit,
  isApplying,
  proposalText,
  setProposalText,
  bidAmount,
  setBidAmount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Ứng tuyển công việc</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nội dung đề xuất
          </label>
          <textarea
            value={proposalText}
            onChange={(e) => setProposalText(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14a800] focus:border-transparent"
            rows={4}
            placeholder="Mô tả về kinh nghiệm và lý do bạn phù hợp với công việc này..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số tiền đề xuất ($)
          </label>
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14a800] focus:border-transparent"
            placeholder="Nhập số tiền bạn đề xuất"
            min="0"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            onClick={onSubmit}
            disabled={isApplying}
            className="px-4 py-2 bg-[#14a800] text-white rounded-lg hover:bg-[#108a00] disabled:opacity-50"
          >
            {isApplying ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang gửi...
              </div>
            ) : (
              "Gửi ứng tuyển"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
