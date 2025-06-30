import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useCases } from '@/data/useCases';

const UseCasesSection = () => (
  <section className="py-12">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Agent Use Cases</h2>
      <Accordion type="multiple" className="grid md:grid-cols-2 gap-4">
        {useCases.map(uc => (
          <AccordionItem key={uc.title} value={uc.title} className="border rounded-md">
            <AccordionTrigger className="p-4 font-medium bg-gray-100">
              {uc.title}
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-white">
              {uc.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default UseCasesSection;
