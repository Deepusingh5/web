import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Order } from '../../types/supabase';
import { Download, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (error) {
        setError(error.message);
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data as Order[]);
      }
      setLoading(false);
    };
    fetchOrders();

    const channel = supabase.channel('public:orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        console.log('Change received!', payload);
        fetchOrders(); // Refetch on any change
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: Order['status']) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    if (error) {
      alert(`Error updating status: ${error.message}`);
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-900/50 text-green-300';
      case 'Confirmed': return 'bg-blue-900/50 text-blue-300';
      case 'Pending': return 'bg-yellow-900/50 text-yellow-300';
      case 'Returned': return 'bg-red-900/50 text-red-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const exportToCSV = () => {
    const headers = ['Order ID', 'Customer Name', 'Customer Email', 'Template', 'Date', 'Status', 'Total'];
    const rows = orders.map(order => [
      order.order_id,
      order.customer_name,
      order.customer_email,
      order.template_name,
      new Date(order.created_at).toLocaleDateString(),
      order.status,
      order.total
    ].join(','));
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="flex h-full items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;
  }

  if (error) {
    return <div className="text-center text-red-400">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Order Management</h2>
        <button onClick={exportToCSV} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download size={18} />
          <span>Export CSV</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
            <tr>
              <th scope="col" className="px-6 py-3">Order ID</th>
              <th scope="col" className="px-6 py-3">Customer</th>
              <th scope="col" className="px-6 py-3">Template</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Total</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
                <td className="px-6 py-4 font-medium text-white truncate" style={{maxWidth: '150px'}}>{order.order_id}</td>
                <td className="px-6 py-4">
                  <div>{order.customer_name}</div>
                  <div className="text-xs text-gray-400">{order.customer_email}</div>
                </td>
                <td className="px-6 py-4">{order.template_name}</td>
                <td className="px-6 py-4">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>{order.status}</span>
                </td>
                <td className="px-6 py-4 font-semibold">₹{order.total.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4 space-x-2">
                  <button onClick={() => handleStatusChange(order.id, 'Delivered')} className="text-green-400 hover:text-green-300" title="Mark as Delivered"><CheckCircle size={18} /></button>
                  <button onClick={() => handleStatusChange(order.id, 'Confirmed')} className="text-blue-400 hover:text-blue-300" title="Mark as Confirmed"><Clock size={18} /></button>
                  <button onClick={() => handleStatusChange(order.id, 'Returned')} className="text-red-400 hover:text-red-300" title="Mark as Returned"><AlertCircle size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
