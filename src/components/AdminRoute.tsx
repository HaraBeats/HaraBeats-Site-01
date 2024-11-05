import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

// TODO: Replace with actual auth logic
const isAdmin = true;

export default function AdminRoute({ children }: AdminRouteProps) {
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}