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
  Building,
  Target
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
    <div className="bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Hero Banner */}
      <div className="relative h-[60vh] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000&q=80"
          alt="Children community support"
          className="absolute inset-0 w-full h-full object-cover animate-float-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/50 to-gray-950" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl mb-6 font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>DDI Social Service</h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Promoting the value of working together to assist Orphans and Vulnerable Children in our communities.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Image Gallery */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=600&q=80'
          ].map((img, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-2xl shadow-xl animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <ImageWithFallback src={img} alt={`OVC Support ${idx + 1}`} className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="hover:shadow-xl transition-all bg-gray-800/50 border-gray-700/50 group">
            <CardContent className="p-8">
              <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4 font-bold text-cyan-400">Our Goal</h3>
              <p className="text-gray-300 text-lg">Provide care and support for 500 orphans and vulnerable children per annum</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all bg-gray-800/50 border-gray-700/50 group">
            <CardContent className="p-8">
              <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-white" />
              </div>
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
    { title: 'HRM Services', description: 'Recruitment, training, and human resource management consulting', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80', icon: Users },
    { title: 'Business Development', description: 'Strategic planning, market analysis, and growth strategies', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', icon: TrendingUp },
    { title: 'PBDA (Personal & Business Development Academy)', description: 'Training programs for personal and professional growth', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80', icon: BookOpen },
    { title: 'Organizational Consulting', description: 'Capacity building and organizational development services', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80', icon: Building },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="relative h-[60vh] overflow-hidden">
        <ImageWithFallback src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80" alt="Business consulting" className="absolute inset-0 w-full h-full object-cover animate-float-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/50 to-gray-950" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl mb-6 font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>DDI Consult</h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">Professional consulting services helping businesses, NGOs, and government agencies improve their operations and achieve their goals.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className={`${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'} animate-fade-in`}>
                <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl mb-4 font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>{service.title}</h3>
                <p className="text-lg text-gray-300 leading-relaxed">{service.description}</p>
              </div>
              <div className={`${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'} relative animate-fade-in`} style={{ animationDelay: '0.2s' }}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                  <ImageWithFallback src={service.image} alt={service.title} className="w-full h-[350px] object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Ventures() {
  const ventures = [
    { title: 'Hebron Entertainment', description: 'Music production, artist management, and entertainment services that inspire and uplift communities', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80', icon: Trophy },
    { title: 'Right Life Media', description: 'Film production, documentaries, and media content creation with positive social impact', image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=800&q=80', icon: Film },
    { title: 'Right Life Events', description: 'Professional event planning and management for corporate, social, and community events', image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=800&q=80', icon: Users },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="relative h-[60vh] overflow-hidden">
        <ImageWithFallback src="https://images.unsplash.com/photo-1709316131422-35a5fb1e9eb2?auto=format&fit=crop&w=2000&q=80" alt="Media production" className="absolute inset-0 w-full h-full object-cover animate-float-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/50 to-gray-950" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl mb-6 font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>DDI Ventures</h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">Our media and entertainment ventures create content and experiences that entertain, educate, and inspire positive change.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {ventures.map((venture, index) => {
          const Icon = venture.icon;
          return (
            <div key={index} className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className={`${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'} animate-fade-in`}>
                <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl mb-4 font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>{venture.title}</h3>
                <p className="text-lg text-gray-300 leading-relaxed">{venture.description}</p>
              </div>
              <div className={`${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'} relative animate-fade-in`} style={{ animationDelay: '0.2s' }}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                  <ImageWithFallback src={venture.image} alt={venture.title} className="w-full h-[350px] object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EconomicEmpowerment() {
  const programs = [
    { title: 'Enterprise Development & Economic Empowerment', description: 'Implementing enterprise development with special focus on Agriculture, ICT, Manufacturing and Packaging, Trading and Fashion', target: 'Youth (10-35)', goal: 'Equip, empower and organize youth towards personal, economic and national development', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80', icon: Briefcase },
    { title: 'Education Promotion', description: 'Partner with Destiny Equip Mission to create enabling environment and services to teens around all our secondary schools', target: 'Minimum 1000 teens monthly', goal: 'Help teens be successfully transformed, contributing positively to society', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80', icon: BookOpen },
    { title: 'Preventive and Curative Health for Development', description: 'Health promotion through Awareness, Prevention and treatment/management of TB, HIV/AIDS, Malaria, Hepatitis', target: '3,000 Youth and 10 PLHIV', goal: 'Improve health outcomes and provide care and support', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', icon: Heart },
    { title: 'Good Governance and Human Rights Strategies', description: 'Partner with government to implement youth policy, carry out budget monitoring and tracking', target: 'Citizens and Youth', goal: 'Increase citizens\' consciousness of their fundamental human rights', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80', icon: Scale },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="relative h-[60vh] overflow-hidden">
        <ImageWithFallback src="https://images.unsplash.com/photo-1759922378187-11a435837df8?auto=format&fit=crop&w=2000&q=80" alt="Youth empowerment" className="absolute inset-0 w-full h-full object-cover animate-float-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/50 to-gray-950" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl mb-6 font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>Youth Empowerment & Engagement</h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">Our approach targets youth aged 10-35 years, covering those in and out of school, with varying levels of education from primary to postgraduate.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {programs.map((program, index) => {
          const Icon = program.icon;
          return (
            <div key={index} className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className={`${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'} animate-fade-in`}>
                <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl mb-4 font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>{program.title}</h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">{program.description}</p>
                <div className="space-y-2">
                  <p className="text-gray-400"><span className="font-semibold text-cyan-400">Target:</span> {program.target}</p>
                  <p className="text-gray-400"><span className="font-semibold text-cyan-400">Goal:</span> {program.goal}</p>
                </div>
              </div>
              <div className={`${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'} relative animate-fade-in`} style={{ animationDelay: '0.2s' }}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                  <ImageWithFallback src={program.image} alt={program.title} className="w-full h-[350px] object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Education() {
  const sections = [
    { title: 'Vision', content: 'Raising young institution and nation builders', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80', icon: Target },
    { title: 'Mission', content: 'Creating, organizing and providing resources material, trainings opportunities, service environment, experience and exposure that will help people develop needed skills and potentials for efficient living', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', icon: Heart },
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
    <div className="bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="relative h-[60vh] overflow-hidden">
        <ImageWithFallback src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=2000&q=80" alt="Youth education" className="absolute inset-0 w-full h-full object-cover animate-float-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/50 to-gray-950" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl mb-6 font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>Destiny Equip Mission (DEM)</h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">A transformative youth development initiative focused on raising a new generation of institution and nation builders.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div key={index} className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className={`${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'} animate-fade-in`}>
                <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl mb-4 font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>{section.title}</h3>
                <p className="text-lg text-gray-300 leading-relaxed">{section.content}</p>
              </div>
              <div className={`${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'} relative animate-fade-in`} style={{ animationDelay: '0.2s' }}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                  <ImageWithFallback src={section.image} alt={section.title} className="w-full h-[350px] object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
                </div>
              </div>
            </div>
          );
        })}

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
      </div>
    </div>
  );
}

function MicroCredit() {
  const sections = [
    { title: 'What We Offer', content: ['Small loans for business startup and expansion', 'Flexible repayment terms designed for small businesses', 'Financial literacy training and business support', 'Group lending and savings programs'], image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80', icon: DollarSign },
    { title: 'Who Can Benefit', content: 'Our micro-credit scheme is designed for entrepreneurs, artisans, farmers, and small business owners who need capital to start or grow their businesses but lack collateral or credit history for traditional loans.', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80', icon: Users },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="relative h-[60vh] overflow-hidden">
        <ImageWithFallback src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=2000&q=80" alt="Micro credit" className="absolute inset-0 w-full h-full object-cover animate-float-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/50 to-gray-950" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl mb-6 font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>Micro-Credit Scheme (MCS)</h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">Providing accessible financial services to entrepreneurs and small businesses who lack access to traditional banking services.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div key={index} className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className={`${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'} animate-fade-in`}>
                <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl mb-4 font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>{section.title}</h3>
                {Array.isArray(section.content) ? (
                  <ul className="space-y-3 text-gray-300">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-cyan-400 mr-2">•</span>
                        <span className="text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-lg text-gray-300 leading-relaxed">{section.content}</p>
                )}
              </div>
              <div className={`${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'} relative animate-fade-in`} style={{ animationDelay: '0.2s' }}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                  <ImageWithFallback src={section.image} alt={section.title} className="w-full h-[350px] object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Projects() {
  const foundations = [
    { name: 'Olaleye Ajanaku Foundation', description: 'Safety equipment for Okada riders, Teachers Awards, Food support for elderly, Women economic empowerment, and Christmas food support programs', image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80', icon: Heart },
    { name: 'Odidere Foundation', description: 'Food assistance to elderly in Kajola, Imo Local Government area and grants to enhance women\'s economic status through DDI MicroCredit Scheme', image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80', icon: Users },
    { name: 'FE-YI Foundation', description: 'Food packages to identified elderly individuals for essential nutrition and community welfare support', image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80', icon: Droplet },
  ];

  const impacts = [
    'Enhanced safety for Okada riders',
    'Recognition and motivation for teachers',
    'Food security for the elderly',
    'Economic empowerment for women'
  ];

  return (
    <div className="bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="relative h-[60vh] overflow-hidden">
        <ImageWithFallback src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=2000&q=80" alt="Foundation partnerships" className="absolute inset-0 w-full h-full object-cover animate-float-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/50 to-gray-950" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl mb-6 font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>Foundation Partnerships</h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">Community support initiatives undertaken in collaboration with DDI Social Services and DDI MicroCredit Scheme.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {foundations.map((foundation, index) => {
          const Icon = foundation.icon;
          return (
            <div key={index} className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className={`${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'} animate-fade-in`}>
                <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl mb-4 font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>{foundation.name}</h3>
                <p className="text-lg text-gray-300 leading-relaxed">{foundation.description}</p>
              </div>
              <div className={`${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'} relative animate-fade-in`} style={{ animationDelay: '0.2s' }}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                  <ImageWithFallback src={foundation.image} alt={foundation.name} className="w-full h-[350px] object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
                </div>
              </div>
            </div>
          );
        })}

        <Card className="mt-12 bg-gray-800/50 border-gray-700/50">
          <CardContent className="p-8">
            <h3 className="text-2xl mb-4 font-bold text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>Overall Impact</h3>
            <p className="text-gray-300 text-lg mb-6">
              The collaborative efforts between the foundations and DDI Social Services and DDI Micro Credit Scheme have led to significant improvements in community welfare.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {impacts.map((impact, idx) => (
                <div key={idx} className="flex items-start">
                  <span className="text-cyan-400 mr-3 text-xl">•</span>
                  <span className="text-gray-300">{impact}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
