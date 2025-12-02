import { useState, useEffect } from 'react';
import { Users, Heart, Target, BookOpen, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function Mentor() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    occupation: '',
    education: '',
    experience: '',
    availability: '',
    motivation: '',
    skills: ''
  });
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
        body: JSON.stringify({ page: 'mentor' })
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${serverUrl}/mentor-application`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          age: '',
          occupation: '',
          education: '',
          experience: '',
          availability: '',
          motivation: '',
          skills: ''
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Error submitting application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting mentor application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const benefits = [
    {
      icon: Heart,
      title: 'Make a Difference',
      description: 'Impact the life of a young person and help them discover their purpose and potential'
    },
    {
      icon: Users,
      title: 'Build Relationships',
      description: 'Form meaningful connections with passionate young people eager to learn and grow'
    },
    {
      icon: Target,
      title: 'Personal Growth',
      description: 'Develop your leadership and communication skills while giving back to the community'
    },
    {
      icon: BookOpen,
      title: 'Share Your Experience',
      description: 'Use your knowledge and life experiences to guide the next generation of leaders'
    }
  ];

  const requirements = [
    'Be at least 21 years old',
    'Have integrity and a heart for youth development',
    'Be willing to commit to a mentorship period (3 months to 1 year)',
    'Be accessible and responsive to your assigned mentee',
    'Complete destiny coach training and orientation',
    'Align with DDI values and mission'
  ];

  const expectations = [
    'Meet with your mentee regularly (at least once a month)',
    'Provide guidance through conversations and practical advice',
    'Be a positive role model and demonstrate godly values',
    'Maintain confidentiality and professional boundaries',
    'Participate in destiny coach check-ins and feedback sessions',
    'Support your mentee\'s personal, academic, and spiritual growth'
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6 font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>Become a Destiny Coach</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join the Destiny Coaching Programme and help shape the future by guiding young people 
            towards purposeful, efficient, and effective living.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl mb-8 font-bold text-white text-center" style={{ fontFamily: "'Orbitron', sans-serif" }}>Why Become a Destiny Coach?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-all bg-gray-800/50 border-gray-700/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Requirements and Expectations */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-8">
              <h3 className="text-2xl mb-6 font-bold text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>Destiny Coach Requirements</h3>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-8">
              <h3 className="text-2xl mb-6 font-bold text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>What We Expect</h3>
              <ul className="space-y-3">
                {expectations.map((exp, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">{exp}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <Card className="max-w-4xl mx-auto bg-gray-800/50 border-gray-700/50">
          <CardContent className="p-8">
            <h2 className="text-3xl mb-6 font-bold text-cyan-400 text-center" style={{ fontFamily: "'Orbitron', sans-serif" }}>Destiny Coach Application Form</h2>
            <p className="text-gray-300 mb-8 text-center">
              Fill out the form below to apply to become a destiny coach. We'll review your application and get back to you soon.
            </p>

            {submitted && (
              <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-md mb-6">
                Thank you for your application! We'll review it and contact you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-300">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="bg-gray-900/50 border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-900/50 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-gray-900/50 border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-gray-300">Age *</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="bg-gray-900/50 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation" className="text-gray-300">Current Occupation *</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                  className="bg-gray-900/50 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education" className="text-gray-300">Educational Background *</Label>
                <Input
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="e.g., Bachelor's Degree in Business Administration"
                  required
                  className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience" className="text-gray-300">Relevant Experience *</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  rows={4}
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Tell us about your experience working with youth or in coaching roles"
                  required
                  className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills" className="text-gray-300">Skills and Expertise *</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  rows={3}
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="What skills or knowledge can you share with young people?"
                  required
                  className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability" className="text-gray-300">Availability *</Label>
                <Input
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  placeholder="e.g., Weekends, Evenings, Once a month"
                  required
                  className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation" className="text-gray-300">Why do you want to become a destiny coach? *</Label>
                <Textarea
                  id="motivation"
                  name="motivation"
                  rows={5}
                  value={formData.motivation}
                  onChange={handleChange}
                  placeholder="Share your motivation for joining the Destiny Coaching Programme"
                  required
                  className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white" disabled={loading}>
                <Send className="w-5 h-5 mr-2" />
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mt-12 max-w-4xl mx-auto bg-gray-800/50 border-cyan-500/30">
          <CardContent className="p-8">
            <h3 className="text-2xl mb-4 font-bold text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>What Happens Next?</h3>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-start gap-3">
                <span className="font-bold text-cyan-400">1.</span>
                <span>We'll review your application within 1-2 weeks</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="font-bold text-cyan-400">2.</span>
                <span>If selected, you'll be invited for an interview</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="font-bold text-cyan-400">3.</span>
                <span>Complete our destiny coach training and orientation program</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="font-bold text-cyan-400">4.</span>
                <span>Get matched with a coachee based on interests and compatibility</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="font-bold text-cyan-400">5.</span>
                <span>Begin your coaching journey and make a lasting impact!</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
