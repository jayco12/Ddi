import { useState } from 'react';
import { Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAdmin: boolean;
  onLogout: () => void;
}

export function Navigation({ currentPage, onNavigate, isAdmin, onLogout }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);

  const menuItems = [
    { label: 'Home', page: 'home' },
    { 
      label: 'About DDI', 
      page: 'about',
      dropdown: [
        { label: 'Overview', page: 'about' },
        { label: 'Vision & Mission', page: 'vision-mission' },
        { label: 'Our Story', page: 'history' },
        { label: 'Leadership', page: 'team' },
        { label: 'Partners', page: 'partners' },
      ]
    },
    { 
      label: 'What We Do', 
      page: 'programs',
      dropdown: [
        { label: 'Overview', page: 'programs' },
        { label: 'DDI Social Service', page: 'social-service' },
        { label: 'DDI Consult', page: 'consult' },
        { label: 'DDI Ventures', page: 'ventures' },
        { label: 'Economic Empowerment', page: 'economic-empowerment' },
        { label: 'Education Promotion', page: 'education' },
        { label: 'Micro-Credit Scheme', page: 'micro-credit' },
        { label: 'Projects & Impact', page: 'projects' },
      ]
    },
    { label: 'Blog', page: 'blog' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Books', page: 'books', external: true, url: 'https://selar.com/m/oduyeboolusegunjoseph' },
    { label: 'Destiny Coach', page: 'mentor' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-lg border-b border-gray-800 shadow-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              DDI
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <div key={item.page} className="relative group">
                {item.dropdown ? (
                  <>
                    <button onClick={() => onNavigate(item.page)} className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-800 text-gray-300 hover:text-white transition-colors">
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="absolute left-0 mt-1 w-56 bg-gray-900 rounded-lg shadow-lg border border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      {item.dropdown.map((subItem) => (
                        <button key={subItem.page} onClick={() => onNavigate(subItem.page)} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white first:rounded-t-lg last:rounded-b-lg">
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </>
                ) : item.external ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-md transition-colors text-gray-300 hover:bg-gray-800 hover:text-white">
                    {item.label}
                  </a>
                ) : (
                  <button onClick={() => onNavigate(item.page)} className={`px-3 py-2 rounded-md transition-colors ${currentPage === item.page ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                    {item.label}
                  </button>
                )}
              </div>
            ))}
            
            <ThemeToggle />

            {isAdmin ? (
              <div className="flex items-center gap-2 ml-4">
                <Button onClick={() => onNavigate('admin-dashboard')} variant="outline" size="sm">Dashboard</Button>
                <Button onClick={onLogout} variant="ghost" size="sm"><LogOut className="w-4 h-4" /></Button>
              </div>
            ) : (
              <Button onClick={() => onNavigate('admin-login')} variant="outline" size="sm" className="ml-4">Admin</Button>
            )}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-md hover:bg-gray-800 text-gray-300">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-800 bg-gray-950">
          <div className="px-4 py-2 space-y-1">
            {menuItems.map((item) => (
              <div key={item.page}>
                {item.dropdown ? (
                  <>
                    <button onClick={() => { if (item.page === 'about') setAboutDropdownOpen(!aboutDropdownOpen); else if (item.page === 'programs') setProgramsDropdownOpen(!programsDropdownOpen); }} className="flex items-center justify-between w-full px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white">
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${(item.page === 'about' && aboutDropdownOpen) || (item.page === 'programs' && programsDropdownOpen) ? 'rotate-180' : ''}`} />
                    </button>
                    {((item.page === 'about' && aboutDropdownOpen) || (item.page === 'programs' && programsDropdownOpen)) && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <button key={subItem.page} onClick={() => { onNavigate(subItem.page); setMobileMenuOpen(false); setAboutDropdownOpen(false); setProgramsDropdownOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white">
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : item.external ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white">
                    {item.label}
                  </a>
                ) : (
                  <button onClick={() => { onNavigate(item.page); setMobileMenuOpen(false); }} className={`block w-full text-left px-3 py-2 rounded-md ${currentPage === item.page ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                    {item.label}
                  </button>
                )}
              </div>
            ))}
            
            <div className="pt-4 border-t border-gray-800">
              <ThemeToggle />
            </div>

            {isAdmin ? (
              <div className="pt-4 border-t border-gray-800 space-y-1">
                <button onClick={() => { onNavigate('admin-dashboard'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white">Dashboard</button>
                <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-gray-800 text-red-400">
                  <LogOut className="w-4 h-4" />Logout
                </button>
              </div>
            ) : (
              <button onClick={() => { onNavigate('admin-login'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mt-2 border-t border-gray-800 pt-4">Admin Login</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
