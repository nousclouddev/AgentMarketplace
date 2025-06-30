import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ecosystemData, categories } from '@/data/ecosystem';

const AgentEcoSystem = () => {
  // Filter out 'All' from categories
  const filteredCategories = categories.filter(cat => cat !== 'All');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-12">Agent Ecosystem</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const categoryItems = ecosystemData.filter((e) => e.category === category);
            
            return (
              <div 
                key={category}
                className="relative group"
                onMouseEnter={() => setExpandedCategory(category)}
                onMouseLeave={() => setExpandedCategory(null)}
              >
                <div className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${expandedCategory === category ? 'ring-2 ring-blue-500' : ''}`}>
                  <h2 className="text-xl font-semibold mb-4">{category}</h2>
                  
                  <div className={`grid gap-2 overflow-hidden transition-all duration-300 ${expandedCategory === category ? 'max-h-[500px]' : 'max-h-0'}`}>
                    {categoryItems.map((item, idx) => (
                      <div key={idx} className="px-3 py-2 bg-gray-50 rounded hover:bg-blue-50">
                        <p className="text-sm font-medium">{item.system}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white pointer-events-none transition-opacity ${expandedCategory === category ? 'opacity-0' : 'opacity-100'}`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AgentEcoSystem;