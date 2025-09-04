import React, { useState } from 'react';
import { Save, AlertTriangle } from 'lucide-react';

const PaymentGatewayForm: React.FC<{ gatewayName: string }> = ({ gatewayName }) => {
  const [apiKey, setApiKey] = useState('sk_test_xxxxxxxxxxxxxxxx');
  const [secretKey, setSecretKey] = useState('xxxxxxxxxxxxxxxxxxxxxxxx');
  const [isLiveMode, setIsLiveMode] = useState(false);

  return (
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">API Key</label>
        <input type="text" value={apiKey} onChange={e => setApiKey(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Secret Key</label>
        <input type="password" value={secretKey} onChange={e => setSecretKey(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-300">Environment</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={isLiveMode} onChange={() => setIsLiveMode(!isLiveMode)} className="sr-only peer" />
          <div className="w-14 h-7 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-300">{isLiveMode ? 'Live Mode' : 'Test Mode'}</span>
        </label>
      </div>
      <button type="submit" className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        <Save size={18} />
        <span>Save {gatewayName} Settings</span>
      </button>
    </form>
  );
};

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('razorpay');

  const tabs = [
    { id: 'razorpay', name: 'Razorpay' },
    { id: 'sbi', name: 'SBI Pay' },
    { id: 'cashfree', name: 'Cashfree' },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4 flex items-start space-x-3">
        <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-yellow-300">Security Warning</h3>
          <p className="text-yellow-300/80 text-sm">
            This is a frontend demonstration. API keys are not stored securely. Do not enter real production keys. A proper backend is required for secure key management.
          </p>
        </div>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
        <h2 className="text-2xl font-bold text-white mb-6">Payment Gateway Settings</h2>
        
        <div className="border-b border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div>
          {activeTab === 'razorpay' && <PaymentGatewayForm gatewayName="Razorpay" />}
          {activeTab === 'sbi' && <PaymentGatewayForm gatewayName="SBI Pay" />}
          {activeTab === 'cashfree' && <PaymentGatewayForm gatewayName="Cashfree" />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
