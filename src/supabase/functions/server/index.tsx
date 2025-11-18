import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Initialize storage bucket for images
async function initializeBuckets() {
  const bucketName = 'make-c6a73d4f-gallery';
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
  
  if (!bucketExists) {
    await supabase.storage.createBucket(bucketName, { public: false });
    console.log('Created gallery bucket');
  }
}

initializeBuckets();

// Helper function to verify admin
async function verifyAdmin(request: Request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  
  if (!user?.id || error) {
    return null;
  }
  
  return user;
}

// ==================== AUTH ROUTES ====================

// Admin signup
app.post('/make-server-c6a73d4f/auth/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });
    
    if (error) {
      return c.json({ error: error.message }, 400);
    }
    
    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: 'Signup failed: ' + error.message }, 500);
  }
});

// ==================== BLOG ROUTES ====================

// Get all blog posts
app.get('/make-server-c6a73d4f/blog/posts', async (c) => {
  try {
    const posts = await kv.getByPrefix('blog:post:');
    const sortedPosts = posts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return c.json({ posts: sortedPosts });
  } catch (error) {
    console.log('Error fetching blog posts:', error);
    return c.json({ error: 'Failed to fetch blog posts: ' + error.message }, 500);
  }
});

// Get single blog post
app.get('/make-server-c6a73d4f/blog/posts/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const post = await kv.get(`blog:post:${id}`);
    
    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }
    
    // Increment view count
    const viewKey = `analytics:post-views:${id}`;
    const currentViews = (await kv.get(viewKey)) || 0;
    await kv.set(viewKey, currentViews + 1);
    
    return c.json({ post });
  } catch (error) {
    console.log('Error fetching blog post:', error);
    return c.json({ error: 'Failed to fetch blog post: ' + error.message }, 500);
  }
});

// Create blog post (admin only)
app.post('/make-server-c6a73d4f/blog/posts', async (c) => {
  try {
    const user = await verifyAdmin(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const { title, content, excerpt, category, image } = await c.req.json();
    const id = crypto.randomUUID();
    
    const post = {
      id,
      title,
      content,
      excerpt,
      category,
      image,
      author: user.user_metadata?.name || user.email,
      authorId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`blog:post:${id}`, post);
    
    return c.json({ success: true, post });
  } catch (error) {
    console.log('Error creating blog post:', error);
    return c.json({ error: 'Failed to create blog post: ' + error.message }, 500);
  }
});

// Update blog post (admin only)
app.put('/make-server-c6a73d4f/blog/posts/:id', async (c) => {
  try {
    const user = await verifyAdmin(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const id = c.req.param('id');
    const existingPost = await kv.get(`blog:post:${id}`);
    
    if (!existingPost) {
      return c.json({ error: 'Post not found' }, 404);
    }
    
    const updates = await c.req.json();
    const updatedPost = {
      ...existingPost,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`blog:post:${id}`, updatedPost);
    
    return c.json({ success: true, post: updatedPost });
  } catch (error) {
    console.log('Error updating blog post:', error);
    return c.json({ error: 'Failed to update blog post: ' + error.message }, 500);
  }
});

// Delete blog post (admin only)
app.delete('/make-server-c6a73d4f/blog/posts/:id', async (c) => {
  try {
    const user = await verifyAdmin(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const id = c.req.param('id');
    await kv.del(`blog:post:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting blog post:', error);
    return c.json({ error: 'Failed to delete blog post: ' + error.message }, 500);
  }
});

// ==================== GALLERY ROUTES ====================

// Get all gallery images
app.get('/make-server-c6a73d4f/gallery/images', async (c) => {
  try {
    const images = await kv.getByPrefix('gallery:image:');
    const sortedImages = images.sort((a, b) => 
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
    
    // Get signed URLs for all images
    const imagesWithUrls = await Promise.all(
      sortedImages.map(async (img) => {
        const { data } = await supabase.storage
          .from('make-c6a73d4f-gallery')
          .createSignedUrl(img.storagePath, 3600);
        
        return {
          ...img,
          url: data?.signedUrl || ''
        };
      })
    );
    
    return c.json({ images: imagesWithUrls });
  } catch (error) {
    console.log('Error fetching gallery images:', error);
    return c.json({ error: 'Failed to fetch gallery images: ' + error.message }, 500);
  }
});

// Upload image (admin only)
app.post('/make-server-c6a73d4f/gallery/upload', async (c) => {
  try {
    const user = await verifyAdmin(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }
    
    const id = crypto.randomUUID();
    const fileExt = file.name.split('.').pop();
    const storagePath = `${id}.${fileExt}`;
    
    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('make-c6a73d4f-gallery')
      .upload(storagePath, file, {
        contentType: file.type
      });
    
    if (uploadError) {
      console.log('Upload error:', uploadError);
      return c.json({ error: 'Failed to upload file: ' + uploadError.message }, 500);
    }
    
    // Save metadata to KV
    const imageData = {
      id,
      title,
      category,
      storagePath,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadedBy: user.id,
      uploadedAt: new Date().toISOString()
    };
    
    await kv.set(`gallery:image:${id}`, imageData);
    
    // Get signed URL
    const { data } = await supabase.storage
      .from('make-c6a73d4f-gallery')
      .createSignedUrl(storagePath, 3600);
    
    return c.json({ 
      success: true, 
      image: { ...imageData, url: data?.signedUrl || '' } 
    });
  } catch (error) {
    console.log('Error uploading image:', error);
    return c.json({ error: 'Failed to upload image: ' + error.message }, 500);
  }
});

// Delete image (admin only)
app.delete('/make-server-c6a73d4f/gallery/images/:id', async (c) => {
  try {
    const user = await verifyAdmin(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const id = c.req.param('id');
    const image = await kv.get(`gallery:image:${id}`);
    
    if (!image) {
      return c.json({ error: 'Image not found' }, 404);
    }
    
    // Delete from storage
    await supabase.storage
      .from('make-c6a73d4f-gallery')
      .remove([image.storagePath]);
    
    // Delete metadata
    await kv.del(`gallery:image:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting image:', error);
    return c.json({ error: 'Failed to delete image: ' + error.message }, 500);
  }
});

// ==================== ANALYTICS ROUTES ====================

// Track page view
app.post('/make-server-c6a73d4f/analytics/pageview', async (c) => {
  try {
    const { page } = await c.req.json();
    const viewKey = `analytics:page-views:${page}`;
    const currentViews = (await kv.get(viewKey)) || 0;
    await kv.set(viewKey, currentViews + 1);
    
    // Track total views
    const totalKey = 'analytics:total-views';
    const totalViews = (await kv.get(totalKey)) || 0;
    await kv.set(totalKey, totalViews + 1);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error tracking page view:', error);
    return c.json({ error: 'Failed to track page view: ' + error.message }, 500);
  }
});

// Get analytics (admin only)
app.get('/make-server-c6a73d4f/analytics', async (c) => {
  try {
    const user = await verifyAdmin(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const pageViews = await kv.getByPrefix('analytics:page-views:');
    const totalViews = (await kv.get('analytics:total-views')) || 0;
    const blogPosts = await kv.getByPrefix('blog:post:');
    const galleryImages = await kv.getByPrefix('gallery:image:');
    
    const analytics = {
      totalViews,
      pageViews,
      blogPostCount: blogPosts.length,
      galleryImageCount: galleryImages.length,
      recentPosts: blogPosts
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
    };
    
    return c.json({ analytics });
  } catch (error) {
    console.log('Error fetching analytics:', error);
    return c.json({ error: 'Failed to fetch analytics: ' + error.message }, 500);
  }
});

// ==================== CONTACT ROUTES ====================

// Submit contact form
app.post('/make-server-c6a73d4f/contact', async (c) => {
  try {
    const { name, email, subject, message } = await c.req.json();
    const id = crypto.randomUUID();
    
    const submission = {
      id,
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      read: false
    };
    
    await kv.set(`contact:submission:${id}`, submission);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error submitting contact form:', error);
    return c.json({ error: 'Failed to submit contact form: ' + error.message }, 500);
  }
});

// Get contact submissions (admin only)
app.get('/make-server-c6a73d4f/contact/submissions', async (c) => {
  try {
    const user = await verifyAdmin(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const submissions = await kv.getByPrefix('contact:submission:');
    const sortedSubmissions = submissions.sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    
    return c.json({ submissions: sortedSubmissions });
  } catch (error) {
    console.log('Error fetching contact submissions:', error);
    return c.json({ error: 'Failed to fetch contact submissions: ' + error.message }, 500);
  }
});

Deno.serve(app.fetch);
