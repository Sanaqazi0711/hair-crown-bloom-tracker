import { useState, FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Heart, Crown, Sparkles, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const Auth = () => {
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast.success('Welcome back, beautiful! 💕');
        navigate('/');
      } else {
        const { error, needsConfirmation } = await signUp(email, password);
        if (error) throw error;
        if (needsConfirmation) {
          toast.success('Account created! Check your email to confirm. ✨');
          setMode('login');
        } else {
          toast.success('Welcome to your hair journey! 💕');
          navigate('/daily-tracker');
        }
      }
    } catch (err: any) {
      toast.error(err.message ?? 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Crown className="h-12 w-12 text-pastel-pink-500 animate-bounce-gentle" />
          </div>
          <h1 className="dancing-script text-4xl md:text-5xl font-bold text-pastel-pink-700 mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Join the Bloom'}
          </h1>
          <p className="text-pastel-pink-600">
            {mode === 'login' ? 'Log in to continue your hair journey' : 'Create an account to start tracking'}
          </p>
        </div>

        <Card className="bg-gradient-to-br from-white to-pastel-pink-50 border-pastel-pink-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-pastel-pink-700 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5" />
              {mode === 'login' ? 'Log In' : 'Sign Up'}
              <Sparkles className="h-5 w-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-pastel-pink-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-pastel-pink-200 focus-visible:ring-pastel-pink-400"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-pastel-pink-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white border-pastel-pink-200 focus-visible:ring-pastel-pink-400 pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-pastel-pink-400 hover:text-pastel-pink-600 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-pastel-pink-500 hover:bg-pastel-pink-600 text-white"
              >
                <Heart className="h-4 w-4 mr-2" />
                {submitting ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Sign Up'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-pastel-pink-600 hover:text-pastel-pink-700 text-sm underline"
              >
                {mode === 'login'
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Log in'}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
