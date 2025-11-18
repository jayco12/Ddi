import { Target, History, Users as UsersIcon, Handshake } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutProps {
  section: string;
  onNavigate: (page: string) => void;
}

export function About({ section, onNavigate }: AboutProps) {
  const renderSection = () => {
    switch (section) {
      case 'vision-mission':
        return <VisionMission />;
      case 'history':
        return <History />;
      case 'team':
        return <Team />;
      case 'partners':
        return <Partners />;
      default:
        return <AboutOverview onNavigate={onNavigate} />;
    }
  };

  return renderSection();
}

function AboutOverview({ onNavigate }: { onNavigate: (page: string) => void }) {
  const sections = [
    {
      icon: Target,
      title: 'Vision & Mission',
      description: 'Our guiding principles and what we strive to achieve',
      page: 'vision-mission',
      color: 'bg-blue-500'
    },
    {
      icon: History,
      title: 'Our Story',
      description: 'The journey of DDI and how we got started',
      page: 'history',
      color: 'bg-green-500'
    },
    {
      icon: UsersIcon,
      title: 'Leadership & Team',
      description: 'Meet the people driving our mission forward',
      page: 'team',
      color: 'bg-purple-500'
    },
    {
      icon: Handshake,
      title: 'Our Partners',
      description: 'Organizations and institutions we work with',
      page: 'partners',
      color: 'bg-orange-500'
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6">About DDI</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dedicated Development Initiative (DDI) is a comprehensive development organization 
            committed to creating sustainable positive change through education, economic empowerment, 
            and social services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {sections.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onNavigate(item.page)}
              >
                <CardContent className="p-8">
                  <div className={`w-14 h-14 ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtd29yayUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzYzNDE4NzM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="DDI Team"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function VisionMission() {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-12 text-center">Vision, Mission & Values</h1>
        
        <div className="space-y-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl mb-4 text-blue-600">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                A world where every individual has access to quality education, economic opportunities, 
                and the resources needed to achieve their full potential and contribute meaningfully to society.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl mb-4 text-green-600">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To empower communities through comprehensive programs in education, economic development, 
                and social services. We work to create sustainable change by providing scholarships, 
                business consulting, vocational training, and media services that inspire and transform lives.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl mb-4 text-purple-600">Our Values</h2>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Excellence:</strong> We strive for the highest standards in all our programs and services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Integrity:</strong> We operate with transparency, honesty, and accountability</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Empowerment:</strong> We believe in equipping people with skills and resources for self-sufficiency</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Innovation:</strong> We embrace creative solutions to address complex challenges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Collaboration:</strong> We partner with communities, organizations, and governments to maximize impact</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function History() {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-12 text-center">Our Story</h1>
        
        <div className="space-y-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            DDI was founded with a simple yet powerful vision: to create pathways for individuals 
            and communities to break the cycle of poverty through education and economic empowerment.
          </p>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl mb-4">The Beginning</h3>
              <p className="text-gray-700 leading-relaxed">
                What started as a small scholarship program for disadvantaged students has grown 
                into a comprehensive development organization with multiple arms serving thousands 
                of beneficiaries across various sectors.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl mb-4">Growth & Evolution</h3>
              <p className="text-gray-700 leading-relaxed">
                Over the years, DDI expanded its services to include business consulting, media production, 
                vocational training, and micro-credit schemes. Each program was developed in response to 
                identified community needs and designed to create sustainable, long-term impact.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl mb-4">Today</h3>
              <p className="text-gray-700 leading-relaxed">
                Today, DDI operates through multiple specialized arms - DDI Social Service, DDI Consult, 
                and DDI Ventures - each contributing unique value while working together towards our 
                shared mission of community empowerment and sustainable development.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Team() {
  const teamMembers = [
    { name: 'Leadership Team', role: 'Board of Directors', description: 'Strategic oversight and governance' },
    { name: 'Program Directors', role: 'Program Management', description: 'Leading our core programs' },
    { name: 'Consultants', role: 'DDI Consult', description: 'Business development experts' },
    { name: 'Media Team', role: 'DDI Ventures', description: 'Creative professionals' },
    { name: 'Field Officers', role: 'Community Engagement', description: 'On-ground implementation' },
    { name: 'Volunteers', role: 'Support Staff', description: 'Dedicated community supporters' },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-12 text-center">Our Leadership & Team</h1>
        
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          DDI is powered by a dedicated team of professionals, volunteers, and community leaders 
          committed to creating positive change.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="text-xl mb-2">{member.name}</h3>
                <div className="text-blue-600 mb-3">{member.role}</div>
                <p className="text-gray-600">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Partners() {
  const partnerCategories = [
    {
      title: 'Government Partners',
      partners: ['Ministry of Education', 'Local Government Authorities', 'Youth Development Agencies']
    },
    {
      title: 'Corporate Partners',
      partners: ['Technology Companies', 'Financial Institutions', 'Media Organizations']
    },
    {
      title: 'NGO Partners',
      partners: ['International Development Organizations', 'Local Community Organizations', 'Faith-Based Organizations']
    },
    {
      title: 'Educational Institutions',
      partners: ['Universities', 'Vocational Training Centers', 'Secondary Schools']
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-12 text-center">Our Partners</h1>
        
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          We work with a diverse network of partners to maximize our impact and reach more communities.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {partnerCategories.map((category, index) => (
            <Card key={index}>
              <CardContent className="p-8">
                <h3 className="text-2xl mb-4 text-blue-600">{category.title}</h3>
                <ul className="space-y-2">
                  {category.partners.map((partner, pIndex) => (
                    <li key={pIndex} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {partner}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
