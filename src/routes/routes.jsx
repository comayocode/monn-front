import { Navigate, useRoutes } from 'react-router-dom';
import PrivateRoute from '../components/common/PrivateRoute';
import { ROLES } from '@/config/rolesConfig';
import useAuth from '@/context/useAuth';
import {
  AdminPanel,
  LandingPage,
  Login,
  Clients,
  Products,
  Users,
  Dashboard,
} from './lazyImports';

const Routes = () => {
  const { user } = useAuth();
  const userRole = user?.role || '';

  const routes = [
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <Login /> },

    {
      path: '/admin',
      element: (
        <PrivateRoute
          element={<AdminPanel />}
          allowedRoles={[ROLES.ADMIN, ROLES.USER]}
          userRole={userRole}
        />
      ),
      children: [
        {
          path: 'dashboard',
          element: (
            <PrivateRoute
              element={<Dashboard />}
              allowedRoles={[ROLES.ADMIN, ROLES.USER]}
            />
          ),
        },
        {
          path: 'clientes',
          element: (
            <PrivateRoute
              element={<Clients />}
              allowedRoles={[ROLES.ADMIN, ROLES.USER]}
            />
          ),
        },
        {
          path: 'productos',
          element: (
            <PrivateRoute
              element={<Products />}
              allowedRoles={[ROLES.ADMIN, ROLES.USER]}
            />
          ),
        },
        {
          path: 'usuarios',
          element: (
            <PrivateRoute
              element={<Users />}
              allowedRoles={[ROLES.ADMIN]}
            />
          ),
        },
        { path: '*', element: <Navigate to='/admin/dashboard' /> },
      ],
    },

    { path: '*', element: <Navigate to='/' /> },
  ];

  return useRoutes(routes);
};

export default Routes;
