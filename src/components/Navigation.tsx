import { useState } from 'react';
import { Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { Button } from './ui/button';

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
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white">
              DDI
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <div key={item.page} className="relative group">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => onNavigate(item.page)}
                      className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      {item.dropdown.map((subItem) => (
                        <button
                          key={subItem.page}
                          onClick={() => {
                            onNavigate(subItem.page);
                            setMobileMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => onNavigate(item.page)}
                    className={`px-3 py-2 rounded-md transition-colors ${
                      currentPage === item.page
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
            
            {isAdmin ? (
              <div className="flex items-center gap-2 ml-4">
                <Button
                  onClick={() => onNavigate('admin-dashboard')}
                  variant="outline"
                  size="sm"
                >
                  Dashboard
                </Button>
                <Button
                  onClick={onLogout}
                  variant="ghost"
                  size="sm"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => onNavigate('admin-login')}
                variant="outline"
                size="sm"
                className="ml-4"
              >
                Admin
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-2 space-y-1">
            {menuItems.map((item) => (
              <div key={item.page}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => {
                        if (item.page === 'about') {
                          setAboutDropdownOpen(!aboutDropdownOpen);
                        } else if (item.page === 'programs') {
                          setProgramsDropdownOpen(!programsDropdownOpen);
                        }
                      }}
                      className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-100"
                    >
                      {item.label}
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform ${
                          (item.page === 'about' && aboutDropdownOpen) ||
                          (item.page === 'programs' && programsDropdownOpen)
                            ? 'rotate-180'
                            : ''
                        }`}
                      />
                    </button>
                    {((item.page === 'about' && aboutDropdownOpen) ||
                      (item.page === 'programs' && programsDropdownOpen)) && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <button
                            key={subItem.page}
                            onClick={() => {
                              onNavigate(subItem.page);
                              setMobileMenuOpen(false);
                              setAboutDropdownOpen(false);
                              setProgramsDropdownOpen(false);
                            }}
                            className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-50"
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => {
                      onNavigate(item.page);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md ${
                      currentPage === item.page
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
            
            {isAdmin ? (
              <div className="pt-4 border-t border-gray-200 space-y-1">
                <button
                  onClick={() => {
                    onNavigate('admin-dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onNavigate('admin-login');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 mt-2 border-t border-gray-200 pt-4"
              >
                Admin Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
