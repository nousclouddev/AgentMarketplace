import { useState, FormEvent, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import ReCAPTCHA from 'react-google-recaptcha';

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '<SITE_KEY>';
const API_URL =
  'https://5zt0gybyx1.execute-api.ap-south-1.amazonaws.com/prod/send';
const API_KEY = 'DWNWK4r9jO10yqWZJDV6g4V1DwnOUKWm8FEw0Qyu';
const RATE_LIMIT_MS = 10000;

const BookDemoSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const last = Number(localStorage.getItem('lastEmailTime'));
    if (Date.now() - last < RATE_LIMIT_MS) {
      alert('Please wait before sending another request.');
      return;
    }

    if (!captcha) {
      alert('Please complete the captcha');
      return;
    }

    setLoading(true);
    sendEmail(captcha);
  };

  const sendEmail = (token: string) => {
    const payload = {
      to: 'info@nouscloud.tech',
      from: email,
      subject: 'book a demo',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      recaptchaToken: token
    };

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(payload),
    })
      .then(async res => {
        let data;
        try {
          data = await res.json();
        } catch (e) {
          data = null;
        }
        if (res.ok || (data && data.message && data.message.toLowerCase().includes('success'))) {
          alert('Successfully sent message');
          setSent(true);
          setName('');
          // setEmail('');
          setMessage('');
          setCaptcha('');
          recaptchaRef.current?.reset();
          localStorage.setItem('lastEmailTime', Date.now().toString());
        } else {
          const error = data && data.message ? data.message : await res.text();
          alert('Failed to send message: ' + error);
        }
      })
      .catch(() => alert('Failed to send message'))
      .finally(() => setLoading(false));
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Book a Demo</h2>
        <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto gap-2">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Textarea
            placeholder="Message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            className="min-h-[120px]"
          />
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={SITE_KEY}
            onChange={value => setCaptcha(value || '')}
            className="mx-auto"
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
