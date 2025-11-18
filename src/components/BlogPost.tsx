import { useState, useEffect } from 'react';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlogPostProps {
  postId: string | null;
  onNavigate: (page: string) => void;
}

export function BlogPost({ postId, onNavigate }: BlogPostProps) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-c6a73d4f`;

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${serverUrl}/blog/posts/${postId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      if (data.post) {
        setPost(data.post);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Post not found</p>
          <Button onClick={() => onNavigate('blog')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => onNavigate('blog')}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        <article>
          {post.image && (
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl mb-8">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full mb-4">
            {post.category}
          </div>

          <h1 className="text-5xl mb-6">{post.title}</h1>

          <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {post.author}
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph: string, index: number) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Button onClick={() => onNavigate('blog')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Posts
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
