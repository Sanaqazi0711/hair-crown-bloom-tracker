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
  const { signIn, signUp, signInWithGoogle, user, loading } = useAuth();
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

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-pastel-pink-200" />
              <span className="text-xs font-medium text-pastel-pink-500">OR</span>
              <div className="h-px flex-1 bg-pastel-pink-200" />
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              onClick={async () => {
                setSubmitting(true);
                const { error } = await signInWithGoogle();
                if (error) {
                  toast.error(error.message ?? 'Could not sign in with Google');
                  setSubmitting(false);
                }
              }}
              className="mt-4 w-full bg-white border-pastel-pink-200 text-pastel-pink-700 hover:bg-pastel-pink-50 hover:text-pastel-pink-700"
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.5 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41 35.4 44 30.1 44 24c0-1.3-.1-2.3-.4-3.5z"/>
              </svg>
              Continue with Google
            </Button>


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
