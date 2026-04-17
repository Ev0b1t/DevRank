// components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;