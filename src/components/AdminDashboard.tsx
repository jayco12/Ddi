import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  BarChart3,
  Mail,
  Plus,
  Trash2,
  Eye,
  Edit
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-c6a73d4f`;

  useEffect(() => {
    fetchAnalytics();
    fetchBlogPosts();
    fetchGalleryImages();
    fetchContactSubmissions();
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

      const data = await response.json();
      
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
        alert('Error: ' + (data.error || 'Failed to save post'));
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

  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', galleryTitle);
      formData.append('category', galleryCategory);

      const response = await fetch(`${serverUrl}/gallery/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Image uploaded successfully!');
        setGalleryTitle('');
        setGalleryCategory('');
        setSelectedFile(null);
        fetchGalleryImages();
      } else {
        alert('Error: ' + (data.error || 'Failed to upload image'));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`${serverUrl}/gallery/images/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Image deleted successfully!');
        fetchGalleryImages();
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your DDI website content and view insights</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full max-w-2xl mb-8">
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
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl">{analytics?.totalViews || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Blog Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl">{analytics?.blogPostCount || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Gallery Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl">{analytics?.galleryImageCount || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl">{contactSubmissions.length}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Blog Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.recentPosts?.slice(0, 5).map((post: any) => (
                    <div key={post.id} className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div>{post.title}</div>
                        <div className="text-sm text-gray-600">
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
              <Card>
                <CardHeader>
                  <CardTitle>{editingPostId ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
                  <CardDescription>
                    {editingPostId ? 'Update the blog post' : 'Add a new post to your blog'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateOrUpdatePost} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={blogExcerpt}
                        onChange={(e) => setBlogExcerpt(e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        rows={8}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        placeholder="e.g., Education, Projects, News"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">Image URL (optional)</Label>
                      <Input
                        id="image"
                        value={blogImage}
                        onChange={(e) => setBlogImage(e.target.value)}
                        placeholder="https://..."
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

              <Card>
                <CardHeader>
                  <CardTitle>All Blog Posts</CardTitle>
                  <CardDescription>Manage your existing blog posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4">
                        <div className="mb-2">{post.title}</div>
                        <div className="text-sm text-gray-600 mb-3">
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
              <Card>
                <CardHeader>
                  <CardTitle>Upload New Image</CardTitle>
                  <CardDescription>Add images to your gallery</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUploadImage} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="gallery-title">Title</Label>
                      <Input
                        id="gallery-title"
                        value={galleryTitle}
                        onChange={(e) => setGalleryTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gallery-category">Category</Label>
                      <Input
                        id="gallery-category"
                        value={galleryCategory}
                        onChange={(e) => setGalleryCategory(e.target.value)}
                        placeholder="e.g., Events, Projects, Team"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="file">Image File</Label>
                      <Input
                        id="file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={loading || !selectedFile}>
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gallery Images ({galleryImages.length})</CardTitle>
                  <CardDescription>Manage your uploaded images</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
                    {galleryImages.map((image) => (
                      <div key={image.id} className="border rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={image.url}
                          alt={image.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-3">
                          <div className="text-sm mb-1">{image.title}</div>
                          <div className="text-xs text-gray-600 mb-2">{image.category}</div>
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
            <Card>
              <CardHeader>
                <CardTitle>Website Analytics</CardTitle>
                <CardDescription>View insights about your website performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg mb-4">Page Views</h3>
                    <div className="space-y-2">
                      {analytics?.pageViews?.map((pv: any, index: number) => (
                        <div key={index} className="flex justify-between items-center border-b pb-2">
                          <span>{pv.key?.replace('analytics:page-views:', '')}</span>
                          <span className="text-blue-600">{pv.value} views</span>
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
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
                <CardDescription>View messages from website visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactSubmissions.map((submission) => (
                    <div key={submission.id} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <div>
                          <span>{submission.name}</span>
                          <span className="text-gray-600 ml-2">({submission.email})</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mb-2">{submission.subject}</div>
                      <div className="text-gray-600">{submission.message}</div>
                    </div>
                  ))}
                  {contactSubmissions.length === 0 && (
                    <p className="text-gray-600 text-center py-8">No submissions yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
