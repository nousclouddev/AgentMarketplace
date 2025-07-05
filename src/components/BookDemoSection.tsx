import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

declare const grecaptcha: any;

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '<SITE_KEY>';
const API_URL =
  'https://5zt0gybyx1.execute-api.ap-south-1.amazonaws.com/send';
const API_KEY = 'DWNWK4r9jO10yqWZJDV6g4V1DwnOUKWm8FEw0Qyu';
const RATE_LIMIT_MS = 10000;

const BookDemoSection = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const last = Number(localStorage.getItem('lastEmailTime'));
    if (Date.now() - last < RATE_LIMIT_MS) {
      alert('Please wait before sending another request.');
      return;
    }

    grecaptcha.ready(() => {
      setLoading(true);
      grecaptcha
        .execute(SITE_KEY, { action: 'submit' })
        .then((token: string) => sendEmail(token));
    });
  };

  const sendEmail = (token: string) => {
    const payload = {
      to: 'info@nouscloud.tech',
      subject: 'Demo Request',
      text: email,
      recaptchaToken: token,
    };

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(() => {
        setSent(true);
        localStorage.setItem('lastEmailTime', Date.now().toString());
      })
      .catch(() => alert('Failed to send message'))
      .finally(() => setLoading(false));
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
          <Button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Schedule Demo'}
          </Button>
        </form>
        {sent && <p className="mt-4 text-green-600">Thanks! We'll reach out soon.</p>}
      </div>
    </section>
  );
};

export default BookDemoSection;
