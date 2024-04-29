import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const Message = ({ text, isUser }) => (
  <div className={`message ${isUser ? 'user' : 'bot'}`}>
    {text}
  </div>
);

const VisaAdvicePage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchAdvice(userId);
    }
  }, [userId]);

  const fetchAdvice = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/visa-advice/${userId}`);
      setMessages(messages => [...messages, { text: response.data.advice || response.data.message, isUser: false }]);
    } catch (error) {
      console.error('Error fetching visa advice:', error);
      setMessages(messages => [...messages, { text: "Failed to fetch advice.", isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setMessages(messages => [...messages, { text: userInput, isUser: true }]);
    setUserInput('');
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessages(messages => [...messages, { text: "Here's the advice related to your query...", isUser: false }]);
    }, 1000);
  };

  return (
    <div className="visa-advice-container">
      <h3>Visa Related Advice</h3>
      <div className="advice-chat-box">
        {messages.map((msg, index) => <Message key={index} text={msg.text} isUser={msg.isUser} />)}
        {loading && <p>Loading...</p>}
      </div>
      <div className="advice-input-form">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Ask a question..."
          className="advice-input"
        />
        <button onClick={handleSend} className="submit-button">Send</button>
      </div>
    </div>
  );
};

export default VisaAdvicePage;
