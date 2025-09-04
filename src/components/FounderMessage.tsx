import React from 'react';
import { motion } from 'framer-motion';

const FounderMessage: React.FC = () => {
  const imageUrl = "https://user-images.githubusercontent.com/12571732/211568233-3e1b6e40-1111-47a3-863a-e9a038c92a95.jpg";

  return (
    <section id="mission" className="py-20 bg-gray-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">A Message From Our Founder</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            "I’m not just building websites — I’m building dreams."
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <img
                src={imageUrl}
                alt="Deepander Singh Sikarwar, Founder of Cabbieo"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover border-4 border-gray-700/50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            </div>
            <div className="text-center mt-6">
              <h3 className="text-2xl font-bold text-white">Deepander Singh Sikarwar</h3>
              <p className="text-blue-400 font-semibold">Founder, Cabbieo Web Service</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-3 space-y-6 text-gray-300"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="leading-relaxed">
              I believe every shopkeeper, every small business, and every hardworking entrepreneur — no matter their background — deserves to be seen, valued, and remembered. Through Cabbieo, I help local businesses create their own websites, own their digital identity, and transform into recognized brands. This is more than technology — it’s about giving people the power to grow, compete, and shine in the digital world.
            </p>
            
            <hr className="border-gray-700 my-8" />

            <p className="leading-relaxed font-[Inter]">
              मेरा मानना है कि हर दुकानदार, हर छोटा व्यवसाय और हर मेहनती उद्यमी — चाहे उनकी पृष्ठभूमि कुछ भी हो — उन्हें देखा जाए, सराहा जाए और याद रखा जाए। Cabbieo के माध्यम से, मैं स्थानीय व्यवसायों को उनकी खुद की वेबसाइट बनाने, अपनी डिजिटल पहचान पाने और एक पहचाना जाने वाला ब्रांड बनने में मदद करता हूँ। यह सिर्फ़ तकनीक नहीं है — यह लोगों को बढ़ने, प्रतिस्पर्धा करने और डिजिटल दुनिया में चमकने की ताक़त देने का तरीका है।
            </p>

            <div className="mt-10 pt-6 border-t border-gray-700/50 text-center bg-gray-800/50 p-6 rounded-xl">
              <p className="font-semibold text-lg text-white">"Your Shop. Your Brand. Your Digital Identity."</p>
              <p className="text-gray-400 mt-1">"आपकी दुकान, आपका ब्रांड, आपकी डिजिटल पहचान"</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
