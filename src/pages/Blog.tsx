import React, { useState } from 'react';
import Blog from '../../components/Blog';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { 
  BookOpen, 
  PenTool, 
  Users, 
  Calendar, 
  Clock, 
  ArrowRight,
  Search,
  Filter,
  TrendingUp,
  Heart,
  Share2,
  Eye
} from 'lucide-react';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const scrollToBlog = () => {
    const element = document.getElementById('blog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories = [
    { id: 'all', name: 'All Posts', count: 25 },
    { id: 'wildlife', name: 'Wildlife', count: 8 },
    { id: 'conservation', name: 'Conservation', count: 6 },
    { id: 'photography', name: 'Photography', count: 5 },
    { id: 'ecology', name: 'Ecology', count: 4 },
    { id: 'research', name: 'Research', count: 2 }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
            alt="Wild Haven Reserve - Blog"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Nature Blog
          </h1>
          <p className="hero-subtitle">
            Discover inspiring stories, conservation insights, and expert knowledge about the natural world
          </p>
          
          <div className="hero-actions">
            <Button 
              onClick={scrollToBlog}
              className="btn btn-green"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Read Articles
            </Button>
            <Button 
              variant="outline" 
              className="btn btn-outline"
              onClick={() => window.location.href = '/contact'}
            >
              <PenTool className="mr-2 h-5 w-5" />
              Write for Us
            </Button>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">100+</div>
              <div className="hero-stat-label">Articles Published</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">15+</div>
              <div className="hero-stat-label">Expert Writers</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">50K+</div>
              <div className="hero-stat-label">Monthly Readers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Features Section */}
      <section className="section section-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Read Our Blog?</h2>
            <p className="section-description">
              Get insights from experts, discover conservation stories, and learn about wildlife photography
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Expert Insights</h3>
                <p className="text-gray-600">
                  Articles written by wildlife biologists, conservationists, and professional photographers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Latest Research</h3>
                <p className="text-gray-600">
                  Stay updated with the latest conservation research and wildlife discoveries.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Conservation Stories</h3>
                <p className="text-gray-600">
                  Inspiring stories about conservation efforts and success stories from around the world.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Post Section */}
      <section className="section bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="section-title">Featured Article</h2>
            <p className="section-description">
              Our most popular and impactful story of the month
            </p>
          </div>
          
          <Card className="card hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
                  alt="Featured Article"
                  className="w-full h-full object-cover rounded-l-lg"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="badge badge-green">
                    Featured
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Jan 15, 2025
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      8 min read
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-8 flex flex-col justify-center">
                <Badge className="badge badge-green w-fit mb-4">Conservation</Badge>
                <h3 className="text-2xl font-bold mb-4">
                  The Return of the Bald Eagle: A Conservation Success Story
                </h3>
                <p className="text-gray-600 mb-6">
                  Discover how dedicated conservation efforts brought the bald eagle back from the brink of extinction. 
                  This remarkable story showcases the power of environmental protection and community involvement.
                </p>
                
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                      alt="Dr. Sarah Johnson"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">Dr. Sarah Johnson</div>
                    <div className="text-sm text-gray-500">Wildlife Biologist</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      2.5K views
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      156 likes
                    </span>
                  </div>
                  <Button className="btn btn-green">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Controls Section */}
      <section className="section section-white">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
            <div className="mb-4 lg:mb-0">
              <h2 className="text-2xl font-bold text-gray-800">Latest Articles</h2>
              <p className="text-gray-600">Explore our collection of nature and conservation articles</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Blog Section */}
      <section id="blog" className="section section-white">
        <div className="section-container">
          <Blog />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section bg-green-600 text-white">
        <div className="section-container text-center">
          <h2 className="section-title text-white mb-6">Stay Updated</h2>
          <p className="section-description text-green-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss the latest conservation stories, wildlife photography tips, and research updates.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
              />
              <Button className="btn bg-white text-green-600 hover:bg-gray-100 rounded-l-none">
                Subscribe
              </Button>
            </div>
            <p className="text-green-100 text-sm mt-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Weekly</div>
              <div className="text-green-100">Updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Exclusive</div>
              <div className="text-green-100">Content</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">No Spam</div>
              <div className="text-green-100">Ever</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 