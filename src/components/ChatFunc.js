import React, { useState, useEffect, useRef, useMemo } from "react";
import { connectSocket } from "../services/socket";
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

const ChatFunc = ({ onClose, receiver, unreadSenders, onReadMessage, users }) => {
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
  const password = user?.username || user?.companyName;
  
  let decryptedPrivateKey = "";
  if (encryptedPrivateKey && password) {
    const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, password);
    decryptedPrivateKey = bytes.toString(CryptoJS.enc.Utf8);
  }

  const myId = user?._id;
  const hasSetFromReceiver = useRef(false);

  useEffect(() => {
    if (receiver && receiver._id && !hasSetFromReceiver.current) {
      setChatId(receiver._id);
      hasSetFromReceiver.current = true;
    }
    if (!receiver) {
      hasSetFromReceiver.current = false;
    }
  }, [receiver]);

  const handleBack = () => {
    setChatId(null);
    hasSetFromReceiver.current = true;
  };

  
  

  const handleSelectUser = async (userId) => {
    setChatId(userId);
    setLoading(true);
    setPage(1);
    setHasMore(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3000/api/message/getmessages/${userId}?page=1&limit=10`,
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
        `http://localhost:3000/api/message/getmessages/${chatId}?page=${nextPage}&limit=10`,
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
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:3000/api/message/chatbot?question=${encodeURIComponent(input)}`,
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

        const receiverUser = users.find((u) => u._id === chatId) || receiver;
        const receiverPublicKey = receiverUser?.publicKey || "";
        if (!receiverPublicKey) {
          alert("Không tìm thấy public key của người nhận!");
          setLoading(false);
          return;
        }

        const myPublicKey = user?.publicKey;
        if (!myPublicKey) {
          alert("Không tìm thấy public key của bạn!");
          setLoading(false);
          return;
        }

        let encryptedTextForReceiver = "";
        let encryptedTextForSender = "";

        if (input.trim()) {
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

        const response = await fetch(`http://localhost:3000/api/message/send/${chatId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },  
          body: formData,
        });

        const data = await response.json();

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
      if (msg.senderID === "chatbot") {
        return { ...msg, decryptedText: msg.decryptedText || msg.text || msg.answer || msg.textForSender || msg.textForReceiver };
      }
      if (chatId === "chatbot" && msg.senderID === myId) {
        return { ...msg, decryptedText: msg.decryptedText || msg.textForSender || msg.textForReceiver };
      }
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
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStreamRef.current = stream;
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;

    const pc = new RTCPeerConnection();
    peerConnectionRef.current = pc;
    stream.getTracks().forEach(track => pc.addTrack(track, stream));

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("webrtc-signal", { to: chatId, candidate: event.candidate });
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit("webrtc-signal", { to: chatId, data: { offer } });
  };

  const handleEndVideoCall = () => {
    setShowVideoCall(false);
    if (peerConnectionRef.current) peerConnectionRef.current.close();
    if (localStreamRef.current) localStreamRef.current.getTracks().forEach(t => t.stop());
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("webrtc-signal", async ({ from, data }) => {
      if (data.offer) {
        if (!showVideoCall) setShowVideoCall(true);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;

        const pc = new RTCPeerConnection();
        peerConnectionRef.current = pc;
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
        pc.ontrack = (event) => {
          if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
        };
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("webrtc-candidate", { to: from, candidate: event.candidate });
          }
        };
        await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("webrtc-signal", { to: from, data: { answer } });
      } else if (data.answer) {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      } else if (data.candidate) {
        try {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (e) {}
      }
    });

    return () => {
      socket.off("webrtc-signal");
    };
  }, [showVideoCall, chatId]);

  return {
    chatId,
    messages: decryptedMessages,
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
  };
};

export default ChatFunc;
