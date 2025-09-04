import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hi! Welcome to Cabbieo Web Service. How can I help you today?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = { id: (Date.now() + 1).toString(), text: getBotResponse(inputValue), sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('price')) return 'Our templates start from ₹499. For custom projects, we provide a detailed quote after a brief consultation. Would you like to schedule one?';
    if (lowerInput.includes('service')) return 'We specialize in web development, mobile apps, and e-commerce solutions. What are you looking to build?';
    if (lowerInput.includes('time')) return 'A standard website takes about 2-4 weeks. Complex projects may take longer. We can provide a precise timeline once we know your requirements.';
    return 'Thanks for your message! A specialist will be with you shortly. In the meantime, feel free to ask me anything else.';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 z-50 w-80 h-[450px] bg-gray-800/50 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl"
        >
          <div className="flex flex-col h-full">
            <div className="bg-gray-900/70 p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle size={20} className="text-blue-400"/>
                <span className="font-semibold text-white">Live Chat</span>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.sender === 'bot' && <div className="w-7 h-7 rounded-full flex items-center justify-center bg-blue-500 text-white flex-shrink-0"><Bot size={16} /></div>}
                  <div className={`px-3 py-2 rounded-lg max-w-[80%] ${message.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                  {message.sender === 'user' && <div className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-600 text-white flex-shrink-0"><User size={16} /></div>}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-blue-500 text-white flex-shrink-0"><Bot size={16} /></div>
                  <div className="bg-gray-700 px-3 py-2 rounded-lg rounded-bl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-white/20">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={handleSendMessage} disabled={!inputValue.trim()} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"><Send size={16} /></button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWidget;
