
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContex';

const ProtectedRoute = ({ children }) => {
  const { employee } = useAuth();

  if (!employee) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
