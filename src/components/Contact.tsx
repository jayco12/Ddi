import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-c6a73d4f`;

  useEffect(() => {
    trackPageView();
  }, []);

  const trackPageView = async () => {
    try {
      await fetch(`${serverUrl}/analytics/pageview`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ page: 'contact' })
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${serverUrl}/contact`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Location',
      details: ['7, Raimi Omole St, Imo, Ilesa', 'Osun State, Nigeria', '23303']
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+234 (703) 090 7726']
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['destinydevelopment2011@gmail.com']
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6 text-white font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get in touch with us to learn more about our programs, volunteer opportunities, 
            or partnership possibilities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl mb-8 text-white">Get In Touch</h2>
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                    <CardContent className="p-6 flex gap-4">
                      <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-lg mb-2 text-white">{info.title}</h3>
                        {info.details.map((detail, dIndex) => (
                          <p key={dIndex} className="text-gray-300">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-cyan-500/10 border-cyan-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg mb-3 text-white">Office Hours</h3>
                <div className="space-y-2 text-gray-300">
                  <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p>Saturday: 9:00 AM - 1:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-3xl mb-6 text-white">Send Us a Message</h2>

                {submitted && (
                  <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-md mb-6">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-300">Subject *</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">Message *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-0" disabled={loading}>
                    <Send className="w-5 h-5 mr-2" />
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl mb-8 text-center text-white">Ways to Get Involved</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:shadow-2xl transition-all">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl mb-3 text-white">Volunteer</h3>
                <p className="text-gray-300 mb-4">
                  Join our team of dedicated volunteers and make a direct impact in communities
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:shadow-2xl transition-all">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl mb-3 text-white">Partner With Us</h3>
                <p className="text-gray-300 mb-4">
                  Collaborate with DDI to expand our reach and maximize impact
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:shadow-2xl transition-all">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl mb-3 text-white">Support Our Programs</h3>
                <p className="text-gray-300 mb-4">
                  Donate or sponsor specific programs to help us continue our work
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
