import React, { useState } from 'react';
import PhotoGallery from '../../components/PhotoGallery';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { 
  Camera, 
  Heart, 
  Download, 
  Share2, 
  Filter, 
  Grid, 
  List,
  Search,
  Star,
  Eye,
  Calendar,
  User
} from 'lucide-react';

export default function Gallery() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
            alt="Wild Haven Reserve - Photo Gallery"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Photo Gallery
          </h1>
          <p className="hero-subtitle">
            Discover the breathtaking beauty of nature through our curated collection of wildlife and landscape photography
          </p>
          
          <div className="hero-actions">
            <Button 
              onClick={scrollToGallery}
              className="btn btn-green"
            >
              <Camera className="mr-2 h-5 w-5" />
              Explore Photos
            </Button>
            <Button 
              variant="outline" 
              className="btn btn-outline"
              onClick={() => window.location.href = '/contact'}
            >
              <Heart className="mr-2 h-5 w-5" />
              Submit Photos
            </Button>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">2,000+</div>
              <div className="hero-stat-label">Photos Captured</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">500+</div>
              <div className="hero-stat-label">Species Documented</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">50+</div>
              <div className="hero-stat-label">Contributors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Features Section */}
      <section className="section section-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Gallery Features</h2>
            <p className="section-description">
              Explore our comprehensive collection with advanced filtering and viewing options
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Filter className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Smart Filtering</h3>
                <p className="text-gray-600">
                  Filter photos by category, date, photographer, and more to find exactly what you're looking for.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">High Resolution</h3>
                <p className="text-gray-600">
                  All photos are available in high resolution for personal use and educational purposes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Share2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Easy Sharing</h3>
                <p className="text-gray-600">
                  Share your favorite photos with friends and family through social media and direct links.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Controls Section */}
      <section className="section bg-gray-50">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
            <div className="mb-4 lg:mb-0">
              <h2 className="text-2xl font-bold text-gray-800">Photo Collection</h2>
              <p className="text-gray-600">Browse through our extensive collection of nature photography</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section id="gallery" className="section section-white">
        <div className="section-container">
          <PhotoGallery />
        </div>
      </section>

      {/* Gallery Categories Showcase */}
      <section className="section bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Explore Categories</h2>
            <p className="section-description">
              Discover different aspects of nature through our specialized photo collections
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"
                    alt="Flora Collection"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">Flora</h3>
                    <p className="text-sm text-gray-200">Plants & Flowers</p>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                    150+ Photos
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop"
                    alt="Fauna Collection"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">Fauna</h3>
                    <p className="text-sm text-gray-200">Wildlife & Animals</p>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                    300+ Photos
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
                    alt="Landscape Collection"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">Landscapes</h3>
                    <p className="text-sm text-gray-200">Scenic Views</p>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                    200+ Photos
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop"
                    alt="Macro Collection"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">Macro</h3>
                    <p className="text-sm text-gray-200">Close-up Details</p>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                    100+ Photos
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Photographers */}
      <section className="section section-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Featured Photographers</h2>
            <p className="section-description">
              Meet the talented photographers who capture the beauty of Wild Haven Reserve
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="Dr. Sarah Johnson"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">Dr. Sarah Johnson</h3>
                <p className="text-green-600 mb-3">Wildlife Specialist</p>
                <div className="flex items-center justify-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Specializes in capturing rare wildlife moments and behavioral studies.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Camera className="w-4 h-4 mr-1" />
                    150 Photos
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    2.5K Views
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                    alt="Michael Chen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">Michael Chen</h3>
                <p className="text-green-600 mb-3">Landscape Artist</p>
                <div className="flex items-center justify-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Expert in capturing the changing seasons and dramatic landscapes.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Camera className="w-4 h-4 mr-1" />
                    200 Photos
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    3.1K Views
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                    alt="Emily Rodriguez"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">Emily Rodriguez</h3>
                <p className="text-green-600 mb-3">Macro Specialist</p>
                <div className="flex items-center justify-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Master of close-up photography, revealing nature's hidden details.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Camera className="w-4 h-4 mr-1" />
                    120 Photos
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    1.8K Views
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-green-600 text-white">
        <div className="section-container text-center">
          <h2 className="section-title text-white mb-6">Share Your Photos</h2>
          <p className="section-description text-green-100 mb-8 max-w-2xl mx-auto">
            Have amazing nature photos to share? Join our community of photographers and contribute to our growing collection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/contact'}
              className="btn bg-white text-green-600 hover:bg-gray-100"
            >
              <Camera className="mr-2 h-5 w-5" />
              Submit Photos
            </Button>
            <Button 
              variant="outline" 
              className="btn btn-outline border-white text-white hover:bg-white hover:text-green-600"
              onClick={() => window.location.href = '/about'}
            >
              <User className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Free</div>
              <div className="text-green-100">Photo Submission</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Credit</div>
              <div className="text-green-100">Photographer Attribution</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Community</div>
              <div className="text-green-100">Join Our Network</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 