import { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface EventsSectionProps {
  accessToken: string;
  events: any[];
  onRefresh: () => void;
}

export function EventsSection({ accessToken, events, onRefresh }: EventsSectionProps) {
  const [loading, setLoading] = useState(false);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [attendanceName, setAttendanceName] = useState('');
  const [attendanceCount, setAttendanceCount] = useState<number>(1);

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

  const createEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventName || !newEventDate) return alert('Enter event name and date');
    try {
      setLoading(true);
      await restFetch('/events', { method: 'POST', body: { title: newEventName, date: newEventDate }, useAccess: true, preferReturn: true });
      setNewEventName('');
      setNewEventDate('');
      onRefresh();
    } catch (err) {
      alert('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (eventId: string) => {
    try {
      setLoading(true);
      await restFetch('/event_attendance', { method: 'POST', body: { event_id: eventId, name: attendanceName || null, created_at: new Date().toISOString() }, useAccess: true, preferReturn: true });
      setAttendanceName('');
      onRefresh();
    } catch (err) {
      alert('Failed to mark attendance');
    } finally {
      setLoading(false);
    }
  };

  const addAttendanceCount = async (eventId: string, count: number) => {
    if (!count || count <= 0) return alert('Enter a valid number');
    try {
      setLoading(true);
      const now = new Date().toISOString();
      const payload = Array.from({ length: count }).map(() => ({ event_id: eventId, name: null, created_at: now }));
      await restFetch('/event_attendance', { method: 'POST', body: payload, useAccess: true, preferReturn: true });
      setAttendanceCount(1);
      onRefresh();
    } catch (err) {
      alert('Failed to add attendance count');
    } finally {
      setLoading(false);
    }
  };

  const exportAttendance = async (eventId: string, eventTitle?: string) => {
    try {
      const data = await restFetch(`/event_attendance?event_id=eq.${encodeURIComponent(eventId)}&select=name,created_at`, { useAccess: true });
      const rows = Array.isArray(data) ? data : [];
      const csv = [['name', 'created_at'], ...rows.map((r: any) => [r.name, r.created_at])].map(r => r.map((c: any) => `"${String(c || '')}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(eventTitle || eventId).replace(/[^a-z0-9_\-]/gi, '_')}_attendance.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to export attendance');
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white">Create Event</CardTitle>
          <CardDescription className="text-gray-400">Add event for tracking attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={createEvent} className="space-y-4">
            <div>
              <Label className="text-gray-300">Event Name</Label>
              <Input value={newEventName} onChange={(e) => setNewEventName(e.target.value)} required className="bg-gray-900/50 border-gray-700 text-white" />
            </div>
            <div>
              <Label className="text-gray-300">Date</Label>
              <Input type="date" value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} required className="bg-gray-900/50 border-gray-700 text-white" />
            </div>
            <Button type="submit" disabled={loading}><Plus className="w-4 h-4 mr-2" />Create Event</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white">Events & Attendance</CardTitle>
          <CardDescription className="text-gray-400">Mark attendance and view metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((ev: any) => (
              <div key={ev.id} className="border border-gray-700 rounded-lg p-3 bg-gray-900/30">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-white">{ev.title}</div>
                    <div className="text-sm text-gray-400">{new Date(ev.date).toLocaleDateString()}</div>
                  </div>
                  <div className="text-sm text-cyan-400">Attendees: {ev.attendanceCount || 0}</div>
                </div>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
                  <Input placeholder="Name (optional)" value={attendanceName} onChange={(e) => setAttendanceName(e.target.value)} className="bg-gray-900/50 border-gray-700 text-white" />
                  <Button onClick={() => markAttendance(ev.id)}><Check className="w-4 h-4 mr-2" />Mark</Button>
                  <div className="flex items-center gap-2">
                    <Input type="number" min={1} value={attendanceCount} onChange={(e) => setAttendanceCount(Number(e.target.value || 1))} className="w-24 bg-gray-900/50 border-gray-700 text-white" />
                    <Button variant="outline" onClick={() => addAttendanceCount(ev.id, attendanceCount)}>Add Count</Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => { navigator.clipboard?.writeText(ev.id); alert('ID copied'); }}>Copy ID</Button>
                    <Button variant="outline" onClick={() => exportAttendance(ev.id, ev.title)}>Export</Button>
                  </div>
                </div>
              </div>
            ))}
            {events.length === 0 && <div className="text-gray-400">No events yet</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
