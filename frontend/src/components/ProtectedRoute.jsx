import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  const location = useLocation();
  console.log('protected user',user)
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user[0].role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;