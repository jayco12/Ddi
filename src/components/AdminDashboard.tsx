import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  BarChart3,
  Mail,
  Plus,
  Trash2,
  Eye,
  Edit,
  Users,
  Calendar,
  UserPlus,
  Check
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AdminDashboardProps {
  accessToken: string;
  onLogout: () => void;
}

export function AdminDashboard({ accessToken, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [analytics, setAnalytics] = useState<any>(null);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Blog form state
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogCategory, setBlogCategory] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Gallery form state
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('');
  // Instead of hosting images via file uploads, accept image URLs
  const [galleryImageUrl, setGalleryImageUrl] = useState('');

  // Events & attendance
  const [events, setEvents] = useState<any[]>([]);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [attendanceName, setAttendanceName] = useState('');
  const [attendanceCount, setAttendanceCount] = useState<number>(1);

  // Mentors & mentees
  const [mentorSubmissions, setMentorSubmissions] = useState<any[]>([]); // pending mentor form submissions
  const [mentors, setMentors] = useState<any[]>([]); // approved mentors
  const [newMenteeName, setNewMenteeName] = useState('');
  const [newMenteeAssignedMentor, setNewMenteeAssignedMentor] = useState<string | null>(null);
  const [mentees, setMentees] = useState<any[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<any | null>(null);

  // Debug / server response
  const [serverDebug, setServerDebug] = useState<string | null>(null);

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-c6a73d4f`;
  const restBase = `https://${projectId}.supabase.co/rest/v1`;

  // Helper to call Supabase PostgREST endpoints
  const restFetch = async (path: string, opts: { method?: string; body?: any; useAccess?: boolean; preferReturn?: boolean } = {}) => {
    const url = `${restBase}${path}`;
    const headers: Record<string, string> = {
      'apikey': publicAnonKey,
      'Accept': 'application/json'
    };
    // Use admin accessToken for writes where available
    headers['Authorization'] = opts.useAccess ? `Bearer ${accessToken}` : `Bearer ${publicAnonKey}`;
    if (opts.body) headers['Content-Type'] = 'application/json';
    if (opts.preferReturn) headers['Prefer'] = 'return=representation';

    const res = await fetch(url, { method: opts.method || 'GET', headers, body: opts.body ? JSON.stringify(opts.body) : undefined });
    const text = await res.text();
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${text}`);
    try { return JSON.parse(text); } catch { return text; }
  };

  useEffect(() => {
    fetchAnalytics();
    fetchBlogPosts();
    fetchGalleryImages();
    fetchContactSubmissions();
    fetchEvents();
    fetchMentorSubmissions();
    fetchApprovedMentors();
    fetchMentees();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${serverUrl}/analytics`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      if (data.analytics) {
        setAnalytics(data.analytics);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch(`${serverUrl}/blog/posts`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      if (data.posts) {
        setBlogPosts(data.posts);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch(`${serverUrl}/gallery/images`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      if (data.images) {
        setGalleryImages(data.images);
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    }
  };

  const fetchContactSubmissions = async () => {
    try {
      const response = await fetch(`${serverUrl}/contact/submissions`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      if (data.submissions) {
        setContactSubmissions(data.submissions);
      }
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
    }
  };

  // Fetch events via PostgREST
  const fetchEvents = async () => {
    try {
      const data = await restFetch('/events');
      const eventsArr = Array.isArray(data) ? data : [];
      // populate attendance counts per event
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

  const createEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventName || !newEventDate) return alert('Please enter event name and date');
    try {
      setLoading(true);
      // Use PostgREST to create event
      try {
        await restFetch('/events', { method: 'POST', body: { title: newEventName, date: newEventDate }, useAccess: true, preferReturn: true });
        setNewEventName('');
        setNewEventDate('');
        fetchEvents();
      } catch (err: any) {
        setServerDebug(`REST POST /events error: ${String(err.message || err)}`);
        alert('Failed to create event. See debug panel.');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating event');
    } finally { setLoading(false); }
  };

  const markAttendance = async (eventId: string) => {
    // Allow anonymous attendance entries (name optional). We send null when name is blank.
    try {
      setLoading(true);
      try {
        await restFetch('/event_attendance', { method: 'POST', body: { event_id: eventId, name: attendanceName || null, created_at: new Date().toISOString() }, useAccess: true, preferReturn: true });
        setAttendanceName('');
        fetchEvents();
      } catch (err: any) {
        setServerDebug(`REST POST /event_attendance error: ${String(err.message || err)}`);
        alert('Failed to mark attendance. See debug panel.');
      }
    } catch (err) {
      console.error(err);
      alert('Error marking attendance');
    } finally { setLoading(false); }
  };

  // Bulk add anonymous attendees by number
  const addAttendanceCount = async (eventId: string, count: number) => {
    if (!count || count <= 0) return alert('Enter a valid number');
    try {
      setLoading(true);
      // Build array of attendance entries (name null) to insert in one request
      const now = new Date().toISOString();
      const payload = Array.from({ length: count }).map(() => ({ event_id: eventId, name: null, created_at: now }));
      try {
        await restFetch('/event_attendance', { method: 'POST', body: payload, useAccess: true, preferReturn: true });
        setAttendanceCount(1);
        fetchEvents();
      } catch (err: any) {
        setServerDebug(`REST bulk POST /event_attendance error: ${String(err.message || err)}`);
        alert('Failed to add attendance count. See debug panel.');
      }
    } catch (err) {
      console.error(err);
      alert('Error adding attendance count');
    } finally { setLoading(false); }
  };

  // Mentor workflow
  const fetchMentorSubmissions = async () => {
    try {
      const data = await restFetch('/mentor_submissions', { useAccess: true });
      setMentorSubmissions(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); setServerDebug(`Error fetching mentor submissions: ${String(err)}`); }
  };

  const approveMentor = async (submissionId: string) => {
    try {
      // Read the submission
      const subs = await restFetch(`/mentor_submissions?id=eq.${encodeURIComponent(submissionId)}`, { useAccess: true });
      const submission = Array.isArray(subs) && subs[0];
      if (!submission) throw new Error('Submission not found');
      // Insert into mentors table
      await restFetch('/mentors', { method: 'POST', body: { fullName: submission.fullName, email: submission.email,phone: submission.phone,age: submission.age, occupation: submission.occupation,experience: submission.experience,education: submission.education, motivation: submission.motivation,skills: submission.skills,availability: submission.availability, approved: true }, useAccess: true, preferReturn: true });
      // Delete the submission
      const delRes = await fetch(`${restBase}/mentor_submissions?id=eq.${encodeURIComponent(submissionId)}`, { method: 'DELETE', headers: { 'apikey': publicAnonKey, 'Authorization': `Bearer ${accessToken}` } });
      if (!delRes.ok) throw new Error(`Failed to delete submission ${await delRes.text()}`);
      fetchMentorSubmissions();
      fetchApprovedMentors();
    } catch (err) { console.error(err); setServerDebug(`Error approving mentor: ${String(err)}`); }
  };

  const fetchApprovedMentors = async () => {
    try {
      const data = await restFetch('/mentors');
      setMentors(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); setServerDebug(`Error fetching approved mentors: ${String(err)}`); }
  };

  const createMentee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenteeName || !newMenteeAssignedMentor) return alert('Provide mentee name and assign a mentor');
    try {
      setLoading(true);
      try {
        await restFetch('/mentees', { method: 'POST', body: { name: newMenteeName, mentor_id: newMenteeAssignedMentor }, useAccess: true, preferReturn: true });
        setNewMenteeName('');
        setNewMenteeAssignedMentor(null);
        alert('Mentee added');
        fetchMentees();
      } catch (err: any) {
        setServerDebug(`REST POST /mentees error: ${String(err.message || err)}`);
        alert('Failed to add mentee. See debug panel.');
      }
    } catch (err) { console.error(err); alert('Error adding mentee'); }
    finally { setLoading(false); }
  };

  // Fetch mentees
  const fetchMentees = async () => {
    try {
      const data = await restFetch('/mentees', { useAccess: true });
      setMentees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching mentees', err);
      setMentees([]);
    }
  };

  // Export attendance for an event as CSV
  const exportAttendance = async (eventId: string, eventTitle?: string) => {
    try {
      const data = await restFetch(`/event_attendance?event_id=eq.${encodeURIComponent(eventId)}&select=name,created_at`, { useAccess: true });
      const rows = Array.isArray(data) ? data : [];
      const csv = [ ['name','created_at'], ...rows.map((r: any) => [r.name, r.created_at]) ].map(r => r.map((c: any) => `"${String(c || '')}"`).join(',')).join('\n');
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
      console.error('Error exporting attendance', err);
      setServerDebug(`Export attendance error: ${String(err)}`);
      alert('Failed to export attendance');
    }
  };

  const handleCreateOrUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingPostId 
        ? `${serverUrl}/blog/posts/${editingPostId}`
        : `${serverUrl}/blog/posts`;
      
      const method = editingPostId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: blogTitle,
          content: blogContent,
          excerpt: blogExcerpt,
          category: blogCategory,
          image: blogImage
        })
      });

      const text = await response.text();
      if (!response.ok) {
        setServerDebug(`${method} ${url} ${response.status}: ${text}`);
        alert('Failed to save post. See debug panel.');
        return;
      }

      let data: any = {};
      try { data = text ? JSON.parse(text) : {}; } catch (err) { data = {}; }

      if (data.success) {
        alert(editingPostId ? 'Post updated successfully!' : 'Post created successfully!');
        setBlogTitle('');
        setBlogContent('');
        setBlogExcerpt('');
        setBlogCategory('');
        setBlogImage('');
        setEditingPostId(null);
        fetchBlogPosts();
      } else {
        setServerDebug(`Blog save error: ${JSON.stringify(data)}`);
        alert('Error saving post. See debug panel.');
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Error saving blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`${serverUrl}/blog/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Post deleted successfully!');
        fetchBlogPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };

  const handleEditPost = (post: any) => {
    setBlogTitle(post.title);
    setBlogContent(post.content);
    setBlogExcerpt(post.excerpt);
    setBlogCategory(post.category);
    setBlogImage(post.image || '');
    setEditingPostId(post.id);
    setActiveTab('blog');
  };

  // Create gallery image by URL (no file hosting)
  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryImageUrl) return alert('Provide an image URL');

    setLoading(true);
    try {
      const response = await fetch(`${serverUrl}/gallery/images`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: galleryImageUrl, title: galleryTitle, category: galleryCategory })
      });
      const text = await response.text();
      if (!response.ok) {
        setServerDebug(`POST /gallery/images ${response.status}: ${text}`);
        alert('Failed to add gallery image. See debug panel.');
        return;
      }
      let data: any = {};
      try { data = text ? JSON.parse(text) : {}; } catch (err) { data = {}; }
      if (data.success) {
        alert('Image added to gallery!');
        setGalleryTitle('');
        setGalleryCategory('');
        setGalleryImageUrl('');
        fetchGalleryImages();
      } else {
        setServerDebug(`Gallery add error: ${JSON.stringify(data)}`);
        alert('Error adding image. See debug panel.');
      }
    } catch (err) {
      console.error('Error adding gallery image:', err);
      alert('Error adding gallery image');
    } finally { setLoading(false); }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      const response = await fetch(`${serverUrl}/gallery/images/${imageId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const text = await response.text();
      if (!response.ok) {
        setServerDebug(`DELETE /gallery/images/${imageId} ${response.status}: ${text}`);
        alert('Failed to delete image. See debug panel.');
        return;
      }
      let data: any = {};
      try { data = text ? JSON.parse(text) : {}; } catch (err) { data = {}; }
      if (data.success) {
        alert('Image deleted successfully!');
        fetchGalleryImages();
      } else {
        setServerDebug(`DELETE image error: ${JSON.stringify(data)}`);
        alert('Failed to delete image. See debug panel.');
      }
    } catch (err) { console.error(err); alert('Error deleting image'); }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-950 py-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {serverDebug && (
          <div className="mb-4 p-4 bg-red-900/20 border border-red-500/30 text-red-400 rounded-md">
            <div className="flex justify-between items-start">
              <div className="whitespace-pre-wrap text-sm">{serverDebug}</div>
              <button onClick={() => setServerDebug(null)} className="ml-4 text-sm text-red-400 hover:text-red-300">Dismiss</button>
            </div>
          </div>
        )}
        <div className="mb-8">
          <h1 className="text-3xl mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Admin Dashboard</h1>
          <p className="text-gray-400">Manage your DDI website content and view insights</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap w-full mb-8 bg-gray-800/50 border border-gray-700/50">
            <TabsTrigger value="overview">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="blog">
              <FileText className="w-4 h-4 mr-2" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="gallery">
              <ImageIcon className="w-4 h-4 mr-2" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="mentors">
              <Users className="w-4 h-4 mr-2" />
              Destiny Coaches
            </TabsTrigger>
            <TabsTrigger value="mentees">
              <UserPlus className="w-4 h-4 mr-2" />
              Coachees
            </TabsTrigger>
           </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-cyan-400 font-bold">{analytics?.totalViews || 0}</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Blog Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-cyan-400 font-bold">{analytics?.blogPostCount || 0}</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Gallery Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-cyan-400 font-bold">{analytics?.galleryImageCount || 0}</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Contact Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-cyan-400 font-bold">{contactSubmissions.length}</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Recent Blog Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.recentPosts?.slice(0, 5).map((post: any) => (
                    <div key={post.id} className="flex items-center justify-between border-b border-gray-700 pb-4">
                      <div>
                        <div className="text-white">{post.title}</div>
                        <div className="text-sm text-gray-400">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditPost(post)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">{editingPostId ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {editingPostId ? 'Update the blog post' : 'Add a new post to your blog'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateOrUpdatePost} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-gray-300">Title</Label>
                      <Input
                        id="title"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        required
                        className="bg-gray-900/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="excerpt" className="text-gray-300">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={blogExcerpt}
                        onChange={(e) => setBlogExcerpt(e.target.value)}
                        rows={2}
                        required
                        className="bg-gray-900/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content" className="text-gray-300">Content</Label>
                      <Textarea
                        id="content"
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        rows={8}
                        required
                        className="bg-gray-900/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-gray-300">Category</Label>
                      <Input
                        id="category"
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        placeholder="e.g., Education, Projects, News"
                        required
                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image" className="text-gray-300">Image URL (optional)</Label>
                      <Input
                        id="image"
                        value={blogImage}
                        onChange={(e) => setBlogImage(e.target.value)}
                        placeholder="https://..."
                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={loading}>
                        <Plus className="w-4 h-4 mr-2" />
                        {editingPostId ? 'Update Post' : 'Create Post'}
                      </Button>
                      {editingPostId && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setBlogTitle('');
                            setBlogContent('');
                            setBlogExcerpt('');
                            setBlogCategory('');
                            setBlogImage('');
                            setEditingPostId(null);
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">All Blog Posts</CardTitle>
                  <CardDescription className="text-gray-400">Manage your existing blog posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="border border-gray-700 rounded-lg p-4 bg-gray-900/30">
                        <div className="mb-2 text-white">{post.title}</div>
                        <div className="text-sm text-gray-400 mb-3">
                          {post.category} • {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditPost(post)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Upload New Image</CardTitle>
                  <CardDescription className="text-gray-400">Add images to your gallery</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUploadImage} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="gallery-title" className="text-gray-300">Title</Label>
                      <Input
                        id="gallery-title"
                        value={galleryTitle}
                        onChange={(e) => setGalleryTitle(e.target.value)}
                        required
                        className="bg-gray-900/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gallery-category" className="text-gray-300">Category</Label>
                      <Input
                        id="gallery-category"
                        value={galleryCategory}
                        onChange={(e) => setGalleryCategory(e.target.value)}
                        placeholder="e.g., Events, Projects, Team"
                        required
                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image-url" className="text-gray-300">Image URL</Label>
                      <Input
                        id="image-url"
                        value={galleryImageUrl}
                        onChange={(e) => setGalleryImageUrl(e.target.value)}
                        placeholder="https://..."
                        required
                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <Button type="submit" disabled={loading || !galleryImageUrl}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Image to Gallery
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Gallery Images ({galleryImages.length})</CardTitle>
                  <CardDescription className="text-gray-400">Manage your uploaded images</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
                    {galleryImages.map((image) => (
                      <div key={image.id} className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900/30">
                        <ImageWithFallback
                          src={image.url}
                          alt={image.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-3">
                          <div className="text-sm mb-1 text-white">{image.title}</div>
                          <div className="text-xs text-gray-400 mb-2">{image.category}</div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteImage(image.id)}
                            className="w-full text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Website Analytics</CardTitle>
                <CardDescription className="text-gray-400">View insights about your website performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg mb-4 text-white">Page Views</h3>
                    <div className="space-y-2">
                      {analytics?.pageViews?.map((pv: any, index: number) => (
                        <div key={index} className="flex justify-between items-center border-b border-gray-700 pb-2">
                          <span className="text-gray-300">{pv.key?.replace('analytics:page-views:', '')}</span>
                          <span className="text-cyan-400">{pv.value} views</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Contact Form Submissions</CardTitle>
                <CardDescription className="text-gray-400">View messages from website visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactSubmissions.map((submission) => (
                    <div key={submission.id} className="border border-gray-700 rounded-lg p-4 bg-gray-900/30">
                      <div className="flex justify-between mb-2">
                        <div>
                          <span className="text-white">{submission.name}</span>
                          <span className="text-gray-400 ml-2">({submission.email})</span>
                        </div>
                        <span className="text-sm text-gray-400">
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mb-2 text-white">{submission.subject}</div>
                      <div className="text-gray-400">{submission.message}</div>
                    </div>
                  ))}
                  {contactSubmissions.length === 0 && (
                    <p className="text-gray-400 text-center py-8">No submissions yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Create Event</CardTitle>
                  <CardDescription className="text-gray-400">Add an event for tracking attendance and metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={createEvent} className="space-y-4">
                    <div>
                      <Label htmlFor="event-name" className="text-gray-300">Event Name</Label>
                      <Input id="event-name" value={newEventName} onChange={(e) => setNewEventName(e.target.value)} required className="bg-gray-900/50 border-gray-700 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="event-date" className="text-gray-300">Date</Label>
                      <Input id="event-date" type="date" value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} required className="bg-gray-900/50 border-gray-700 text-white" />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={loading}><Plus className="w-4 h-4 mr-2" />Create Event</Button>
                    </div>
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
                          <Input placeholder="Attendee name (optional)" value={attendanceName} onChange={(e) => setAttendanceName(e.target.value)} className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500" />
                          <Button onClick={() => markAttendance(ev.id)}><Check className="w-4 h-4 mr-2" />Mark Attendance</Button>
                          <div className="flex items-center gap-2">
                            <Input type="number" min={1} value={attendanceCount} onChange={(e) => setAttendanceCount(Number(e.target.value || 1))} className="w-24 bg-gray-900/50 border-gray-700 text-white" />
                            <Button variant="outline" onClick={() => addAttendanceCount(ev.id, attendanceCount)}>Add Count</Button>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={() => { navigator.clipboard?.writeText(ev.id); alert('Event ID copied'); }}>Copy ID</Button>
                            <Button variant="outline" onClick={() => exportAttendance(ev.id, ev.title)}>Export Attendance</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {events.length === 0 && <div className="text-gray-400">No events yet</div>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Mentors Tab */}
          <TabsContent value="mentors">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Destiny Coach Submissions</CardTitle>
                  <CardDescription className="text-gray-400">Review destiny coach sign-ups and approve</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mentorSubmissions.map((m) => (
                      <div key={m.id} className="border border-gray-700 rounded-lg p-3 bg-gray-900/30">
                        <div className="flex justify-between">
                          <div>
                            <div className="font-semibold text-white">{m.name}</div>
                            <div className="text-sm text-gray-400">{m.email}</div>
                            <div className="text-sm mt-1 text-gray-300">{m.bio || ''}</div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button size="sm" onClick={() => approveMentor(m.id)}><Check className="w-4 h-4 mr-1" />Approve</Button>
                            <Button size="sm" variant="outline" onClick={async () => { await fetch(`${serverUrl}/mentors/submissions/${m.id}/reject`, { method: 'POST', headers: { 'Authorization': `Bearer ${accessToken}` } }); fetchMentorSubmissions(); }}>Reject</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {mentorSubmissions.length === 0 && <div className="text-gray-400">No pending submissions</div>}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Approved Destiny Coaches</CardTitle>
                  <CardDescription className="text-gray-400">Destiny coaches available to assign</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {mentors.map((mt) => (
                      <div key={mt.id} className="flex items-center justify-between border-b border-gray-700 py-2">
                        <div>
                          <div className="font-semibold text-white">{mt.name || mt.fullName}</div>
                          <div className="text-sm text-gray-400">{mt.email}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-gray-300">{mt.specialty || ''}</div>
                          <Button size="sm" variant="outline" onClick={() => setSelectedMentor(mt)}><Eye className="w-4 h-4 mr-1" />View</Button>
                        </div>
                      </div>
                    ))}
                    {mentors.length === 0 && <div className="text-gray-400">No approved destiny coaches</div>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Mentees Tab */}
          <TabsContent value="mentees">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Add Coachee</CardTitle>
                  <CardDescription className="text-gray-400">Create a new coachee and assign to a destiny coach</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={createMentee} className="space-y-4">
                    <div>
                      <Label htmlFor="mentee-name" className="text-gray-300">Coachee Name</Label>
                      <Input id="mentee-name" value={newMenteeName} onChange={(e) => setNewMenteeName(e.target.value)} required className="bg-gray-900/50 border-gray-700 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="assigned-mentor" className="text-gray-300">Assign Destiny Coach</Label>
                      <select id="assigned-mentor" value={newMenteeAssignedMentor || ''} onChange={(e) => setNewMenteeAssignedMentor(e.target.value)} required className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-md px-3 py-2">
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
          </TabsContent>

          {/* Destiny Coach detail modal */}
          {selectedMentor && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
              <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-w-2xl w-full mx-4">
                <div className="p-6 border-b border-gray-700 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedMentor.name || selectedMentor.fullName}</h3>
                    <div className="text-sm text-gray-400">{selectedMentor.email}</div>
                  </div>
                  <div className="ml-4">
                    <Button variant="ghost" onClick={() => setSelectedMentor(null)} className="text-gray-300 hover:text-white">Close</Button>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="text-gray-300"><strong className="text-white">Phone:</strong> {selectedMentor.phone || '—'}</div>
                  <div className="text-gray-300"><strong className="text-white">Age:</strong> {selectedMentor.age || '—'}</div>
                  <div className="text-gray-300"><strong className="text-white">Occupation:</strong> {selectedMentor.occupation || '—'}</div>
                  <div className="text-gray-300"><strong className="text-white">Education:</strong> {selectedMentor.education || '—'}</div>
                  <div className="text-gray-300"><strong className="text-white">Specialty:</strong> {selectedMentor.specialty || '—'}</div>
                  <div className="text-gray-300"><strong className="text-white">Availability:</strong> {selectedMentor.availability || '—'}</div>
                  <div className="text-gray-300"><strong className="text-white">Skills:</strong> <div className="text-sm text-gray-400 whitespace-pre-wrap">{selectedMentor.skills || selectedMentor.bio || '—'}</div></div>
                  <div className="text-gray-300"><strong className="text-white">Experience / Bio:</strong> <div className="text-sm text-gray-400 whitespace-pre-wrap">{selectedMentor.experience || selectedMentor.bio || '—'}</div></div>
                  <div className="text-gray-300"><strong className="text-white">Motivation:</strong> <div className="text-sm text-gray-400 whitespace-pre-wrap">{selectedMentor.motivation || '—'}</div></div>
                  <div className="text-xs text-gray-500">Joined: {selectedMentor.created_at ? new Date(selectedMentor.created_at).toLocaleString() : '—'}</div>
                </div>
                <div className="p-4 border-t border-gray-700 flex justify-end">
                  <Button onClick={() => setSelectedMentor(null)}>Close</Button>
                </div>
              </div>
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
