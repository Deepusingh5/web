import React from 'react';
import { Award, Smile, Clock, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: '500+ Projects Completed',
      description: 'Proven track record of delivering high-quality digital solutions across various industries.'
    },
    {
      icon: Smile,
      title: '99% Client Satisfaction',
      description: 'Our client-centric approach ensures we exceed expectations and build lasting partnerships.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Dedicated support and maintenance to keep your digital assets running smoothly around the clock.'
    },
    {
      icon: Cpu,
      title: 'Cutting-edge Technology',
      description: 'We leverage the latest technologies to build fast, secure, and scalable solutions for the future.'
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose Cabbieo?</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We combine expertise, passion, and commitment to turn your ideas into reality.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-xl p-8 text-center border border-gray-700/50"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
