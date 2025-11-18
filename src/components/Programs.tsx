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
      icon: Users,
      title: 'Youth Empowerment & Engagement',
      description: 'Enterprise development, economic empowerment, education promotion, health for development, and good governance',
      page: 'economic-empowerment',
      color: 'bg-blue-600',
      image: 'https://images.unsplash.com/photo-1759922378187-11a435837df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMGVtcG93ZXJtZW50JTIwdHJhaW5pbmd8ZW58MXx8fHwxNzYzNDk1NzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      icon: Heart,
      title: 'Care and Support for OVC',
      description: 'Providing care and support for 500 orphans and vulnerable children per annum through community mobilization',
      page: 'social-service',
      color: 'bg-blue-600',
      image: 'https://images.unsplash.com/photo-1761039808159-f02b58f07032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBkZXZlbG9wbWVudCUyMGFmcmljYXxlbnwxfHx8fDE3NjM0OTU3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      icon: BookOpen,
      title: 'Destiny Equip Mission (DEM)',
      description: 'Raising young institution and nation builders through mentorship, training, and leadership development',
      page: 'education',
      color: 'bg-blue-600',
      image: 'https://images.unsplash.com/photo-1553777907-f5dbbbb44d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3R1ZGVudHMlMjBlZHVjYXRpb258ZW58MXx8fHwxNzYzNDk1NzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      icon: Building,
      title: 'Foundation Partnerships',
      description: 'Collaborative initiatives with Olaleye Ajanaku, Odidere, and FE-YI Foundations for community impact',
      page: 'projects',
      color: 'bg-blue-600',
      image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtd29yayUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzYzNDE4NzM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6 font-bold text-blue-600">What We Do</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            DDI Strategic Plan focuses on major focal areas that encompass running programs and planned strategies to address emerging issues in youth development and community welfare.
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
  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6 font-bold text-blue-600">Care and Support for OVC</h1>
        <p className="text-xl text-slate-600 mb-12 max-w-3xl">
          Promoting the value of working together to assist Orphans and Vulnerable Children in our communities.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="hover:shadow-xl transition-all">
            <CardContent className="p-8">
              <h3 className="text-2xl mb-4 font-bold text-blue-600">Our Goal</h3>
              <p className="text-slate-700 text-lg">Provide care and support for 500 orphans and vulnerable children per annum</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all">
            <CardContent className="p-8">
              <h3 className="text-2xl mb-4 font-bold text-blue-600">Our Approach</h3>
              <p className="text-slate-700 text-lg">Increased access to social services and welfare for disadvantaged and vulnerable groups</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardContent className="p-8">
            <h3 className="text-2xl mb-6 font-bold text-blue-600">How We Work</h3>
            <div className="space-y-4 text-slate-700">
              <p className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">•</span>
                <span>The organization mobilizes people to help one another and not always look for aid externally</span>
              </p>
              <p className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">•</span>
                <span>DDI continues to collect and coordinate aid for the poor, the needy and orphans</span>
              </p>
              <p className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">•</span>
                <span>DDI creates major strategies to study and analyze the problems of OVC and devise strategies to support them</span>
              </p>
            </div>
          </CardContent>
        </Card>
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
    { 
      title: 'Enterprise Development & Economic Empowerment', 
      description: 'Implementing enterprise development with special focus on Agriculture, ICT, Manufacturing and Packaging, Trading and Fashion',
      target: 'Youth (10-35)',
      goal: 'Equip, empower and organize youth towards personal, economic and national development'
    },
    { 
      title: 'Education Promotion', 
      description: 'Partner with Destiny Equip Mission to create enabling environment and services to teens around all our secondary schools',
      target: 'Minimum 1000 teens monthly',
      goal: 'Help teens be successfully transformed, contributing positively to society'
    },
    { 
      title: 'Preventive and Curative Health for Development', 
      description: 'Health promotion through Awareness, Prevention and treatment/management of TB, HIV/AIDS, Malaria, Hepatitis',
      target: '3,000 Youth and 10 PLHIV',
      goal: 'Improve health outcomes and provide care and support'
    },
    { 
      title: 'Good Governance and Human Rights Strategies', 
      description: 'Partner with government to implement youth policy, carry out budget monitoring and tracking',
      target: 'Citizens and Youth',
      goal: 'Increase citizens\' consciousness of their fundamental human rights'
    },
  ];

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6 font-bold text-blue-600">Youth Empowerment & Engagement</h1>
        <p className="text-xl text-slate-600 mb-12 max-w-3xl">
          Our approach targets youth aged 10-35 years, covering those in and out of school, with varying levels of education from primary to postgraduate.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className="hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <h3 className="text-2xl mb-3 font-bold text-blue-600">{program.title}</h3>
                <p className="text-slate-700 mb-4">{program.description}</p>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-600"><span className="font-semibold">Target:</span> {program.target}</p>
                  <p className="text-slate-600"><span className="font-semibold">Goal:</span> {program.goal}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Education() {
  const operations = [
    { title: 'Destiny Coach Network (DCN)', description: 'Mentorship and development through Ignite, Destiny Mentoring Programme, Book Series, News, and Exposure divisions' },
    { title: 'Teens Lead and Y-Lead', description: 'Leadership development programs for teenagers and youth' },
    { title: 'Destiny Lift', description: 'Empowerment and upliftment initiatives for young people' },
    { title: 'Academic Competition', description: 'Encouraging academic excellence through competitions' },
    { title: 'School Effectiveness Enhancement Programme', description: 'Improving school performance and student outcomes' },
    { title: 'Hope Next', description: 'Future-focused programs for youth development' },
    { title: 'Events', description: 'Conferences, camps, and gatherings for youth engagement' },
  ];

  const objectives = [
    'Helping young people catch a vision for living',
    'Helping young people develop a sense of purpose',
    'Helping young people develop personal disciplines that will aide right self-actualization',
    'Helping young people develop positive and right value systems',
    'Helping young people develop personal and life skills',
    'Helping young people to develop leadership capacity'
  ];

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6 font-bold text-blue-600">Destiny Equip Mission (DEM)</h1>
        <p className="text-xl text-slate-600 mb-8 max-w-3xl">
          A transformative youth development initiative focused on raising a new generation of institution and nation builders.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="hover:shadow-xl transition-all">
            <CardContent className="p-8">
              <h3 className="text-2xl mb-4 font-bold text-blue-600">Vision</h3>
              <p className="text-slate-700 text-lg">Raising young institution and nation builders</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all">
            <CardContent className="p-8">
              <h3 className="text-2xl mb-4 font-bold text-blue-600">Mission</h3>
              <p className="text-slate-700 text-lg">Creating, organizing and providing resources material, trainings opportunities, service environment, experience and exposure that will help people develop needed skills and potentials for efficient living</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardContent className="p-8">
            <h3 className="text-2xl mb-6 font-bold text-blue-600">Our Objectives</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {objectives.map((objective, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">{index + 1}</span>
                  <p className="text-slate-700">{objective}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl mb-6 font-bold text-slate-900">Our Operations</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {operations.map((program, index) => (
            <Card key={index} className="hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <h3 className="text-lg mb-2 font-bold text-blue-600">{program.title}</h3>
                <p className="text-slate-600">{program.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12">
          <CardContent className="p-8">
            <h3 className="text-2xl mb-4 font-bold text-blue-600">Target Audience</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span><span>Young People (Ages 12–35): Teenagers, students, fresh graduates, emerging professionals</span></li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span><span>Youth in Secondary and Tertiary Institutions</span></li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span><span>Church-Based Youth Groups and Fellowship Leaders</span></li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span><span>Young Adults in Transition navigating post-school life</span></li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span><span>Aspiring Change-Makers and Community Builders</span></li>
            </ul>
          </CardContent>
        </Card>
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
  const foundations = [
    {
      name: 'Olaleye Ajanaku Foundation',
      initiatives: [
        { title: 'Safety Equipment for Okada Riders', description: 'Distributed helmets, reflective jackets, and gloves to Okada riders in Ilesa, Osun State' },
        { title: 'Teachers Award in Ijesa Zone', description: 'Recognized 18 outstanding teachers from 6 Local Govt Areas with certificates and monetary awards' },
        { title: 'Food Support for the Elderly', description: 'Provided food packages to elderly individuals in Ilesa' },
        { title: 'Economic Women Empowerment', description: 'Grants to women entrepreneurs through DDI MicroCredit Scheme' },
        { title: 'Christmas Food Support', description: 'Over 20 residents of Kajola, Imo benefited from food items and support' },
      ]
    },
    {
      name: 'Odidere Foundation',
      initiatives: [
        { title: 'Food Support for the Elderly', description: 'Food assistance to elderly in Kajola, Imo Local Government area' },
        { title: 'Economic Women Empowerment', description: 'Grants to enhance women\'s economic status through DDI MicroCredit Scheme' },
      ]
    },
    {
      name: 'FE-YI Foundation',
      initiatives: [
        { title: 'Food Support for the Elderly', description: 'Food packages to identified elderly individuals for essential nutrition' },
      ]
    },
  ];

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6 font-bold text-blue-600">Foundation Partnerships</h1>
        <p className="text-xl text-slate-600 mb-12 max-w-3xl">
          Community support initiatives undertaken in collaboration with DDI Social Services and DDI MicroCredit Scheme.
        </p>

        <div className="space-y-8">
          {foundations.map((foundation, index) => (
            <Card key={index} className="hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <h2 className="text-3xl mb-6 font-bold text-blue-600">{foundation.name}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {foundation.initiatives.map((initiative, iIndex) => (
                    <div key={iIndex} className="bg-slate-50 p-6 rounded-lg">
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{initiative.title}</h3>
                      <p className="text-slate-600">{initiative.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12">
          <CardContent className="p-8">
            <h3 className="text-2xl mb-4 font-bold text-blue-600">Overall Impact</h3>
            <p className="text-slate-700 text-lg mb-6">
              The collaborative efforts between the foundations and DDI Social Services and DDI Micro Credit Scheme have led to significant improvements in community welfare.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">•</span>
                <span className="text-slate-700">Enhanced safety for Okada riders</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">•</span>
                <span className="text-slate-700">Recognition and motivation for teachers</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">•</span>
                <span className="text-slate-700">Food security for the elderly</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">•</span>
                <span className="text-slate-700">Economic empowerment for women</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
