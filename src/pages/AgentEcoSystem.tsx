import Navbar from '@/components/Navbar';

const tools = [
  'Zapier',
  'Slack',
  'Notion',
  'Google Workspace'
];

const platforms = [
  'AWS',
  'Azure',
  'GCP'
];

const integrations = [
  'CRM Systems',
  'Data Warehouses',
  'Messaging Apps'
];

const AgentEcoSystem = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <Navbar />
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-8">Agent Ecosystem</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Tools</h2>
          <ul className="list-disc list-inside space-y-1">
            {tools.map(t => <li key={t}>{t}</li>)}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Platforms</h2>
          <ul className="list-disc list-inside space-y-1">
            {platforms.map(p => <li key={p}>{p}</li>)}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Integrations</h2>
          <ul className="list-disc list-inside space-y-1">
            {integrations.map(i => <li key={i}>{i}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default AgentEcoSystem;
