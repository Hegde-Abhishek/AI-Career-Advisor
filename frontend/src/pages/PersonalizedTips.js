import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';
import './PersonalizedTips.css'; // Import CSS file

const Message = ({ msg }) => (
    <div className={`message ${msg.sender}`}>
        <p>{msg.text}</p>
        <span className="timestamp">{msg.timestamp}</span>
    </div>
);

const PersonalizedTips = () => {
    const [conversation, setConversation] = useState([]);
    const [input, setInput] = useState('');
    const chatWindowRef = useRef(null);

    useEffect(() => {
        sendInitialPrompt();
    }, []);

    useEffect(() => {
        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }, [conversation]);

    const sendInitialPrompt = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User ID not found');
            return;
        }
        try {
            const profileResponse = await axios.get(`http://127.0.0.1:5000/api/users/profile/${userId}`);
            const userProfile = profileResponse.data;
            const initialPrompt = 'my personalized tips';
            await sendMessage(initialPrompt, userId, userProfile);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSend = async (event) => {
        if (event.key === 'Enter' || event.type === 'click') {
            const userId = localStorage.getItem('userId');
            await sendMessage(input, userId);
            setInput(''); // Clear input after sending
        }
    };

    const sendMessage = async (message) => {
        const userId = localStorage.getItem('userId');
        const timestamp = new Date().toLocaleTimeString();
        setConversation(prev => [...prev, { text: message, sender: 'user', timestamp }]);
    
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/personalized-tips', { userId, input: message });
            setConversation(prev => [...prev, { text: response.data.response, sender: 'bot', timestamp }]);
        } catch (error) {
            console.error('Error sending message:', error);
            setConversation(prev => [...prev, { text: 'Failed to fetch response. Please try again later.', sender: 'bot', timestamp }]);
        }
    };

    return (
        <div className="personalized-tips-container">
            <h2></h2>
            <div className="chat-window" ref={chatWindowRef}>
                {conversation.map((msg, index) => <Message key={index} msg={msg} />)}
            </div>
            <div className="input-container">
                <input value={input} onChange={handleInputChange} onKeyPress={handleSend} placeholder="Type your message here" />
                <button onClick={handleSend}><FaPaperPlane /></button>
            </div>
        </div>
    );
};

export default PersonalizedTips;
