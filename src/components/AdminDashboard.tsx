import React, { useState, useEffect } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { DashboardSection } from './admin/DashboardSection';
import { AdminManagementSection } from './admin/AdminManagementSection';
import { BlogSection } from './admin/BlogSection';
import { GallerySection } from './admin/GallerySection';
import { EventsSection } from './admin/EventsSection';
import { CoacheeSection } from './admin/CoacheeSection';
import { CoachesSection } from './admin/CoachesSection';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AdminDashboardProps {
  accessToken: string;
  onLogout: () => void;
}

export function AdminDashboard({ accessToken, onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [mentees, setMentees] = useState<any[]>([]);
  const [serverDebug, setServerDebug] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  console.log('Sidebar state:', sidebarOpen);

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-c6a73d4f`;
  const restBase = `https://${projectId}.supabase.co/rest/v1`;

  const restFetch = async (path: string, opts: { method?: string; body?: any; useAccess?: boolean; preferReturn?: boolean } = {}) => {
    const url = `${restBase}${path}`;
    const headers: Record<string, string> = {
      'apikey': publicAnonKey,
      'Accept': 'application/json'
    };
    headers['Authorization'] = opts.useAccess ? `Bearer ${accessToken}` : `Bearer ${publicAnonKey}`;
    if (opts.body) headers['Content-Type'] = 'application/json';
    if (opts.preferReturn) headers['Prefer'] = 'return=representation';

    const res = await fetch(url, { method: opts.method || 'GET', headers, body: opts.body ? JSON.stringify(opts.body) : undefined });
    const text = await res.text();
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${text}`);
    try { return JSON.parse(text); } catch { return text; }
  };

  useEffect(() => {
    checkAdminRole();
    fetchEvents();
    fetchMentees();
  }, []);

  const checkAdminRole = async () => {
    try {
      // Decode JWT to get email
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const email = payload.email;
      console.log('Admin email:', email);
      setIsSuperAdmin(email === 'admin@ddi.org');
    } catch (err) {
      console.error('Error checking admin role', err);
    }
  };

  const fetchEvents = async () => {
    try {
      const data = await restFetch('/events');
      const eventsArr = Array.isArray(data) ? data : [];
      const withCounts = await Promise.all(eventsArr.map(async (ev: any) => {
        try {
          const att = await restFetch(`/event_attendance?event_id=eq.${encodeURIComponent(ev.id)}&select=id`);
          const count = Array.isArray(att) ? att.length : 0;
          return { ...ev, attendanceCount: count };
        } catch (err) {
          return { ...ev, attendanceCount: 0 };
        }
      }));
      setEvents(withCounts);
    } catch (e) {
      console.error('Error fetching events', e);
      setEvents([]);
    }
  };

  const fetchMentees = async () => {
    try {
      const data = await restFetch('/mentees', { useAccess: true });
      setMentees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching mentees', err);
      setMentees([]);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection accessToken={accessToken} serverUrl={serverUrl} events={events} mentees={mentees} />;
      case 'blog':
        return <BlogSection accessToken={accessToken} />;
      case 'gallery':
        return <GallerySection accessToken={accessToken} />;
      case 'coachees':
        return <CoacheeSection accessToken={accessToken} mentees={mentees} onRefresh={fetchMentees} />;
      case 'events':
        return <EventsSection accessToken={accessToken} events={events} onRefresh={fetchEvents} />;
      case 'coaches':
        return <CoachesSection accessToken={accessToken} />;
      case 'admins':
        return isSuperAdmin ? <AdminManagementSection accessToken={accessToken} /> : <div className="text-gray-400">Access denied</div>;
      default:
        return <DashboardSection accessToken={accessToken} serverUrl={serverUrl} events={events} mentees={mentees} />;
    }
  };

  return (
    <div className="relative flex min-h-screen bg-gray-950" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <AdminSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
        isSuperAdmin={isSuperAdmin}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />}
      <div className="flex-1 flex flex-col">
        {!sidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="fixed top-20 left-4 z-[9999] p-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-2xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
        <div className="flex-1 p-8 overflow-auto">
        {serverDebug && (
          <div className="mb-4 p-4 bg-red-900/20 border border-red-500/30 text-red-400 rounded-md">
            <div className="flex justify-between items-start">
              <div className="whitespace-pre-wrap text-sm">{serverDebug}</div>
              <button onClick={() => setServerDebug(null)} className="ml-4 text-sm text-red-400 hover:text-red-300">Dismiss</button>
            </div>
          </div>
        )}
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
