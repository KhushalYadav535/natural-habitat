import React, { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, User, ArrowRight, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  author: string;
  createdAt: string;
  readTime: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Static fallback posts
  const fallbackPosts = [
    {
      id: 'fallback_1',
      title: "The Secret Life of Forest Mushrooms",
      excerpt: "Discover the fascinating world of fungi and their crucial role in forest ecosystems. From decomposition to symbiotic relationships...",
      content: "Mushrooms are the visible fruiting bodies of vast underground fungal networks...",
      category: "Ecology",
      imageUrl: "https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?w=600&h=400&fit=crop",
      author: "Dr. Sarah Martinez",
      createdAt: new Date(2025, 0, 15).toISOString(),
      readTime: "5 min read"
    },
    {
      id: 'fallback_2',
      title: "Migration Patterns of Wild Haven Birds",
      excerpt: "Follow the incredible journey of migratory birds through our reserve. Learn about their navigation systems and seasonal patterns...",
      content: "Every spring and fall, Wild Haven Reserve becomes a crucial stopover point...",
      category: "Wildlife",
      imageUrl: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=600&h=400&fit=crop",
      author: "Mike Thompson",
      createdAt: new Date(2025, 0, 10).toISOString(),
      readTime: "7 min read"
    },
    {
      id: 'fallback_3',
      title: "Night Photography Tips in the Wild",
      excerpt: "Master the art of capturing nocturnal wildlife. Equipment recommendations, techniques, and safety considerations for night shoots...",
      content: "Photographing wildlife at night presents unique challenges...",
      category: "Photography",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      author: "Lisa Chen",
      createdAt: new Date(2025, 0, 5).toISOString(),
      readTime: "6 min read"
    }
  ];

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-05a33f34/blog/posts`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Combine backend posts with fallback posts
        const combinedPosts = [...data, ...fallbackPosts];
        setPosts(combinedPosts.slice(0, 6)); // Show max 6 posts
      } else {
        console.error('Failed to fetch blog posts, using fallback');
        setPosts(fallbackPosts);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setPosts(fallbackPosts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section id="blog" className="blog">
        <div className="container">
          <div className="section-container">
            <Badge className="mb-4 badge-green">Latest Stories</Badge>
            <h2 className="section-title">Nature Blog</h2>
            <p className="section-description">
              Dive deeper into the natural world with insights from our researchers, 
              photographers, and wildlife experts.
            </p>
          </div>
          
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="blog">
      <div className="container">
        <div className="section-container">
          <Badge className="mb-4 badge-green">Latest Stories</Badge>
          <h2 className="section-title">Nature Blog</h2>
          <p className="section-description">
            Dive deeper into the natural world with insights from our researchers, 
            photographers, and wildlife experts.
          </p>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <Card key={post.id} className="blog-item">
              <div className="relative">
                <ImageWithFallback
                  src={post.imageUrl}
                  alt={post.title}
                  className="blog-image"
                />
                <Badge className="absolute top-4 left-4 bg-green-600 text-white">
                  {post.category}
                </Badge>
              </div>
              
              <CardHeader className="pb-4">
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                  <Button variant="ghost" className="text-green-600 hover:text-green-800 p-0">
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="btn btn-green">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}