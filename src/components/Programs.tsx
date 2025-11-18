import { 
  Heart, 
  Briefcase, 
  Film, 
  TrendingUp, 
  BookOpen, 
  DollarSign,
  Droplet,
  Laptop,
  Trophy,
  Users,
  Scale,
  Building
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

interface ProgramsProps {
  section: string;
  onNavigate: (page: string) => void;
}

export function Programs({ section, onNavigate }: ProgramsProps) {
  const renderSection = () => {
    switch (section) {
      case 'social-service':
        return <SocialService />;
      case 'consult':
        return <Consult />;
      case 'ventures':
        return <Ventures />;
      case 'economic-empowerment':
        return <EconomicEmpowerment />;
      case 'education':
        return <Education />;
      case 'micro-credit':
        return <MicroCredit />;
      case 'projects':
        return <Projects />;
      default:
        return <ProgramsOverview onNavigate={onNavigate} />;
    }
  };

  return renderSection();
}

function ProgramsOverview({ onNavigate }: { onNavigate: (page: string) => void }) {
  const programs = [
    {
      icon: Heart,
      title: 'DDI Social Service',
      description: 'Comprehensive social services including health, water, sanitation, ICT, sports, and human rights',
      page: 'social-service',
      color: 'bg-blue-500',
      image: 'https://images.unsplash.com/photo-1761039808159-f02b58f07032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBkZXZlbG9wbWVudCUyMGFmcmljYXxlbnwxfHx8fDE3NjM0OTU3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      icon: Briefcase,
      title: 'DDI Consult',
      description: 'Professional consulting services for businesses and organizations in HRM, development, and training',
      page: 'consult',
      color: 'bg-green-500',
      image: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbnN1bHRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzYzMzg5NDk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      icon: Film,
      title: 'DDI Ventures',
      description: 'Media production, entertainment, and events through our specialized brands',
      page: 'ventures',
      color: 'bg-purple-500',
      image: 'https://images.unsplash.com/photo-1709316131422-35a5fb1e9eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcHJvZHVjdGlvbiUyMG1lZGlhfGVufDF8fHx8MTc2MzQ5NTcwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      icon: TrendingUp,
      title: 'Economic Empowerment',
      description: 'Vocational training, business mentoring, and market linkages for entrepreneurs',
      page: 'economic-empowerment',
      color: 'bg-orange-500',
      image: 'https://images.unsplash.com/photo-1759922378187-11a435837df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMGVtcG93ZXJtZW50JTIwdHJhaW5pbmd8ZW58MXx8fHwxNzYzNDk1NzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      icon: BookOpen,
      title: 'Education Promotion',
      description: 'Scholarships, career fairs, leadership camps, and educational support programs',
      page: 'education',
      color: 'bg-indigo-500',
      image: 'https://images.unsplash.com/photo-1553777907-f5dbbbb44d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3R1ZGVudHMlMjBlZHVjYXRpb258ZW58MXx8fHwxNzYzNDk1NzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      icon: DollarSign,
      title: 'Micro-Credit Scheme',
      description: 'Financial support and credit facilities for small businesses and entrepreneurs',
      page: 'micro-credit',
      color: 'bg-teal-500',
      image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtd29yayUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzYzNDE4NzM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6">What We Do</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive programs address multiple aspects of community development, 
            from education and health to economic empowerment and media production.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onNavigate(program.page)}
              >
                <div className="relative h-48">
                  <ImageWithFallback
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className={`absolute bottom-4 left-4 w-12 h-12 ${program.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl mb-3">{program.title}</h3>
                  <p className="text-gray-600">{program.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SocialService() {
  const services = [
    { icon: Droplet, title: 'Health, Water, Sanitation & Environment', description: 'Clean water initiatives, health education, and environmental conservation' },
    { icon: Laptop, title: 'ICT Empowerment', description: 'Digital literacy training and technology access programs' },
    { icon: Trophy, title: 'Sports & Entertainment', description: 'Community sports programs and recreational activities' },
    { icon: Users, title: 'Youth Voluntarism & Internship', description: 'Opportunities for young people to gain experience and give back' },
    { icon: Heart, title: 'Care & Support for OVC & Vulnerable Women', description: 'Support services for orphans, vulnerable children, and women' },
    { icon: Scale, title: 'Human Rights & Good Governance', description: 'Advocacy, education, and promotion of human rights' },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6">DDI Social Service</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          Our social service arm addresses critical community needs through integrated programs 
          in health, education, environment, and human rights.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Consult() {
  const services = [
    { title: 'HRM Services', description: 'Recruitment, training, and human resource management consulting' },
    { title: 'Business Development', description: 'Strategic planning, market analysis, and growth strategies' },
    { title: 'PBDA (Personal & Business Development Academy)', description: 'Training programs for personal and professional growth' },
    { title: 'Organizational Consulting', description: 'Capacity building and organizational development services' },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6">DDI Consult</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          Professional consulting services helping businesses, NGOs, and government agencies 
          improve their operations and achieve their goals.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index}>
              <CardContent className="p-8">
                <h3 className="text-2xl mb-3 text-green-600">{service.title}</h3>
                <p className="text-gray-700 text-lg">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Ventures() {
  const ventures = [
    { 
      title: 'Hebron Entertainment', 
      description: 'Music production, artist management, and entertainment services that inspire and uplift communities'
    },
    { 
      title: 'Right Life Media', 
      description: 'Film production, documentaries, and media content creation with positive social impact'
    },
    { 
      title: 'Right Life Events', 
      description: 'Professional event planning and management for corporate, social, and community events'
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6">DDI Ventures</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          Our media and entertainment ventures create content and experiences that entertain, 
          educate, and inspire positive change.
        </p>

        <div className="space-y-8">
          {ventures.map((venture, index) => (
            <Card key={index}>
              <CardContent className="p-8">
                <h3 className="text-3xl mb-4 text-purple-600">{venture.title}</h3>
                <p className="text-gray-700 text-lg">{venture.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 relative h-96 rounded-lg overflow-hidden shadow-xl">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1709316131422-35a5fb1e9eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcHJvZHVjdGlvbiUyMG1lZGlhfGVufDF8fHx8MTc2MzQ5NTcwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Film production"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function EconomicEmpowerment() {
  const programs = [
    { title: 'Vocational Training & Skills Centres', description: 'Hands-on training in various trades and crafts' },
    { title: 'Business Mentoring & Agripreneur Clusters', description: 'Guidance and support for agricultural entrepreneurs' },
    { title: 'Opportunity Search & Market Linkages', description: 'Connecting entrepreneurs with markets and opportunities' },
    { title: 'Conferences, Seminars & Partnerships', description: 'Networking events and partnership opportunities with DDI Consult' },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6">Economic Empowerment</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          Creating sustainable livelihoods through skills training, business support, and market access.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <Card key={index}>
              <CardContent className="p-8">
                <h3 className="text-2xl mb-3 text-orange-600">{program.title}</h3>
                <p className="text-gray-700">{program.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Education() {
  const programs = [
    { title: 'T-Lead Camp & Clubs', description: 'Leadership development programs for young people' },
    { title: 'Destiny Chat & Inspiration Programs', description: 'Motivational sessions and mentorship' },
    { title: 'Career Fairs, Scholarships & Exposure Tours', description: 'Educational opportunities and career guidance' },
    { title: 'Adult Literacy & Guidance Counselling', description: 'Literacy programs and professional counseling services' },
    { title: 'Education Media Campaigns', description: 'IEC materials and social media advocacy for education' },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6">Education Promotion</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          Supporting students at all levels through scholarships, mentorship, and educational programs.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="text-lg mb-2 text-indigo-600">{program.title}</h3>
                <p className="text-gray-600">{program.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function MicroCredit() {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6">Micro-Credit Scheme (MCS)</h1>
        <p className="text-xl text-gray-600 mb-12">
          Providing accessible financial services to entrepreneurs and small businesses who lack 
          access to traditional banking services.
        </p>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl mb-4 text-teal-600">What We Offer</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>Small loans for business startup and expansion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>Flexible repayment terms designed for small businesses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>Financial literacy training and business support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>Group lending and savings programs</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl mb-4 text-teal-600">Who Can Benefit</h3>
              <p className="text-gray-700">
                Our micro-credit scheme is designed for entrepreneurs, artisans, farmers, and 
                small business owners who need capital to start or grow their businesses but 
                lack collateral or credit history for traditional loans.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const impactStories = [
    {
      title: 'Scholarship Program Success',
      description: 'Over 1,000 students have received scholarships to complete their education, with 95% graduation rate',
      impact: '1,000+ Students Supported'
    },
    {
      title: 'Business Development Impact',
      description: 'Consulted with 500+ businesses helping them improve operations and increase revenue',
      impact: '500+ Businesses Consulted'
    },
    {
      title: 'Vocational Training Centers',
      description: 'Established training centers teaching valuable skills to 2,000+ youth',
      impact: '2,000+ Youth Trained'
    },
    {
      title: 'Media Productions',
      description: 'Produced 50+ films and media content reaching millions with positive messages',
      impact: '50+ Films Produced'
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6">Projects & Impact Stories</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          Real stories of lives transformed through DDI programs and initiatives.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {impactStories.map((story, index) => (
            <Card key={index}>
              <CardContent className="p-8">
                <div className="text-3xl text-blue-600 mb-4">{story.impact}</div>
                <h3 className="text-2xl mb-3">{story.title}</h3>
                <p className="text-gray-700">{story.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
