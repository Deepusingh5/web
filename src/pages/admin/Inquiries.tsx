import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Inquiry } from '../../types/supabase';
import { FileText, Mic, MessageCircle, Send, User, Bot, Play } from 'lucide-react';

const Inquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
      if (error) {
        setError(error.message);
        console.error("Error fetching inquiries:", error);
      } else {
        setInquiries(data as Inquiry[]);
        if (data.length > 0) {
          setSelectedInquiry(data[0] as Inquiry);
        }
      }
      setLoading(false);
    };
    fetchInquiries();

    const channel = supabase.channel('public:inquiries')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, (payload) => {
        console.log('Change received!', payload);
        fetchInquiries(); // Refetch on any change
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getInquiryIcon = (type: Inquiry['type']) => {
    switch (type) {
      case 'form': return <FileText className="text-blue-400" size={20} />;
      case 'voice': return <Mic className="text-purple-400" size={20} />;
      case 'chat': return <MessageCircle className="text-green-400" size={20} />;
    }
  };

  if (loading) {
    return <div className="flex h-full items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;
  }

  if (error) {
    return <div className="text-center text-red-400">Error: {error}</div>;
  }

  return (
    <div className="flex h-[calc(100vh-10rem)] bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
      {/* Inquiry List */}
      <div className="w-1/3 border-r border-gray-700/50 flex flex-col">
        <div className="p-4 border-b border-gray-700/50">
          <h2 className="text-xl font-bold text-white">All Inquiries</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {inquiries.map(inquiry => (
            <button
              key={inquiry.id}
              onClick={() => setSelectedInquiry(inquiry)}
              className={`w-full text-left p-4 flex items-start space-x-3 transition-colors ${selectedInquiry?.id === inquiry.id ? 'bg-blue-600/20' : 'hover:bg-gray-700/50'}`}
            >
              <div className="mt-1">{getInquiryIcon(inquiry.type)}</div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-white truncate">{inquiry.name}</p>
                  <p className="text-xs text-gray-400 flex-shrink-0">{new Date(inquiry.created_at).toLocaleDateString()}</p>
                </div>
                <p className="text-sm text-gray-300 truncate">{inquiry.subject}</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${inquiry.status === 'Pending' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-green-900/50 text-green-300'}`}>{inquiry.status}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Inquiry Details */}
      <div className="w-2/3 flex flex-col">
        {selectedInquiry ? (
          <>
            <div className="p-4 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white">{selectedInquiry.subject}</h3>
              <p className="text-sm text-gray-400">From: {selectedInquiry.name} {selectedInquiry.email && `(${selectedInquiry.email})`}</p>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {selectedInquiry.type === 'voice' ? (
                <div className="flex items-center space-x-4">
                  <audio controls src={selectedInquiry.content} className="w-full">
                      Your browser does not support the audio element.
                  </audio>
                </div>
              ) : (
                <p className="text-gray-300 whitespace-pre-wrap">{selectedInquiry.content}</p>
              )}
            </div>
            <div className="p-4 border-t border-gray-700/50">
              <div className="flex space-x-2">
                <input type="text" placeholder="Type your reply..." className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"><Send size={16} /></button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select an inquiry to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inquiries;
