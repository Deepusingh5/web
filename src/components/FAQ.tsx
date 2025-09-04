import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How long does it take to complete a project?',
      answer: 'Project timelines vary depending on complexity and scope. Simple websites typically take 2-4 weeks, while complex web applications can take 8-16 weeks. We provide detailed timelines during the consultation phase and keep you updated throughout the process.'
    },
    {
      question: 'What is your development process?',
      answer: 'Our process includes: 1) Discovery and planning, 2) Design and prototyping, 3) Development and testing, 4) Review and revisions, 5) Launch and deployment, 6) Ongoing support and maintenance. We maintain transparent communication throughout each phase.'
    },
    {
      question: 'Do you provide ongoing support after launch?',
      answer: 'Yes! We offer comprehensive maintenance packages including security updates, performance monitoring, backup services, and technical support. Our support team is available 24/7 to ensure your digital assets remain secure and optimized.'
    },
    {
      question: 'How much do your services cost?',
      answer: 'Pricing varies based on project requirements, complexity, and timeline. We offer competitive rates and provide detailed quotes after understanding your specific needs. Contact us for a free consultation and custom quote.'
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-900/95">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-400">
            Find answers to common questions about our services, process, and support.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-lg border border-gray-700/50"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between"
              >
                <span className="font-semibold text-white text-lg">{faq.question}</span>
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }}>
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 border-t border-gray-700/50">
                      <p className="text-gray-300 leading-relaxed pt-4">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
