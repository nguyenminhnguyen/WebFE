import React from 'react';
import ChatFunc from '../../components/ChatFunc';
import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt";

const Messages = ({ users = [], unreadSenders = new Set() }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const encryptedPrivateKey = user?.encryptedPrivateKey;
  const password = user?.username || user?.companyName;

  let decryptedPrivateKey = "";
  if (encryptedPrivateKey && password) {
    const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, password);
    decryptedPrivateKey = bytes.toString(CryptoJS.enc.Utf8);
  }

  const handleReadMessage = (senderId) => {
    // Xử lý khi đọc tin nhắn
    console.log("Message read from:", senderId);
  };

  const {
    chatId,
    messages = [],
    input,
    loading,
    file,
    showVideoCall,
    localVideoRef,
    remoteVideoRef,
    chatContainerRef,
    messagesEndRef,
    handleBack,
    handleSelectUser,
    handleScroll,
    handleSend,
    handleStartVideoCall,
    handleEndVideoCall,
    setInput,
    setFile,
    loadingMore
  } = ChatFunc({
    onClose: () => { },
    receiver: null,
    unreadSenders,
    onReadMessage: handleReadMessage,
    users
  });

  return (
    <div
      className="bg-gray-100 flex overflow-hidden relative font-sans flex-1"
      style={{ minHeight: 'calc(100vh - 64px)' }} // Adjust based on navbar's base height
    >
      {/* Sidebar */}
      <div
        className={`
          bg-white border-r border-gray-200
          w-80
          transform transition-transform duration-300 ease-in-out
          sm:relative sm:translate-x-0 sm:w-64 md:w-1/4
          ${chatId ? "-translate-x-full sm:translate-x-0" : "translate-x-0"}
          absolute sm:relative
          top-0 left-0 bottom-0
          ${!chatId ? "w-full" : "w-80"}
        `}
      >
        <div className="p-4 border-b bg-blue-600 text-white">
          <h2 className="text-xl font-bold">Messenger</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-128px)]">
          <ul>
            {users.map((user) => (
              <li
                key={user._id}
                className={`cursor-pointer p-3 flex items-center gap-3 hover:bg-blue-50 transition-colors ${chatId === user._id ? "bg-blue-100" : ""
                  } ${unreadSenders.has(user._id) ? "border-l-4 border-blue-500" : ""}`}
                onClick={() => handleSelectUser(user._id)}
              >
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                  {(user.fname || user.username || user.companyName || "U")[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="truncate font-medium text-gray-900">
                    {user.fname || user.username || user.companyName || "Người dùng"}
                  </span>
                </div>
                {unreadSenders.has(user._id) && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Mới
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main chat area */}
      <div
        className={`
          flex-1 flex flex-col bg-white
          transition-transform duration-300 ease-in-out
          w-full sm:w-2/3 md:w-3/4
          sm:relative
          ${chatId ? "translate-x-0" : "translate-x-full sm:translate-x-0"}
          absolute sm:relative
          top-0 right-0 bottom-0
          left-0
        `}
      >
        {chatId ? (
          <>
            {/* Header */}
            <div className="p-3 border-b bg-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBack}
                  className="sm:hidden text-blue-600 hover:text-blue-800"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                  {(users.find((u) => u._id === chatId)?.fname ||
                    users.find((u) => u._id === chatId)?.username ||
                    users.find((u) => u._id === chatId)?.companyName ||
                    "U")[0].toUpperCase()}
                </div>
                <span className="font-semibold truncate max-w-[60%] sm:max-w-[300px] text-gray-900">
                  {users.find((u) => u._id === chatId)?.fname ||
                    users.find((u) => u._id === chatId)?.username ||
                    users.find((u) => u._id === chatId)?.companyName ||
                    "Người dùng"}
                </span>
              </div>
              <button
                onClick={handleStartVideoCall}
                className="text-blue-600 hover:text-blue-800"
                title="Gọi video"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 19h8a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>

            {/* Messages area */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 bg-gray-50"
              onScroll={handleScroll}
            >
              {loadingMore && (
                <div className="text-center text-gray-500 text-sm mb-2">
                  Đang tải thêm tin nhắn...
                </div>
              )}
              {messages.map((msg, idx) => {
                const isImage =
                  msg.file &&
                  (msg.file.endsWith(".png") ||
                    msg.file.endsWith(".jpg") ||
                    msg.file.endsWith(".jpeg") ||
                    msg.file.endsWith(".gif") ||
                    msg.file.endsWith(".bmp") ||
                    msg.file.endsWith(".webp"));

                return (
                  <div
                    key={idx}
                    className={`mb-3 flex ${msg.senderID === user?._id ? "justify-end" : "justify-start"
                      }`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-2xl ${msg.senderID === user?._id
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-900 shadow-sm"
                        }`}
                    >
                      {msg.file && (
                        isImage ? (
                          <img
                            src={
                              msg.file.startsWith("http")
                                ? msg.file
                                : `http://localhost:3000${msg.file.startsWith("/") ? "" : "/"
                                }${msg.file}`
                            }
                            alt="img"
                            className="max-w-[200px] max-h-[200px] rounded-lg mb-2"
                          />
                        ) : (
                          <a
                            href={
                              msg.file.startsWith("http")
                                ? msg.file
                                : `http://localhost:3000${msg.file.startsWith("/") ? "" : "/"
                                }${msg.file}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline hover:text-blue-700"
                          >
                            {msg.file.split("/").pop() || "Tải file"}
                          </a>
                        )
                      )}
                      {msg.decryptedText && msg.decryptedText !== "[Không giải mã được]" && (
                        <div>{msg.decryptedText}</div>
                      )}
                      {!msg.decryptedText && !msg.file && (
                        <div className="text-gray-500">[Không giải mã được]</div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-3 border-t bg-white">
              {file && (
                <div className="mb-2">
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7v10M17 7v10M7 7h10M7 17h10"
                        />
                      </svg>
                      <span className="truncate">{file.name}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="flex items-center gap-2">
                <label className="cursor-pointer">
                  <span className="inline-block w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                    disabled={loading}
                  />
                </label>
                <input
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 bg-white"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
                  placeholder="Nhắn tin..."
                  disabled={loading}
                />
                <button
                  onClick={handleSend}
                  className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                  disabled={loading}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Chọn một cuộc trò chuyện để bắt đầu
          </div>
        )}
      </div>

      {/* Video call modal */}
      {showVideoCall && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 flex flex-col items-center w-full max-w-md">
            <div className="mb-2 font-bold text-gray-900">Cuộc gọi video</div>
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-40 bg-black rounded mb-2"
            />
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-40 bg-black rounded mb-2"
            />
            <button
              onClick={handleEndVideoCall}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Kết thúc
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
