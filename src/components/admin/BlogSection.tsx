import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface BlogSectionProps {
  accessToken: string;
}

export function BlogSection({ accessToken }: BlogSectionProps) {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogCategory, setBlogCategory] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-c6a73d4f`;

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch(`${serverUrl}/blog/posts`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      const data = await response.json();
      if (data.posts) setBlogPosts(data.posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const handleCreateOrUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingPostId ? `${serverUrl}/blog/posts/${editingPostId}` : `${serverUrl}/blog/posts`;
      const method = editingPostId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: blogTitle, content: blogContent, excerpt: blogExcerpt, category: blogCategory, image: blogImage })
      });
      const data = await response.json();
      if (data.success) {
        alert(editingPostId ? 'Post updated!' : 'Post created!');
        setBlogTitle('');
        setBlogContent('');
        setBlogExcerpt('');
        setBlogCategory('');
        setBlogImage('');
        setEditingPostId(null);
        fetchBlogPosts();
      }
    } catch (error) {
      alert('Error saving post');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Delete this post?')) return;
    try {
      const response = await fetch(`${serverUrl}/blog/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const data = await response.json();
      if (data.success) {
        alert('Post deleted!');
        fetchBlogPosts();
      }
    } catch (error) {
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
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white">{editingPostId ? 'Edit Post' : 'Create Post'}</CardTitle>
          <CardDescription className="text-gray-400">{editingPostId ? 'Update the blog post' : 'Add a new post'}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateOrUpdatePost} className="space-y-4">
            <div>
              <Label className="text-gray-300">Title</Label>
              <Input value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} required className="bg-gray-900/50 border-gray-700 text-white" />
            </div>
            <div>
              <Label className="text-gray-300">Excerpt</Label>
              <Textarea value={blogExcerpt} onChange={(e) => setBlogExcerpt(e.target.value)} rows={2} required className="bg-gray-900/50 border-gray-700 text-white" />
            </div>
            <div>
              <Label className="text-gray-300">Content</Label>
              <Textarea value={blogContent} onChange={(e) => setBlogContent(e.target.value)} rows={8} required className="bg-gray-900/50 border-gray-700 text-white" />
            </div>
            <div>
              <Label className="text-gray-300">Category</Label>
              <Input value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)} placeholder="e.g., Education, Projects" required className="bg-gray-900/50 border-gray-700 text-white" />
            </div>
            <div>
              <Label className="text-gray-300">Image URL (optional)</Label>
              <Input value={blogImage} onChange={(e) => setBlogImage(e.target.value)} placeholder="https://..." className="bg-gray-900/50 border-gray-700 text-white" />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}><Plus className="w-4 h-4 mr-2" />{editingPostId ? 'Update' : 'Create'}</Button>
              {editingPostId && <Button type="button" variant="outline" onClick={() => { setBlogTitle(''); setBlogContent(''); setBlogExcerpt(''); setBlogCategory(''); setBlogImage(''); setEditingPostId(null); }}>Cancel</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white">All Posts</CardTitle>
          <CardDescription className="text-gray-400">Manage existing posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {blogPosts.map((post) => (
              <div key={post.id} className="border border-gray-700 rounded-lg p-4 bg-gray-900/30">
                <div className="mb-2 text-white">{post.title}</div>
                <div className="text-sm text-gray-400 mb-3">{post.category} • {new Date(post.createdAt).toLocaleDateString()}</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditPost(post)}><Edit className="w-4 h-4 mr-1" />Edit</Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeletePost(post.id)} className="text-red-600"><Trash2 className="w-4 h-4 mr-1" />Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
