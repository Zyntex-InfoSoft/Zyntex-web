import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [messages, setMessages] = useState([
        { 
            id: 1, 
            text: "Hi there! 👋 Welcome to Zyntex Infosoft. How can I help you today?", 
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleToggle = () => {
        if (isOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsOpen(false);
                setIsClosing(false);
            }, 300); // Match animation duration
        } else {
            setIsOpen(true);
        }
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue("");

        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(userMsg.text);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: botResponse,
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }, 1000);
    };

    const getBotResponse = (text) => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('hello') || lowerText.includes('hi')) return "Hello! ready to create something amazing?";
        if (lowerText.includes('service') || lowerText.includes('offer')) return "We offer Web Development, UI/UX Design, and digital branding services.";
        if (lowerText.includes('contact') || lowerText.includes('email')) return "You can reach us at contact@zyntex.com or use the contact form on this page.";
        if (lowerText.includes('price') || lowerText.includes('cost')) return "Our pricing depends on the project scope. Let's chat about your requirements!";
        return "Thanks for your message! This is a demo bot, but a real human will be with you shortly if you leave your contact info.";
    };

    return (
        <div className="chatbot-container">
            {/* Chat Window */}
            {(isOpen || isClosing) && (
                <div className={`chatbot-window ${isClosing ? 'closing' : ''}`}>
                    <div className="chat-header">
                        <div className="chat-header-info">
                            <div className="bot-avatar">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2.5C13.1046 2.5 14 3.39543 14 4.5C14 5.60457 13.1046 6.5 12 6.5C10.8954 6.5 10 5.60457 10 4.5C10 3.39543 10.8954 2.5 12 2.5ZM11 6.38202V8.04949C6.98592 8.52985 4 11.9079 4 16C4 16.5523 4.44772 17 5 17H19C19.5523 17 20 16.5523 20 16C20 11.9079 17.0141 8.52985 13 8.04949V6.38202C13.5978 6.13664 14 5.56846 14 4.5C14 3.39543 13.1046 2.5 12 2.5C10.8954 2.5 10 3.39543 10 4.5C10 5.56846 10.4022 6.13664 11 6.38202ZM9 13C9.55228 13 10 12.5523 10 12C10 11.4477 9.55228 11 9 11C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13ZM15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13Z"/>
                                    <path d="M21 12C21.5523 12 22 12.4477 22 13V15C22 15.5523 21.5523 16 21 16C20.4477 16 20 15.5523 20 15V13C20 12.4477 20.4477 12 21 12Z" fill="white"/>
                                    <path d="M3 12C3.55228 12 4 12.4477 4 13V15C4 15.5523 3.55228 16 3 16C2.44772 16 2 15.5523 2 15V13C2 12.4477 2.44772 12 3 12Z" fill="white"/>
                                </svg>
                                <div className="bot-status-dot"></div>
                            </div>
                            <div className="chat-title">
                                <h3>Zyntex AI</h3>
                                <p>Online</p>
                            </div>
                        </div>
                        <button className="close-btn" onClick={handleToggle}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <div className="chat-messages">
                        <div className="chat-body-bg"></div>
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                <div className="message-content">{msg.text}</div>
                                <span className="message-time">{msg.timestamp}</span>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chat-input-area" onSubmit={handleSend}>
                        <input 
                            type="text" 
                            className="chat-input" 
                            placeholder="Type a message..." 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="submit" className="send-btn" disabled={!inputValue.trim()}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button className="chatbot-toggle" onClick={handleToggle}>
                <div className={`chatbot-icon ${isOpen ? 'open' : ''}`}>
                    {isOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2.5C13.1046 2.5 14 3.39543 14 4.5C14 5.60457 13.1046 6.5 12 6.5C10.8954 6.5 10 5.60457 10 4.5C10 3.39543 10.8954 2.5 12 2.5ZM11 6.38202V8.04949C6.98592 8.52985 4 11.9079 4 16C4 16.5523 4.44772 17 5 17H19C19.5523 17 20 16.5523 20 16C20 11.9079 17.0141 8.52985 13 8.04949V6.38202C13.5978 6.13664 14 5.56846 14 4.5C14 3.39543 13.1046 2.5 12 2.5C10.8954 2.5 10 3.39543 10 4.5C10 5.56846 10.4022 6.13664 11 6.38202ZM9 13C9.55228 13 10 12.5523 10 12C10 11.4477 9.55228 11 9 11C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13ZM15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13Z"/>
                            <path d="M21 12C21.5523 12 22 12.4477 22 13V15C22 15.5523 21.5523 16 21 16C20.4477 16 20 15.5523 20 15V13C20 12.4477 20.4477 12 21 12Z"/>
                            <path d="M3 12C3.55228 12 4 12.4477 4 13V15C4 15.5523 3.55228 16 3 16C2.44772 16 2 15.5523 2 15V13C2 12.4477 2.44772 12 3 12Z"/>
                        </svg>
                    )}
                </div>
                {!isOpen && <span className="chatbot-text">Zyntex Bot</span>}
            </button>
        </div>
    );
};

export default Chatbot;
