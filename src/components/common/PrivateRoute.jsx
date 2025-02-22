import { Navigate } from 'react-router-dom';

// Componente para proteger las rutas según los roles del usuario
const PrivateRoute = ({ element, requiredRoles, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Si no hay usuario, redirige al login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si el rol del usuario no está en la lista de roles permitidos, redirige
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/landing" />;
  }

  return element;
};

export default PrivateRoute;