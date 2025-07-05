import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import AgentGrid from '@/components/AgentGrid';
import SearchAndFilter from '@/components/SearchAndFilter';
import BookDemoSection from '@/components/BookDemoSection';
import { Agent } from '@/types/agent';

const AgentsDirectory = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const AGENTS_URL = import.meta.env.VITE_AGENTS_URL || '/agents.json';

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const res = await fetch(AGENTS_URL);
        if (!res.ok) throw new Error('Network error');
        const data: Agent[] = await res.json();
        setAgents(data);
      } catch (err) {
        console.error('Error loading agents:', err);
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
        <AgentGrid agents={filteredAgents} hideMeta />
      </div>
      {/* <BookDemoSection /> removed as per request */}
    </div>
  );
};

export default AgentsDirectory;
