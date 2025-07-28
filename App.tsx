import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import supabase from './utils/supabase/client';
import { Toaster } from './components/ui/sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/AdminDashboard';

// Import pages
import Home from './src/pages/Home';
import About from './src/pages/About';
import Contact from './src/pages/Contact';
import Gallery from './src/pages/Gallery';
import BlogPage from './src/pages/Blog';
import Location from './src/pages/Location';
import Admin from './src/pages/Admin';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const isAdmin = user?.email?.includes('admin');

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header 
          user={user} 
          onShowAuth={() => setShowAuthModal(true)}
          onShowAdmin={() => setShowAdminDashboard(true)}
          isAdmin={isAdmin}
        />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                user={user} 
                onShowAuth={() => setShowAuthModal(true)}
                onShowAdmin={() => setShowAdminDashboard(true)}
                isAdmin={isAdmin}
              />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/location" element={<Location />} />
          <Route path="/admin" element={<Admin user={user} />} />
        </Routes>
        
        <Footer />
        
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
      </div>
    </Router>
  );
}