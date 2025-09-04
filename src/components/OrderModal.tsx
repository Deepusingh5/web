import React, { useState } from 'react';
import { X, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Template } from '../types/supabase';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

declare const Razorpay: any;

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, template }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!template) return;
    setIsProcessing(true);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_xxxxxxxxxxxxxx", // Fallback for safety
      amount: template.price * 100,
      currency: "INR",
      name: "Cabbieo Web Service",
      description: `Order for ${template.name}`,
      image: template.image_url,
      handler: async function (response: any) {
        const { error } = await supabase.from('orders').insert({
          order_id: response.razorpay_payment_id,
          template_id: template.id,
          template_name: template.name,
          total: template.price,
          status: 'Confirmed',
          customer_name: 'Valued Customer', // Prefill from a form for real use
          customer_email: 'customer@example.com', // Prefill from a form for real use
        });

        setIsProcessing(false);
        if (error) {
          console.error('Error saving order:', error);
          alert('Payment successful, but failed to save order. Please contact support.');
        } else {
          onClose();
          navigate('/thank-you');
        }
      },
      prefill: {
        name: "Dipendra Singh Sikarwar",
        contact: "837004433",
      },
      notes: {
        template_id: template.id,
      },
      theme: {
        color: "#2563EB",
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
          console.log("Payment modal dismissed.");
        },
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  if (!isOpen || !template) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-gray-800 rounded-xl w-full max-w-lg shadow-2xl border border-gray-700/50"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          >
            <X size={24} />
          </button>
          
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-2">Confirm Your Order</h2>
            <p className="text-gray-400 mb-6">You are ordering the "{template.name}" template.</p>

            <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4 mb-6 flex items-start space-x-3">
              <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-300">Important Notice</h3>
                <p className="text-yellow-300/80 text-sm">
                  This payment of ₹{template.price.toLocaleString('en-IN')} covers only the website design charges. Domain and hosting charges are separate and must be paid by you.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 mb-8">
              <input
                type="checkbox"
                id="terms-agree"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="mt-1 h-4 w-4 rounded border-gray-500 bg-gray-700 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms-agree" className="text-gray-300 text-sm">
                I have read and agree to these terms.
              </label>
            </div>

            <button
              onClick={handlePayment}
              disabled={!isChecked || isProcessing}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <><ShieldCheck size={20} /><span>Proceed to Pay ₹{template.price.toLocaleString('en-IN')}</span></>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderModal;
