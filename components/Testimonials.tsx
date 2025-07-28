import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, Quote, Loader2, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  email: string;
  status: string;
  createdAt: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Static fallback testimonials with avatar images
  const fallbackTestimonials = [
    {
      id: 'fallback_1',
      name: "Emily Rodriguez",
      role: "Nature Photographer",
      rating: 5,
      text: "Wild Haven Reserve is a photographer's paradise. The diversity of wildlife and pristine landscapes provide endless opportunities for capturing stunning images. The staff is incredibly knowledgeable and passionate about conservation.",
      email: "emily@example.com",
      status: "approved",
      createdAt: new Date().toISOString()
    },
    {
      id: 'fallback_2',
      name: "Dr. James Wilson",
      role: "Marine Biologist",
      rating: 5,
      text: "As a researcher, I've visited many natural reserves, but Wild Haven stands out for its commitment to preservation and education. The ecosystem here is remarkably intact and offers valuable insights into natural biodiversity.",
      email: "james@example.com",
      status: "approved",
      createdAt: new Date().toISOString()
    },
    {
      id: 'fallback_3',
      name: "Sarah Kim",
      role: "Family Visitor",
      rating: 5,
      text: "We brought our children here for a weekend getaway, and it exceeded all expectations. The guided tours were engaging, and seeing wildlife in their natural habitat was magical. Our kids are now passionate about nature conservation!",
      email: "sarah@example.com",
      status: "approved",
      createdAt: new Date().toISOString()
    },
    {
      id: 'fallback_4',
      name: "Michael Chen",
      role: "Wildlife Enthusiast",
      rating: 5,
      text: "The night tours at Wild Haven are absolutely incredible. Hearing the sounds of the forest at night and occasionally spotting nocturnal animals was an unforgettable experience. Highly recommend for any nature lover.",
      email: "michael@example.com",
      status: "approved",
      createdAt: new Date().toISOString()
    },
    {
      id: 'fallback_5',
      name: "Dr. Anna Thompson",
      role: "Botanist",
      rating: 5,
      text: "The flora diversity here is exceptional. I've identified several rare plant species during my visits. The reserve's commitment to habitat preservation is evident in the thriving ecosystem they maintain.",
      email: "anna@example.com",
      status: "approved",
      createdAt: new Date().toISOString()
    },
    {
      id: 'fallback_6',
      name: "Tom Anderson",
      role: "Adventure Guide",
      rating: 5,
      text: "Having led tours in various locations, I can confidently say Wild Haven offers one of the most authentic wilderness experiences. The trails are well-maintained while preserving the natural feel of the forest.",
      email: "tom@example.com",
      status: "approved",
      createdAt: new Date().toISOString()
    }
  ];

  const avatarImages = [
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
  ];

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-05a33f34/testimonials`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Combine backend testimonials with fallback testimonials
        const combinedTestimonials = [...data, ...fallbackTestimonials];
        setTestimonials(combinedTestimonials.slice(0, 6)); // Show max 6 testimonials
      } else {
        console.error('Failed to fetch testimonials, using fallback');
        setTestimonials(fallbackTestimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials(fallbackTestimonials);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`testimonial-star h-5 w-5 ${
          i < rating ? 'filled fill-current' : ''
        }`}
      />
    ));
  };

  const getAvatarImage = (index: number) => {
    return avatarImages[index % avatarImages.length];
  };

  if (loading) {
    return (
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="section-container">
            <Badge className="mb-4 badge-green flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Visitor Stories
            </Badge>
            <h2 className="section-title">What Our Visitors Say</h2>
            <p className="section-description">
              Hear from photographers, researchers, families, and nature enthusiasts 
              who have experienced the wonder of Wild Haven Reserve.
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
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-container">
          <Badge className="mb-4 badge-green flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Visitor Stories
          </Badge>
          <h2 className="section-title">What Our Visitors Say</h2>
          <p className="section-description">
            Hear from photographers, researchers, families, and nature enthusiasts 
            who have experienced the wonder of Wild Haven Reserve.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className="testimonial">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="testimonial-stars">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <p className="testimonial-text">{testimonial.text}</p>
                  
                  <div className="testimonial-author-info">
                    <ImageWithFallback
                      src={getAvatarImage(index)}
                      alt={testimonial.name}
                      className="testimonial-avatar"
                    />
                    <div>
                      <div className="testimonial-author">{testimonial.name}</div>
                      <div className="testimonial-role">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="btn btn-green group">
            <Heart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            Leave a Review
          </Button>
        </div>
      </div>
    </section>
  );
}