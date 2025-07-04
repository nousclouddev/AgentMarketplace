import { Agent } from '@/types/agent';
import AgentCard from './AgentCard';
import { runAgent } from '@/utils/api';

interface AgentGridProps {
  agents: Agent[];
  hideMeta?: boolean; // hide price, rating and user stats for each card
}

const AgentGrid = ({ agents, hideMeta = false }: AgentGridProps) => {
  const handleRun = async (id: string) => {
    try {
      await runAgent(id);
      alert(`Agent "${id}" executed successfully.`);
    } catch (err) {
      console.error('Run failed:', err);
      alert('Failed to run agent.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map(agent => (
        <AgentCard
          key={agent.id}
          agent={agent}
          onRun={() => handleRun(agent.id)}
          hideMeta={hideMeta}
        />
      ))}
    </div>
  );
};

export default AgentGrid;
