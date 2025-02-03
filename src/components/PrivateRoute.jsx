import { Navigate } from 'react-router-dom';

// Componente para proteger las rutas según el rol del usuario
const PrivateRoute = ({ element, role, requiredRole, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Si no hay usuario, redirige al login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si el rol del usuario no coincide con el requerido, redirige
  if (role && user.role !== requiredRole) {
    return <Navigate to="/landing" />;
  }

  return element;
};

export default PrivateRoute;
