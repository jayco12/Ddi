import { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlogProps {
  onNavigate: (page: string) => void;
  onSelectPost: (postId: string) => void;
}

export function Blog({ onNavigate, onSelectPost }: BlogProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-c6a73d4f`;

  useEffect(() => {
    fetchPosts();
    trackPageView();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm, selectedCategory]);

  const trackPageView = async () => {
    try {
      await fetch(`${serverUrl}/analytics/pageview`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ page: 'blog' })
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${serverUrl}/blog/posts`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      if (data.posts) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = posts;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  };

  const categories = ['All', ...Array.from(new Set(posts.map(post => post.category)))];

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-b from-gray-950 to-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-6 text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>Blog & News</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay updated with our latest stories, project updates, and insights from the field
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-gray-800/50 border-gray-700 text-white"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              {posts.length === 0 ? 'No posts yet. Check back soon!' : 'No posts match your search.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-gray-800/50 border-gray-700/50"
                onClick={() => onSelectPost(post.id)}
              >
                {post.image && (
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  </div>
                  <div className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm mb-3">
                    {post.category}
                  </div>
                  <h3 className="text-xl mb-3 text-white">{post.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                  <button className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
