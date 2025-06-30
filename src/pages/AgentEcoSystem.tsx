import Navbar from '@/components/Navbar';

const companies = [
  { name: 'OpenAI', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/openai.svg' },
  { name: 'Slack', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/slack.svg' },
  { name: 'Notion', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/notion.svg' },
  { name: 'Google', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/google.svg' },
  { name: 'Amazon AWS', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/amazonaws.svg' },
  { name: 'Azure', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/microsoftazure.svg' },
  { name: 'Github', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg' },
  { name: 'Vercel', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg' },
  { name: 'Pinecone', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/pinecone.svg' },
  { name: 'LangChain', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/langchain.svg' },
];

const AgentEcoSystem = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <Navbar />
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-8">Agent EcoSystem</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {companies.map(c => (
          <div key={c.name} className="flex flex-col items-center">
            <img src={c.logo} alt={`${c.name} logo`} className="h-12 w-12 mb-2" />
            <span className="text-sm font-medium text-center">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AgentEcoSystem;
