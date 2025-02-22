import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import PrivateRoute from './components/common/PrivateRoute';
import Clients from './features/admin/Clients/Clients';
import Products from './features/admin/Products/Products';
import Users from './features/admin/Users/Users';
import Dashboard from './features/admin/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de login */}
        <Route path='/login' element={<Login />} />

        {/* Ruta principal */}
        <Route path='/' element={<LandingPage />} />

        {/* Rutas protegidas para admin y user */}
        <Route
          path='/admin'
          element={
            <PrivateRoute
              element={<AdminPanel />}
              requiredRoles={['admin', 'user']}
            />
          }
        >
          <Route path='clientes' element={<Clients />} />
          <Route path='productos' element={<Products />} />
          <Route path='usuarios' element={<Users />} />
          <Route path='dashboard' element={<Dashboard />} />
        </Route>

        {/* Ruta para account */}
        <Route
          path='/landing'
          element={
            <PrivateRoute
              element={<LandingPage />}
              requiredRoles={['account']}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;