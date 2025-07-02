import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContex';

const GuestRoute = ({ children }) => {
  const { employee } = useAuth();

  if (employee) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
