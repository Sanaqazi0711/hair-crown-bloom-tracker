
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Heart, Home, CheckSquare, Calendar, Lightbulb, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Daily Tracker', href: '/daily-tracker', icon: CheckSquare },
    { name: 'Weekly Routine', href: '/weekly-routine', icon: Calendar },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Tips', href: '/tips', icon: Lightbulb },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-pastel-pink-200/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pastel-pink-500 animate-heart-beat" />
            <span className="dancing-script text-2xl font-bold text-pastel-pink-600">
              Hair Crown Bloom
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    isActive(item.href)
                      ? "bg-pastel-pink-100 text-pastel-pink-700 shadow-sm"
                      : "text-pastel-pink-600 hover:bg-pastel-pink-50 hover:text-pastel-pink-700"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-pastel-pink-600 hover:text-pastel-pink-700 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-pastel-pink-100 text-pastel-pink-700 border-r-4 border-pastel-pink-500"
                      : "text-pastel-pink-600 hover:bg-pastel-pink-50 hover:text-pastel-pink-700"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
