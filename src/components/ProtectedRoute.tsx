import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Heart className="h-12 w-12 text-pastel-pink-500 animate-heart-beat" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
