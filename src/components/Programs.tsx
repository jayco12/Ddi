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
      title: 'Youth Empowerment & Engagement',
      description: 'We implement enterprise development with special focus on Agriculture, ICT, Manufacturing, Trading and Fashion. Our programs equip, empower and organize youth aged 10-35 towards personal, economic and national development.',
      page: 'economic-empowerment',
      image: 'https://images.unsplash.com/photo-1759922378187-11a435837df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMGVtcG93ZXJtZW50JTIwdHJhaW5pbmd8ZW58MXx8fHwxNzYzNDk1NzA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      stats: ['10-35 Age Range', 'Enterprise Development', 'Economic Empowerment']
    },
    {
      title: 'Care and Support for OVC',
      description: 'Promoting the value of working together to assist Orphans and Vulnerable Children in our communities. We mobilize people to help one another and coordinate aid for the poor, the needy and orphans.',
      page: 'social-service',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80',
      stats: ['500+ Children Annually', 'Community Mobilization', 'Social Services']
    },
    {
      title: 'Destiny Equip Mission',
      description: 'Raising young institution and nation builders through mentorship, training, and leadership development. We create enabling environments and provide resources that help people develop needed skills for efficient living.',
      page: 'education',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1600&q=80',
      stats: ['1000+ Teens Monthly', 'Leadership Training', 'Mentorship Programs']
    },
    {
      title: 'Foundation Partnerships',
      description: 'Collaborative initiatives with Olaleye Ajanaku, Odidere, and FE-YI Foundations for community impact. We work together to enhance safety, recognize excellence, provide food support, and empower women economically.',
      page: 'projects',
      image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtd29yayUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzYzNDE4NzM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      stats: ['3 Foundation Partners', 'Community Impact', 'Women Empowerment']
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Hero Section */}
      <div className="relative py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl mb-6 font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>What We Do</h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            DDI Strategic Plan focuses on major focal areas that encompass running programs and planned strategies to address emerging issues in youth development and community welfare.
          </p>
        </div>
      </div>

      {/* Program Sections */}
      {programs.map((program, index) => (
        <div key={index} className={`py-20 ${index % 2 === 0 ? 'bg-gray-950' : 'bg-gray-900'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>{program.title}</h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">{program.description}</p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {program.stats.map((stat, idx) => (
                    <span key={idx} className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">{stat}</span>
                  ))}
                </div>
                <Button
                  onClick={() => onNavigate(program.page)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-cyan-500/50 transition-all hover:scale-105"
                >
                  Learn More
                </Button>
              </div>
              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src={program.image}
                    alt={program.title}
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl opacity-20 blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SocialService() {
  return (
    <div className="py-20 bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6 font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>Care and Support for OVC</h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl">
          Promoting the value of working together to assist Orphans and Vulnerable Children in our communities.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="hover:shadow-xl transition-all bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-8">
              <h3 className="text-2xl mb-4 font-bold text-cyan-400">Our Goal</h3>
              <p className="text-gray-300 text-lg">Provide care and support for 500 orphans and vulnerable children per annum</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-8">
              <h3 className="text-2xl mb-4 font-bold text-cyan-400">Our Approach</h3>
              <p className="text-gray-300 text-lg">Increased access to social services and welfare for disadvantaged and vulnerable groups</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12 bg-gray-800/50 border-gray-700/50">
          <CardContent className="p-8">
            <h3 className="text-2xl mb-6 font-bold text-cyan-400">How We Work</h3>
            <div className="space-y-4 text-gray-300">
              <p className="flex items-start">
                <span className="text-cyan-400 mr-3 text-xl">•</span>
                <span>The organization mobilizes people to help one another and not always look for aid externally</span>
              </p>
              <p className="flex items-start">
                <span className="text-cyan-400 mr-3 text-xl">•</span>
                <span>DDI continues to collect and coordinate aid for the poor, the needy and orphans</span>
              </p>
              <p className="flex items-start">
                <span className="text-cyan-400 mr-3 text-xl">•</span>
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
    <div className="py-20 bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6 text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>DDI Consult</h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl">
          Professional consulting services helping businesses, NGOs, and government agencies 
          improve their operations and achieve their goals.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-8">
                <h3 className="text-2xl mb-3 text-cyan-400">{service.title}</h3>
                <p className="text-gray-300 text-lg">{service.description}</p>
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
    <div className="py-20 bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6 text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>DDI Ventures</h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl">
          Our media and entertainment ventures create content and experiences that entertain, 
          educate, and inspire positive change.
        </p>

        <div className="space-y-8">
          {ventures.map((venture, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-8">
                <h3 className="text-3xl mb-4 text-purple-400">{venture.title}</h3>
                <p className="text-gray-300 text-lg">{venture.description}</p>
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
    <div className="py-20 bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6 font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>Youth Empowerment & Engagement</h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl">
          Our approach targets youth aged 10-35 years, covering those in and out of school, with varying levels of education from primary to postgraduate.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className="hover:shadow-xl transition-all bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-8">
                <h3 className="text-2xl mb-3 font-bold text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>{program.title}</h3>
                <p className="text-gray-300 mb-4">{program.description}</p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400"><span className="font-semibold text-cyan-400">Target:</span> {program.target}</p>
                  <p className="text-gray-400"><span className="font-semibold text-cyan-400">Goal:</span> {program.goal}</p>
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
    <div className="py-20 bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6 font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>Destiny Equip Mission (DEM)</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          A transformative youth development initiative focused on raising a new generation of institution and nation builders.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="hover:shadow-xl transition-all bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-8">
              <h3 className="text-2xl mb-4 font-bold text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>Vision</h3>
              <p className="text-gray-300 text-lg">Raising young institution and nation builders</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-8">
              <h3 className="text-2xl mb-4 font-bold text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>Mission</h3>
              <p className="text-gray-300 text-lg">Creating, organizing and providing resources material, trainings opportunities, service environment, experience and exposure that will help people develop needed skills and potentials for efficient living</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12 bg-gray-800/50 border-gray-700/50">
          <CardContent className="p-8">
            <h3 className="text-2xl mb-6 font-bold text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>Our Objectives</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {objectives.map((objective, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{index + 1}</span>
                  <p className="text-gray-300">{objective}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl mb-6 font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>Our Operations</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {operations.map((program, index) => (
            <Card key={index} className="hover:shadow-xl transition-all bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-6">
                <h3 className="text-lg mb-2 font-bold text-cyan-400">{program.title}</h3>
                <p className="text-gray-400">{program.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-gray-800/50 border-gray-700/50">
          <CardContent className="p-8">
            <h3 className="text-2xl mb-4 font-bold text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>Target Audience</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start"><span className="text-cyan-400 mr-2">•</span><span>Young People (Ages 12–35): Teenagers, students, fresh graduates, emerging professionals</span></li>
              <li className="flex items-start"><span className="text-cyan-400 mr-2">•</span><span>Youth in Secondary and Tertiary Institutions</span></li>
              <li className="flex items-start"><span className="text-cyan-400 mr-2">•</span><span>Church-Based Youth Groups and Fellowship Leaders</span></li>
              <li className="flex items-start"><span className="text-cyan-400 mr-2">•</span><span>Young Adults in Transition navigating post-school life</span></li>
              <li className="flex items-start"><span className="text-cyan-400 mr-2">•</span><span>Aspiring Change-Makers and Community Builders</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MicroCredit() {
  return (
    <div className="py-20 bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6 text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>Micro-Credit Scheme (MCS)</h1>
        <p className="text-xl text-gray-300 mb-12">
          Providing accessible financial services to entrepreneurs and small businesses who lack 
          access to traditional banking services.
        </p>

        <div className="space-y-8">
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-8">
              <h3 className="text-2xl mb-4 text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>What We Offer</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Small loans for business startup and expansion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Flexible repayment terms designed for small businesses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Financial literacy training and business support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Group lending and savings programs</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-8">
              <h3 className="text-2xl mb-4 text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>Who Can Benefit</h3>
              <p className="text-gray-300">
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
    <div className="py-20 bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl mb-6 font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>Foundation Partnerships</h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl">
          Community support initiatives undertaken in collaboration with DDI Social Services and DDI MicroCredit Scheme.
        </p>

        <div className="space-y-8">
          {foundations.map((foundation, index) => (
            <Card key={index} className="hover:shadow-xl transition-all bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-8">
                <h2 className="text-3xl mb-6 font-bold text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>{foundation.name}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {foundation.initiatives.map((initiative, iIndex) => (
                    <div key={iIndex} className="bg-gray-900/50 p-6 rounded-lg border border-gray-700/30">
                      <h3 className="text-lg font-bold text-white mb-2">{initiative.title}</h3>
                      <p className="text-gray-400">{initiative.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-gray-800/50 border-gray-700/50">
          <CardContent className="p-8">
            <h3 className="text-2xl mb-4 font-bold text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>Overall Impact</h3>
            <p className="text-gray-300 text-lg mb-6">
              The collaborative efforts between the foundations and DDI Social Services and DDI Micro Credit Scheme have led to significant improvements in community welfare.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-cyan-400 mr-3 text-xl">•</span>
                <span className="text-gray-300">Enhanced safety for Okada riders</span>
              </div>
              <div className="flex items-start">
                <span className="text-cyan-400 mr-3 text-xl">•</span>
                <span className="text-gray-300">Recognition and motivation for teachers</span>
              </div>
              <div className="flex items-start">
                <span className="text-cyan-400 mr-3 text-xl">•</span>
                <span className="text-gray-300">Food security for the elderly</span>
              </div>
              <div className="flex items-start">
                <span className="text-cyan-400 mr-3 text-xl">•</span>
                <span className="text-gray-300">Economic empowerment for women</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
