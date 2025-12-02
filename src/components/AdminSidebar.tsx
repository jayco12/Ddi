import { LayoutDashboard, FileText, ImageIcon, Calendar, Users, UserPlus, Settings, LogOut, X } from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isSuperAdmin: boolean;
  onLogout: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function AdminSidebar({ activeSection, onSectionChange, isSuperAdmin, onLogout, isOpen, onToggle }: AdminSidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, superAdminOnly: false },
    { id: 'blog', label: 'Blog', icon: FileText, superAdminOnly: false },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon, superAdminOnly: false },
    { id: 'coachees', label: 'Coachee Assignment', icon: UserPlus, superAdminOnly: false },
    { id: 'events', label: 'Events', icon: Calendar, superAdminOnly: true },
    { id: 'coaches', label: 'Destiny Coaches', icon: Users, superAdminOnly: true },
    { id: 'admins', label: 'Admin Management', icon: Settings, superAdminOnly: true },
  ];

  const filteredItems = menuItems.filter(item => !item.superAdminOnly || isSuperAdmin);

  return (
    <div 
      className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 min-h-screen flex flex-col transition-transform duration-300" 
      style={{ 
        fontFamily: "'Space Grotesk', sans-serif",
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)'
      }}
    >
      <div className="p-6 border-b border-gray-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Admin Panel
          </h2>
          <p className="text-xs text-gray-400 mt-1">{isSuperAdmin ? 'Super Admin' : 'Admin'}</p>
        </div>
        <button onClick={() => { console.log('Toggle clicked, isOpen:', isOpen); onToggle(); }} className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-lg transition-all">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => { onSectionChange(item.id); if (window.innerWidth < 1024) onToggle(); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
