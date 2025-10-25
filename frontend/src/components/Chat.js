import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Chat() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = () => {
    if (name && message) {
      const msgData = { name, message };
      socket.emit("chat message", msgData);
      setMessage("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>💬 Real-Time Chat</h1>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ marginRight: "10px", padding: "5px", width: "300px" }}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage} style={{ padding: "6px 12px" }}>
        Send
      </button>

      <div style={{ marginTop: "30px", maxWidth: "500px", marginLeft: "auto", marginRight: "auto", textAlign: "left" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ borderBottom: "1px solid #ccc", padding: "5px 0" }}>
            <strong>{msg.name}:</strong> {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
