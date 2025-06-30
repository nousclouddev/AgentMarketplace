import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AgentGrid from '@/components/AgentGrid';
import SearchAndFilter from '@/components/SearchAndFilter';
import UseCasesSection from '@/components/UseCasesSection';
import BookDemoSection from '@/components/BookDemoSection';
import { Agent } from '@/types/agent';
import { fetchAgents } from '@/utils/api';
import { mockAgents } from '@/data/mockAgents';

const Index = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;
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
  }, [isAuthenticated]);

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
      <Hero />
      <section id="featured-agents" className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Agents</h2>
        <div className="container mx-auto px-4">
          <AgentGrid agents={mockAgents} />
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        {isAuthenticated && (
          <>
            <SearchAndFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <AgentGrid agents={filteredAgents} />
          </>
        )}
        <BookDemoSection />
      </div>
      <UseCasesSection />
    </div>
  );
};

export default Index;
