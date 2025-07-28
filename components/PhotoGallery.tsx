import React, { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Loader2, RefreshCw } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Photo {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  userName: string;
  createdAt: string;
}

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Static fallback photos for better user experience
  const fallbackPhotos = [
    {
      id: 'fallback_1',
      title: 'Ancient Oak Tree',
      description: 'Majestic 200-year-old oak tree',
      category: 'flora',
      imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
      userName: 'Wild Haven Team',
      createdAt: new Date().toISOString()
    },
    {
      id: 'fallback_2',
      title: 'Red Fox',
      description: 'Curious red fox in natural habitat',
      category: 'fauna',
      imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop',
      userName: 'Wild Haven Team',
      createdAt: new Date().toISOString()
    },
    {
      id: 'fallback_3',
      title: 'Mountain Wildflowers',
      description: 'Colorful wildflower meadow in spring',
      category: 'flora',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
      userName: 'Wild Haven Team',
      createdAt: new Date().toISOString()
    },
    {
      id: 'fallback_4',
      title: 'Great Blue Heron',
      description: 'Patient heron fishing by the lake',
      category: 'fauna',
      imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop',
      userName: 'Wild Haven Team',
      createdAt: new Date().toISOString()
    },
    {
      id: 'fallback_5',
      title: 'Forest Ferns',
      description: 'Delicate ferns in the forest understory',
      category: 'flora',
      imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&h=400&fit=crop',
      userName: 'Wild Haven Team',
      createdAt: new Date().toISOString()
    },
    {
      id: 'fallback_6',
      title: 'Monarch Butterfly',
      description: 'Beautiful monarch during migration',
      category: 'fauna',
      imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&h=400&fit=crop',
      userName: 'Wild Haven Team',
      createdAt: new Date().toISOString()
    }
  ];

  const fetchPhotos = async (category: string = 'all') => {
    try {
      setLoading(true);
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-05a33f34/photos/gallery${category !== 'all' ? `?category=${category}` : ''}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Combine backend photos with fallback photos
        const combinedPhotos = [...data, ...fallbackPhotos];
        setPhotos(combinedPhotos);
      } else {
        console.error('Failed to fetch photos, using fallback');
        setPhotos(fallbackPhotos);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      setPhotos(fallbackPhotos);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredPhotos = photos.filter(photo => 
    selectedCategory === 'all' || photo.category === selectedCategory
  );

  const PhotoGrid = ({ photos }: { photos: Photo[] }) => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      );
    }

    if (photos.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No photos found for this category.</p>
          <Button onClick={() => fetchPhotos(selectedCategory)} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      );
    }

    return (
      <div className="gallery-grid">
        {photos.map((photo) => (
          <Card 
            key={photo.id} 
            className="gallery-item"
            onClick={() => setSelectedImage(photo.imageUrl)}
          >
            <CardContent className="p-0">
              <div className="relative">
                <ImageWithFallback
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="gallery-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-white mb-1">{photo.title}</h3>
                  <p className="text-gray-200 text-sm">{photo.description}</p>
                  <p className="text-gray-300 text-xs mt-1">by {photo.userName}</p>
                </div>
                <Badge className="absolute top-4 right-4 bg-green-600 text-white capitalize">
                  {photo.category}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-container">
          <Badge className="mb-4 badge-green">Photo Gallery</Badge>
          <h2 className="section-title">Captured Moments</h2>
          <p className="section-description">
            Explore our extensive collection of wildlife and plant photography, 
            showcasing the incredible biodiversity of Wild Haven Reserve.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={handleCategoryChange}>
          <TabsList className="grid w-full grid-cols-3 mb-8 max-w-md mx-auto">
            <TabsTrigger value="all">All Photos</TabsTrigger>
            <TabsTrigger value="flora">Flora</TabsTrigger>
            <TabsTrigger value="fauna">Fauna</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <PhotoGrid photos={filteredPhotos} />
          </TabsContent>
          
          <TabsContent value="flora">
            <PhotoGrid photos={filteredPhotos} />
          </TabsContent>
          
          <TabsContent value="fauna">
            <PhotoGrid photos={filteredPhotos} />
          </TabsContent>
        </Tabs>

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div 
            className="modal-overlay"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl max-h-full">
              <ImageWithFallback
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}