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
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl mb-6 font-extrabold text-slate-900">Our Leadership & Team</h1>

        <p className="text-base text-slate-600 mb-12 max-w-3xl">
          DDI is powered by a dedicated team of professionals, volunteers, and community leaders committed to creating positive change.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-4">
                <div className="w-full h-44 mb-4 rounded-md overflow-hidden bg-slate-100">
                  <ImageWithFallback src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-slate-900">{member.name}</h3>
                <div className="text-indigo-700 mb-2 font-medium">{member.role}</div>
                <p className="text-slate-600 text-sm">{member.description}</p>
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
