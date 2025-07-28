import React, { useState, useEffect } from 'react';
import supabase from '../../utils/supabase/client';
import { Toaster } from '../../components/ui/sonner';
import Hero from '../../components/Hero';
import PhotoGallery from '../../components/PhotoGallery';
import Blog from '../../components/Blog';
import Testimonials from '../../components/Testimonials';
import UserContribution from '../../components/UserContribution';
import LocationMap from '../../components/LocationMap';
import AuthModal from '../../components/AuthModal';
import AdminDashboard from '../../components/AdminDashboard';

interface HomeProps {
  user: any;
  onShowAuth: () => void;
  onShowAdmin: () => void;
  isAdmin: boolean;
}

export default function Home({ user, onShowAuth, onShowAdmin, isAdmin }: HomeProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  return (
    <>
      <main>
        <Hero />
        <PhotoGallery />
        <Blog />
        <Testimonials />
        <UserContribution user={user} onShowAuth={() => setShowAuthModal(true)} />
        <LocationMap />
      </main>
      
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          supabase={supabase}
        />
      )}
      
      {showAdminDashboard && isAdmin && (
        <AdminDashboard 
          onClose={() => setShowAdminDashboard(false)}
          user={user}
        />
      )}
      
      <Toaster />
    </>
  );
} 