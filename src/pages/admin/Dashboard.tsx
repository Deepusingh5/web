import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { ShoppingCart, MessageSquare, DollarSign, AlertCircle, CheckCircle, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Order } from '../../types/supabase';

const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType; color: string }> = ({ title, value, icon: Icon, color }) => (
  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0, pendingInquiries: 0, pendingOrders: 0 });
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data: ordersData, error: ordersError } = await supabase.from('orders').select('*');
                if (ordersError) throw ordersError;

                const { data: inquiriesData, error: inquiriesError } = await supabase.from('inquiries').select('*');
                if (inquiriesError) throw inquiriesError;

                const totalRevenue = ordersData.filter(o => o.status === 'Delivered' || o.status === 'Confirmed').reduce((acc, order) => acc + order.total, 0);
                const pendingOrders = ordersData.filter(o => o.status === 'Pending').length;
                const pendingInquiries = inquiriesData.filter(i => i.status === 'Pending').length;

                setStats({
                    totalRevenue,
                    totalOrders: ordersData.length,
                    pendingInquiries,
                    pendingOrders,
                });

                setRecentOrders(ordersData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5));
            } catch (err: any) {
                setError(err.message);
                console.error("Error fetching dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

  const chartData = [
    { name: 'Jan', revenue: 4000 }, { name: 'Feb', revenue: 3000 }, { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 4500 }, { name: 'May', revenue: 6000 }, { name: 'Jun', revenue: 5500 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="text-green-400" size={18} />;
      case 'Confirmed': return <Clock className="text-blue-400" size={18} />;
      case 'Pending': return <AlertCircle className="text-yellow-400" size={18} />;
      case 'Returned': return <AlertCircle className="text-red-400" size={18} />;
      default: return null;
    }
  };

  if (loading) {
    return <div className="flex h-full items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;
  }

  if (error) {
    return <div className="text-center text-red-400">Error: {error}</div>;
  }

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString('en-IN')}`} icon={DollarSign} color="bg-green-500" />
        <StatCard title="Total Orders" value={stats.totalOrders.toString()} icon={ShoppingCart} color="bg-blue-500" />
        <StatCard title="Pending Inquiries" value={stats.pendingInquiries.toString()} icon={MessageSquare} color="bg-yellow-500" />
        <StatCard title="Pending Orders" value={stats.pendingOrders.toString()} icon={AlertCircle} color="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center"><TrendingUp size={22} className="mr-2 text-blue-400" />Revenue Overview</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis dataKey="name" stroke="#A0AEC0" />
                <YAxis stroke="#A0AEC0" />
                <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: '1px solid #4A5568' }} />
                <Legend />
                <Bar dataKey="revenue" fill="#4299E1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{order.customer_name}</p>
                  <p className="text-sm text-gray-400">{order.template_name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">₹{order.total.toLocaleString('en-IN')}</p>
                  <div className="flex items-center justify-end space-x-2 text-sm text-gray-300">
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
