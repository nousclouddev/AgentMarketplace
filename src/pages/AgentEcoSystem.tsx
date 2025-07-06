import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { ecosystemData, categories } from '@/data/ecosystem';

const AgentEcoSystem = () => {
  // Filter out 'All' from categories
  const filteredCategories = categories.filter(cat => cat !== 'All');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e2e8f0] via-[#b6c6e3] to-[#5ac8fa]">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-600">Agent Ecosystem</h1>
        
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
                  bg-white/90 rounded-xl shadow-lg p-6 transition-all duration-300 border border-[#5ac8fa]
                  hover:bg-gradient-to-br hover:from-blue-200 hover:to-cyan-200 hover:border-cyan-400 hover:shadow-xl
                  ${expandedCategory === category ? 'ring-2 ring-cyan-500 bg-gradient-to-br from-blue-100 to-cyan-200 border-cyan-500 shadow-xl' : ''}
                `}>
                  <h2 className={`
                    text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-600 group-hover:from-blue-800 group-hover:to-cyan-700
                    ${expandedCategory === category ? 'from-blue-800 to-cyan-700' : ''}
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
                          bg-gradient-to-r from-blue-100 to-cyan-200 hover:from-blue-200 hover:to-cyan-300 border border-cyan-200
                          ${expandedCategory === category ? 'bg-gradient-to-r from-blue-200 to-cyan-300' : ''}
                        `}
                      >
                        <p className="text-sm font-semibold text-blue-900 group-hover:text-cyan-800">
                          {item.system}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {expandedCategory !== category && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-cyan-200 to-transparent pointer-events-none"></div>
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