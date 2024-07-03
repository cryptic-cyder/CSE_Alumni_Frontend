import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Discussion.css";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import { useHistory } from "react-router-dom";

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const history = useHistory();

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Fetch messages every 2 seconds
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const fetchMessages = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Token not found...Please log in first");
      history.push("/admin-login");
      return;
    }

    const requestBody = { token };

    try {
      const response = await axios.post(
        "http://localhost:8181/messages/fetch",
        requestBody
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    const token = localStorage.getItem("tokenUser");

    if (!token) {
      alert("Token not found...You have not logged in...Please log in first");
      history.push("/admin-login");
      return;
    }
    console.log(newMessage);
    const requestBody = {
      content: newMessage,
    };

    try {
      const response = await axios.post(
        "http://localhost:8181/messages/send",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="App">
      <Navbar1 />
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            <div className="message-owner">{message.owner}</div>
            <div className="message-content">{message.content}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div className="spacer"></div>
      <Footer />
    </div>
  );
}

export default App;
