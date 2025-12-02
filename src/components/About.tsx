import { Target, History as HistoryIcon, Users as UsersIcon, Handshake } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
const SegunImg = new URL('./assets/segunoduyebo.JPG', import.meta.url).href;
const AdeolaImg = new URL('./assets/AdeolaOduyebo.jpg', import.meta.url).href;
const FavourImg = new URL('./assets/favourdavid.jpg', import.meta.url).href;
const BibilariImg = new URL('./assets/Bibilariadewusi.jpg', import.meta.url).href;
const AyoImg = new URL('./assets/AyoOlubiyi.jpg', import.meta.url).href;
const AbimbolaImg = new URL('./assets/AbimbolaOlubiyi.jpg', import.meta.url).href;
const OluseyiImg = new URL('./assets/Oluseyi.jpg', import.meta.url).href;
const JamesonImg = new URL('./assets/jamesonochie.jpg', import.meta.url).href;
const SarahOnchieImg = new URL('./assets/SarahOnochie.jpg', import.meta.url).href;
const IgeImg = new URL('./assets/Ige.jpg', import.meta.url).href;
const GenericImg = new URL('./assets/b0f7b827-92dc-471f-925a-c43989c47a0f.jpg', import.meta.url).href;

interface AboutProps {
  section: string;
  onNavigate: (page: string) => void;
}

export function About({ section, onNavigate }: AboutProps) {
  const renderSection = () => {
    switch (section) {
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
      icon: HistoryIcon,
      title: 'Our Story',
      description: 'The journey of DDI and how we got started',
      page: 'history',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: UsersIcon,
      title: 'Leadership & Team',
      description: 'Meet the people driving our mission forward',
      page: 'team',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Handshake,
      title: 'Our Partners',
      description: 'Organizations and institutions we work with',
      page: 'partners',
      color: 'from-yellow-400 to-orange-500'
    },
  ];

  const values = [
    { letter: 'C', title: 'Commitment', description: 'Dedication to God, mission, and excellence' },
    { letter: 'R', title: 'Relationship', description: 'Building meaningful connections' },
    { letter: 'E', title: 'Excellence', description: 'Striving for the highest standards' },
    { letter: 'A', title: 'Accountability', description: 'Taking responsibility for actions' },
    { letter: 'T', title: 'Teamwork', description: 'Collaborating for greater impact' },
    { letter: 'I', title: 'Innovative', description: 'Embracing creativity and solutions' },
    { letter: 'N', title: 'Networking', description: 'Cultivating relationships with integrity' },
    { letter: 'G', title: 'Growth', description: 'Pursuing continuous development' },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Animated background orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20">
          <div className="animate-fade-in">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4 animate-pulse">About DDI</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>Developing Youth and Their Potentials</h1>
            <p className="text-lg text-gray-300 max-w-2xl mb-6 leading-relaxed">
              Destiny Development Initiative (DDI) is a human resource and capacity building organization committed to developing youth and their potentials towards effective and efficient living. Established in 2007, we provide quality service and sustainability through strategic operations.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('team')}
                className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl px-6 py-3 text-sm font-medium shadow-xl hover:shadow-cyan-500/50 transition-all hover:scale-105"
              >
                Meet the Team
              </button>

              <button
                onClick={() => onNavigate('history')}
                className="inline-flex items-center justify-center border-2 border-cyan-500/50 text-white bg-transparent rounded-xl px-6 py-3 text-sm font-medium hover:bg-cyan-500/10 transition-all hover:scale-105"
              >
                Our Story
              </button>
            </div>
          </div>

          <div className="order-first lg:order-last relative">
            <div className="animate-float-vertical">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur-xl opacity-50 animate-gradient" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/30">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1400&q=80"
                    alt="DDI community work"
                    className="w-full h-64 sm:h-80 md:h-96 object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Floating accent elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl animate-float opacity-80" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl animate-float opacity-80" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
        {/* Quick Links */}
        <div className="flex flex-col sm:flex-row gap-6 mb-20">
          {sections.map((item, idx) => {
            const Icon = item.icon as any;
            return (
              <Card
                key={idx}
                className="cursor-pointer hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm group card-glow flex-1"
                onClick={() => onNavigate(item.page)}
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${item.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>{item.title}</h3>
                    <p className="text-sm text-gray-300">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Vision, Mission & Values Section with Background Image */}
        <div className="mb-20 relative">
          {/* Background Image Section */}
          <div className="relative h-96 rounded-3xl overflow-hidden mb-12">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
              alt="Team collaboration"
              className="w-full h-full object-cover animate-float-slow"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-gray-950/90" />
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <div>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>Vision, Mission & Values</h2>
                <p className="text-gray-300 text-xl max-w-2xl mx-auto">Our guiding principles and what drives us forward</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 bg-gray-800/50 border-cyan-500/30 backdrop-blur-sm card-glow group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-3 text-cyan-400 font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Our Vision</h3>
                <p className="text-base text-gray-300 leading-relaxed">
                  Becoming a global brand that is positively impacting the world with Godly and creative solution.
                </p>
              </CardContent>
            </Card>

            <Card className="transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 bg-gray-800/50 border-purple-500/30 backdrop-blur-sm card-glow group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-3 text-purple-400 font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Our Mission</h3>
                <p className="text-base text-gray-300 leading-relaxed">
                  Creating, organizing and providing resource materials, trainings, opportunities, services, environments, exposures and experience that will help people live effective and efficient lives.
                </p>
              </CardContent>
            </Card>

            <Card className="transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 bg-gray-800/50 border-blue-500/30 backdrop-blur-sm card-glow group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-3 text-blue-400 font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Our Goal</h3>
                <p className="text-base text-gray-300 leading-relaxed">
                  To create a visible development in the Nigeria society by helping as many people as possible to live effective and efficient lives.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values: CREATING with Animated Cards */}
          <div className="mb-12">
            <h3 className="text-3xl mb-8 font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>Our Values: CREATING</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {values.map((value, index) => (
                <div key={index} className="flex flex-col items-center gap-3 bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 hover:shadow-xl hover:-translate-y-2 transition-all group card-glow animate-float" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-12 h-12 flex items-center justify-center text-xl font-bold bg-gradient-to-br from-cyan-500 to-purple-600 text-white rounded-lg group-hover:scale-110 group-hover:rotate-12 transition-all" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {value.letter}
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-white text-xs mb-1">{value.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>Our Impact in Action</h2>
            <p className="text-gray-400 text-lg">See the difference we're making in communities</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative h-64 rounded-2xl overflow-hidden group animate-float" style={{ animationDelay: '0s' }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80"
                alt="Education"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                style={{ borderRadius: '10%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-bold">Education Programs</p>
              </div>
            </div>
            
            <div className="relative h-64 rounded-2xl overflow-hidden group animate-float" style={{ animationDelay: '0.2s' }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80"
                alt="Mentorship"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                style={{ borderRadius: '10%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-bold">Mentorship</p>
              </div>
            </div>
            
            <div className="relative h-64 rounded-2xl overflow-hidden group animate-float" style={{ animationDelay: '0.4s' }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80"
                alt="Community"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                style={{ borderRadius: '10%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-bold">Community Work</p>
              </div>
            </div>
            
            <div className="relative h-64 rounded-2xl overflow-hidden group animate-float" style={{ animationDelay: '0.6s' }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                alt="Leadership"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                style={{ borderRadius: '10%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-bold">Leadership Training</p>
              </div>
            </div>
          </div>
        </div>

      
        {/* Focal Areas with Larger Images */}
        <div className="mb-20 mt-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center" style={{ fontFamily: "'Orbitron', sans-serif" }}>Our Focal Areas</h2>
          <div className="space-y-8">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 overflow-hidden group hover:shadow-2xl transition-all duration-300 card-glow animate-slide-up">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-80 overflow-hidden order-2 md:order-1 m-6">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1759922378187-11a435837df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMGVtcG93ZXJtZW50JTIwdHJhaW5pbmd8ZW58MXx8fHwxNzYzNDk1NzA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Youth Empowerment"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    style={{ borderRadius: '10%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent" style={{ borderRadius: '10%' }} />
                </div>
                <CardContent className="p-12 flex flex-col justify-center order-1 md:order-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl mb-6 animate-pulse-glow" style={{ fontFamily: "'Orbitron', sans-serif" }}>1</div>
                  <h4 className="font-bold text-white text-3xl mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>Youth Empowerment & Engagement</h4>
                  <p className="text-gray-300 text-lg leading-relaxed">Enterprise development, economic empowerment, education promotion, health for development, and good governance strategies.</p>
                </CardContent>
              </div>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 overflow-hidden group hover:shadow-2xl transition-all duration-300 card-glow animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="grid md:grid-cols-2 gap-8">
                <CardContent className="p-12 flex flex-col justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-2xl mb-6 animate-pulse-glow" style={{ fontFamily: "'Orbitron', sans-serif" }}>2</div>
                  <h4 className="font-bold text-white text-3xl mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>Care and Support for OVC</h4>
                  <p className="text-gray-300 text-lg leading-relaxed">Providing care and support for orphans and vulnerable children through community mobilization and coordinated aid.</p>
                </CardContent>
                <div className="relative h-80 overflow-hidden m-6">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1761039808159-f02b58f07032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBkZXZlbG9wbWVudCUyMGFmcmljYXxlbnwxfHx8fDE3NjM0OTU3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Care for OVC"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    style={{ borderRadius: '10%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-gray-900/50 to-transparent" style={{ borderRadius: '10%' }} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function History() {
  return (
    <div className="py-20 bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Animated background */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl mb-4 font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>Our Story</h1>
          <p className="text-gray-400 text-lg">The journey that shaped who we are today</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm card-glow">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <HistoryIcon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>Established 2007</h2>
                </div>
                <p className="text-base text-gray-300 leading-relaxed mb-4">
                  Destiny Development Initiative (DDI) is a human resource and capacity building organization committed to the course of developing youth and their potentials towards effective and efficient living. It is a nonprofit making, non-governmental organization established in 2007 in response to the inherent latent and manifest problems that exist in the present social system and organizations in Nigeria.
                </p>
                <p className="text-base text-gray-300 leading-relaxed">
                  A non-profit organization geared for success and growth needs a foundation of value, expertise and experience that encompasses both its history and the people who make it what it is; the employees, the board, the donors and partners.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="animate-float-vertical">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur-xl opacity-50" />
              <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
                  alt="Team collaboration"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm card-glow">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>Our Foundation</h3>
            <p className="text-base text-gray-300 leading-relaxed">
              At Destiny Development Initiative (DDI), providing quality service and Sustainability is an integral part of the organization foundation. This foundation is the basis for Strategic Arms of Operations that had enabled more than 40 employees channel their knowledge and skills in strengthening communities, provided better services that are leading towards a better Socio-Economic outcome across the states of our operation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Team() {
  const teamMembers = [
    { name: 'Segun Oduyebo', role: 'President', image: SegunImg, description: 'Strategic leadership and vision' },
    { name: 'Adeola Oduyebo', role: 'Vice President', image: AdeolaImg, description: 'Operations and program oversight' },
    { name: 'Favour Davids', role: 'Corporate Administrator', image: FavourImg, description: 'Administration and finance' },
    { name: 'Bibilari Adewusi', role: 'Program Director', image: BibilariImg, description: 'Program design and delivery' },
    { name: 'Ayo Olubiyi', role: 'Community Outreach', image: AyoImg, description: 'Community engagement and partnerships' },
    { name: 'Abimbola Olubiyi', role: 'Coordinator', image: AbimbolaImg, description: 'Volunteer coordination and logistics' },
    { name: 'Oluseyi (Advisor)', role: 'Advisor', image: OluseyiImg, description: 'Advisory and strategy' },
    { name: 'Jameson Ochie', role: 'Media Lead', image: JamesonImg, description: 'Media and communications' },
    { name: 'Sarah Onochie', role: 'Field Officer', image: SarahOnchieImg, description: 'Field operations' },
    { name: 'Ige', role: 'Technical', image: IgeImg, description: 'Technical support' },
    { name: 'Team Member', role: 'Support', image: GenericImg, description: 'General support' },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Animated background */}
      <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl mb-4 font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>Our Leadership & Team</h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            DDI is powered by a dedicated team of professionals, volunteers, and community leaders committed to creating positive change.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 overflow-hidden bg-gray-800/50 border-gray-700/50 backdrop-blur-sm group card-glow">
              <CardContent className="p-0">
                <div className="relative w-full h-56 overflow-hidden bg-gray-900">
                  <ImageWithFallback src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-1 text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>{member.name}</h3>
                  <div className="text-cyan-400 mb-2 font-semibold text-sm">{member.role}</div>
                  <p className="text-gray-400 text-sm">{member.description}</p>
                </div>
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
    <div className="py-20 bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Animated background */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl mb-4 font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>Our Partners</h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            We work with a diverse network of partners to maximize our impact and reach more communities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {partnerCategories.map((category, index) => (
            <Card key={index} className="transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm group card-glow">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Handshake className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>{category.title}</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-300">
                  {category.partners.map((partner, pIndex) => (
                    <li key={pIndex} className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 flex-shrink-0"></span>
                      {partner}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Partnership Image */}
        <div className="animate-float-vertical">
          <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur-xl opacity-30" />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtd29yayUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzYzNDE4NzM5fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Partnership collaboration"
              className="w-full h-96 object-cover relative z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
