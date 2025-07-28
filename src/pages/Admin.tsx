import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  Users, 
  Camera, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Home,
  Shield,
  BarChart3,
  FileText,
  Image,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  Lock,
  RefreshCw,
  Loader2,
  Eye,
  Plus,
  Edit,
  Trash2,
  Clock,
  Save
} from 'lucide-react';
import supabase from '../../utils/supabase/client';
import { projectId } from '../../utils/supabase/info';
import { toast } from 'sonner';

interface AdminProps {
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

export default function Admin({ user }: AdminProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPhotos: 0,
    totalTestimonials: 0,
    pendingApprovals: 0
  });
  const [pendingPhotos, setPendingPhotos] = useState<PendingPhoto[]>([]);
  const [pendingTestimonials, setPendingTestimonials] = useState<PendingTestimonial[]>([]);
  const [moderating, setModerating] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setIsLoading(false);
    if (user && user.email?.includes('admin')) {
      fetchStats();
      fetchPendingItems();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      // For now using mock data, but you can integrate real API calls here
      setStats({
        totalUsers: 150,
        totalPhotos: 2500,
        totalTestimonials: 85,
        pendingApprovals: pendingPhotos.length + pendingTestimonials.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchPendingItems = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-05a33f34/admin/pending`, {
        headers: {
          'Authorization': `Bearer ${user.access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPendingPhotos(data.photos || []);
        setPendingTestimonials(data.testimonials || []);
        // Update pending approvals count
        setStats(prev => ({
          ...prev,
          pendingApprovals: (data.photos?.length || 0) + (data.testimonials?.length || 0)
        }));
      } else {
        const error = await response.json();
        toast.error(`Failed to fetch pending items: ${error.error}`);
      }
    } catch (error) {
      console.error('Error fetching pending items:', error);
      toast.error('An error occurred while fetching pending items');
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
        // Update stats
        fetchStats();
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

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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

  // Show login prompt for non-admin users
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="card max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to access the admin panel. Please sign in with an admin account.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/')}
                className="btn btn-green w-full"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Home
              </Button>
              <p className="text-sm text-gray-500">
                Admin accounts must have "admin" in their email address
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show access denied for non-admin users
  if (!user.email?.includes('admin')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="card max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Access Required</h2>
            <p className="text-gray-600 mb-4">
              You are logged in as: <strong>{user.email}</strong>
            </p>
            <p className="text-gray-600 mb-6">
              Only users with "admin" in their email address can access this panel.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/')}
                className="btn btn-green w-full"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Home
              </Button>
              <Button 
                onClick={handleSignOut}
                variant="outline"
                className="w-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.user_metadata?.name || user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={fetchPendingItems}
                disabled={isLoading}
                className="flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Back to Site</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center space-x-2">
              <Image className="w-4 h-4" />
              <span>Photos ({pendingPhotos.length})</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Testimonials ({pendingTestimonials.length})</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Photos</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalPhotos}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Camera className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Testimonials</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalTestimonials}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                      <p className="text-3xl font-bold text-red-600">{stats.pendingApprovals}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card 
                className="card hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setActiveTab('photos')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Image className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Manage Photos</h3>
                      <p className="text-sm text-gray-600">{pendingPhotos.length} pending approval</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="card hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setActiveTab('testimonials')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Manage Testimonials</h3>
                      <p className="text-sm text-gray-600">{pendingTestimonials.length} pending approval</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">User Management</h3>
                      <p className="text-sm text-gray-600">Manage user accounts and permissions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Analytics</h3>
                      <p className="text-sm text-gray-600">View site statistics and reports</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Content Management</h3>
                      <p className="text-sm text-gray-600">Manage blog posts and pages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="card hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setActiveTab('settings')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Settings className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Settings</h3>
                      <p className="text-sm text-gray-600">Configure site settings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Photo approved</p>
                        <p className="text-sm text-gray-600">"Red Fox in Forest" by John Doe</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-gray-900">New testimonial pending</p>
                        <p className="text-sm text-gray-600">From Sarah Johnson</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">4 hours ago</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-gray-900">Photo rejected</p>
                        <p className="text-sm text-gray-600">"Blurry Landscape" by Mike Smith</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">6 hours ago</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">New user registered</p>
                        <p className="text-sm text-gray-600">emily@example.com</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Pending Photos</h2>
              <Button
                variant="outline"
                onClick={fetchPendingItems}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              </div>
            ) : pendingPhotos.length === 0 ? (
              <Card className="card">
                <CardContent className="p-8 text-center">
                  <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Photos</h3>
                  <p className="text-gray-600">All photos have been reviewed and processed.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingPhotos.map((photo) => (
                  <Card key={photo.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg text-green-800">{photo.title}</h3>
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
                              <p className="text-sm mt-1">{photo.description}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex justify-center">
                          <div className="text-center">
                            <div className="w-48 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
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
                          className="text-red-600 hover:text-red-700"
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
                ))}
              </div>
            )}
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Pending Testimonials</h2>
              <Button
                variant="outline"
                onClick={fetchPendingItems}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              </div>
            ) : pendingTestimonials.length === 0 ? (
              <Card className="card">
                <CardContent className="p-8 text-center">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Testimonials</h3>
                  <p className="text-gray-600">All testimonials have been reviewed and processed.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingTestimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg text-green-800">{testimonial.name}</h3>
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
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
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
                          className="text-red-600 hover:text-red-700"
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
                ))}
              </div>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Site Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Site Name</label>
                    <input
                      type="text"
                      defaultValue="Natural Habitat Website"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Contact Email</label>
                    <input
                      type="email"
                      defaultValue="admin@naturalhabitat.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <Button className="btn btn-green w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Security</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Max Login Attempts</label>
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <Button className="btn btn-green w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Update Security
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
} 