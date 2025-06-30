import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { ecosystemData, categories } from '@/data/ecosystem';

const AgentEcoSystem = () => {
  // Filter out 'All' from categories
  const filteredCategories = categories.filter(cat => cat !== 'All');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Agent Ecosystem</h1>
        
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
                <div className={`
                  bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 rounded-lg shadow-md p-6 transition-all duration-300 
                  border border-blue-200
                  hover:bg-gradient-to-br hover:from-blue-100 hover:via-purple-100 hover:to-blue-200 hover:border-blue-400 hover:shadow-lg
                  ${expandedCategory === category ? 
                    'ring-2 ring-blue-400 bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200 border-blue-400 shadow-lg' : ''}
                `}>
                  <h2 className={`
                    text-xl font-semibold mb-4 
                    text-blue-900 group-hover:text-purple-700
                    ${expandedCategory === category ? 'text-purple-700' : ''}
                  `}>
                    {category}
                  </h2>
                  
                  <div className={`
                    grid gap-2 overflow-hidden transition-all duration-300 
                    ${expandedCategory === category ? 'max-h-[500px]' : 'max-h-0'}
                  `}>
                    {categoryItems.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`
                          px-3 py-2 rounded transition-colors duration-200 
                          bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 border border-blue-100
                          ${expandedCategory === category ? 'bg-gradient-to-r from-blue-50 to-purple-50' : ''}
                        `}
                      >
                        <p className="text-sm font-medium text-blue-900 group-hover:text-purple-900">
                          {item.system}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {expandedCategory !== category && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-blue-100 to-transparent pointer-events-none"></div>
                  )}
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