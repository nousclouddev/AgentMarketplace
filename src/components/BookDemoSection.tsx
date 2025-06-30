import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const BookDemoSection = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:info@nouscloud.tech?subject=Demo%20Request&body=${encodeURIComponent(email)}`;
    setSent(true);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Book a Demo</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Button type="submit">Schedule Demo</Button>
        </form>
        {sent && <p className="mt-4 text-green-600">Thanks! We'll reach out soon.</p>}
      </div>
    </section>
  );
};

export default BookDemoSection;
