import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface GallerySectionProps {
  accessToken: string;
}

export function GallerySection({ accessToken }: GallerySectionProps) {
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('');
  const [galleryImageUrl, setGalleryImageUrl] = useState('');

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-c6a73d4f`;

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch(`${serverUrl}/gallery/images`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      const data = await response.json();
      if (data.images) setGalleryImages(data.images);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    }
  };

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
      const data = await response.json();
      if (data.success) {
        alert('Image added!');
        setGalleryTitle('');
        setGalleryCategory('');
        setGalleryImageUrl('');
        fetchGalleryImages();
      }
    } catch (error) {
      alert('Error adding image');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Delete this image?')) return;
    try {
      const response = await fetch(`${serverUrl}/gallery/images/${imageId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const data = await response.json();
      if (data.success) {
        alert('Image deleted!');
        fetchGalleryImages();
      }
    } catch (error) {
      alert('Error deleting image');
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white">Upload Image</CardTitle>
          <CardDescription className="text-gray-400">Add images to gallery</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUploadImage} className="space-y-4">
            <div>
              <Label className="text-gray-300">Title</Label>
              <Input value={galleryTitle} onChange={(e) => setGalleryTitle(e.target.value)} required className="bg-gray-900/50 border-gray-700 text-white" />
            </div>
            <div>
              <Label className="text-gray-300">Category</Label>
              <Input value={galleryCategory} onChange={(e) => setGalleryCategory(e.target.value)} placeholder="e.g., Events, Projects" required className="bg-gray-900/50 border-gray-700 text-white" />
            </div>
            <div>
              <Label className="text-gray-300">Image URL</Label>
              <Input value={galleryImageUrl} onChange={(e) => setGalleryImageUrl(e.target.value)} placeholder="https://..." required className="bg-gray-900/50 border-gray-700 text-white" />
            </div>
            <Button type="submit" disabled={loading || !galleryImageUrl}><Plus className="w-4 h-4 mr-2" />Add Image</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white">Gallery Images ({galleryImages.length})</CardTitle>
          <CardDescription className="text-gray-400">Manage uploaded images</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
            {galleryImages.map((image) => (
              <div key={image.id} className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900/30">
                <ImageWithFallback src={image.url} alt={image.title} className="w-full h-32 object-cover" />
                <div className="p-3">
                  <div className="text-sm mb-1 text-white">{image.title}</div>
                  <div className="text-xs text-gray-400 mb-2">{image.category}</div>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteImage(image.id)} className="w-full text-red-600"><Trash2 className="w-3 h-3 mr-1" />Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
