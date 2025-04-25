import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./routes/AnimatedRoutes";
import "./styles/App.css";
import ChatBox from "./components/ChatBox";

function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
      <button
        className="fixed bottom-6 right-6 z-40 bg-green-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setShowChat(true)}
        style={{ display: showChat ? "none" : "block" }}
      >
        Chat
      </button>
      {showChat && <ChatBox onClose={() => setShowChat(false)} />}
    </>
  );
}

export default App;
