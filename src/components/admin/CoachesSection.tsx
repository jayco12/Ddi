import { useState, useEffect } from 'react';
import { Check, Eye, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface CoachesSectionProps {
  accessToken: string;
}

export function CoachesSection({ accessToken }: CoachesSectionProps) {
  const [mentorSubmissions, setMentorSubmissions] = useState<any[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const restBase = `https://${projectId}.supabase.co/rest/v1`;
  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-c6a73d4f`;

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
    fetchMentorSubmissions();
    fetchApprovedMentors();
  }, []);

  const fetchMentorSubmissions = async () => {
    try {
      const data = await restFetch('/mentor_submissions', { useAccess: true });
      setMentorSubmissions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching mentor submissions', err);
    }
  };

  const fetchApprovedMentors = async () => {
    try {
      const data = await restFetch('/mentors');
      setMentors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching mentors', err);
    }
  };

  const approveMentor = async (submissionId: string) => {
    try {
      setLoading(true);
      const subs = await restFetch(`/mentor_submissions?id=eq.${encodeURIComponent(submissionId)}`, { useAccess: true });
      const submission = Array.isArray(subs) && subs[0];
      if (!submission) throw new Error('Submission not found');
      
      await restFetch('/mentors', { 
        method: 'POST', 
        body: { 
          fullName: submission.fullName, 
          email: submission.email,
          phone: submission.phone,
          age: submission.age, 
          occupation: submission.occupation,
          experience: submission.experience,
          education: submission.education, 
          motivation: submission.motivation,
          skills: submission.skills,
          availability: submission.availability, 
          approved: true 
        }, 
        useAccess: true, 
        preferReturn: true 
      });
      
      const delRes = await fetch(`${restBase}/mentor_submissions?id=eq.${encodeURIComponent(submissionId)}`, { 
        method: 'DELETE', 
        headers: { 'apikey': publicAnonKey, 'Authorization': `Bearer ${accessToken}` } 
      });
      
      if (!delRes.ok) throw new Error(`Failed to delete submission ${await delRes.text()}`);
      
      alert('Destiny coach approved!');
      fetchMentorSubmissions();
      fetchApprovedMentors();
    } catch (err) {
      console.error(err);
      alert('Failed to approve destiny coach');
    } finally {
      setLoading(false);
    }
  };

  const rejectMentor = async (submissionId: string) => {
    if (!confirm('Reject this destiny coach application?')) return;
    try {
      setLoading(true);
      await fetch(`${serverUrl}/mentors/submissions/${submissionId}/reject`, { 
        method: 'POST', 
        headers: { 'Authorization': `Bearer ${accessToken}` } 
      });
      alert('Application rejected');
      fetchMentorSubmissions();
    } catch (err) {
      alert('Failed to reject application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Destiny Coach Applications</CardTitle>
            <CardDescription className="text-gray-400">Review and approve destiny coach sign-ups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {mentorSubmissions.map((m) => (
                <div key={m.id} className="border border-gray-700 rounded-lg p-4 bg-gray-900/30">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="font-semibold text-white mb-1">{m.fullName}</div>
                      <div className="text-sm text-gray-400 mb-2">{m.email}</div>
                      <div className="text-sm text-gray-300 mb-2">{m.occupation}</div>
                      {m.motivation && <div className="text-sm text-gray-400 line-clamp-2">{m.motivation}</div>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" onClick={() => approveMentor(m.id)} disabled={loading}>
                        <Check className="w-4 h-4 mr-1" />Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => rejectMentor(m.id)} disabled={loading} className="text-red-400">
                        <X className="w-4 h-4 mr-1" />Reject
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setSelectedMentor(m)}>
                        <Eye className="w-4 h-4 mr-1" />View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {mentorSubmissions.length === 0 && <div className="text-gray-400 text-center py-8">No pending applications</div>}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Approved Destiny Coaches ({mentors.length})</CardTitle>
            <CardDescription className="text-gray-400">Active destiny coaches available for assignment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {mentors.map((mt) => (
                <div key={mt.id} className="flex items-center justify-between border-b border-gray-700 py-3">
                  <div className="flex-1">
                    <div className="font-semibold text-white">{mt.name || mt.fullName}</div>
                    <div className="text-sm text-gray-400">{mt.email}</div>
                    {mt.occupation && <div className="text-xs text-gray-500 mt-1">{mt.occupation}</div>}
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setSelectedMentor(mt)}>
                    <Eye className="w-4 h-4 mr-1" />View
                  </Button>
                </div>
              ))}
              {mentors.length === 0 && <div className="text-gray-400 text-center py-8">No approved destiny coaches</div>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Destiny Coach Detail Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700 flex justify-between items-start sticky top-0 bg-gray-800">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedMentor.name || selectedMentor.fullName}</h3>
                <div className="text-sm text-gray-400">{selectedMentor.email}</div>
              </div>
              <Button variant="ghost" onClick={() => setSelectedMentor(null)} className="text-gray-300 hover:text-white">
                Close
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Phone</div>
                  <div className="text-white">{selectedMentor.phone || '—'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Age</div>
                  <div className="text-white">{selectedMentor.age || '—'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Occupation</div>
                  <div className="text-white">{selectedMentor.occupation || '—'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Education</div>
                  <div className="text-white">{selectedMentor.education || '—'}</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Availability</div>
                <div className="text-white">{selectedMentor.availability || '—'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Skills</div>
                <div className="text-white whitespace-pre-wrap">{selectedMentor.skills || selectedMentor.bio || '—'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Experience</div>
                <div className="text-white whitespace-pre-wrap">{selectedMentor.experience || selectedMentor.bio || '—'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Motivation</div>
                <div className="text-white whitespace-pre-wrap">{selectedMentor.motivation || '—'}</div>
              </div>
              {selectedMentor.created_at && (
                <div className="text-xs text-gray-500 pt-4 border-t border-gray-700">
                  Joined: {new Date(selectedMentor.created_at).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
