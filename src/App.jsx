import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

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
          <Route path='op-01' element={<h1>Vista de Clientes</h1>} />
          <Route path='op-02' element={<h1>Vista de Productos</h1>} />
          <Route path='op-03' element={<h1>Vista de Usuarios</h1>} />
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