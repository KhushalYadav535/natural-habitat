import React, { useState } from 'react';
import { Leaf, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }, 1000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Brand Section */}
          <div className="footer-section">
            <div className="footer-brand">
              <div className="footer-brand-icon-wrapper">
                <Leaf className="footer-brand-icon" />
              </div>
              <span className="footer-brand-text">Wild Haven Reserve</span>
            </div>
            <p className="footer-description">
              Preserving nature's beauty and biodiversity for future generations. 
              Discover, explore, and connect with the wild.
            </p>
            <div className="footer-social-links">
              <Button 
                variant="ghost" 
                size="icon" 
                className="footer-social-btn"
                onClick={() => window.open('https://facebook.com', '_blank')}
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="footer-social-btn"
                onClick={() => window.open('https://instagram.com', '_blank')}
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="footer-social-btn"
                onClick={() => window.open('https://twitter.com', '_blank')}
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="footer-social-btn"
                onClick={() => window.open('https://youtube.com', '_blank')}
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links & Contact Combined */}
          <div className="footer-section">
            <h3 className="footer-section-title">Quick Links</h3>
            <ul className="footer-section-list">
              <li>
                <button 
                  onClick={() => scrollToSection('gallery')}
                  className="footer-link"
                  aria-label="View photo gallery"
                >
                  <span>Photo Gallery</span>
                  <ArrowRight className="footer-link-arrow" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('blog')}
                  className="footer-link"
                  aria-label="Read nature blog"
                >
                  <span>Nature Blog</span>
                  <ArrowRight className="footer-link-arrow" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contribute')}
                  className="footer-link"
                  aria-label="Contribute photos"
                >
                  <span>Contribute Photos</span>
                  <ArrowRight className="footer-link-arrow" />
                </button>
              </li>
              <li>
                <a href="#" className="footer-link" aria-label="Learn about conservation efforts">
                  <span>Conservation Efforts</span>
                  <ExternalLink className="footer-link-arrow" />
                </a>
              </li>
            </ul>
            
            <h3 className="footer-section-title" style={{ marginTop: '1.5rem' }}>Contact</h3>
            <div className="space-y-2">
              <div className="footer-contact-item">
                <div className="footer-contact-icon-wrapper">
                  <MapPin className="footer-contact-icon" />
                </div>
                <div className="footer-contact-info">
                  <span className="footer-contact-label">Address</span>
                  <span className="footer-contact-value">
                    4582 Wilderness Drive, Green Valley, CA 95945
                  </span>
                </div>
              </div>
              <div className="footer-contact-item">
                <div className="footer-contact-icon-wrapper">
                  <Phone className="footer-contact-icon" />
                </div>
                <div className="footer-contact-info">
                  <span className="footer-contact-label">Phone</span>
                  <a href="tel:+15551234567" className="footer-contact-value footer-contact-link">
                    (555) 123-WILD
                  </a>
                </div>
              </div>
              <div className="footer-contact-item">
                <div className="footer-contact-icon-wrapper">
                  <Mail className="footer-contact-icon" />
                </div>
                <div className="footer-contact-info">
                  <span className="footer-contact-label">Email</span>
                  <a href="mailto:info@wildhaven.reserve" className="footer-contact-value footer-contact-link">
                    info@wildhaven.reserve
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h3 className="footer-section-title">Stay Connected</h3>
            <div className="footer-newsletter">
              <p className="footer-description text-sm">
                Subscribe to our newsletter for wildlife updates and conservation news.
              </p>
              {isSubscribed ? (
                <div className="footer-newsletter-success">
                  <CheckCircle className="footer-success-icon" />
                  <span>Successfully subscribed!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="footer-newsletter-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address for newsletter subscription"
                  />
                  <Button 
                    type="submit" 
                    className="footer-newsletter-btn"
                    disabled={isLoading || !email}
                  >
                    {isLoading ? (
                      <div className="footer-loading-spinner" />
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="footer-btn-arrow" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2025 Wild Haven Reserve. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-bottom-link">
              Terms of Service
            </a>
            <a href="#" className="footer-bottom-link">
              Accessibility
            </a>
            <a href="#" className="footer-bottom-link">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}