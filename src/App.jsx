import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./routes/AnimatedRoutes";
import "./styles/App.css";
import ChatBox from "./components/ChatBox";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connectSocket } from "./services/socket";

function App() {
  const [showChat, setShowChat] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [unreadSenders, setUnreadSenders] = useState(new Set());
  const [users, setUsers] = useState([]);
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const socket = connectSocket();
  const user = JSON.parse(localStorage.getItem("user"));
  const myId = user?._id;
  const [token, setToken] = useState(localStorage.getItem("token"))

  // Fetch users một lần khi component mount
  useEffect(() => {
    const handleLoginSuccess = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
    };

    // Lắng nghe sự kiện loginSuccess
    window.addEventListener('loginSuccess', handleLoginSuccess);

    return () => {
      window.removeEventListener('loginSuccess', handleLoginSuccess);
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
       const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn chưa đăng nhập hoặc token đã hết hạn!");
        return;
      }
      try {
        const res = await fetch("https://findwork-backend.onrender.com/api/message/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUsers(data);
        console.log("Danh sách người dùng app:", data);
      } catch (err) {
        setUsers([]);
      }
    };
    fetchUsers();
  }, [token]);

  // Thêm nút chat vào góc màn hình
  useEffect(() => {
    const chatButton = document.createElement('button');
    chatButton.className = 'fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors';
    chatButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    `;
    chatButton.onclick = () => setShowChat(true);
    document.body.appendChild(chatButton);

    // Thêm logic để ẩn/hiện nút chat dựa vào showChat
    const updateChatButtonVisibility = () => {
      chatButton.style.display = showChat ? 'none' : 'block';
    };

    // Gọi lần đầu để set trạng thái ban đầu
    updateChatButtonVisibility();

    // Lắng nghe sự kiện khi showChat thay đổi
    const handleShowChatChange = () => {
      updateChatButtonVisibility();
    };

    window.addEventListener('showChatChange', handleShowChatChange);

    return () => {
      document.body.removeChild(chatButton);
      window.removeEventListener('showChatChange', handleShowChatChange);
    };
  }, [showChat]); // Thêm showChat vào dependencies

  // Xử lý kéo thả
  const handleMouseDown = (e) => {
    // Ngăn chặn sự kiện click khi đang kéo
    e.preventDefault();
    setIsDragging(true);
    
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (e) => {
      const newX = e.clientX - startX + position.x;
      const newY = e.clientY - startY + position.y;
      
      // Giới hạn không cho kéo ra ngoài màn hình
      const maxX = window.innerWidth - 60;
      const maxY = window.innerHeight - 60;
      
      setPosition({
        x: Math.min(Math.max(0, newX), maxX),
        y: Math.min(Math.max(0, newY), maxY)
      });
    };

    const handleMouseUp = (e) => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      // Kiểm tra xem có phải là click đơn không
      const distance = Math.sqrt(
        Math.pow(e.clientX - startX, 2) + 
        Math.pow(e.clientY - startY, 2)
      );
      
      // Nếu khoảng cách di chuyển nhỏ hơn 10px, coi như là click
      if (distance < 10) {
        setShowChat(true);
        setUnreadMessages(0);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    if (!socket || !myId) return;
    
    socket.emit("join", myId);

    const handleNewMessage = (msg) => {
      console.log("Nhận tin nhắn mới:", msg);
      
      if (msg.receiverID === myId && !showChat) {
        setUnreadMessages(prev => prev + 1);
        setUnreadSenders(prev => new Set([...prev, msg.senderID]));
        
        toast.info(`Tin nhắn mới từ ${msg.senderName || 'Người dùng'}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, myId, showChat]);

  const handleReadMessage = (senderId) => {
    setUnreadSenders(prev => {
      const newSet = new Set(prev);
      newSet.delete(senderId);
      return newSet;
    });
  };

  return (
    <BrowserRouter>
      <div className="App">
        <AnimatedRoutes users={users} unreadSenders={unreadSenders} />
        {showChat && (
          <ChatBox
            onClose={() => {
              setShowChat(false);
              // Dispatch event khi đóng chat box
              window.dispatchEvent(new Event('showChatChange'));
            }}
            receiver={null}
            unreadSenders={unreadSenders}
            onReadMessage={handleReadMessage}
            users={users}
          />
        )}
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
