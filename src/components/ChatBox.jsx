import React, { useState, useEffect, useRef, useMemo } from "react";
import { connectSocket } from "../services/socket"; // Đường dẫn đúng tới file socket.js
import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt";

const socket = connectSocket();

function decryptMessage(encryptedText, privateKey) {
  if (!privateKey) return "[Chưa có private key]";
  const decryptor = new JSEncrypt();
  decryptor.setPrivateKey(privateKey);
  const decrypted = decryptor.decrypt(encryptedText);
  return decrypted || "[Không giải mã được]";
}

const ChatBox = ({ onClose, receiver, unreadSenders, onReadMessage, users }) => {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const encryptedPrivateKey = user?.encryptedPrivateKey;
  const password = user?.username || user?.companyName; // hoặc lấy từ localStorage.getItem("password")
  
  let decryptedPrivateKey = "";
  if (encryptedPrivateKey && password) {
    const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, password);
    decryptedPrivateKey = bytes.toString(CryptoJS.enc.Utf8);
  }

  const myId = user?._id;

  // Thêm ref để chỉ set chatId từ receiver khi ChatBox mount hoặc receiver thực sự thay đổi
  const hasSetFromReceiver = useRef(false);

  // Nếu có receiver thì tự động set chatId
  useEffect(() => {
    if (receiver && receiver._id && !hasSetFromReceiver.current) {
      setChatId(receiver._id);
      handleSelectUser(receiver._id);
      hasSetFromReceiver.current = true;
    }
    // Nếu receiver là null thì reset flag
    if (!receiver) {
      hasSetFromReceiver.current = false;
    }
  }, [receiver]);

  // Khi nhấn "Quay lại", reset chatId và flag
  const handleBack = () => {
    setChatId(null);
    hasSetFromReceiver.current = true; // Để tránh tự động set lại chatId từ receiver
  };

  const handleSelectUser = async (userId) => {
    setChatId(userId);
    setLoading(true);
    setPage(1); // Reset page khi chọn user mới
    setHasMore(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(

        `https://findwork-backend.onrender.com/api/message/getmessages/${userId}?page=1&limit=10`,

        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setMessages(data.messages);
      setHasMore(data.hasMore);
      console.log("hasmore:", data.hasMore);
      console.log("messages select user:", data.messages);
      console.log("total messages:", data.totalMessages);
      onReadMessage(userId);
    } catch (err) {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMessages = async () => {
    if (!hasMore || loadingMore) return;
    
    setLoadingMore(true);
    try {
      const token = localStorage.getItem("token");
      const nextPage = page + 1;
      const res = await fetch(
        `https://findwork-backend.onrender.com/api/message/getmessages/${chatId}?page=${nextPage}&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setMessages(prev => [...data.messages, ...prev]);
      setHasMore(data.hasMore);
      console.log("hasmore load more:", data.hasMore);
      console.log("messages load more:", data.messages);
      setPage(nextPage);
    } catch (err) {
      console.error("Error loading more messages:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    
    const { scrollTop } = chatContainerRef.current;
    if (scrollTop === 0 && hasMore && !loadingMore) {
      loadMoreMessages();
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !file) || !chatId) return;
    setLoading(true);

    if (chatId === "chatbot") {
      // Gửi câu hỏi lên chatbot, KHÔNG mã hóa
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `https://findwork-backend.onrender.com/api/message/chatbot?question=${encodeURIComponent(input)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setMessages(prev => [
          ...prev,
          {
            senderID: myId,
            decryptedText: input,
            textForSender: input,
            textForReceiver: input
          },
          { senderID: "chatbot", decryptedText: data.answer || "Không có phản hồi từ AI" }
        ]);
        setInput("");
      } catch (err) {
        setMessages(prev => [
          ...prev,
          { senderID: myId, decryptedText: input },
          { senderID: "chatbot", decryptedText: "Lỗi khi gọi AI" }
        ]);
        setInput("");
      } finally {
        setLoading(false);
      }
      return;
    }

    setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();

        // Lấy publicKey của người nhận
        const receiverUser = users.find((u) => u._id === chatId) || receiver;
        const receiverPublicKey = receiverUser?.publicKey || "";
        if (!receiverPublicKey) {
          alert("Không tìm thấy public key của người nhận!");
          setLoading(false);
          return;
        }

        // Lấy publicKey của chính mình
        const myPublicKey = user?.publicKey;
      
        if (!myPublicKey) {
          alert("Không tìm thấy public key của bạn!");
          setLoading(false);
          return;
        }

        let encryptedTextForReceiver = "";
        let encryptedTextForSender = "";

        if (input.trim()) {
          // Chỉ mã hóa nếu có text
          const encryptorReceiver = new JSEncrypt();
          encryptorReceiver.setPublicKey(receiverPublicKey);
          encryptedTextForReceiver = encryptorReceiver.encrypt(input);

          const encryptorSender = new JSEncrypt();
          encryptorSender.setPublicKey(myPublicKey);
          encryptedTextForSender = encryptorSender.encrypt(input);

          formData.append("textForReceiver", encryptedTextForReceiver);
          formData.append("textForSender", encryptedTextForSender);
        }

        if (file) formData.append("file", file);

        const response = await fetch(`https://findwork-backend.onrender.com/api/message/send/${chatId}`, {

          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },  
          body: formData,
        });

        const data = await response.json();

        // Thêm tin nhắn mới vào state messages
        setMessages(prev => [...prev, {
          senderID: myId,
          receiverID: chatId,
          textForSender: encryptedTextForSender,
          textForReceiver: encryptedTextForReceiver,
          file: file ? URL.createObjectURL(file) : null,
          createdAt: new Date().toISOString()
        }]);

        setInput("");
        setFile(null);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          { text: "Không gửi được tin nhắn!", senderID: null },
        ]);
      } finally {
        setLoading(false);
      }
    }, 0);
  };

  useEffect(() => {
    if (!socket || !myId) return;
    socket.emit("join", myId);
  }, [myId]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
      // Chỉ cập nhật nếu đúng đoạn chat đang mở và không phải tin nhắn do mình gửi
      if (
        (msg.senderID === chatId && msg.receiverID === myId) // Tin nhắn từ người khác gửi đến mình
      ) {
        setMessages(prev => {
          // Kiểm tra trùng lặp
          if (prev.some(m => m._id === msg._id && msg._id)) return prev;
          return [...prev, msg];
        });
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [chatId, myId, socket]);

  const decryptedMessages = useMemo(() => {
    const decrypted = messages.map((msg) => {
      // Nếu là AI thì không giải mã, dùng decryptedText luôn
      if (msg.senderID === "chatbot") {
        return { ...msg, decryptedText: msg.decryptedText || msg.text || msg.answer || msg.textForSender || msg.textForReceiver };
      }
      // Nếu là tin nhắn mình gửi cho AI, cũng không giải mã mà dùng text gốc
      if (chatId === "chatbot" && msg.senderID === myId) {
        return { ...msg, decryptedText: msg.decryptedText || msg.textForSender || msg.textForReceiver };
      }
      // Tin nhắn người thật thì giải mã như cũ
      return {
        ...msg,
        decryptedText:
          msg.senderID === myId
            ? decryptMessage(msg.textForSender, decryptedPrivateKey)
            : decryptMessage(msg.textForReceiver, decryptedPrivateKey),
      };
    });
    
    
    return decrypted;
  }, [messages, decryptedPrivateKey, myId, chatId]);


  const handleStartVideoCall = async () => {
    setShowVideoCall(true);
    // Lấy camera/mic
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStreamRef.current = stream;
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;

    // Tạo peer connection
    const pc = new RTCPeerConnection();
    peerConnectionRef.current = pc;
    stream.getTracks().forEach(track => pc.addTrack(track, stream));

    // Khi nhận được stream từ peer
    pc.ontrack = (event) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
    };

    // Gửi offer
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("webrtc-signal", { to: chatId, data: { candidate: event.candidate } });
      }
    };

    // Nếu là người gọi, tạo offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    // Đúng tên sự kiện server đang lắng nghe:
    socket.emit("webrtc-signal", { to: chatId, data: { offer } });
  };

  const handleEndVideoCall = () => {
    setShowVideoCall(false);
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(t => t.stop());
      localStreamRef.current = null;
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleSignal = async ({ from, data }) => {
      if (!data) return;

      console.log("from chatbox: ", from);

      if (data.offer) {
        console.log("📥 Received offer from", from);
        if (!showVideoCall) setShowVideoCall(true);

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;

        const pc = new RTCPeerConnection();
        peerConnectionRef.current = pc;
        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        pc.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("webrtc-signal", {
              to: from,
              data: { candidate: event.candidate }
            });
          }
        };

        await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("webrtc-signal", { to: from, data: { answer } });

      } else if (data.answer) {
        console.log("📥 Received answer from", from);
        if (peerConnectionRef.current?.signalingState !== 'closed') {
          await peerConnectionRef.current?.setRemoteDescription(
            new RTCSessionDescription(data.answer)
          );
        }

      } else if (data.candidate) {
        console.log("📥 Received candidate from", from);
        try {
          if (peerConnectionRef.current?.signalingState !== 'closed') {
            await peerConnectionRef.current?.addIceCandidate(
              new RTCIceCandidate(data.candidate)
            );
          }
        } catch (err) {
          console.error("Error adding candidate", err);
        }
      }
    };

    socket.on("webrtc-signal", handleSignal);

    return () => {
      socket.off("webrtc-signal", handleSignal);
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
        localStreamRef.current = null;
      }
    };
  }, [chatId]);


  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 max-h-[80vh] bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col">
      <div className="flex justify-between items-center p-3 border-b">
        <div className="flex items-center gap-2">
          {chatId && (
            <button
              onClick={handleBack}
              className="text-gray-500 hover:text-green-600 text-lg mr-2"
              title="Quay lại danh sách"
            >
              &#8592;
            </button>
          )
          }
          <span className="font-semibold">
            {chatId === "chatbot"
              ? "🤖 Chat với AI"
              : (
                
                users.find((u) => u._id === chatId)?.fname ||
                users.find((u) => u._id === chatId)?.username ||
                users.find((u) => u._id === chatId)?.companyName ||
                receiver?.fname ||
                receiver?.username ||
                receiver?.companyName ||
                "Người dùng"
              )
            }
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Chỉ hiện nút gọi video khi đã chọn người chat và không phải AI */}
          {chatId && chatId !== "chatbot" && (
            <button
              onClick={handleStartVideoCall}
              className="text-gray-500 hover:text-blue-600 text-xl"
              title="Gọi video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 19h8a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
          )}
          {/* Nút đóng */}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            &times;
          </button>
        </div>
      </div>
      {!chatId ? (
        <div className="p-3">
          <ul>
            {/* Nút chat với AI */}
            <li
              className="cursor-pointer hover:bg-blue-100 rounded px-2 py-1 flex justify-between items-center font-semibold text-blue-700"
              onClick={() => {
                setChatId("chatbot");
                setMessages([]);
              }}
            >
              🤖 Chat với AI
            </li>
            {/* Các user thật */}
            {users.map((user) => (
              <li
                key={user._id}
                className={`cursor-pointer hover:bg-green-100 rounded px-2 py-1 flex justify-between items-center ${
                  unreadSenders.has(user._id) ? 'border-2 border-red-500' : ''
                }`}
                onClick={() => handleSelectUser(user._id)}
              >
                <span>
                  {user.fname ||
                    user.name ||
                    user.username ||
                    user.companyName ||
                    user.email ||
                    user._id ||
                    "Không tên"}
                </span>
                {unreadSenders.has(user._id) && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Mới
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <div
            ref={chatContainerRef}
            className="flex-1 p-3 overflow-y-auto"
            style={{ maxHeight: 300 }}
            onScroll={handleScroll}
          >
           
            {decryptedMessages.map((msg, idx) => {
              // Đoán loại file dựa vào đuôi file
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
                  className={`mb-2 ${msg.senderID === myId ? "text-right" : "text-left"}`}
                >
                  {msg.file && (
                    isImage ? (
                      <img
                        src={
                          msg.file.startsWith("http")
                            ? msg.file
                            : `https://findwork-backend.onrender.com${
                                msg.file.startsWith("/") ? "" : "/"
                              }${msg.file}`
                        }
                        alt="img"
                        className="inline-block max-w-[120px] max-h-[120px] rounded mb-1"
                      />
                    ) : (
                      <a
                        href={
                          msg.file.startsWith("http")
                            ? msg.file
                            : `https://findwork-backend.onrender.com${
                                msg.file.startsWith("/") ? "" : "/"
                              }${msg.file}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        { msg.file || "Tải file"}
                      </a>
                    )
                  )}
                  <span
                    className={`inline-block px-3 py-2 rounded-lg ${
                      msg.senderID === myId
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.decryptedText && msg.decryptedText !== "[Không giải mã được]"
                      ? msg.decryptedText
                      : (msg.file)
                        ? "" // Nếu là file, không hiển thị lỗi giải mã
                        : "[Không giải mã được]"}
                  </span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
          {/* Hiển thị ảnh preview nếu đã chọn, nằm trên khung nhập */}
          {/* Hiển thị file preview nếu đã chọn, nằm trên khung nhập */}
          {file && (
            <div className="w-full flex justify-start mb-2">
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="inline-block w-24 h-24 object-cover rounded border"
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
          <div className="flex border-t p-2 items-center bg-white">
            {/* Nút chọn ảnh */}
            <label className="cursor-pointer flex items-center mr-2">
              <span className="inline-block w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
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
              className="flex-1 border rounded-lg px-2 py-1 mr-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
              placeholder="Nhập tin nhắn..."
              disabled={loading}
            />
            <button
              onClick={handleSend}
              className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700"
              disabled={loading}
            >
              Gửi
            </button>
          </div>
        </>
      )}
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

export default ChatBox;