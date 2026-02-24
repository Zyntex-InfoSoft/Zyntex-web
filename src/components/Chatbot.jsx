import React, { useState, useRef, useEffect } from 'react';
import Bytez from "bytez.js";
import './Chatbot.css';
import chatbotLogo from '../assets/images/chat.png';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [showToggle, setShowToggle] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi there! 👋 Welcome to Zyntex Infosoft. How can I help you today?",
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
            id: 2,
            text: "💡 Hint: Type 'service' for services info or 'cost' for pricing details.",
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    // AI Configuration (Bytez SDK)
    const API_KEY = import.meta.env.VITE_BYTEZ_API_KEY;
    const sdk = API_KEY ? new Bytez(API_KEY) : null;
    const model = sdk ? sdk.model("google/gemini-3-flash-preview") : null;

    const SYSTEM_PROMPT = `
STRICT SCOPE: You are the "Zyntex Assistant." ONLY answer questions about Zyntex Infosoft and IT business services.
Zyntex Infosoft specializes in:
- Web Development, Mobile Apps, AI & ML, UI/UX, Cloud, and CyberSecurity.

STRICT RULES:
1. If the user asks about ANYTHING outside of IT/Software/Zyntex (e.g., social media growth, cooking, personal advice, general trivia), politely refuse by saying: "I'm sorry, I can only assist with IT business-related inquiries and Zyntex services. How can I help with your tech project?"
2. Be extremely concise. Keep responses under 3 sentences unless technical details are specifically requested.
3. Pricing (INR): Basic Website (₹5,000+), E-commerce (₹25,000+), Mobile App (₹40,000+).
4. Process: Plan -> Design -> Build -> Test -> Launch.

Email: zyntexinfosoft@gmail.com | Phone: +91 96647 47560
`;

    const getAIResponse = async (userText) => {
        if (!model || !API_KEY) {
            console.warn("Bytez API Key missing or model initialization failed. Falling back to static logic.");
            return getBotResponse(userText);
        }

        try {
            const { error, output } = await model.run([
                {
                    "role": "user",
                    "content": `${SYSTEM_PROMPT}\n\nUser Question: ${userText}`
                }
            ]);

            if (error) {
                console.error("Bytez API Error:", error);
                return getBotResponse(userText);
            }

            return output.content || output;
        } catch (error) {
            console.error("AI Error:", error);
            return getBotResponse(userText); // Fallback to backup logic
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    // Show toggle button after 3 seconds delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowToggle(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    // Listen for custom event to open chatbot from navbar
    useEffect(() => {
        const handleOpenChatbot = () => {
            setShowToggle(true);
            if (!isOpen) {
                setIsOpen(true);
            }
        };

        window.addEventListener('openChatbot', handleOpenChatbot);
        return () => window.removeEventListener('openChatbot', handleOpenChatbot);
    }, [isOpen]);

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

    const handleQuickReply = async (text) => {
        const userMsg = {
            id: Date.now(),
            text: text,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        const responseText = await getAIResponse(text);

        setIsTyping(false);
        setMessages(prev => [...prev, {
            id: Date.now() + 1,
            text: responseText,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
    };

    const handleSend = async (e) => {
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

        // Show typing indicator
        setIsTyping(true);

        const responseText = await getAIResponse(userMsg.text);

        setIsTyping(false);
        setMessages(prev => [...prev, {
            id: Date.now() + 1,
            text: responseText,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
    };

    const getBotResponse = (text) => {
        const lowerText = text.toLowerCase();

        // Greetings
        if (lowerText.match(/\b(hi|hello|hey|greetings|start|good morning|good evening|good afternoon)\b/))
            return "Hello! 👋 Ready to create something amazing? You can use the buttons below to explore!";

        // Company Intro
        if (lowerText.match(/\b(who are you|what is zyntex|intro|zyntex|about zyntex|what is this|tell me about|your company|about you)\b/))
            return "Zyntex Infosoft is a tech community solving real-world problems with digital solutions! 🌍✨\n\nWe specialize in Web, Mobile Apps, AI/ML & CyberSecurity.";

        // Tech Stack
        // if (lowerText.match(/\b(tech|technology|stack|technologies|react|node|javascript|python|framework)\b/))
        //     return "💻 We use the latest tech:\n\n• Frontend: React, Next.js, Vue, Tailwind\n• Backend: Node.js, Python/Django, FastAPI\n• Mobile: React Native, Flutter\n• AI: TensorFlow, PyTorch, OpenAI API";

        // Timeline / Process
        if (lowerText.match(/\b(time|timeline|how long|duration|process|steps)\b/))
            return "⏱ Typical timelines:\n\n• Landing Page: 3-5 days\n• Full Website: 2-4 weeks\n• Mobile App: 4-8 weeks\n\nWe follow Agile development: Plan → Design → Build → Test → Launch! 🚀";

        // Interest in Building - App/Website/Project
        if (lowerText.match(/\b(i want|i need|build|create|develop|make|looking for|interested|need help|want to build|want to create|want to develop|i'm interested|im interested|want a|need a)\b/) &&
            lowerText.match(/\b(app|application|website|web app|mobile app|software|project|platform|system|ecommerce|e-commerce|portal|dashboard|saas|mvp|startup|business|shop|store|blog|landing page)\b/))
            return "That's awesome! 🎉 We'd love to help you build that!✶\n\n📝 Why not connect with us by filling out the contact form? Our team will get back to you within 24 hours!✶\n\n👇 Scroll down to find the contact form or type 'contact' for our details.";

        // General Interest/Help Request
        if (lowerText.match(/\b(i want|i need|help me|can you help|interested in|looking to|want to start|need assistance|require|seeking)\b/))
            return "We're here to help! 💪\n\n📝 Fill out our contact form and let's discuss your requirements. We'll get back to you ASAP!✶\n\nType 'service' to see what we offer or 'contact' for our details.";

        // Services
        if (lowerText.match(/\b(service|services|offer|what do you do|what you do|capabilities|solutions|expertise)\b/))
            return "We offer:\n• 🌐 Web Development\n• 📱 Mobile Apps (iOS & Android)\n• 🎨 UI/UX Design\n• 🤖 AI & ML Solutions\n• ☁️ Cloud Solutions\n• 🛒 E-commerce Development\n• 🔧 Custom Software\n\nInterested? Type 'quote' or fill the contact form! 📝";

        // Cost / Pricing / Quote
        if (lowerText.match(/\b(cost|price|pricing|quote|rate|expensive|cheap|budget|how much|fees|charges|estimate|affordable)\b/))
            return "💰 Our pricing depends on project scope (Special Gujarat Discounted Rates):\n\n• Basic Website: ₹5,000 - ₹10,000\n• E-commerce: ₹25,000 - ₹45,000\n• Mobile App: ₹40,000 - ₹70,000\n\n📝 Fill the contact form for a FREE custom quote!";

        // Contact
        if (lowerText.match(/\b(contact|email|phone|call|reach|address|location|connect|get in touch|talk|speak|meet)\b/))
            return "📞 Let's connect!✶\n\n📧 Email: zyntexinfosoft@gmail.com\n📱 Phone: +91 96647 47560\n\n📝 Or fill out the contact form below for quick response!";

        return "I'm not sure I understand. 🤔\n\nTry using the Quick Buttons below or ask about:\n• Our Services\n• Pricing\n• Tech Stack\n• Or just say 'Hi'! 👋";
    };

    return (
        <div className="chatbot-container">
            {/* Window */}
            {(isOpen || isClosing) && (
                <div className={`chatbot-window ${isClosing ? 'closing' : ''}`}>
                    {/* Header */}
                    <div className="chat-header">
                        <div className="chat-header-info">
                            <div className="bot-avatar">
                                <img src={chatbotLogo} alt="Bot" />
                            </div>
                            <div className="chat-title">
                                <h3>Zyntex Assistant</h3>
                                <p>Online & Ready to Help</p>
                            </div>
                        </div>
                        <button className="close-btn" onClick={handleToggle}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        className="chat-messages"
                        data-lenis-prevent
                        onWheel={(e) => e.stopPropagation()}
                    >
                        <div className="chat-body-bg"></div>
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                {msg.sender === 'bot' && (
                                    <div className="message-avatar">
                                        <img src={chatbotLogo} alt="Bot" />
                                    </div>
                                )}
                                <div className="message-bubble">
                                    <div className="message-content">
                                        {msg.text}
                                    </div>
                                    <span className="message-time">{msg.timestamp}</span>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message bot">
                                <div className="message-avatar">
                                    <img src={chatbotLogo} alt="Bot" />
                                </div>
                                <div className="message-bubble">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Chips */}
                    <div className="quick-chips">
                        <button onClick={() => handleQuickReply("Services")}>🛠 Services</button>
                        <button onClick={() => handleQuickReply("Pricing")}>💰 Pricing</button>
                        <button onClick={() => handleQuickReply("Contact")}>📞 Contact</button>
                        <button onClick={() => handleQuickReply("Timeline")}>⏱ Timeline</button>
                    </div>

                    {/* Input */}
                    <div className="chat-input-area">
                        <form onSubmit={handleSend} className="input-wrapper">
                            <input
                                type="text"
                                className="chat-input"
                                placeholder="Type your message..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button type="submit" className="send-btn" disabled={!inputValue.trim()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </form>
                        <div className="powered-by">
                            Powered by <span>Zyntex AI</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            {showToggle && !isOpen && (
                <button className={`chatbot-toggle ${!isOpen ? 'pulse' : ''}`} onClick={handleToggle}>
                    <div className={`chatbot-icon ${isOpen ? 'open' : ''}`}>
                        <img src={chatbotLogo} alt="Chat" />
                    </div>
                    <span className="chatbot-text">Chat with us!</span>
                </button>
            )}
        </div>
    );
};

export default Chatbot;
