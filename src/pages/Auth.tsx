import { useState, FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Heart, Crown, Sparkles } from 'lucide-react';
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
        const { error } = await signUp(email, password);
        if (error) throw error;
        toast.success('Account created! Check your email to confirm. ✨');
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

        <Card className="bg-gradient-to-br from-white/90 to-pastel-pink-50/80 border-pastel-pink-200 shadow-lg backdrop-blur-sm">
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
                  className="border-pastel-pink-200 focus-visible:ring-pastel-pink-400"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-pastel-pink-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-pastel-pink-200 focus-visible:ring-pastel-pink-400"
                  placeholder="••••••••"
                />
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
