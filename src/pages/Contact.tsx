import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Users, 
  Heart,
  ArrowRight,
  CheckCircle,
  Star,
  MessageSquare,
  FileText,
  Camera
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [selectedTopic, setSelectedTopic] = useState('general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactTopics = [
    { id: 'general', name: 'General Inquiry', icon: MessageCircle },
    { id: 'visit', name: 'Plan a Visit', icon: MapPin },
    { id: 'volunteer', name: 'Volunteer', icon: Heart },
    { id: 'photography', name: 'Photography', icon: Camera },
    { id: 'research', name: 'Research', icon: FileText },
    { id: 'partnership', name: 'Partnership', icon: Users }
  ];

  const faqs = [
    {
      question: "What are your visiting hours?",
      answer: "We're open daily from 8:00 AM to 6:00 PM. Special guided tours are available on weekends and holidays."
    },
    {
      question: "Do I need to book in advance?",
      answer: "While walk-ins are welcome, we recommend booking guided tours in advance, especially during peak seasons."
    },
    {
      question: "Can I bring my camera?",
      answer: "Absolutely! Photography is encouraged. We offer photography workshops and special access for photographers."
    },
    {
      question: "Are there volunteer opportunities?",
      answer: "Yes! We have various volunteer programs including trail maintenance, wildlife monitoring, and educational outreach."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
            alt="Wild Haven Reserve - Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Get In Touch
          </h1>
          <p className="hero-subtitle">
            Have questions about visiting, volunteering, or contributing? We'd love to hear from you and help you connect with nature.
          </p>
          
          <div className="hero-actions">
            <Button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-green"
            >
              <Send className="mr-2 h-5 w-5" />
              Send Message
            </Button>
            <Button 
              variant="outline" 
              className="btn btn-outline"
              onClick={() => window.location.href = '/location'}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Visit Us
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Topics Section */}
      <section className="section section-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">How Can We Help?</h2>
            <p className="section-description">
              Choose a topic that best describes your inquiry, and we'll connect you with the right team member
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {contactTopics.map((topic) => {
              const IconComponent = topic.icon;
              return (
                <Card 
                  key={topic.id} 
                  className={`card cursor-pointer transition-all duration-300 ${
                    selectedTopic === topic.id 
                      ? 'ring-2 ring-green-500 bg-green-50' 
                      : 'hover:shadow-lg hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedTopic(topic.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      selectedTopic === topic.id ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        selectedTopic === topic.id ? 'text-green-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <h3 className={`text-sm font-medium ${
                      selectedTopic === topic.id ? 'text-green-600' : 'text-gray-700'
                    }`}>
                      {topic.name}
                    </h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="section bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Contact Information</h2>
            <p className="section-description">
              Reach out to us through any of these channels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Email Us</h3>
                <p className="text-gray-600 mb-4">
                  Send us a detailed message and we'll get back to you within 24 hours.
                </p>
                <div className="space-y-2">
                  <div className="font-medium">info@wildhaven.com</div>
                  <div className="text-sm text-gray-500">General inquiries</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Call Us</h3>
                <p className="text-gray-600 mb-4">
                  Speak directly with our team during business hours.
                </p>
                <div className="space-y-2">
                  <div className="font-medium">+1 (555) 123-4567</div>
                  <div className="text-sm text-gray-500">Mon-Fri 9AM-6PM</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
                <p className="text-gray-600 mb-4">
                  Come explore our beautiful reserve and meet our team in person.
                </p>
                <div className="space-y-2">
                  <div className="font-medium">123 Nature Way</div>
                  <div className="text-sm text-gray-500">Conservation City, CC 12345</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="section section-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <Badge className="badge badge-green mb-4">Contact Form</Badge>
                <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible. 
                  We typically respond within 24 hours.
                </p>
              </div>
              
              <Card className="card">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="mt-2"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-2"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="subject" className="text-sm font-medium">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="mt-2"
                        placeholder="What's this about?"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-sm font-medium">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        required
                        className="mt-2"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>
                    
                    <Button type="submit" className="btn btn-green w-full">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Details */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                <p className="text-gray-600">
                  We're here to help you connect with nature and answer any questions you might have.
                </p>
              </div>
              
              <div className="space-y-6">
                <Card className="card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Office Hours</h3>
                        <div className="space-y-1 text-gray-600">
                          <div>Monday - Friday: 9:00 AM - 6:00 PM</div>
                          <div>Saturday: 10:00 AM - 4:00 PM</div>
                          <div>Sunday: Closed</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Address</h3>
                        <div className="text-gray-600">
                          <div>123 Nature Way</div>
                          <div>Conservation City, CC 12345</div>
                          <div>United States</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Response Time</h3>
                        <div className="text-gray-600">
                          <div>We typically respond within 24 hours</div>
                          <div>Emergency inquiries: Within 2 hours</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-description">
              Find quick answers to common questions about visiting and getting involved
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="card hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3 text-lg">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button className="btn btn-green">
              View All FAQs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-green-600 text-white">
        <div className="section-container text-center">
          <h2 className="section-title text-white mb-6">Ready to Get Started?</h2>
          <p className="section-description text-green-100 mb-8 max-w-2xl mx-auto">
            Whether you want to visit, volunteer, or contribute to our conservation efforts, 
            we're here to help you make a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/location'}
              className="btn bg-white text-green-600 hover:bg-gray-100"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Plan Your Visit
            </Button>
            <Button 
              variant="outline" 
              className="btn btn-outline border-white text-white hover:bg-white hover:text-green-600"
              onClick={() => window.location.href = '/about'}
            >
              <Heart className="mr-2 h-5 w-5" />
              Learn About Us
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-green-100">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-green-100">Response Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24h</div>
              <div className="text-green-100">Response Time</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 