import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '@/hooks/useAuth';

const PrivateRoute = ({ element, allowedRoles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user) return <Navigate to='/login' replace/>;

  const hasAccess = allowedRoles.includes(user.role);
  return hasAccess ? element : <Navigate to='/' replace/>;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PrivateRoute;