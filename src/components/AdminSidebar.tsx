import { LayoutDashboard, FileText, ImageIcon, Calendar, Users, UserPlus, Settings, LogOut } from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isSuperAdmin: boolean;
  onLogout: () => void;
}

export function AdminSidebar({ activeSection, onSectionChange, isSuperAdmin, onLogout }: AdminSidebarProps) {
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
    <div className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen flex flex-col" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          Admin Panel
        </h2>
        <p className="text-xs text-gray-400 mt-1">{isSuperAdmin ? 'Super Admin' : 'Admin'}</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
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
