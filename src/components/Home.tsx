import { ArrowRight, Users, BookOpen, Briefcase, Film, Heart, TrendingUp, Target, Lightbulb, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const initiatives = [
    {
      icon: Film,
      title: 'Right Life Event',
      description: 'Supporting men in discovering their purpose, achieving life balance, and realizing true fulfillment.',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      page: 'ventures'
    },
    {
      icon: Briefcase,
      title: 'DDI Consult',
      description: 'A community development and humanitarian organization focused on empowering youth, caring for vulnerable populations, and catalyzing visible societal development.',
      color: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      page: 'consult'
    },
    {
      icon: Heart,
      title: 'DDI Social Service',
      description: 'Empowering youth, caring for vulnerable populations, and catalyzing societal development through sustainable, godly interventions.',
      color: 'bg-gradient-to-br from-purple-500 to-indigo-600',
      page: 'social-service'
    },
    {
      icon: Film,
      title: 'Right Life Media and Entertainment',
      description: 'Creates, organizes, and distributes resource materials to equip and empower people to live fulfilled lives aligned with God\'s purpose.',
      color: 'bg-gradient-to-br from-blue-600 to-indigo-600',
      page: 'ventures'
    },
  ];

  const stats = [
    { number: '20+', label: 'Years of Experience' },
    { number: '50+', label: 'Students Helped' },
    { number: '100+', label: 'Scholarships Given' },
    { number: '100+', label: 'Projects Completed' },
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
    { name: 'Segun Oduyebo', role: 'President', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop' },
    { name: 'Adeola Oduyebo', role: 'Vice President', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop' },
    { name: 'Favour Davids', role: 'Corporate Administrator', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop' },
    { name: 'Michael Johnson', role: 'Program Director', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop' },
    { name: 'Sarah Williams', role: 'Community Outreach', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop' },
  ];

  const faqs = [
    { question: 'What is Destiny Development Initiative?', answer: 'Destiny Development Initiative (DDI) is a community development and humanitarian organization committed to empowering individuals and communities through godly, sustainable, and innovative solutions. We focus on raising individuals and institutions that represent God\'s kingdom.' },
    { question: 'Who can participate in your programs?', answer: 'Our programs are open to everyone who seeks personal growth, community development, and spiritual nurture. We work with youth, vulnerable populations, institutions, and anyone committed to making a positive impact in their communities.' },
    { question: 'How can I get involved or volunteer?', answer: 'You can get involved by contacting us through our website, attending our events, or reaching out directly to discuss volunteer opportunities. We welcome individuals who share our vision and values to join us in transforming lives.' },
    { question: 'Do you provide scholarships or financial support?', answer: 'Yes, we have provided over 100 scholarships to deserving students. Our financial support programs are designed to help individuals access education and opportunities that enable them to reach their full potential.' },
    { question: 'How do I contact Destiny Development Initiative?', answer: 'You can contact us through the contact form on our website, or reach out via email or phone. Visit our Contact page for detailed information on how to get in touch with our team.' },
  ];

  return (
    <div className="w-full ">
      {/* Hero Section */}
      <section className="relative min-h-screen mb-16 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/85 z-10" />
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1553777907-f5dbbbb44d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3R1ZGVudHMlMjBlZHVjYXRpb258ZW58MXx8fHwxNzYzNDk1NzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Students learning together"
            className="w-full h-full object-cover animate-[scale_20s_ease-in-out_infinite]" 
            style={{ animationDirection: 'alternate' }}
          />
        </div>
        
        {/* Floating shapes */}
        <div className="absolute inset-0 z-5 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-20 text-center text-white max-w-6xl mx-auto px-4 py-20">
          <div className="animate-[fadeInUp_1s_ease-out]">
            <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <p className="text-sm font-semibold tracking-wide">DESTINY DEVELOPMENT INITIATIVE</p>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 font-bold leading-tight drop-shadow-2xl">
              Empowering Communities,<br />
              <span className="text-blue-100">Transforming Lives</span>
            </h1>
          </div>
          
          <div className="animate-[fadeInUp_1s_ease-out_0.3s_both]">
            <p className="text-xl md:text-2xl lg:text-3xl mb-6 font-light leading-relaxed">
              Raising individuals and institutions that represent God's kingdom
            </p>
            <p className="text-base md:text-lg lg:text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-blue-50">
              We believe that with guidance, mentorship, and godly values, everyone can realize their purpose and make a meaningful impact in their communities.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-[fadeInUp_1s_ease-out_0.6s_both]">
            <Button
              size="lg"
              onClick={() => onNavigate('about')}
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all text-lg px-16 py-8 font-semibold rounded-lg"
            >
              Explore More
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('contact')}
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all text-lg px-16 py-8 font-semibold rounded-lg"
            >
              Get Involved
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
              <div className="w-1 h-3 bg-white/50 rounded-full animate-[scroll_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
      `}</style>

      {/* Impact Stats */}
      <section className="py-32 mt-16 mb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-32 mt-16 mb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl mb-6 font-bold text-blue-600">
                Who We Are
              </h2>
              <p className="text-xl text-slate-700 mb-6 leading-relaxed">
                We are committed to providing godly, sustainable, and innovative solutions that make a tangible difference in people's lives.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Right Life Ministries (RLM) exists to help people find fulfilment in life through Christ. The ministry influences society via interlinked arms that provide spiritual nurture, social development, education, finance, health, media, and enterprise solutions.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-blue-200 bg-white hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Mission</h3>
                  <p className="text-sm text-slate-600">Raising individuals and institutions that represent God's kingdom</p>
                </CardContent>
              </Card>
              <Card className="border-blue-200 bg-white hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <Lightbulb className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Vision</h3>
                  <p className="text-sm text-slate-600">Influencing society with God's kingdom culture and values</p>
                </CardContent>
              </Card>
              <Card className="border-blue-200 bg-white hover:shadow-xl transition-all col-span-2 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Our Philosophy</h3>
                  <p className="text-sm text-slate-600">There is a seed of potential greatness in every person</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-32 mt-16 mb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-6 font-bold text-blue-600">
              Initiatives
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We deliver tailored programs and initiatives to transform individuals, communities, and organizations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-blue-100 hover:border-blue-300 bg-white group hover:-translate-y-2"
                  onClick={() => onNavigate(initiative.page)}
                >
                  <CardContent className="p-8">
                    <Icon className="w-16 h-16 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl mb-4 font-bold text-slate-800">
                      {initiative.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {initiative.description}
                    </p>
                    <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
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
      <section className="py-32 mt-16 mb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-6 font-bold text-blue-600">
              Our Values: CREATING
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that guide our mission and define who we are
            </p>
          </div>

          <div className="space-y-6">
            {values.map((value, index) => (
              <div key={index} className="flex items-start gap-6 bg-white p-6 rounded-lg border border-blue-100 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 flex items-center justify-center text-4xl font-bold text-blue-600">
                    {value.letter}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-slate-800">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 mt-16 mb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-6 font-bold text-blue-600">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600">
              Dedicated leaders committed to transforming lives
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="w-48 h-64 bg-slate-200 rounded-lg mb-6 overflow-hidden group-hover:scale-105 transition-transform shadow-xl">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">{member.name}</h3>
                <p className="text-blue-600 font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 mt-16 mb-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-6 font-bold text-blue-600">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Find answers to common questions about our organization
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-8 rounded-lg border border-blue-100 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold mb-4 text-slate-800">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 mt-16 mb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl mb-6 font-bold text-blue-600">
            Join Us in Making a Difference
          </h2>
          <p className="text-2xl mb-10 max-w-3xl mx-auto text-slate-600">
            Whether you want to volunteer, partner with us, or support our programs, there are many ways to get involved and create positive change.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate('contact')}
              className="bg-blue-600 text-white hover:bg-blue-700 shadow-xl hover:shadow-2xl transition-all text-lg px-16 py-8 font-semibold rounded-lg"
            >
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('projects')}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all text-lg px-16 py-8 font-semibold rounded-lg"
            >
              View Our Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
