import React from 'react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { 
  Heart, 
  Camera, 
  Users, 
  Leaf, 
  Shield, 
  Globe, 
  Award, 
  MapPin,
  Mail,
  Phone,
  Clock,
  Star
} from 'lucide-react';

export default function About() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
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
            alt="Wild Haven Reserve - About Us"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            About Wild Haven Reserve
          </h1>
          <p className="hero-subtitle">
            Preserving nature's beauty, one moment at a time. Discover our story, mission, and the passionate team behind Wild Haven Reserve.
          </p>
          
          <div className="hero-actions">
            <Button 
              onClick={scrollToContact}
              className="btn btn-green"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
            <Button 
              variant="outline" 
              className="btn btn-outline"
              onClick={() => document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Visit Us
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section section-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Mission & Values</h2>
            <p className="section-description">
              We are dedicated to preserving and showcasing the world's natural wonders while inspiring the next generation of conservationists.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Conservation</h3>
                <p className="text-gray-600">
                  Protecting natural habitats and biodiversity through sustainable practices and community engagement.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Documentation</h3>
                <p className="text-gray-600">
                  Capturing and preserving the beauty of nature through photography and storytelling.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Education</h3>
                <p className="text-gray-600">
                  Inspiring environmental awareness and fostering a deep connection with nature.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section bg-gray-50">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-left mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2010, Wild Haven Reserve began as a small community initiative to protect a local forest area. What started with just a few passionate nature enthusiasts has grown into a thriving conservation and education center.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Today, we manage over 500 acres of pristine wilderness, documenting thousands of species and welcoming visitors from around the world. Our commitment to preserving natural habitats while making them accessible for education and enjoyment remains at the heart of everything we do.
              </p>
              <div className="flex items-center space-x-4">
                <Badge className="badge badge-green">
                  <Award className="w-4 h-4 mr-2" />
                  Award Winning
                </Badge>
                <Badge className="badge badge-green">
                  <Shield className="w-4 h-4 mr-2" />
                  Certified Reserve
                </Badge>
              </div>
            </div>
            
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
                alt="Wild Haven Reserve History"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold text-green-600">13+</div>
                <div className="text-sm text-gray-600">Years of Conservation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section section-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-description">
              Passionate individuals dedicated to preserving and sharing the wonders of nature.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="Dr. Sarah Johnson"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Dr. Sarah Johnson</h3>
                <p className="text-green-600 mb-3">Director & Lead Biologist</p>
                <p className="text-gray-600 text-sm">
                  PhD in Wildlife Biology with 15+ years of conservation experience.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                    alt="Michael Chen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Michael Chen</h3>
                <p className="text-green-600 mb-3">Head Photographer</p>
                <p className="text-gray-600 text-sm">
                  Award-winning wildlife photographer with a passion for storytelling.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                    alt="Emily Rodriguez"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Emily Rodriguez</h3>
                <p className="text-green-600 mb-3">Education Coordinator</p>
                <p className="text-gray-600 text-sm">
                  Environmental educator dedicated to inspiring the next generation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section bg-green-600 text-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="section-title text-white">Our Impact</h2>
            <p className="section-description text-green-100">
              Numbers that tell the story of our commitment to nature conservation.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-100">Species Protected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-green-100">Visitors Annually</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-green-100">Research Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-green-100">Conservation Success</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section section-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">What We Do</h2>
            <p className="section-description">
              Our comprehensive approach to conservation and education.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Camera className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Wildlife Documentation</h3>
                  <p className="text-gray-600">
                    Comprehensive photography and research programs to document and study local wildlife populations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Educational Programs</h3>
                  <p className="text-gray-600">
                    Interactive workshops, guided tours, and educational materials for all age groups.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Community Engagement</h3>
                  <p className="text-gray-600">
                    Building partnerships with local communities and organizations for conservation efforts.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Habitat Restoration</h3>
                  <p className="text-gray-600">
                    Active restoration projects to rehabilitate damaged ecosystems and create wildlife corridors.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Conservation Research</h3>
                  <p className="text-gray-600">
                    Scientific research programs focused on biodiversity monitoring and species protection.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Visitor Experience</h3>
                  <p className="text-gray-600">
                    Creating memorable experiences that foster appreciation for nature and conservation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gray-50">
        <div className="section-container text-center">
          <h2 className="section-title mb-6">Join Our Mission</h2>
          <p className="section-description mb-8 max-w-2xl mx-auto">
            Whether you're a nature enthusiast, photographer, researcher, or simply someone who cares about our planet, there are many ways to get involved with Wild Haven Reserve.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToContact}
              className="btn btn-green"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
            <Button 
              variant="outline" 
              className="btn btn-outline"
              onClick={() => window.location.href = '/gallery'}
            >
              <Camera className="mr-2 h-5 w-5" />
              Explore Gallery
            </Button>
          </div>
          
          <div className="mt-12 p-6 bg-white rounded-lg shadow-sm max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-gray-600">info@wildhaven.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-gray-600">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium">Hours</div>
                  <div className="text-gray-600">Daily 8AM - 6PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 