import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import AgentGrid from '@/components/AgentGrid';
import SearchAndFilter from '@/components/SearchAndFilter';
import { Agent } from '@/types/agent';
import { fetchAgents } from '@/utils/api';

const AgentsDirectory = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const res = await fetchAgents();
        setAgents(res.data);
      } catch (err) {
        console.error('Error fetching agents:', err);
        alert('Failed to load agents');
      }
    };
    loadAgents();
  }, []);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || agent.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Browse Agents</h1>
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <AgentGrid agents={filteredAgents} />
      </div>
    </div>
  );
};

export default AgentsDirectory;
