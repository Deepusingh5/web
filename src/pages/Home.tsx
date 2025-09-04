import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import FounderMessage from '../components/FounderMessage';
import Templates from '../components/Templates';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import VideoModal from '../components/VideoModal';
import OrderModal from '../components/OrderModal';
import { Template } from '../types/supabase';

function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [videoModal, setVideoModal] = useState({ isOpen: false, videoId: '' });
  const [orderModal, setOrderModal] = useState<{ isOpen: boolean; template: Template | null }>({ isOpen: false, template: null });

  const handleChatOpen = () => setIsChatOpen(true);
  const handleChatClose = () => setIsChatOpen(false);

  const handleOpenVideoModal = (videoId: string) => {
    setVideoModal({ isOpen: true, videoId });
  };
  const handleCloseVideoModal = () => {
    setVideoModal({ isOpen: false, videoId: '' });
  };

  const handleOrderNow = (template: Template) => {
    setOrderModal({ isOpen: true, template });
  };

  const handleCloseOrderModal = () => {
    setOrderModal({ isOpen: false, template: null });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header onChatOpen={handleChatOpen} scrollToSection={scrollToSection} />
      <main>
        <Hero scrollToSection={scrollToSection} />
        <WhyChooseUs />
        <FounderMessage />
        <Templates onOrderNow={handleOrderNow} />
        <Contact onChatOpen={handleChatOpen} />
        <Testimonials onWatchVideo={handleOpenVideoModal} />
        <FAQ />
      </main>
      <Footer scrollToSection={scrollToSection} />
      <ChatWidget isOpen={isChatOpen} onClose={handleChatClose} />
      <VideoModal 
        isOpen={videoModal.isOpen} 
        onClose={handleCloseVideoModal} 
        videoId={videoModal.videoId}
      />
      <OrderModal
        isOpen={orderModal.isOpen}
        onClose={handleCloseOrderModal}
        template={orderModal.template}
      />
    </div>
  );
}

export default Home;
