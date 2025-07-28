import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Camera, MapPin, Users } from 'lucide-react';

export default function Hero() {
  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      {/* Background Image */}
      <div className="hero-background">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop"
          alt="Wild Haven Reserve - Pristine forest landscape"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          Wild Haven Reserve
        </h1>
        <p className="hero-subtitle">
          Discover the untouched beauty of nature through our stunning collection of flora and fauna photography
        </p>
        
        <div className="hero-actions">
          <Button 
            onClick={scrollToGallery}
            className="btn btn-green"
          >
            <Camera className="mr-2 h-5 w-5" />
            Explore Gallery
          </Button>
          <Button 
            variant="outline" 
            className="btn btn-outline"
            onClick={() => document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <MapPin className="mr-2 h-5 w-5" />
            Visit Location
          </Button>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">500+</div>
            <div className="hero-stat-label">Species Documented</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">2,000+</div>
            <div className="hero-stat-label">Photos Captured</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">50+</div>
            <div className="hero-stat-label">Contributors</div>
          </div>
        </div>
      </div>
    </section>
  );
}