import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Clock, Phone, Mail, Car, Camera, Users, Navigation, Calendar } from 'lucide-react';

export default function LocationMap() {
  return (
    <section id="location" className="location">
      <div className="container">
        <div className="section-container">
          <Badge className="mb-4 badge-green flex items-center gap-2">
            <Navigation className="h-4 w-4" />
            Visit Us
          </Badge>
          <h2 className="section-title">Find Wild Haven Reserve</h2>
          <p className="section-description">
            Located in the heart of the pristine wilderness, Wild Haven Reserve 
            offers easy access to nature's most spectacular displays.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <Card className="location-card overflow-hidden">
            <CardContent className="p-0">
              <div className="h-96 bg-gradient-to-br from-green-100 to-green-200 relative flex items-center justify-center">
                {/* Mock Map Interface */}
                <div className="absolute inset-4 bg-white rounded-lg shadow-inner overflow-hidden">
                  <div className="h-full relative bg-green-50">
                    {/* Map markers and paths */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-red-500 rounded-full p-2 shadow-lg animate-pulse">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    {/* Trail markers */}
                    <div className="absolute top-1/4 left-1/3">
                      <div className="bg-green-600 rounded-full w-3 h-3"></div>
                    </div>
                    <div className="absolute bottom-1/4 right-1/3">
                      <div className="bg-green-600 rounded-full w-3 h-3"></div>
                    </div>
                    <div className="absolute top-1/3 right-1/4">
                      <div className="bg-green-600 rounded-full w-3 h-3"></div>
                    </div>
                    
                    {/* Trail lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      <path
                        d="M 100 150 Q 200 100 300 150 T 500 150"
                        stroke="#22c55e"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  </div>
                  
                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <button className="bg-white shadow rounded p-2 hover:bg-gray-50">+</button>
                    <button className="bg-white shadow rounded p-2 hover:bg-gray-50">-</button>
                  </div>
                  
                  {/* Map Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/90 rounded p-2 text-xs">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Visitor Center</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span>Trail Points</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-4">
                  <Button className="location-action-btn location-action-btn-primary">
                    <Navigation className="h-4 w-4 mr-2" />
                    Open in Google Maps
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="location-card">
              <CardHeader className="location-card-header">
                <h3 className="location-card-title">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </h3>
              </CardHeader>
              <CardContent className="location-card-content">
                <div className="contact-item">
                  <div className="contact-icon">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="contact-info">
                    <div className="contact-label">Address</div>
                    <div className="contact-value">
                      4582 Wilderness Drive<br />
                      Green Valley, CA 95945<br />
                      United States
                    </div>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="contact-info">
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">(555) 123-WILD</div>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="contact-info">
                    <div className="contact-label">Email</div>
                    <div className="contact-value">info@wildhaven.reserve</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visiting Hours */}
            <Card className="location-card">
              <CardHeader className="location-card-header">
                <h3 className="location-card-title">
                  <Clock className="h-5 w-5" />
                  Visiting Hours
                </h3>
              </CardHeader>
              <CardContent className="location-card-content">
                <div className="visiting-hours">
                  <div className="visiting-hours-title">Daily Hours</div>
                  <div className="visiting-hours-time">6:00 AM - 8:00 PM</div>
                </div>
                
                <div className="visiting-tip">
                  <p className="visiting-tip-text">
                    🌅 Best wildlife viewing times are early morning (6-9 AM) and evening (6-8 PM)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Visitor Services */}
            <Card className="location-card">
              <CardHeader className="location-card-header">
                <h3 className="location-card-title">
                  <Users className="h-5 w-5" />
                  Visitor Services
                </h3>
              </CardHeader>
              <CardContent className="location-card-content">
                <div className="service-item">
                  <div className="service-icon">
                    <Car className="h-4 w-4" />
                  </div>
                  <span className="service-text">Free Parking Available</span>
                </div>
                <div className="service-item">
                  <div className="service-icon">
                    <Camera className="h-4 w-4" />
                  </div>
                  <span className="service-text">Photography Tours</span>
                </div>
                <div className="service-item">
                  <div className="service-icon">
                    <Users className="h-4 w-4" />
                  </div>
                  <span className="service-text">Guided Nature Walks</span>
                </div>
                <div className="service-item">
                  <div className="service-icon">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <span className="service-text">Educational Programs</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="location-actions">
          <div className="location-actions-grid">
            <Button className="location-action-btn location-action-btn-primary">
              <Phone className="h-4 w-4 mr-2" />
              Call for Reservations
            </Button>
            <Button variant="outline" className="location-action-btn location-action-btn-secondary">
              <Mail className="h-4 w-4 mr-2" />
              Send Email Inquiry
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}