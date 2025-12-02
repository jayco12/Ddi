import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const quickLinks = [
    { label: 'About Us', page: 'about' },
    { label: 'Our Programs', page: 'programs' },
    { label: 'Blog', page: 'blog' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact', page: 'contact' },
  ];

  const programs = [
    { label: 'DDI Social Service', page: 'social-service' },
    { label: 'DDI Consult', page: 'consult' },
    { label: 'DDI Ventures', page: 'ventures' },
    { label: 'Economic Empowerment', page: 'economic-empowerment' },
    { label: 'Education Promotion', page: 'education' },
  ];

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white">
                DDI
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Dedicated Development Initiative - Empowering communities through education, 
              economic development, and social services.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white mb-4">Our Programs</h3>
            <ul className="space-y-2">
              {programs.map((program) => (
                <li key={program.page}>
                  <button
                    onClick={() => onNavigate(program.page)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {program.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400">DDI Head Office<br />Address to be provided</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">+XXX XXX XXX XXX</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">info@ddi.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Dedicated Development Initiative (DDI). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
