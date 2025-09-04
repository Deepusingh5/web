import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onChatOpen: () => void;
  scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onChatOpen, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', name: 'Home' },
    { id: 'why-us', name: 'Why Us' },
    { id: 'mission', name: 'Our Mission' },
    { id: 'templates', name: 'Models' },
    { id: 'testimonials', name: 'Clients' },
    { id: 'faq', name: 'FAQ' },
    { id: 'contact', name: 'Contact' },
  ];

  return (
    <header className="fixed top-0 w-full bg-gray-900/70 backdrop-blur-lg border-b border-gray-700/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleScroll('home')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CW</span>
            </div>
            <span className="text-xl font-bold text-white">Cabbieo Web Service</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => handleScroll(link.id)} className="text-gray-300 hover:text-white transition-colors">{link.name}</button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onChatOpen}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MessageCircle size={18} />
              <span>Chat Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden py-4 border-t border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <button key={link.id} onClick={() => handleScroll(link.id)} className="text-left text-gray-300 hover:text-white transition-colors">{link.name}</button>
              ))}
              <button
                onClick={() => { onChatOpen(); setIsMenuOpen(false); }}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-fit mt-2"
              >
                <MessageCircle size={18} />
                <span>Chat Now</span>
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
