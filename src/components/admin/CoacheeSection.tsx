import { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface CoacheeSectionProps {
  accessToken: string;
  mentees: any[];
  onRefresh: () => void;
}

export function CoacheeSection({ accessToken, mentees, onRefresh }: CoacheeSectionProps) {
  const [loading, setLoading] = useState(false);
  const [mentors, setMentors] = useState<any[]>([]);
  const [newMenteeName, setNewMenteeName] = useState('');
  const [newMenteeAssignedMentor, setNewMenteeAssignedMentor] = useState<string | null>(null);

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
    fetchApprovedMentors();
  }, []);

  const fetchApprovedMentors = async () => {
    try {
      const data = await restFetch('/mentors');
      setMentors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching mentors', err);
    }
  };

  const createMentee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenteeName || !newMenteeAssignedMentor) return alert('Provide coachee name and assign a destiny coach');
    try {
      setLoading(true);
      await restFetch('/mentees', { method: 'POST', body: { name: newMenteeName, mentor_id: newMenteeAssignedMentor }, useAccess: true, preferReturn: true });
      setNewMenteeName('');
      setNewMenteeAssignedMentor(null);
      alert('Coachee added');
      onRefresh();
    } catch (err) {
      alert('Failed to add coachee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white">Add Coachee</CardTitle>
          <CardDescription className="text-gray-400">Create a new coachee and assign to a destiny coach</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={createMentee} className="space-y-4">
            <div>
              <Label className="text-gray-300">Coachee Name</Label>
              <Input value={newMenteeName} onChange={(e) => setNewMenteeName(e.target.value)} required className="bg-gray-900/50 border-gray-700 text-white" />
            </div>
            <div>
              <Label className="text-gray-300">Assign Destiny Coach</Label>
              <select value={newMenteeAssignedMentor || ''} onChange={(e) => setNewMenteeAssignedMentor(e.target.value)} required className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-md px-3 py-2">
                <option value="">Select a destiny coach</option>
                {mentors.map((m) => (
                  <option key={m.id} value={m.id}>{m.name || m.fullName}</option>
                ))}
              </select>
            </div>
            <Button type="submit" disabled={loading}><UserPlus className="w-4 h-4 mr-2" />Add Coachee</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white">Coachees List</CardTitle>
          <CardDescription className="text-gray-400">Manage coachees and their assigned destiny coaches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {mentees.map((mentee) => {
              const assignedCoach = mentors.find(m => m.id === mentee.mentor_id);
              return (
                <div key={mentee.id} className="border border-gray-700 rounded-lg p-4 bg-gray-900/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-white">{mentee.name}</div>
                      <div className="text-sm text-gray-400">Assigned Coach: {assignedCoach ? (assignedCoach.name || assignedCoach.fullName) : 'None'}</div>
                    </div>
                  </div>
                </div>
              );
            })}
            {mentees.length === 0 && <div className="text-gray-400 text-center py-8">No coachees yet</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
