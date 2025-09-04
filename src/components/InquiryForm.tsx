import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

const InquiryForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema)
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const { error } = await supabase.from('inquiries').insert({
      name: data.name,
      email: data.email,
      type: 'form',
      subject: `Inquiry about ${data.service}`,
      content: data.message,
      status: 'Pending',
    });
    
    setIsSubmitting(false);

    if (error) {
      setSubmitError(error.message);
      console.error('Error submitting inquiry:', error);
    } else {
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-900/50 border border-green-700 rounded-lg p-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-green-300">
          Your inquiry has been sent. We'll get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-3xl mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your full name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-400 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-400 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">Service Needed *</label>
        <select
          id="service"
          {...register('service')}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select a service</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile App">Mobile App Development</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Consulting">Business Consulting</option>
        </select>
        {errors.service && <p className="mt-1 text-sm text-red-400 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.service.message}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Project Details *</label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Tell us about your project..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-400 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.message.message}</p>}
      </div>
      
      {submitError && <p className="text-sm text-red-400">{submitError}</p>}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {isSubmitting ? (
          <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div><span>Submitting...</span></>
        ) : (
          <><Send size={20} /><span>Send Inquiry</span></>
        )}
      </motion.button>
    </motion.form>
  );
};

export default InquiryForm;
