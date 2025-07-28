import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Upload, Camera, CheckCircle, Loader2, User } from 'lucide-react';
import { toast } from 'sonner';
import supabase from '../utils/supabase/client';

interface UserContributionProps {
  user: any;
  onShowAuth: () => void;
}

export default function UserContribution({ user, onShowAuth }: UserContributionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      
      setSelectedFile(file);
      toast.success('Photo selected successfully!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to submit photos');
      onShowAuth();
      return;
    }

    if (!selectedFile) {
      toast.error('Please select a photo to upload');
      return;
    }

    setIsLoading(true);

    try {
      // Convert file to base64 for API transmission
      const fileBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Please sign in again');
        onShowAuth();
        return;
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-05a33f34/photos/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          location: formData.location,
          fileData: fileBase64,
          fileName: selectedFile.name,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(`Submission failed: ${result.error}`);
        return;
      }

      setIsSubmitted(true);
      toast.success('Photo submitted successfully! Our team will review it soon.');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          title: '',
          description: '',
          category: '',
          location: ''
        });
        setSelectedFile(null);
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <section id="contribute" className="section section-white">
        <div className="container">
          <div className="section-container">
            <Badge className="mb-4 badge-green">Share Your Experience</Badge>
            <h2 className="section-title">Contribute Your Photos</h2>
            <p className="section-description">
              Share your amazing photos from Wild Haven Reserve with our community. 
              Sign in to submit your contributions.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-12 text-center">
                <User className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h3 className="text-green-800 mb-4">Sign In Required</h3>
                <p className="text-gray-600 mb-6">
                  To submit your nature photography, please sign in to your account or create a new one.
                </p>
                <Button 
                  onClick={onShowAuth}
                  className="btn btn-green"
                >
                  Sign In to Contribute
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (isSubmitted) {
    return (
      <section id="contribute" className="section section-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-green-200">
              <CardContent className="p-12">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h3 className="text-green-800 mb-4">Submission Received!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for sharing your nature photography with us. Our team will review your submission 
                  and get back to you within 2-3 business days.
                </p>
                <div className="text-sm text-gray-500">
                  Redirecting back to the form in a few seconds...
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contribute" className="section section-white">
      <div className="container">
        <div className="section-container">
          <Badge className="mb-4 badge-green">Share Your Experience</Badge>
          <h2 className="section-title">Contribute Your Photos</h2>
          <p className="section-description">
            Have you captured something amazing at Wild Haven Reserve? Share your photos with our community 
            and help showcase the beauty of our natural habitat.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Camera className="h-6 w-6 text-green-600" />
                  <h3 className="text-green-800">Photo Submission Form</h3>
                </div>
                <div className="text-sm text-gray-600">
                  Welcome, {user.user_metadata?.name || user.email}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Photo Details */}
                <div>
                  <Label htmlFor="category">Photo Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flora">Flora (Plants & Trees)</SelectItem>
                      <SelectItem value="fauna">Fauna (Wildlife & Animals)</SelectItem>
                      <SelectItem value="landscape">Landscape & Scenery</SelectItem>
                      <SelectItem value="macro">Macro Photography</SelectItem>
                      <SelectItem value="conservation">Conservation Activities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title">Photo Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Give your photo a descriptive title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Tell us about your photo - what species did you capture? What was the experience like?"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location within Reserve</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., North Trail, Eagle's Nest Viewpoint, etc."
                  />
                </div>

                {/* File Upload */}
                <div>
                  <Label>Upload Photo *</Label>
                  <div className="file-upload">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      {selectedFile ? `Selected: ${selectedFile.name}` : 'Drag and drop your photo here, or click to browse'}
                    </p>
                    <p className="text-sm text-gray-500">Supported formats: JPG, PNG, HEIC (Max 10MB)</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file-input"
                      id="file-upload"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                </div>

                {/* Guidelines */}
                <div className="guidelines">
                  <h4 className="guidelines-title">Submission Guidelines</h4>
                  <ul className="guidelines-list">
                    <li>• Photos must be taken within Wild Haven Reserve</li>
                    <li>• High-resolution images preferred (minimum 1920x1080)</li>
                    <li>• Respect wildlife - maintain safe distances</li>
                    <li>• We reserve the right to use submitted photos for promotional purposes</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full btn btn-green"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Photo
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}