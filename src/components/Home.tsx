import { ArrowRight, Users, BookOpen, Briefcase, Film, Heart, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const programs = [
    {
      icon: Heart,
      title: 'DDI Social Service',
      description: 'Health, Water, Sanitation, ICT Empowerment, Sports & Human Rights',
      color: 'bg-blue-500',
      page: 'social-service'
    },
    {
      icon: Briefcase,
      title: 'DDI Consult',
      description: 'HRM Services, Business Development & Organizational Consulting',
      color: 'bg-green-500',
      page: 'consult'
    },
    {
      icon: Film,
      title: 'DDI Ventures',
      description: 'Hebron Entertainment, Right Life Media & Right Life Events',
      color: 'bg-purple-500',
      page: 'ventures'
    },
    {
      icon: TrendingUp,
      title: 'Economic Empowerment',
      description: 'Vocational Training, Business Mentoring & Market Linkages',
      color: 'bg-orange-500',
      page: 'economic-empowerment'
    },
    {
      icon: BookOpen,
      title: 'Education Promotion',
      description: 'Scholarships, Career Fairs, T-Lead Camps & Guidance Counselling',
      color: 'bg-indigo-500',
      page: 'education'
    },
    {
      icon: Users,
      title: 'Micro-Credit Scheme',
      description: 'Financial support for entrepreneurs and small businesses',
      color: 'bg-teal-500',
      page: 'micro-credit'
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Students Supported' },
    { number: '500+', label: 'Businesses Consulted' },
    { number: '50+', label: 'Media Projects' },
    { number: '20+', label: 'Partner Organizations' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/90 z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1553777907-f5dbbbb44d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3R1ZGVudHMlMjBlZHVjYXRpb258ZW58MXx8fHwxNzYzNDk1NzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Students learning together"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl mb-6">
            Empowering Communities, Transforming Lives
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            DDI - Dedicated to sustainable development through education, business consulting, and youth empowerment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate('about')}
              className="bg-white text-blue-900 hover:bg-gray-100"
            >
              Learn More About Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('contact')}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10"
            >
              Get Involved
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600">
              To empower individuals and communities through comprehensive programs in education, 
              economic development, and social services, creating sustainable positive change across all sectors of society.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">
              What We Do
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive programs designed to create lasting impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => onNavigate(program.page)}
                >
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${program.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl mb-2">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {program.description}
                    </p>
                    <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Impact Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-6">
                Creating Real Impact
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Through our integrated approach combining education, economic empowerment, and social services, 
                we've helped thousands of students access quality education through scholarships, supported 
                hundreds of businesses through consulting services, and produced impactful media content 
                that inspires communities.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our programs are designed to address root causes of poverty and inequality, providing 
                comprehensive support from skills training to market linkages, ensuring sustainable 
                development and long-term success.
              </p>
              <Button
                size="lg"
                onClick={() => onNavigate('projects')}
              >
                View Our Impact Stories
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1761039808159-f02b58f07032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBkZXZlbG9wbWVudCUyMGFmcmljYXxlbnwxfHx8fDE3NjM0OTU3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Community development"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you want to volunteer, partner with us, or support our programs, 
            there are many ways to get involved and create positive change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate('contact')}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Contact Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('blog')}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10"
            >
              Read Our Blog
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
