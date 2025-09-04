import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080&fit=crop"
        >
          <source src="https://videos.pexels.com/video-files/3209828/3209828-hd.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight">
            Your Business, Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Digital Identity</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Empowering small-scale industries like grocery stores, mobile shops, and sweet shops with a strong digital identity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => scrollToSection('templates')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform"
            >
              Explore Website Models
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 bg-white/10 border-2 border-white/50 text-white px-8 py-4 rounded-lg font-semibold text-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            >
              <span>Order Now</span>
              <ArrowRight size={22} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
