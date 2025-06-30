import { useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import csvData from '@/data/Agent_usecases.csv?raw';
import { parseCsv } from '@/utils/parseCsv';

interface AgentUseCase {
  Category: string;
  'Agent Name': string;
  Description: string;
  Complexity: string;
  Instant: string;
  'Demo Readiness': string;
  'Go-Live Time': string;
}

const UseCasesSection = () => {
  const grouped = useMemo(() => {
    const records = parseCsv(csvData) as AgentUseCase[];
    return records.reduce<Record<string, AgentUseCase[]>>((acc, rec) => {
      if (!acc[rec.Category]) acc[rec.Category] = [];
      acc[rec.Category].push(rec);
      return acc;
    }, {});
  }, []);

  const categories = Object.keys(grouped);

  if (categories.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Agent Usecases</h2>
        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map(cat => (
              <TabsTrigger key={cat} value={cat} className="capitalize">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map(cat => (
            <TabsContent key={cat} value={cat} className="outline-none">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {grouped[cat].map(uc => (
                  <Card key={uc['Agent Name']} className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{uc['Agent Name']}</CardTitle>
                      <CardDescription>{uc.Description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Complexity:</span> {uc.Complexity}
                      </p>
                      <p>
                        <span className="font-medium">Instant:</span> {uc.Instant}
                      </p>
                      {uc['Demo Readiness'] && (
                        <p>
                          <span className="font-medium">Demo Ready:</span> {uc['Demo Readiness']}
                        </p>
                      )}
                      <p>
                        <span className="font-medium">Go-Live Time:</span> {uc['Go-Live Time']}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default UseCasesSection;
