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
    'Complete mentor training and orientation',
    'Align with DDI values and mission'
  ];

  const expectations = [
    'Meet with your mentee regularly (at least once a month)',
    'Provide guidance through conversations and practical advice',
    'Be a positive role model and demonstrate godly values',
    'Maintain confidentiality and professional boundaries',
    'Participate in mentor check-ins and feedback sessions',
    'Support your mentee\'s personal, academic, and spiritual growth'
  ];

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6 font-bold text-blue-600">Become a Mentor</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join the Destiny Mentoring Programme and help shape the future by guiding young people 
            towards purposeful, efficient, and effective living.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl mb-8 font-bold text-slate-900 text-center">Why Become a Mentor?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Requirements and Expectations */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl mb-6 font-bold text-blue-600">Mentor Requirements</h3>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-700">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl mb-6 font-bold text-blue-600">What We Expect</h3>
              <ul className="space-y-3">
                {expectations.map((exp, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-700">{exp}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <h2 className="text-3xl mb-6 font-bold text-blue-600 text-center">Mentor Application Form</h2>
            <p className="text-slate-600 mb-8 text-center">
              Fill out the form below to apply to become a mentor. We'll review your application and get back to you soon.
            </p>

            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
                Thank you for your application! We'll review it and contact you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">Current Occupation *</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Educational Background *</Label>
                <Input
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="e.g., Bachelor's Degree in Business Administration"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Relevant Experience *</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  rows={4}
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Tell us about your experience working with youth or in mentorship roles"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills and Expertise *</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  rows={3}
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="What skills or knowledge can you share with young people?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability *</Label>
                <Input
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  placeholder="e.g., Weekends, Evenings, Once a month"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Why do you want to become a mentor? *</Label>
                <Textarea
                  id="motivation"
                  name="motivation"
                  rows={5}
                  value={formData.motivation}
                  onChange={handleChange}
                  placeholder="Share your motivation for joining the Destiny Mentoring Programme"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                <Send className="w-5 h-5 mr-2" />
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mt-12 max-w-4xl mx-auto bg-blue-50 border-blue-200">
          <CardContent className="p-8">
            <h3 className="text-2xl mb-4 font-bold text-blue-600">What Happens Next?</h3>
            <div className="space-y-3 text-slate-700">
              <p className="flex items-start gap-3">
                <span className="font-bold text-blue-600">1.</span>
                <span>We'll review your application within 1-2 weeks</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="font-bold text-blue-600">2.</span>
                <span>If selected, you'll be invited for an interview</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="font-bold text-blue-600">3.</span>
                <span>Complete our mentor training and orientation program</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="font-bold text-blue-600">4.</span>
                <span>Get matched with a mentee based on interests and compatibility</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="font-bold text-blue-600">5.</span>
                <span>Begin your mentorship journey and make a lasting impact!</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
