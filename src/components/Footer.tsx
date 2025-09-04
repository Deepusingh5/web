import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Send, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  scrollToSection: (sectionId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToSection }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CW</span>
              </div>
              <span className="text-xl font-bold text-white">Cabbieo Web Service</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Crafting digital masterpieces with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li><button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => scrollToSection('why-us')} className="text-gray-400 hover:text-white transition-colors">Why Us</button></li>
              <li><button onClick={() => scrollToSection('mission')} className="text-gray-400 hover:text-white transition-colors">Our Mission</button></li>
              <li><button onClick={() => scrollToSection('templates')} className="text-gray-400 hover:text-white transition-colors">Models</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Contact Info</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="mt-1 flex-shrink-0 text-gray-500" />
                <span>Palpur Colony, Dak Bungalow Road, Sabalgarh, Morena, Madhya Pradesh - 476229</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="flex-shrink-0 text-gray-500" />
                <span>83700 4433</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Join Our Newsletter</h3>
            <p className="text-gray-400 mb-4">Get insights and updates delivered to your inbox.</p>
            <form className="flex">
              <input type="email" placeholder="your.email@example.com" className="w-full bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <button type="submit" className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700">
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 Cabbieo LLP . All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link to="/admin/login" className="text-gray-500 hover:text-white transition-colors text-sm">
                Admin Login
            </Link>
            <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
                <ArrowUp size={16} />
                <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
