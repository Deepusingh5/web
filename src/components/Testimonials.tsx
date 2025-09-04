import React, { useState, useEffect } from 'react';
import { Star, Quote, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  videoId?: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, InnovateTech',
    content: 'TechFlow Solutions transformed our outdated website into a modern, high-converting platform. Their attention to detail and technical expertise is unmatched.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    videoId: 'LXb3EKWsInQ'
  },
  {
    name: 'Michael Chen',
    role: 'Founder, GrowthLab',
    content: 'The team delivered our mobile app ahead of schedule and within budget. The user experience is fantastic, and our customers love it.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Director, RetailPlus',
    content: 'Their digital marketing strategy increased our online sales by 300% in just 6 months. Professional, data-driven, and results-focused.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face'
  },
  {
    name: 'David Thompson',
    role: 'CTO, FinanceFlow',
    content: 'Outstanding technical expertise and project management. They understood our complex requirements and delivered a solution that exceeded expectations.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    videoId: 'LXb3EKWsInQ'
  },
];

interface TestimonialsProps {
  onWatchVideo: (videoId: string) => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ onWatchVideo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real stories from businesses we've helped transform.
          </p>
        </motion.div>

        <div className="relative h-80">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full bg-gray-800/50 rounded-xl p-8 border border-gray-700/50"
            >
              <div className="absolute top-6 right-6 text-blue-400/30">
                <Quote size={32} />
              </div>
              
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-gold fill-current" />
                ))}
              </div>
              
              <p className="text-gray-300 text-lg mb-6 leading-relaxed italic">&ldquo;{testimonials[currentIndex].content}&rdquo;</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div>
                    <div className="font-semibold text-white text-lg">{testimonials[currentIndex].name}</div>
                    <div className="text-sm text-gray-400">{testimonials[currentIndex].role}</div>
                  </div>
                </div>
                {testimonials[currentIndex].videoId && (
                  <button
                    onClick={() => onWatchVideo(testimonials[currentIndex].videoId!)}
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <PlayCircle size={24} />
                    <span className="font-semibold">Watch Story</span>
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentIndex === index ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
