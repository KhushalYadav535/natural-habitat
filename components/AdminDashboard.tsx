import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Image, 
  MessageSquare, 
  Loader2,
  RefreshCw,
  AlertCircle,
  Info,
  Shield
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AdminDashboardProps {
  onClose: () => void;
  user: any;
}

interface PendingPhoto {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  userName: string;
  fileName: string;
  createdAt: string;
  status: string;
}

interface PendingTestimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  email: string;
  createdAt: string;
  status: string;
}

export default function AdminDashboard({ onClose, user }: AdminDashboardProps) {
  const [pendingPhotos, setPendingPhotos] = useState<PendingPhoto[]>([]);
  const [pendingTestimonials, setPendingTestimonials] = useState<PendingTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [moderating, setModerating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-05a33f34/admin/pending`, {
        headers: {
          'Authorization': `Bearer ${user.access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPendingPhotos(data.photos || []);
        setPendingTestimonials(data.testimonials || []);
        toast.success(`Loaded ${(data.photos?.length || 0) + (data.testimonials?.length || 0)} pending items`);
      } else {
        const error = await response.json();
        const errorMessage = `Failed to fetch pending items: ${error.error}`;
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = 'An error occurred while fetching pending items';
      setError(errorMessage);
      console.error('Error fetching pending items:', error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const moderateItem = async (itemId: string, action: 'approve' | 'reject') => {
    try {
      setModerating(itemId);
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-05a33f34/admin/moderate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access_token}`,
        },
        body: JSON.stringify({
          id: itemId,
          action
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`Item ${action}d successfully`);
        // Remove the item from pending lists
        setPendingPhotos(prev => prev.filter(photo => photo.id !== itemId));
        setPendingTestimonials(prev => prev.filter(testimonial => testimonial.id !== itemId));
      } else {
        toast.error(`Failed to ${action} item: ${result.error}`);
      }
    } catch (error) {
      console.error(`Error ${action}ing item:`, error);
      toast.error(`An error occurred while ${action}ing the item`);
    } finally {
      setModerating(null);
    }
  };

  useEffect(() => {
    fetchPendingItems();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const totalPending = pendingPhotos.length + pendingTestimonials.length;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>Quick Admin Dashboard</span>
              {totalPending > 0 && (
                <Badge className="bg-red-100 text-red-800">
                  {totalPending} pending
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchPendingItems}
              disabled={loading}
              className="ml-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchPendingItems}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        )}

        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="photos" className="flex items-center space-x-2">
              <Image className="h-4 w-4" />
              <span>Photos ({pendingPhotos.length})</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Testimonials ({pendingTestimonials.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="space-y-4 mt-6">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              </div>
            ) : pendingPhotos.length === 0 ? (
              <div className="text-center py-8">
                <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Photos</h3>
                <p className="text-gray-500">All photos have been reviewed and processed.</p>
              </div>
            ) : (
              pendingPhotos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg text-green-800 font-semibold">{photo.title}</h3>
                        <p className="text-sm text-gray-500">
                          by {photo.userName} • {formatDate(photo.createdAt)}
                        </p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-gray-600">Category:</span>
                          <Badge variant="outline" className="ml-2 capitalize">
                            {photo.category}
                          </Badge>
                        </div>
                        {photo.location && (
                          <div>
                            <span className="text-sm text-gray-600">Location:</span>
                            <span className="ml-2">{photo.location}</span>
                          </div>
                        )}
                        {photo.description && (
                          <div>
                            <span className="text-sm text-gray-600 block">Description:</span>
                            <p className="text-sm mt-1 text-gray-700">{photo.description}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-center">
                        <div className="text-center">
                          <div className="w-48 h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                            <Image className="h-8 w-8 text-gray-400" />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {photo.fileName}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moderateItem(photo.id, 'reject')}
                        disabled={moderating === photo.id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        {moderating === photo.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                        <span className="ml-1">Reject</span>
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => moderateItem(photo.id, 'approve')}
                        disabled={moderating === photo.id}
                        className="btn btn-green"
                      >
                        {moderating === photo.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                        <span className="ml-1">Approve</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-4 mt-6">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              </div>
            ) : pendingTestimonials.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Testimonials</h3>
                <p className="text-gray-500">All testimonials have been reviewed and processed.</p>
              </div>
            ) : (
              pendingTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg text-green-800 font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">
                          {testimonial.role} • {formatDate(testimonial.createdAt)}
                        </p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-1 mb-2">
                      {renderStars(testimonial.rating)}
                      <span className="text-sm text-gray-600 ml-2">
                        ({testimonial.rating}/5)
                      </span>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500">
                      <p className="text-gray-700 italic">"{testimonial.text}"</p>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <span>Contact: {testimonial.email}</span>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moderateItem(testimonial.id, 'reject')}
                        disabled={moderating === testimonial.id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        {moderating === testimonial.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                        <span className="ml-1">Reject</span>
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => moderateItem(testimonial.id, 'approve')}
                        disabled={moderating === testimonial.id}
                        className="btn btn-green"
                      >
                        {moderating === testimonial.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                        <span className="ml-1">Approve</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>

        {totalPending === 0 && !loading && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800 text-sm">All items have been processed! Great job!</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}