import { Navigate } from 'react-router-dom';
import PrivateRoute from '../components/common/PrivateRoute';
import {
  AdminPanel,
  LandingPage,
  Login,
  Clients,
  Products,
  Users,
  Dashboard,
} from "./lazyImports";

const routes = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <Login /> },

  {
    path: '/admin',
    element: (
      <PrivateRoute
        element={<AdminPanel />}
        requiredRoles={['admin', 'user']}
      />
    ),
    children: [
      { path: 'clientes', element: <Clients /> },
      { path: 'productos', element: <Products /> },
      { path: 'usuarios', element: <Users /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: '*', element: <Navigate to='/admin/dashboard' /> }, // Redirigir si la ruta no existe
    ],
  },

  {
    path: '/landing',
    element: (
      <PrivateRoute element={<LandingPage />} requiredRoles={['account']} />
    ),
  },

  { path: '*', element: <Navigate to='/' /> }, // Redirigir a la landing si no hay una ruta válida
];

export default routes;
