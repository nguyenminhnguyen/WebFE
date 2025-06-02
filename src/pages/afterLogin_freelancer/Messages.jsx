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
    <div className="h-screen bg-gray-100">
      <div className="h-full flex">
        {/* Sidebar - Danh sách chat */}
        <div className="w-1/4 bg-white border-r border-gray-200">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Messages</h2>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-4rem)]">
            <ul>
              {/* Danh sách người dùng */}
              {users.map((user) => (
                <li
                  key={user._id}
                  className={`cursor-pointer hover:bg-green-100 p-3 flex items-center justify-between ${
                    chatId === user._id ? "bg-green-100" : ""
                  } ${unreadSenders.has(user._id) ? "border-l-4 border-red-500" : ""}`}
                  onClick={() => handleSelectUser(user._id)}
                >
                  <div className="flex items-center">
                    <span className="mr-2">
                      {user.fname || user.username || user.companyName || "Người dùng"}
                    </span>
                  </div>
                  {unreadSenders.has(user._id) && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Mới
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col bg-white">
          {chatId ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <button
                    onClick={handleBack}
                    className="text-gray-500 hover:text-green-600 text-lg mr-2"
                  >
                    &#8592;
                  </button>
                  <span className="font-semibold">
                    {chatId === "chatbot" ? "🤖 Chat với AI" : "Người dùng"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleStartVideoCall}
                    className="text-gray-500 hover:text-blue-600 text-xl"
                    title="Gọi video"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 19h8a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages area */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4"
                onScroll={handleScroll}
              >
                {loadingMore && (
                  <div className="text-center text-gray-500 text-sm mb-2">
                    Đang tải thêm tin nhắn...
                  </div>
                )}
                {messages.map((msg, idx) => {
                  const isImage = msg.file &&
                    (msg.file.endsWith(".png") ||
                      msg.file.endsWith(".jpg") ||
                      msg.file.endsWith(".jpeg") ||
                      msg.file.endsWith(".gif") ||
                      msg.file.endsWith(".bmp") ||
                      msg.file.endsWith(".webp"));

                  return (
                    <div
                      key={idx}
                      className={`mb-4 ${msg.senderID === user?._id ? "text-right" : "text-left"}`}
                    >
                      {msg.file && (
                        isImage ? (
                          <img
                            src={msg.file.startsWith("http") ? msg.file : `http://localhost:3000${msg.file.startsWith("/") ? "" : "/"}${msg.file}`}
                            alt="img"
                            className="inline-block max-w-[200px] max-h-[200px] rounded mb-1 border-2 border-green-500"
                          />
                        ) : (
                          <a
                            href={msg.file.startsWith("http") ? msg.file : `http://localhost:3000${msg.file.startsWith("/") ? "" : "/"}${msg.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            {msg.file.split('/').pop() || "Tải file"}
                          </a>
                        )
                      )}
                      <div
                        className={`inline-block px-4 py-2 rounded-lg border-2 ${
                          msg.senderID === user?._id
                            ? "bg-green-100 text-green-800 border-green-500"
                            : "bg-gray-100 text-gray-800 border-green-300"
                        }`}
                      >
                        {msg.decryptedText && msg.decryptedText !== "[Không giải mã được]"
                          ? msg.decryptedText
                          : msg.file 
                            ? "" // Không hiển thị gì nếu là file
                            : "[Không giải mã được]"}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="p-4 border-t">
                {file && (
                  <div className="mb-2">
                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-24 h-24 object-cover rounded border"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7v10M17 7v10M7 7h10M7 17h10" />
                        </svg>
                        <span>{file.name}</span>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer">
                    <span className="inline-block w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-green-500"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
                    placeholder="Nhập tin nhắn..."
                    disabled={loading}
                  />
                  <button
                    onClick={handleSend}
                    className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 disabled:opacity-50"
                    disabled={loading}
                  >
                    Gửi
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
      </div>

      {/* Video call modal */}
      {showVideoCall && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 flex flex-col items-center">
            <div className="mb-2 font-bold">Video Call</div>
            <video ref={localVideoRef} autoPlay playsInline muted className="w-64 h-48 bg-black rounded mb-2" />
            <video ref={remoteVideoRef} autoPlay playsInline className="w-64 h-48 bg-black rounded mb-2" />
            <button
              onClick={handleEndVideoCall}
              className="px-4 py-2 bg-red-500 text-white rounded"
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
