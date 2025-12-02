import { ArrowRight, Users, BookOpen, Briefcase, Film, Heart, TrendingUp, Target, Lightbulb, Award, Sparkles, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect } from 'react';

const SegunImg = new URL('./assets/segunoduyebo.JPG', import.meta.url).href;
const AdeolaImg = new URL('./assets/AdeolaOduyebo.jpg', import.meta.url).href;
const FavourImg = new URL('./assets/favourdavid.jpg', import.meta.url).href;
const BibilariImg = new URL('./assets/Bibilariadewusi.jpg', import.meta.url).href;
const AyoImg = new URL('./assets/AyoOlubiyi.jpg', import.meta.url).href;

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const initiatives = [
    {
      icon: Film,
      title: 'Right Life Event',
      description: 'Supporting men in discovering their purpose, achieving life balance, and realizing true fulfillment.',
      color: 'from-cyan-500 to-blue-600',
      page: 'ventures'
    },
    {
      icon: Briefcase,
      title: 'DDI Consult',
      description: 'A community development and humanitarian organization focused on empowering youth, caring for vulnerable populations, and catalyzing visible societal development.',
      color: 'from-purple-500 to-pink-600',
      page: 'consult'
    },
    {
      icon: Heart,
      title: 'DDI Social Service',
      description: 'Empowering youth, caring for vulnerable populations, and catalyzing societal development through sustainable, godly interventions.',
      color: 'from-violet-500 to-purple-600',
      page: 'social-service'
    },
    {
      icon: Film,
      title: 'Right Life Media',
      description: 'Creates, organizes, and distributes resource materials to equip and empower people to live fulfilled lives aligned with God\'s purpose.',
      color: 'from-blue-500 to-cyan-600',
      page: 'ventures'
    },
  ];

  const stats = [
    { number: '20+', label: 'Years of Experience', icon: TrendingUp },
    { number: '50+', label: 'Students Helped', icon: Users },
    { number: '100+', label: 'Scholarships Given', icon: Award },
    { number: '100+', label: 'Projects Completed', icon: Sparkles },
  ];

  const values = [
    { letter: 'C', title: 'Commitment', description: 'Dedication to God, mission, and excellence' },
    { letter: 'R', title: 'Relationship', description: 'Building meaningful connections that foster growth and collaboration' },
    { letter: 'E', title: 'Excellence', description: 'Striving for the highest standards in all endeavors' },
    { letter: 'A', title: 'Accountability', description: 'Taking responsibility for actions and outcomes' },
    { letter: 'T', title: 'Teamwork', description: 'Collaborating effectively to achieve greater impact' },
    { letter: 'I', title: 'Innovation', description: 'Embracing creativity to solve problems and create opportunities' },
    { letter: 'N', title: 'Networking/Nobility', description: 'Cultivating relationships with integrity and respect' },
    { letter: 'G', title: 'Godliness & Growth', description: 'Pursuing spiritual development and personal growth aligned with God\'s purpose' },
  ];

  const team = [
    { name: 'Segun Oduyebo', role: 'President', image: SegunImg },
    { name: 'Adeola Oduyebo', role: 'Vice President', image: AdeolaImg },
    { name: 'Favour Davids', role: 'Corporate Administrator', image: FavourImg },
    { name: 'Bibilari Adewusi', role: 'Program Director', image: BibilariImg },
    { name: 'Ayo Olubiyi', role: 'Community Outreach', image: AyoImg },
  ];

  const faqs = [
    { question: 'What is Destiny Development Initiative?', answer: 'Destiny Development Initiative (DDI) is a community development and humanitarian organization committed to empowering individuals and communities through godly, sustainable, and innovative solutions. We focus on raising individuals and institutions that represent God\'s kingdom.' },
    { question: 'Who can participate in your programs?', answer: 'Our programs are open to everyone who seeks personal growth, community development, and spiritual nurture. We work with youth, vulnerable populations, institutions, and anyone committed to making a positive impact in their communities.' },
    { question: 'How can I get involved or volunteer?', answer: 'You can get involved by contacting us through our website, attending our events, or reaching out directly to discuss volunteer opportunities. We welcome individuals who share our vision and values to join us in transforming lives.' },
    { question: 'Do you provide scholarships or financial support?', answer: 'Yes, we have provided over 100 scholarships to deserving students. Our financial support programs are designed to help individuals access education and opportunities that enable them to reach their full potential.' },
    { question: 'How do I contact Destiny Development Initiative?', answer: 'You can contact us through the contact form on our website, or reach out via email or phone. Visit our Contact page for detailed information on how to get in touch with our team.' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      } catch (e) {}
    }
  }, []);

  return (
    <div className="w-full bg-gray-950" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float-vertical {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-vertical { animation: float-vertical 4s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-fade-in { animation: fade-in 1s ease-in forwards; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        .glow-text {
          text-shadow: 0 0 20px rgba(96, 165, 250, 0.5), 0 0 40px rgba(96, 165, 250, 0.3);
        }
        .card-glow {
          box-shadow: 0 0 30px rgba(96, 165, 250, 0.1);
        }
        .card-glow:hover {
          box-shadow: 0 0 50px rgba(96, 165, 250, 0.3);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
        {/* Animated background grid */}
        <div className="absolute inset-0 mb-16 bg-[linear-gradient(rgba(96,165,250,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left text-white order-2 lg:order-1">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-full border border-cyan-500/20">
                <Zap className="w-4 h-4 text-cyan-400" />
                <p className="text-sm font-semibold tracking-wider text-cyan-300" style={{ fontFamily: "'Orbitron', sans-serif" }}>DESTINY DEVELOPMENT INITIATIVE</p>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 font-bold leading-tight glow-text" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Empowering<br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">Communities</span>
              </h1>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <p className="text-xl md:text-2xl mb-6 font-light text-gray-300">
                Raising individuals and institutions that represent God's kingdom
              </p>
              <p className="text-base md:text-lg mb-12 text-gray-400">
                With guidance, mentorship, and godly values, everyone can realize their purpose and make a meaningful impact
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 lg:justify-start justify-center animate-slide-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
              <Button
                size="lg"
                onClick={() => onNavigate('about')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-2xl hover:shadow-cyan-500/50 transition-all text-lg px-12 py-7 font-semibold rounded-xl border-0"
              >
                Explore More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('contact')}
                className="bg-transparent backdrop-blur-sm border-2 border-cyan-500/50 text-white hover:bg-cyan-500/10 hover:border-cyan-400 transition-all text-lg px-12 py-7 font-semibold rounded-xl"
              >
                Get Involved
              </Button>
            </div>
          </div>

          {/* Right: Animated Image Square */}
          <div className="relative order-1 lg:order-2">
            <div className="animate-slide-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <div className="animate-float-vertical">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Rotating border */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 animate-gradient p-1" style={{ borderRadius: '40%' }}>
                <div className="w-full h-full bg-gray-900 overflow-hidden" style={{ borderRadius: '15%' }}>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1553777907-f5dbbbb44d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3R1ZGVudHMlMjBlZHVjYXRpb258ZW58MXx8fHwxNzYzNDk1NzA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Community empowerment"
                    className="w-full h-full object-cover"
                    style={{ borderRadius: '20%'}}
                  />
                </div>
              </div>
              {/* Floating accent squares */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl animate-float opacity-80" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl animate-float opacity-80" style={{ animationDelay: '1s' }} />
            </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-32 mb-16 my-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20 group-hover:border-cyan-400/50 transition-all">
                      <Icon className="w-8 h-8 text-cyan-400" />
                    </div>
                  </div>
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {stat.number}
                  </div>
                  <div className="text-gray-400 font-medium text-lg">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-40 mb-16 mt-16 my-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -left-4 top-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" />
              <div className="relative z-10">
                <h2 className="text-5xl mb-6 font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  Who We Are
                </h2>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  We are committed to providing godly, sustainable, and innovative solutions that make a tangible difference in people's lives.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Right Life Ministries (RLM) exists to help people find fulfilment in life through Christ. The ministry influences society via interlinked arms that provide spiritual nurture, social development, education, finance, health, media, and enterprise solutions.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-cyan-500/20 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800 card-glow transition-all hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Mission</h3>
                  <p className="text-sm text-gray-400">Raising individuals and institutions that represent God's kingdom</p>
                </CardContent>
              </Card>
              <Card className="border-purple-500/20 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800 card-glow transition-all hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <Lightbulb className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Vision</h3>
                  <p className="text-sm text-gray-400">Influencing society with God's kingdom culture and values</p>
                </CardContent>
              </Card>
              <Card className="border-blue-500/20 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800 card-glow transition-all col-span-2 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Our Philosophy</h3>
                  <p className="text-sm text-gray-400">There is a seed of potential greatness in every person</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-32 mb-16 my-16 bg-gray-950 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-6 font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Initiatives
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We deliver tailored programs and initiatives to transform individuals, communities, and organizations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-gray-700/50 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800 group hover:-translate-y-2 card-glow"
                  onClick={() => onNavigate(initiative.page)}
                >
                  <CardContent className="p-8">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${initiative.color} mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl mb-4 font-bold text-white">
                      {initiative.title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {initiative.description}
                    </p>
                    <button className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values - CREATING */}
      <section className="py-32 px-16 mt-32 mb-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-6 font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Our Values: CREATING
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The principles that guide our mission and define who we are
            </p>
          </div>

          <div className="space-y-6">
            {values.map((value, index) => (
              <div key={index} className="flex items-start gap-6 bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-cyan-500/30 card-glow transition-all hover:-translate-y-1">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 flex items-center justify-center text-4xl font-bold bg-gradient-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {value.letter}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-white">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 mb-16 my-16 bg-gray-950 relative overflow-hidden">
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-6 font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-400">
              Dedicated leaders committed to transforming lives
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start">
            {team.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center group animate-fade-in" style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}>
                <div className="w-40 h-40 bg-gray-800 rounded-2xl mb-4 overflow-hidden group-hover:scale-105 group-hover:-translate-y-2 transition-all shadow-xl border border-gray-700/50 card-glow">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-cyan-400 font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 mb-16 my-16 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-6 font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
              Find answers to common questions about our organization
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-purple-500/30 card-glow transition-all">
                <h3 className="text-xl font-bold mb-4 text-white">{faq.question}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 mb-16 my-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl mb-6 font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Join Us in Making a Difference
          </h2>
          <p className="text-2xl mb-10 max-w-3xl mx-auto text-gray-300">
            Whether you want to volunteer, partner with us, or support our programs, there are many ways to get involved and create positive change.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate('contact')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-2xl hover:shadow-cyan-500/50 transition-all text-lg px-12 py-7 font-semibold rounded-xl border-0"
            >
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('projects')}
              className="bg-transparent backdrop-blur-sm border-2 border-purple-500/50 text-white hover:bg-purple-500/10 hover:border-purple-400 transition-all text-lg px-12 py-7 font-semibold rounded-xl"
            >
              View Our Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
