import React, { useState } from 'react';
import { Menu, X, Leaf, User, LogOut, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import supabase from '../utils/supabase/client';

interface HeaderProps {
  user: any;
  onShowAuth: () => void;
  onShowAdmin: () => void;
  isAdmin: boolean;
}

export default function Header({ user, onShowAuth, onShowAdmin, isAdmin }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-container">
          <div className="header-brand">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-green-800">Wild Haven Reserve</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            <Link 
              to="/" 
              className={`header-nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/gallery" 
              className={`header-nav-link ${isActive('/gallery') ? 'active' : ''}`}
            >
              Gallery
            </Link>
            <Link 
              to="/blog" 
              className={`header-nav-link ${isActive('/blog') ? 'active' : ''}`}
            >
              Blog
            </Link>
            <Link 
              to="/about" 
              className={`header-nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`header-nav-link ${isActive('/contact') ? 'active' : ''}`}
            >
              Contact
            </Link>
            <Link 
              to="/location" 
              className={`header-nav-link ${isActive('/location') ? 'active' : ''}`}
            >
              Location
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user.user_metadata?.name || user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isAdmin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin">
                          <Shield className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={onShowAdmin}>
                        <Settings className="h-4 w-4 mr-2" />
                        Quick Admin
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={onShowAuth} className="btn btn-green">
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mobile-menu open">
            <div className="mobile-menu-nav">
              <Link 
                to="/" 
                className={`mobile-menu-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/gallery" 
                className={`mobile-menu-link ${isActive('/gallery') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/blog" 
                className={`mobile-menu-link ${isActive('/blog') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/about" 
                className={`mobile-menu-link ${isActive('/about') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`mobile-menu-link ${isActive('/contact') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile Auth */}
              <div className="border-t border-green-100 pt-2 mt-2">
                {user ? (
                  <div className="px-4 py-2 space-y-2">
                    <div className="text-green-800">
                      Hello, {user.user_metadata?.name || user.email}
                    </div>
                    {isAdmin && (
                      <>
                        <Link
                          to="/admin"
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Shield className="h-4 w-4 mr-2" />
                            Admin Dashboard
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            onShowAdmin();
                            setIsMenuOpen(false);
                          }}
                          className="w-full"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Quick Admin
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSignOut}
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="px-4 py-2">
                    <Button
                      onClick={() => {
                        onShowAuth();
                        setIsMenuOpen(false);
                      }}
                      className="w-full btn btn-green"
                    >
                      Sign In
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}