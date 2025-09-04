import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, SlidersHorizontal, ShoppingCart } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { Template } from '../types/supabase';

type SortOption = 'default' | 'price-asc' | 'price-desc';

interface TemplatesProps {
  onOrderNow: (template: Template) => void;
}

const TemplatesComponent: React.FC<TemplatesProps> = ({ onOrderNow }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState<SortOption>('default');

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('templates').select('*').order('price', { ascending: true });
      if (error) {
        setError(error.message);
        console.error('Error fetching templates:', error);
      } else {
        setTemplates(data as Template[]);
      }
      setLoading(false);
    };
    fetchTemplates();
  }, []);

  const categories = useMemo(() => ['all', ...Array.from(new Set(templates.map(t => t.style)))], [templates]);

  const filteredAndSortedTemplates = useMemo(() => {
    return templates
      .filter(t => filter === 'all' || t.style === filter)
      .sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price;
        if (sort === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [filter, sort, templates]);

  if (loading) {
    return (
      <section id="templates" className="py-20 bg-gray-900/95">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading Templates...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="templates" className="py-20 bg-gray-900/95">
        <div className="text-center text-red-400">
          <p>Error loading templates: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="templates" className="py-20 bg-gray-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Explore Our Website Models</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose from a variety of professionally designed templates, ready to be customized for your brand.
          </p>
        </motion.div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <SlidersHorizontal className="text-gray-400 mr-2" />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
                  filter === category ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
          <div className="flex-shrink-0">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="default">Sort by Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-gray-800/50 rounded-xl shadow-lg overflow-hidden flex flex-col group border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={template.image_url}
                  alt={template.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-sm font-bold px-3 py-1 m-4 rounded-full">
                  {template.style}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{template.name}</h3>
                  <p className="text-xl font-bold text-blue-400">
                    ₹{template.price.toLocaleString('en-IN')}
                  </p>
                </div>
                
                <p className="text-gray-400 mb-4 flex-grow">{template.description}</p>

                <button
                  onClick={() => onOrderNow(template)}
                  className="mt-auto w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
                >
                  <ShoppingCart size={20} />
                  <span>Order Now</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplatesComponent;
