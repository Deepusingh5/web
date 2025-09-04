import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import InquiryForm from './InquiryForm';
import VoiceRecorder from './VoiceRecorder';

interface ContactProps {
  onChatOpen: () => void;
}

const Contact: React.FC<ContactProps> = ({ onChatOpen }) => {
  const [activeTab, setActiveTab] = useState<'form' | 'voice'>('form');

  const handleVoiceSubmit = (audioBlob: Blob, duration: number) => {
    console.log('Voice recording submitted:', { audioBlob, duration });
    // Here you would typically upload the audio file to your server
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Start Your Project</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to get started? Send us a message, record your idea, or start a live chat.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side: Contact Info */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-white">Contact Information</h3>
            <p className="text-gray-400">Reach out to us directly through the following channels or get instant answers with our live support.</p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white text-lg">Address</h4>
                  <p className="text-gray-400">Palpur Colony, Dak Bungalow Road, Sabalgarh, Morena, Madhya Pradesh - 476229</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white text-lg">Phone</h4>
                  <p className="text-gray-400">83700 4433</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white text-lg">Email</h4>
                  <p className="text-gray-400">support@cabbieowebservice.com</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                  onClick={onChatOpen}
                  className="inline-flex items-center justify-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
              >
                  <MessageCircle size={20} />
                  <span className="font-semibold">Chat With Us Now</span>
              </button>
            </div>
          </motion.div>

          {/* Right side: Form/Voice Recorder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800/50 rounded-2xl p-4 md:p-8 border border-gray-700/50"
          >
            <div className="flex bg-gray-900/60 rounded-lg p-1 mb-8 max-w-md mx-auto">
              <button
                onClick={() => setActiveTab('form')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
                  activeTab === 'form'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Mail size={20} />
                <span className="font-semibold">Inquiry Form</span>
              </button>
              <button
                onClick={() => setActiveTab('voice')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
                  activeTab === 'voice'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Mic size={20} />
                <span className="font-semibold">Voice Note</span>
              </button>
            </div>

            <div>
              {activeTab === 'form' ? <InquiryForm /> : <VoiceRecorder onSubmit={handleVoiceSubmit} />}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
