import React from 'react';
import { CheckCircle, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const ThankYou: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-800/50 border border-gray-700/50 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
        <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Thank You for Your Order!</h1>
        <p className="text-lg text-gray-300 mb-6">
          Your order has been successfully received. Our team will contact you shortly to get started on your project.
        </p>
        <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4 mb-8">
          <p className="font-semibold text-yellow-300">
            Please remember: Domain and hosting charges are separate and must be paid by you.
          </p>
        </div>
        <div className="text-left space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">Support & Next Steps</h2>
            <p className="text-gray-400">If you have any immediate questions, feel free to reach out:</p>
            <div className="flex items-center space-x-3 text-gray-300">
                <Phone size={18} className="text-blue-400" />
                <span>83700 4433</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
                <Mail size={18} className="text-blue-400" />
                <span>support@cabbieowebservice.com</span>
            </div>
        </div>
        <Link to="/">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Back to Home
            </button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
