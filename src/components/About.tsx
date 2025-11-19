import { Target, History as HistoryIcon, Users as UsersIcon, Handshake } from 'lucide-react';
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
      color: 'from-blue-500 to-indigo-600'
    },
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

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 mb-4">About DDI</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900 mb-4">Developing Youth and Their Potentials</h1>
            <p className="text-lg text-slate-600 max-w-2xl mb-6">
              Destiny Development Initiative (DDI) is a human resource and capacity building organization committed to developing youth and their potentials towards effective and efficient living. Established in 2007, we provide quality service and sustainability through strategic operations.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('vision-mission')}
                className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-5 py-3 text-sm font-medium shadow"
              >
                Our Vision & Mission
              </button>

              <button
                onClick={() => onNavigate('team')}
                className="inline-flex items-center justify-center border border-indigo-200 text-indigo-700 bg-white rounded-md px-5 py-3 text-sm font-medium hover:bg-indigo-50"
              >
                Meet the Team
              </button>
            </div>
          </div>

          <div className="order-first lg:order-last">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1400&q=80"
                alt="DDI community work"
                className="w-full h-64 sm:h-80 md:h-96 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {sections.map((item, idx) => {
            const Icon = item.icon as any;
            return (
              <Card
                key={idx}
                className="cursor-pointer hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                onClick={() => onNavigate(item.page)}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 bg-gradient-to-br ${item.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How we help section */}
        <div className="bg-white rounded-xl shadow px-6 py-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Our Focal Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">1</div>
              <div>
                <h4 className="font-semibold text-slate-900">Youth Empowerment & Engagement</h4>
                <p className="text-sm text-slate-600">Enterprise development, economic empowerment, education promotion, health for development, and good governance strategies.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">2</div>
              <div>
                <h4 className="font-semibold text-slate-900">Care and Support for OVC</h4>
                <p className="text-sm text-slate-600">Providing care and support for orphans and vulnerable children through community mobilization and coordinated aid.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisionMission() {
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
    <div className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl mb-8 font-extrabold text-slate-900">Vision, Mission & Values</h1>

        <div className="space-y-6">
          <Card className="transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <h2 className="text-xl mb-2 text-blue-600 font-semibold">Our Vision</h2>
              <p className="text-base text-slate-700 leading-relaxed">
                Becoming a global brand that is positively impacting the world with Godly and creative solution.
              </p>
            </CardContent>
          </Card>

          <Card className="transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <h2 className="text-xl mb-2 text-blue-600 font-semibold">Our Mission</h2>
              <p className="text-base text-slate-700 leading-relaxed">
                Creating, organizing and providing resource materials, trainings, opportunities, services, environments, exposures and experience that will help people live effective and efficient lives.
              </p>
            </CardContent>
          </Card>

          <Card className="transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <h2 className="text-xl mb-2 text-blue-600 font-semibold">Our Goal</h2>
              <p className="text-base text-slate-700 leading-relaxed">
                To create a visible development in the Nigeria society by helping as many people as possible to live effective and efficient lives.
              </p>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-2xl mb-6 font-bold text-slate-900">Our Values: CREATING</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-4 bg-white p-4 rounded-lg border border-blue-100 hover:shadow-lg transition-all">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-2xl font-bold text-blue-600">
                    {value.letter}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{value.title}</h3>
                    <p className="text-sm text-slate-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function History() {
  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl mb-8 font-extrabold text-slate-900">Organizational Background</h1>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-base text-slate-700 leading-relaxed mb-4">
                Destiny Development Initiative (DDI) is a human resource and capacity building organization committed to the course of developing youth and their potentials towards effective and efficient living. It is a nonprofit making, non-governmental organization established in 2007 in response to the inherent latent and manifest problems that exist in the present social system and organizations in Nigeria.
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                A non-profit organization geared for success and growth needs a foundation of value, expertise and experience that encompasses both its history and the people who make it what it is; the employees, the board, the donors and partners. At Destiny Development Initiative (DDI), providing quality service and Sustainability is an integral part of the organization foundation. This foundation is the basis for Strategic Arms of Operations that had enabled more than 40 employees channel their knowledge and skills in strengthening communities, provided better services that are leading towards a better Socio-Economic outcome across the states of our operation.
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
    { name: 'Segun Oduyebo', role: 'President', description: 'Visionary leader driving DDI\'s mission to empower youth and communities', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop' },
    { name: 'Adeola Oduyebo', role: 'Vice President', description: 'Strategic oversight of programs and partnerships across all operations', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop' },
    { name: 'Favour Davids', role: 'Corporate Administrator', description: 'Managing organizational operations and human resources', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop' },
    { name: 'Operations Manager', role: 'Operations Manager', description: 'Coordinating day-to-day activities and program implementation', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop' },
    { name: 'Account Manager', role: 'Account Manager', description: 'Managing financial operations and budget tracking', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop' },
    { name: 'Programs Director', role: 'Programs Director', description: 'Leading program design and implementation strategies', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop' },
    { name: 'Public Relations Manager', role: 'Public Relations Manager', description: 'Managing communications and public engagement', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=400&fit=crop' },
    { name: 'Youth Empowerment Manager', role: 'Program Manager', description: 'Leading youth empowerment and economic development programs', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=400&fit=crop' },
    { name: 'Education Manager', role: 'Program Manager', description: 'Overseeing education promotion and scholarship programs', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop' },
    { name: 'Health Manager', role: 'Program Manager', description: 'Managing preventive and curative health programs', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop' },
    { name: 'Human Rights Manager', role: 'Program Manager', description: 'Leading human rights and good governance initiatives', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop' },
    { name: 'ICT Manager', role: 'ICT Manager', description: 'Managing technology infrastructure and digital empowerment', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=400&fit=crop' },
    { name: 'Communications Officer', role: 'Communications', description: 'Handling internal and external communications', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop' },
    { name: 'Social Media Handler', role: 'Social Media', description: 'Managing social media presence and digital engagement', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop' },
  ];

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl mb-6 font-extrabold text-blue-600">Our Leadership & Team</h1>

        <p className="text-base text-slate-600 mb-12 max-w-3xl">
          DDI is powered by a dedicated team of professionals, volunteers, and community leaders committed to creating positive change.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="w-full h-64 bg-slate-200 rounded-lg mb-4 overflow-hidden group-hover:scale-105 transition-transform shadow-xl">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-800 text-center">{member.name}</h3>
              <p className="text-blue-600 font-semibold mb-2 text-center text-sm">{member.role}</p>
              <p className="text-slate-600 text-center text-xs leading-relaxed">{member.description}</p>
            </div>
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
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl mb-6 font-extrabold text-slate-900">Our Partners</h1>

        <p className="text-base text-slate-600 mb-8 max-w-3xl">
          We work with a diverse network of partners to maximize our impact and reach more communities.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {partnerCategories.map((category, index) => (
            <Card key={index} className="transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg mb-2 font-semibold text-indigo-700">{category.title}</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  {category.partners.map((partner, pIndex) => (
                    <li key={pIndex} className="flex items-center text-slate-700">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
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
