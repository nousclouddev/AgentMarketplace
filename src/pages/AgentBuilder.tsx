
import { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ReCAPTCHA from 'react-google-recaptcha';

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '<SITE_KEY>';
const API_URL =
  'https://5zt0gybyx1.execute-api.ap-south-1.amazonaws.com/prod/send';
const API_KEY = 'DWNWK4r9jO10yqWZJDV6g4V1DwnOUKWm8FEw0Qyu';
const RATE_LIMIT_MS = 10000;

const AgentBuilder = () => {
  // State for the contact form
  const [name2, setName2] = useState('');
  const [email2, setEmail2] = useState('');
  const [message2, setMessage2] = useState('');
  const [sent2, setSent2] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [captcha2, setCaptcha2] = useState('');
  const [thankYou2, setThankYou2] = useState('');
  const recaptchaRef2 = useRef<ReCAPTCHA>(null);

  // Handler for new block
  const handleSubmit2 = (e: React.FormEvent) => {
    e.preventDefault();
    const last = Number(localStorage.getItem('lastEmailTime2'));
    if (Date.now() - last < RATE_LIMIT_MS) {
      alert('Please wait before sending another request.');
      return;
    }
    if (!captcha2) {
      alert('Please complete the captcha');
      return;
    }
    setLoading2(true);
    sendEmail2(captcha2);
  };

  const sendEmail2 = (token: string) => {
    const payload = {
      to: 'info@nouscloud.tech',
      from: email2,
      subject: 'book a demo',
      text: `Name: ${name2}\nEmail: ${email2}\nMessage: ${message2}`,
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
      .then(async () => {
        setSent2(true);
        setName2('');
        setEmail2('');
        setMessage2('');
        setCaptcha2('');
        recaptchaRef2.current?.reset();
        localStorage.setItem('lastEmailTime2', Date.now().toString());
        setThankYou2("Thanks! we will connect with you shortly.");
        setTimeout(() => setThankYou2(''), 5000);
      })
      .catch(() => {
        setSent2(true);
        setName2('');
        setEmail2('');
        setMessage2('');
        setCaptcha2('');
        recaptchaRef2.current?.reset();
        setThankYou2("Thanks! we will connect with you shortly.");
        setTimeout(() => setThankYou2(''), 5000);
      })
      .finally(() => setLoading2(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-20 text-center">
        {/* Contact form */}
        <section className="py-12 bg-gray-50 rounded-lg shadow-md max-w-lg mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">Send us a message</h2>
          <form onSubmit={handleSubmit2} className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Name"
              value={name2}
              onChange={e => setName2(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email2}
              onChange={e => setEmail2(e.target.value)}
              required
            />
            <Textarea
              placeholder="Message"
              value={message2}
              onChange={e => setMessage2(e.target.value)}
              required
              className="min-h-[120px]"
            />
            <ReCAPTCHA
              ref={recaptchaRef2}
              sitekey={SITE_KEY}
              onChange={value => setCaptcha2(value || '')}
              className="mx-auto"
            />
            <Button type="submit" disabled={loading2}>
              {loading2 ? 'Sending...' : 'Send'}
            </Button>
          </form>
          {thankYou2 && (
            <p className="mt-4 text-green-600">{thankYou2}</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AgentBuilder;
