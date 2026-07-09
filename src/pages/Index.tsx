import { Heart, Sparkles, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroAsset from '@/assets/hero-girl.png.asset.json';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-pink opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Crown className="h-16 w-16 text-pastel-pink-500 animate-bounce-gentle" />
            </div>
            
            <h1 className="dancing-script text-5xl md:text-7xl font-bold text-pastel-pink-700 mb-6 animate-fade-in">
              Your hair is your crown.
            </h1>
            <p className="dancing-script text-3xl md:text-4xl text-pastel-pink-600 mb-8 animate-fade-in">
              Let it grow with love. 💕
            </p>
            
            <div className="max-w-3xl mx-auto mb-12">
              <img 
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800&h=600&fit=crop&auto=format" 
                alt="Cute animated cartoon girl with beautiful long flowing hair" 
                className="rounded-3xl shadow-2xl mx-auto float w-full h-80 object-cover"
              />
            </div>
            
            <p className="text-lg text-pastel-pink-700 max-w-2xl mx-auto mb-8 leading-relaxed">
              Welcome to your beautiful hair growth journey! Our carefully crafted routine combines 
              the wisdom of Ayurveda with DIY love and the power of consistency. Transform your hair 
              in just one month with our gentle, nurturing approach.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/daily-tracker" 
                className="inline-flex items-center px-8 py-4 bg-pastel-pink-500 text-white rounded-full font-semibold hover:bg-pastel-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Heart className="h-5 w-5 mr-2" />
                Start Your Journey
              </Link>
              <Link 
                to="/weekly-routine" 
                className="inline-flex items-center px-8 py-4 bg-white text-pastel-pink-600 border-2 border-pastel-pink-300 rounded-full font-semibold hover:bg-pastel-pink-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                View Weekly Routine
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-pastel-pink-700 mb-6">Our Hair Growth Philosophy</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pastel-pink-400 to-lavender-400 mx-auto rounded-full mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass rounded-3xl p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-pastel-pink-100 to-pastel-pink-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 text-pastel-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-pastel-pink-700 mb-4">Ayurvedic Wisdom</h3>
              <p className="text-pastel-pink-600">Ancient techniques combined with modern understanding for holistic hair health.</p>
            </div>
            
            <div className="glass rounded-3xl p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-lavender-100 to-lavender-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8 text-lavender-600" />
              </div>
              <h3 className="text-xl font-semibold text-pastel-pink-700 mb-4">DIY Love</h3>
              <p className="text-pastel-pink-600">Natural, homemade treatments that nourish your hair with pure ingredients.</p>
            </div>
            
            <div className="glass rounded-3xl p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-blush-100 to-blush-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Crown className="h-8 w-8 text-blush-600" />
              </div>
              <h3 className="text-xl font-semibold text-pastel-pink-700 mb-4">Consistency</h3>
              <p className="text-pastel-pink-600">Small daily actions that compound into beautiful, long-term results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-pastel-pink-700 mb-6">Everything You Need</h2>
            <p className="text-lg text-pastel-pink-600 max-w-2xl mx-auto">
              Track your progress, follow detailed routines, and grow beautiful hair with our comprehensive tools.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/daily-tracker" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="bg-pastel-pink-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-pastel-pink-600" />
                </div>
                <h3 className="font-semibold text-pastel-pink-700 mb-2">Daily Tracker</h3>
                <p className="text-sm text-pastel-pink-600">Monitor your daily hair care habits</p>
              </div>
            </Link>
            
            <Link to="/weekly-routine" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="bg-lavender-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-lavender-600" />
                </div>
                <h3 className="font-semibold text-pastel-pink-700 mb-2">Weekly Routine</h3>
                <p className="text-sm text-pastel-pink-600">Detailed weekly care schedule</p>
              </div>
            </Link>
            
            <Link to="/calendar" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="bg-blush-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Crown className="h-6 w-6 text-blush-600" />
                </div>
                <h3 className="font-semibold text-pastel-pink-700 mb-2">Monthly Calendar</h3>
                <p className="text-sm text-pastel-pink-600">Plan your hair care month</p>
              </div>
            </Link>
            
            <Link to="/tips" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="bg-pastel-pink-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-pastel-pink-600" />
                </div>
                <h3 className="font-semibold text-pastel-pink-700 mb-2">Pro Tips</h3>
                <p className="text-sm text-pastel-pink-600">Expert hair growth wisdom</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
