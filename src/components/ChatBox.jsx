import React, { useState, useEffect } from "react";
import { connectSocket } from "../services/socket"; // Đường dẫn đúng tới file socket.js

const socket = connectSocket();

const ChatBox = ({ onClose }) => {
  const [users, setUsers] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const myId = user?._id;

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn chưa đăng nhập hoặc token đã hết hạn!");
        return;
      }
      try {
        const res = await fetch("http://localhost:3000/api/message/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log("API response:", data);
        setUsers(data);
        
      } catch (err) {
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const handleSelectUser = async (userId) => {
    setChatId(userId);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/message/getmessages/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      // Giả sử backend trả về mảng messages
      setMessages(data);
    } catch (err) {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !chatId) return;
    const messageText = input;
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3000/api/message/send/${chatId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: messageText }),
      });
      // Không cần fetch lại lịch sử chat ở đây, socket sẽ tự động cập nhật
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Không gửi được tin nhắn!", senderID: null },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!socket || !myId) return;
    socket.emit("join", myId);
  }, [myId]);

  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (msg) => {
      console.log("Received newMessage from backend:", msg);
      // Nếu đúng đoạn chat đang mở thì cập nhật messages
      if (
        (msg.senderID === myId && msg.receiverID === chatId) ||
        (msg.senderID === chatId && msg.receiverID === myId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socket.on("newMessage", handleNewMessage);
  
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [chatId, myId]);

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col">
      <div className="flex justify-between items-center p-3 border-b">
        <span className="font-semibold">Chat hỗ trợ</span>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">&times;</button>
      </div>
      {!chatId ? (
        <div className="p-3">
          <div className="font-semibold mb-2">Chọn người để nhắn tin:</div>
          <ul>
            {users.map((user) => (
              <li
                key={user._id}
                className="cursor-pointer hover:bg-green-100 rounded px-2 py-1"
                onClick={() => handleSelectUser(user._id)}
              >
                {user.companyName || user.name  || "Không tên"}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <div className="flex-1 p-3 overflow-y-auto" style={{ maxHeight: 300 }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 ${msg.senderID === myId ? "text-right" : "text-left"}`}>
                <span className={`inline-block px-3 py-2 rounded-lg ${msg.senderID === myId ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex border-t p-2">
            <input
              className="flex-1 border rounded-lg px-2 py-1 mr-2"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !loading && handleSend()}
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
    </div>
  );
};

export default ChatBox;