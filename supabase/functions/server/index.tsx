import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { Hono } from "npm:hono"
import { cors } from "npm:hono/cors"
import { logger } from "npm:hono/logger"
import * as kv from './kv_store.tsx'

const app = new Hono()

app.use('*', cors({
  origin: ['*'],
  credentials: true,
}))

app.use('*', logger(console.log))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Create storage buckets on startup
const initializeBuckets = async () => {
  try {
    const buckets = ['make-05a33f34-photos', 'make-05a33f34-blog-images']
    
    for (const bucketName of buckets) {
      const { data: existingBuckets } = await supabase.storage.listBuckets()
      const bucketExists = existingBuckets?.some(bucket => bucket.name === bucketName)
      
      if (!bucketExists) {
        console.log(`Creating bucket: ${bucketName}`)
        await supabase.storage.createBucket(bucketName, { public: false })
      }
    }
  } catch (error) {
    console.error('Error initializing buckets:', error)
  }
}

await initializeBuckets()

// Authentication middleware
const requireAuth = async (c: any, next: any) => {
  const accessToken = c.req.header('Authorization')?.split(' ')[1]
  if (!accessToken) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  const { data: { user }, error } = await supabase.auth.getUser(accessToken)
  if (error || !user) {
    return c.json({ error: 'Invalid token' }, 401)
  }
  
  c.set('user', user)
  await next()
}

// User registration
app.post('/make-server-05a33f34/auth/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json()
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true // Auto-confirm since email server isn't configured
    })
    
    if (error) {
      console.error('Signup error:', error)
      return c.json({ error: error.message }, 400)
    }
    
    return c.json({ message: 'User created successfully', user: data.user })
  } catch (error) {
    console.error('Signup error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Photo submissions
app.post('/make-server-05a33f34/photos/submit', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const { title, description, category, location, fileData, fileName } = await c.req.json()
    
    // Generate unique filename
    const uniqueFileName = `${Date.now()}-${fileName}`
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('make-05a33f34-photos')
      .upload(uniqueFileName, fileData, {
        contentType: 'image/jpeg',
        cacheControl: '3600',
        upsert: false
      })
    
    if (uploadError) {
      console.error('Upload error:', uploadError)
      return c.json({ error: 'Failed to upload photo' }, 500)
    }
    
    // Save submission data to KV store
    const submissionId = `photo_${Date.now()}`
    const submissionData = {
      id: submissionId,
      userId: user.id,
      userName: user.user_metadata.name || user.email,
      title,
      description,
      category,
      location,
      fileName: uniqueFileName,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    
    await kv.set(submissionId, submissionData)
    
    return c.json({ 
      message: 'Photo submitted successfully', 
      submissionId,
      status: 'pending'
    })
  } catch (error) {
    console.error('Photo submission error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Get approved photos for gallery
app.get('/make-server-05a33f34/photos/gallery', async (c) => {
  try {
    const category = c.req.query('category')
    const allPhotos = await kv.getByPrefix('photo_')
    
    let approvedPhotos = allPhotos
      .filter(photo => photo.status === 'approved')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    if (category && category !== 'all') {
      approvedPhotos = approvedPhotos.filter(photo => photo.category === category)
    }
    
    // Get signed URLs for photos
    const photosWithUrls = await Promise.all(
      approvedPhotos.map(async (photo) => {
        const { data: signedUrl } = await supabase.storage
          .from('make-05a33f34-photos')
          .createSignedUrl(photo.fileName, 3600)
        
        return {
          ...photo,
          imageUrl: signedUrl?.signedUrl || ''
        }
      })
    )
    
    return c.json(photosWithUrls)
  } catch (error) {
    console.error('Gallery fetch error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Blog posts
app.get('/make-server-05a33f34/blog/posts', async (c) => {
  try {
    const posts = await kv.getByPrefix('blog_')
    const sortedPosts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return c.json(sortedPosts)
  } catch (error) {
    console.error('Blog posts fetch error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Create blog post (admin only)
app.post('/make-server-05a33f34/blog/posts', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const { title, excerpt, content, category, imageUrl } = await c.req.json()
    
    // Simple admin check - in production, you'd have proper role management
    if (!user.email.includes('admin')) {
      return c.json({ error: 'Unauthorized' }, 403)
    }
    
    const postId = `blog_${Date.now()}`
    const postData = {
      id: postId,
      title,
      excerpt,
      content,
      category,
      imageUrl,
      author: user.user_metadata.name || user.email,
      createdAt: new Date().toISOString(),
      readTime: Math.ceil(content.split(' ').length / 200) + ' min read'
    }
    
    await kv.set(postId, postData)
    
    return c.json({ message: 'Blog post created successfully', post: postData })
  } catch (error) {
    console.error('Blog post creation error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Testimonials
app.get('/make-server-05a33f34/testimonials', async (c) => {
  try {
    const testimonials = await kv.getByPrefix('testimonial_')
    const approvedTestimonials = testimonials
      .filter(testimonial => testimonial.status === 'approved')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return c.json(approvedTestimonials)
  } catch (error) {
    console.error('Testimonials fetch error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Submit testimonial
app.post('/make-server-05a33f34/testimonials', async (c) => {
  try {
    const { name, role, rating, text, email } = await c.req.json()
    
    const testimonialId = `testimonial_${Date.now()}`
    const testimonialData = {
      id: testimonialId,
      name,
      role,
      rating,
      text,
      email,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    
    await kv.set(testimonialId, testimonialData)
    
    return c.json({ message: 'Testimonial submitted successfully' })
  } catch (error) {
    console.error('Testimonial submission error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Admin: Get pending submissions
app.get('/make-server-05a33f34/admin/pending', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    
    // Simple admin check
    if (!user.email.includes('admin')) {
      return c.json({ error: 'Unauthorized' }, 403)
    }
    
    const pendingPhotos = await kv.getByPrefix('photo_')
    const pendingTestimonials = await kv.getByPrefix('testimonial_')
    
    return c.json({
      photos: pendingPhotos.filter(p => p.status === 'pending'),
      testimonials: pendingTestimonials.filter(t => t.status === 'pending')
    })
  } catch (error) {
    console.error('Admin pending fetch error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Admin: Approve/reject submission
app.post('/make-server-05a33f34/admin/moderate', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const { id, action } = await c.req.json()
    
    if (!user.email.includes('admin')) {
      return c.json({ error: 'Unauthorized' }, 403)
    }
    
    const item = await kv.get(id)
    if (!item) {
      return c.json({ error: 'Item not found' }, 404)
    }
    
    const updatedItem = {
      ...item,
      status: action === 'approve' ? 'approved' : 'rejected',
      moderatedAt: new Date().toISOString(),
      moderatedBy: user.email
    }
    
    await kv.set(id, updatedItem)
    
    return c.json({ message: `Item ${action}d successfully` })
  } catch (error) {
    console.error('Admin moderation error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Seed initial data
app.post('/make-server-05a33f34/seed', async (c) => {
  try {
    // Seed blog posts
    const blogPosts = [
      {
        id: 'blog_1',
        title: "The Secret Life of Forest Mushrooms",
        excerpt: "Discover the fascinating world of fungi and their crucial role in forest ecosystems. From decomposition to symbiotic relationships...",
        content: "Mushrooms are the visible fruiting bodies of vast underground fungal networks that form the backbone of forest ecosystems...",
        category: "Ecology",
        imageUrl: "https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?w=600&h=400&fit=crop",
        author: "Dr. Sarah Martinez",
        createdAt: new Date(2025, 0, 15).toISOString(),
        readTime: "5 min read"
      },
      {
        id: 'blog_2',
        title: "Migration Patterns of Wild Haven Birds",
        excerpt: "Follow the incredible journey of migratory birds through our reserve. Learn about their navigation systems and seasonal patterns...",
        content: "Every spring and fall, Wild Haven Reserve becomes a crucial stopover point for thousands of migratory birds...",
        category: "Wildlife",
        imageUrl: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=600&h=400&fit=crop",
        author: "Mike Thompson",
        createdAt: new Date(2025, 0, 10).toISOString(),
        readTime: "7 min read"
      },
      {
        id: 'blog_3',
        title: "Night Photography Tips in the Wild",
        excerpt: "Master the art of capturing nocturnal wildlife. Equipment recommendations, techniques, and safety considerations for night shoots...",
        content: "Photographing wildlife at night presents unique challenges and incredible opportunities...",
        category: "Photography",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
        author: "Lisa Chen",
        createdAt: new Date(2025, 0, 5).toISOString(),
        readTime: "6 min read"
      }
    ]
    
    // Seed testimonials
    const testimonials = [
      {
        id: 'testimonial_1',
        name: "Emily Rodriguez",
        role: "Nature Photographer",
        rating: 5,
        text: "Wild Haven Reserve is a photographer's paradise. The diversity of wildlife and pristine landscapes provide endless opportunities for capturing stunning images.",
        email: "emily@example.com",
        status: "approved",
        createdAt: new Date(2025, 0, 1).toISOString()
      },
      {
        id: 'testimonial_2',
        name: "Dr. James Wilson",
        role: "Marine Biologist",
        rating: 5,
        text: "As a researcher, I've visited many natural reserves, but Wild Haven stands out for its commitment to preservation and education.",
        email: "james@example.com",
        status: "approved",
        createdAt: new Date(2025, 0, 2).toISOString()
      }
    ]
    
    // Save to KV store
    for (const post of blogPosts) {
      await kv.set(post.id, post)
    }
    
    for (const testimonial of testimonials) {
      await kv.set(testimonial.id, testimonial)
    }
    
    return c.json({ message: 'Seed data created successfully' })
  } catch (error) {
    console.error('Seed error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

serve(app.fetch)